import { createModule, mutation, action } from 'vuex-class-component';
import { ICountry, ITimeZone } from '../util.module/util.type';
import {
	IAuthData,
	IUser,
	IUpdateUser,
	IUpdateUserData,
	SignupDto,
	LoginDto,
	UserChangePasswordDto,
} from './auth.type';
import {
	HttpBase,
	ConfigStore,
	IHeader,
	get_errors,
	clear_data,
	get_country,
	DateTimeFunc,
	DateTimeOptions,
	DateObject,
} from '../store.utils';
import { DateTime } from 'luxon';

const VuexModule = createModule({
	namespaced: 'auth',
	strict: false,
});

export default class AuthStore extends VuexModule {
	static http: HttpBase;
	static config: ConfigStore;

	static setConfig(http: HttpBase, config: ConfigStore) {
		this.http = http;
		this.config = config;
	}

	private _access_token: string | undefined = localStorage.getItem('accessToken') || undefined;
	private _user: IUser | undefined = JSON.parse(localStorage.getItem('user') || '{}');
	private _is_admin: boolean = this._user?.role === 'admin';

	get url() {
		return {
			signup: `${AuthStore.config.Api}/signup`,
			login: `${AuthStore.config.Api}/login`,
			user: `${AuthStore.config.Api}/auth/user`,
			update_user: `${AuthStore.config.Api}/auth/update`,
			reset_password: `${AuthStore.config.Api}/auth/reset_password`,
			change_password: `${AuthStore.config.Api}/auth/change_password`,
			ref_user: `${AuthStore.config.Api}/auth/ref_user`,
		};
	}

	get headers(): IHeader {
		if (this._access_token) {
			return {
				Authorization: 'Bearer ' + this._access_token,
				'Content-Type': 'application/json',
			};
		} else {
			return {
				'Content-Type': 'application/json',
			};
		}
	}

	get auth_data(): IAuthData {
		return {
			accessToken: this._access_token,
			expiresIn: parseInt(localStorage.getItem('expiresIn') || '0'),
			user: this._user,
		};
	}

	get user(): IUser | undefined {
		return this._user;
	}

	get isadmin() {
		return this._is_admin;
	}

	get accessToken(): string | undefined {
		return this._access_token;
	}

	get email(): string {
		if (this.user) {
			return this.user.email;
		}
		return '';
	}

	get telephone(): string {
		if (this.user) {
			return this.user.telephone;
		}
		return '';
	}

	get name(): string {
		if (this.user) {
			if (this.user.firstname && this.user.lastname) {
				return `${this.user.firstname} ${this.user.lastname}`;
			} else if (this.user.lastname) {
				return this.user.lastname;
			} else {
				return this.user.firstname;
			}
		}
		return '';
	}

	get country(): ICountry {
		return (this.user as IUser).country;
	}

	get time_zone(): ITimeZone {
		const id_time_zone = this.user?.id_time_zone;
		if (id_time_zone) {
			return this.country.time_zones.find(tz => tz.id === id_time_zone) || this.country.time_zones[0];
		} else {
			return this.country.time_zones[0];
		}
	}

	get DateTime(): DateTimeFunc {
		return {
			utc: () => DateTime.utc().setLocale(this.country.locale),
			now: () => DateTime.now().setLocale(this.country.locale).setZone(this.time_zone.value),
			local: (
				year?: number,
				month?: number,
				day?: number,
				hour?: number,
				minute?: number,
				second?: number,
				millisecond?: number,
			) =>
				DateTime.local(year, month, day, hour, minute, second, millisecond)
					.setLocale(this.country.locale)
					.setZone(this.time_zone.value),
			fromISO: (text: string, options?: DateTimeOptions) =>
				DateTime.fromISO(text, options).setLocale(this.country.locale).setZone(this.time_zone.value),
			fromUnix: (seconds: number, options?: DateTimeOptions) =>
				DateTime.fromSeconds(seconds, options).setLocale(this.country.locale).setZone(this.time_zone.value),
			fromDate: (date: Date, options?: DateTimeOptions) =>
				DateTime.fromJSDate(date, options).setLocale(this.country.locale).setZone(this.time_zone.value),
			fromFormat: (text: string, format: string, options?: DateTimeOptions) =>
				DateTime.fromFormat(text, format, options).setLocale(this.country.locale).setZone(this.time_zone.value),
			fromObject: (obj: DateObject) =>
				DateTime.fromObject(obj).setLocale(this.country.locale).setZone(this.time_zone.value),
			clone: (datetime: DateTime) =>
				DateTime.fromISO(datetime.toISO()).setLocale(this.country.locale).setZone(this.time_zone.value),
		};
	}

