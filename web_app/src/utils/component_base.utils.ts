import { Vue } from 'vue-property-decorator';
import { vxm, Store, IAuthData, IUser, DataDict } from '../store';
import VueRouter, { Route } from 'vue-router';
import { BuefyNamespace } from 'buefy';
import VueI18n, { IVueI18n, TranslateResult } from 'vue-i18n';
import { v4 as uuid } from 'uuid';

export default abstract class ComponentBase extends Vue {
	private uuid = uuid();
	public is_destroyed = true;
	private data_listener: Set<string> = new Set();

	public store: Store = vxm;
	public auth_data: IAuthData = null as any;
	public is_admin: boolean = false;
	public publicPath: string = process.env.BASE_URL || '';

	public $isMobile: any;
	public $buefy!: BuefyNamespace;
	public $i18n!: VueI18n & IVueI18n;
	public $router!: VueRouter;
	public $route!: Route;

	public logout: () => Promise<void> = async () => {
		0;
	};

	public async created() {
		this.is_destroyed = false;
		if ('i18n' in this.$route.query) {
			if (this.$i18n.availableLocales.find((l: string) => l === (this.$route.query.i18n as string))) {
				this.$i18n.locale = this.$route.query.i18n as string;
			}
		}
		if (await this.store.api.isLogged()) {
			this.auth_data = this.store.api.auth_data;
			this.is_admin = this.auth_data.user?.role === 'admin';
		}
		this.logout = async () => {
			if (this.$route.name !== 'Login') {
				await this.$router.push({ name: this.is_admin ? 'AdminLogin' : 'Login' });
				this.store.api.logout();
			}
		};
		this.$destroy = () => {
			this.is_destroyed = true;
			if (this.data_listener.size) {
				for (const key of this.data_listener) {
					this.store.util.watch_data({
						key,
						id: this.uuid,
						callback: null,
					});
				}
			}
			super.$destroy();
		};
	}

	public $WatchData(key: string, callback: (newVal: DataDict, oldVal: DataDict) => void) {
		this.data_listener.add(key);
		this.store.util.watch_data({
			key,
			id: this.uuid,
			callback,
		});
	}

	public async exec_is_render(
		refs: string,
		callback: (ref?: Vue | Element | Vue[] | Element[]) => void,
		c: number = 0,
	) {
		await this.sleep(100);
		if (c < 10) {
			if (this.$refs[refs] && this.$refs[refs] !== null && this.$refs[refs] !== undefined) {
				callback(this.$refs[refs] as Vue | Element | Vue[] | Element[]);
			} else {
				this.exec_is_render(refs, callback, c + 1);
			}
		}
	}

	public async exec_is_auth(callback: () => void, c: number = 0) {
		await this.sleep(100);
		if (c < 10) {
			this.store.api.isLogged().then(v => {
				if (v) {
					this.auth_data = this.store.api.auth_data;
					callback();
				} else {
					this.exec_is_auth(callback, c + 1);
				}
			});
		}
	}

	public formatMoney(n: number) {
		if (n) {
			const x = n.toFixed(2).toString().split('.');
			let x1 = x[0];
			const rgx = /(\d+)(\d{3})/;
			while (rgx.test(x1)) {
				x1 = x1.replace(rgx, '$1' + ' ' + '$2');
			}
			return `$${x1}${x.length > 1 ? '.' + x[1] : ''}`;
		} else {
			return '$0';
		}
	}

	public formatName(user: IUser): string {
		if (user.firstname && user.lastname) {
			return `${user.firstname} ${user.lastname}`;
		} else if (user.lastname) {
			return user.lastname;
		} else {
			return user.firstname;
		}
	}

	public calcMembershipMoney(data: { money: number; months: number; interest: number }) {
		return data.money * data.interest * data.months;
	}

	public async sleep(n: number) {
		await new Promise(r => setTimeout(r, n));
	}

	get $isAdmin(): boolean {
		return this.is_admin;
	}

	public toastError(message: string | TranslateResult, duration: number = 4000) {
		this.$buefy.toast.open({
			message: message as string,
			type: 'is-danger',
			position: 'is-bottom',
			duration,
		});
	}

	public toastSuccess(message: string | TranslateResult, duration: number = 4000) {
		this.$buefy.toast.open({
			message: message as string,
			type: 'is-success',
			duration,
		});
	}

	public toastWarning(message: string | TranslateResult, duration: number = 4000) {
		this.$buefy.toast.open({
			message: message as string,
			type: 'is-warning',
			duration,
		});
	}

	public load_form_api<T>(data: T | string, callback: (data: T) => void, custom_data_error?: { [key: string]: any }) {
		if (typeof data === 'string' && data !== '') {
			const data_error: { [key: string]: any } = {
				e000: () => {
					this.toastError(this.$t('error.e001'));
					this.logout();
				},
				e001: () => {
					this.toastError(this.$t('error.e001'));
					this.logout();
				},
				e003: () => {
					this.toastError(this.$t('error.e003'));
					this.logout();
				},
				e004: () => {
					this.toastError(this.$t('error.e004'));
					this.logout();
				},
				'login.error.u1': () => {
					this.toastError(this.$t('login.error.u1'));
					this.logout();
				},
				...custom_data_error,
			};
			if (data_error[data]) {
				data_error[data]();
			} else {
				this.toastError(this.$t(data));
			}
		} else {
			callback(data as T);
		}
	}
}
