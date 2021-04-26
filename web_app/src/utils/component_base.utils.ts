import { Vue } from 'vue-property-decorator';
import { vxm } from '@app/store';
import VueRouter, { Route } from 'vue-router';

export default abstract class ComponentBase extends Vue {
	public store = vxm;
	public auth_data = this.store.auth.auth_data;
	private is_admin: boolean = false;

	public $isMobile: any;
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

	public exec_is_render(refs: string, callback: (ref?: Vue | Element | Vue[] | Element[]) => void) {
		const timer = setInterval(async () => {
			if (this.$refs[refs] !== null) {
				clearInterval(timer);
				callback(this.$refs[refs]);
			}
		}, 100);
	}

	public exec_is_auth(callback: () => void) {
		const timer = setInterval(async () => {
			if (await this.store.auth.isLogged()) {
				clearInterval(timer);
				callback();
			}
		}, 100);
	}

	public load_form_api<T>(data: T | string, callback: (data: T) => void, custom_data_error?: { [key: string]: any }) {
		if (typeof data === 'string' && data !== '') {
			const data_error: { [key: string]: any } = {
				e000: () => {
					this.toastError('Error inesperado, vuelva a intentarlo mas tarde');
				},
				e001: () => {
					this.toastError('Su sessión ha expirado');
					this.logout();
				},
				e003: () => {
					this.toastError('Este usuario no tiene permiso para acceder a este espacio de trabajo');
					this.logout();
				},
				u26: () => {
					this.toastError('No se ha encontrado el usuario');
				},
				u31: () => {
					this.toastError('Sesión expirada');
				},
				u32: () => {
					this.toastError('El usuario esta inactivo');
				},
				u33: () => {
					this.toastError('Contraseña incorrecta');
				},
				u34: () => {
					this.toastError('Usuario con rol no permitido');
				},
				p16: () => {
					this.toastError('El usuario no tiene un perfil activo');
				},
				...custom_data_error,
			};
			data_error[data]();
		} else {
			callback(data as T);
		}
	}
}