	get isLoggedIn(): boolean {
		return !!(this._access_token && this._user);
	}

	get isLoggedApp(): boolean {
		return !!this._access_token;
	}

	@mutation
	public set_auth_data(data?: IAuthData) {
		if (data?.accessToken) {
			localStorage.setItem('accessToken', data.accessToken);
			this._access_token = data.accessToken;
		}
		if (data?.expiresIn) {
			localStorage.setItem('expiresIn', data.expiresIn.toString());
		}
		if (data?.user) {
			localStorage.setItem('user', JSON.stringify(data.user));
			this._user = data.user;
			this._is_admin = this._user.role === 'admin';
		}
	}

	@mutation
	public update_user_data(data: IUpdateUser) {
		this._user = {
			...this._user,
			...data,
		} as IUser;
		this._is_admin = this._user.role === 'admin';
		localStorage.setItem('user', JSON.stringify(this._user));
	}

	@action
	public async setCountry() {
		this.update_user_data({
			country: await get_country(this, this.user?.country__id),
		});
	}

	@action
	public async logout() {
		localStorage.clear();
		this._user = undefined;
		this._access_token = '';
		this._is_admin = false;
		await clear_data(this);
	}

	@action
	public async isLogged(): Promise<boolean> {
		return !!localStorage.getItem('accessToken');
	}

	@action
	public async getUser(): Promise<boolean> {
		await this.get_auth_user();
		return !!localStorage.getItem('accessToken');
	}

	@action
	public async signup(data: SignupDto): Promise<string> {
		return await AuthStore.http
			.post(this.url.signup, data)
			.then(async response => {
				const error = get_errors(response);
				if (error) {
					return error;
				}
				this.set_auth_data(response.data);
				await this.setCountry();
				return response.data;
			})
			.catch(e => {
				return get_errors(e);
			});
	}

	@action
	public async login(data: LoginDto): Promise<string> {
		return await AuthStore.http
			.post(this.url.login, data)
			.then(async response => {
				const error = get_errors(response);
				if (error) {
					return error;
				}
				this.set_auth_data(response.data);
				await this.setCountry();
				return response.data;
			})
			.catch(e => {
				return get_errors(e);
			});
	}

	@action
	public async get_auth_user(): Promise<IAuthData | string> {
		return await AuthStore.http
			.get(this.url.user, { headers: this.headers })
			.then(async response => {
				const error = get_errors(response);
				if (error) {
					return error;
				}
				this.update_user_data(response.data);
				await this.setCountry();
				return this.auth_data;
			})
			.catch(e => {
				return get_errors(e);
			});
	}

	@action
	public async update_auth_user(data: IUpdateUserData): Promise<IAuthData | string> {
		return await AuthStore.http
			.patch(this.url.update_user, data, { headers: this.headers })
			.then(async response => {
				const error = get_errors(response);
				if (error) {
					return error;
				}
				this.update_user_data(response.data);
				await this.setCountry();
				return this.auth_data;
			})
			.catch(e => {
				return get_errors(e);
			});
	}

	@action
	public async reset_password(email: string): Promise<string> {
		return await AuthStore.http
			.post(`${this.url.reset_password}`, { email })
			.then(response => {
				const error = get_errors(response);
				if (error) {
					return error;
				}
				this.update_user_data({
					change_password: true,
				});
				return error;
			})
			.catch(e => {
				return get_errors(e);
			});
	}

	@action
	public async change_password(data: UserChangePasswordDto): Promise<string> {
		return await AuthStore.http
			.patch(this.url.change_password, data, { headers: this.headers })
			.then(response => {
				return get_errors(response);
			})
			.catch(e => {
				return get_errors(e);
			});
	}

	@action
	public async ref_user(id: string): Promise<{ ref: string; name: string }> {
		return await AuthStore.http
			.post(`${this.url.ref_user}`, { id })
			.then(response => {
				const error = get_errors(response);
				if (error) {
					return error;
				}
				return response.data;
			})
			.catch(e => {
				return get_errors(e);
			});
	}
}
