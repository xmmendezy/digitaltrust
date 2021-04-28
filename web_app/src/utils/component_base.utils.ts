import { Vue } from 'vue-property-decorator';
import { vxm, Store, IAuthData } from '@app/store';
import { DataDict } from '../store';
import VueRouter, { Route } from 'vue-router';
import { BuefyNamespace } from 'buefy';
import { v4 as uuid } from 'uuid';

export default abstract class ComponentBase extends Vue {
	public store: Store = vxm;
	public auth_data: IAuthData = this.store.auth.auth_data;
	public is_admin: boolean = false;

	private uuid = uuid();
	private data_listener: Set<string> = new Set();

	public $isMobile: any;
	public $buefy!: BuefyNamespace;
	public $router!: VueRouter;
	public $route!: Route;

	public logout: () => Promise<void> = async () => {
		0;
	};

	public async created() {
		if ('i18n' in this.$route.query) {
			if (this.$i18n.availableLocales.find(l => l === (this.$route.query.i18n as string))) {
				this.$i18n.locale = this.$route.query.i18n as string;
			}
		}
		if (await this.store.auth.isLogged()) {
			this.auth_data = this.store.auth.auth_data;
			this.is_admin = this.auth_data.user?.role === 'admin';
		}
		this.logout = async () => {
			this.store.auth.logout().then(() => {
				if (this.$route.name !== 'Login') {
					this.$router.push('/login');
				}
			});
		};
		this.$destroy = () => {
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

	public exec_is_render(refs: string, callback: (ref?: Vue | Element | Vue[] | Element[]) => void, c: number = 0) {
		this.sleep(100);
		if (c < 10) {
			if (this.$refs[refs] !== null) {
				callback();
			} else {
				this.exec_is_render(refs, callback, c + 1);
			}
		}
	}

	public exec_is_auth(callback: () => void) {
		this.sleep(100);
		this.store.auth.isLogged().then(v => {
			if (v) {
				this.auth_data = this.store.auth.auth_data;
				callback();
			} else {
				this.exec_is_auth(callback);
			}
		});
	}

	public async sleep(n: number) {
		await new Promise(r => setTimeout(r, n));
	}

	get $isAdmin(): boolean {
		return this.is_admin;
	}

	public L(key: string): string {
		return this.$t(key) as string;
	}

	public toastError(message: string, duration: number = 4000) {
		this.$buefy.toast.open({
			message,
			type: 'is-danger',
			position: 'is-bottom',
			duration,
		});
	}

	public toastSuccess(message: string, duration: number = 4000) {
		this.$buefy.toast.open({
			message,
			type: 'is-success',
			duration,
		});
	}

	public load_form_api<T>(data: T | string, callback: (data: T) => void, custom_data_error?: { [key: string]: any }) {
		if (typeof data === 'string' && data !== '') {
			const data_error: { [key: string]: any } = {
				e000: () => {},
				e001: () => {
					this.toastError(this.L('error.e001'));
					this.logout();
				},
				e003: () => {
					this.toastError(this.L('error.e003'));
					this.logout();
				},
				e004: () => {
					this.toastError(this.L('error.e004'));
					this.logout();
				},
				...custom_data_error,
			};
			if (data_error[data]) {
				data_error[data]();
			} else {
				this.toastError(this.L(data));
			}
		} else {
			callback(data as T);
		}
	}
}