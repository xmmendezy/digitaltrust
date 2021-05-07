import { createModule, mutation, action } from 'vuex-class-component';
import { ICountry, ITimeZone } from '../util.module/util.type';
import {
	IAuthData,
	IUser,
	UpdateDto,
	SignupDto,
	LoginDto,
	UserChangePasswordDto,
	IRefer,
	IMembership,
	ISuscription,
	IClient,
	IRecord,
	IBalance,
	IBalanceDetail,
	IWithdrawal,
} from './api.type';
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
	namespaced: 'api',
	strict: false,
});

export default class ApiStore extends VuexModule {
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
			signup: `${ApiStore.config.Api}/signup`,
			login: `${ApiStore.config.Api}/login`,
			user: `${ApiStore.config.Api}/user`,
			reset_password: `${ApiStore.config.Api}/auth/reset_password`,
			change_password: `${ApiStore.config.Api}/auth/change_password`,
			ref_user: `${ApiStore.config.Api}/ref_user`,
			is_refer: `${ApiStore.config.Api}/is_refer`,
			memberships: `${ApiStore.config.Api}/memberships`,
			suscriptions: `${ApiStore.config.Api}/suscriptions`,
			clients: `${ApiStore.config.Api}/clients`,
			client: `${ApiStore.config.Api}/client`,
			records: `${ApiStore.config.Api}/records`,
			balance: `${ApiStore.config.Api}/balance`,
			balance_detail: `${ApiStore.config.Api}/balance_detail`,
			deposit: `${ApiStore.config.Api}/deposit`,
			withdrawal: `${ApiStore.config.Api}/withdrawal`,
			withdrawals_alert: `${ApiStore.config.Api}/withdrawals_alert`,
			process_withdrawal: `${ApiStore.config.Api}/process_withdrawal`,
			get_stripe: `${ApiStore.config.Api}/get_stripe`,
			get_stripe_donation: `${ApiStore.config.Api}/get_stripe_donation`,
			get_coinpayments: `${ApiStore.config.Api}/get_coinpayments`,
			status_coinpayments: `${ApiStore.config.Api}/status_coinpayments`,
			get_coinpayments_donation: `${ApiStore.config.Api}/get_coinpayments_donation`,
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
	public update_user(data: UpdateDto | { country?: ICountry; change_password?: boolean }) {
		this._user = {
			...this._user,
			...(data as any),
		} as IUser;
		this._is_admin = this._user.role === 'admin';
		localStorage.setItem('user', JSON.stringify(this._user));
	}

	@action
	public async setCountry() {
		this.update_user({
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
	public async signup(data: SignupDto): Promise<IAuthData | string> {
		return await ApiStore.http
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
	public async register_client(data: SignupDto): Promise<IAuthData | string> {
		return await ApiStore.http
			.post(this.url.signup, data)
			.then(async response => {
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

	@action
	public async login(data: LoginDto): Promise<IAuthData | string> {
		return await ApiStore.http
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
	public async update(data: UpdateDto): Promise<IAuthData | string> {
		return await ApiStore.http
			.patch(this.url.user, data, { headers: this.headers })
			.then(async response => {
				const error = get_errors(response);
				if (error) {
					return error;
				}
				this.update_user(response.data);
				await this.setCountry();
				return this.auth_data;
			})
			.catch(e => {
				return get_errors(e);
			});
	}

	@action
	public async reset_password(email: string): Promise<string> {
		return await ApiStore.http
			.post(`${this.url.reset_password}`, { email })
			.then(response => {
				const error = get_errors(response);
				if (error) {
					return error;
				}
				this.update_user({
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
		return await ApiStore.http
			.patch(this.url.change_password, data, { headers: this.headers })
			.then(response => {
				return get_errors(response);
			})
			.catch(e => {
				return get_errors(e);
			});
	}

	@action
	public async ref_user(id: string): Promise<IRefer> {
		return await ApiStore.http
			.get(`${this.url.ref_user}`, { params: { id } })
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

	@action
	public async is_refer(): Promise<IRefer[]> {
		return await ApiStore.http
			.get(`${this.url.is_refer}`, { headers: this.headers })
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

	@action
	public async memberships(): Promise<IMembership[]> {
		return await ApiStore.http
			.get(`${this.url.memberships}`, { headers: this.headers })
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

	@action
	public async suscriptions(id?: string): Promise<ISuscription[]> {
		return await ApiStore.http
			.get(`${this.url.suscriptions}`, { params: { id }, headers: this.headers })
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

	@action
	public async clients(): Promise<IClient[]> {
		return await ApiStore.http
			.get(`${this.url.clients}`, { headers: this.headers })
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

	@action
	public async client(id: string): Promise<IUser> {
		return await ApiStore.http
			.get(`${this.url.client}`, { params: { id }, headers: this.headers })
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

	@action
	public async update_client(data: { id: string; data: UpdateDto }): Promise<IUser | string> {
		return await ApiStore.http
			.patch(this.url.client, data.data, { params: { id: data.id }, headers: this.headers })
			.then(async response => {
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

	@action
	public async records(id?: string): Promise<IRecord[]> {
		return await ApiStore.http
			.get(`${this.url.records}`, { params: { id }, headers: this.headers })
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

	@action
	public async withdrawals_alert(id?: string): Promise<IWithdrawal[]> {
		return await ApiStore.http
			.get(`${this.url.withdrawals_alert}`, { params: { id }, headers: this.headers })
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

	@action
	public async balance(): Promise<IBalance> {
		return await ApiStore.http
			.get(`${this.url.balance}`, { headers: this.headers })
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

	@action
	public async balance_detail(params: { id?: string; date?: number }): Promise<IBalanceDetail> {
		return await ApiStore.http
			.get(`${this.url.balance_detail}`, { params, headers: this.headers })
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

	@action
	public async process_deposit(data: {
		id?: string;
		membershipId: string;
		suscriptionId?: string;
		type: string;
		money: number;
		date?: number;
		reference: string;
	}): Promise<{ valid: boolean } | string> {
		return await ApiStore.http
			.post(this.url.deposit, data, { headers: this.headers })
			.then(async response => {
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

	@action
	public async request_withdrawal(data: {
		id?: string;
		type: string;
		money: number;
		date?: number;
	}): Promise<{ valid: boolean } | string> {
		return await ApiStore.http
			.post(this.url.withdrawal, data, { headers: this.headers })
			.then(async response => {
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

	@action
	public async process_withdrawal(data: { id: string }): Promise<{ valid: boolean } | string> {
		return await ApiStore.http
			.post(this.url.process_withdrawal, data, { headers: this.headers })
			.then(async response => {
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

	@action
	public async get_stripe(data: {
		id?: string;
		membershipId: string;
		suscriptionId?: string;
		type: string;
		money: number;
	}): Promise<{ id: string; reference: string } | string> {
		return await ApiStore.http
			.post(this.url.get_stripe, data, { headers: this.headers })
			.then(async response => {
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

	@action
	public async get_stripe_donation(data: { money: number }): Promise<{ id: string } | string> {
		return await ApiStore.http
			.post(this.url.get_stripe_donation, data)
			.then(async response => {
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

	@action
	public async get_coinpayments(data: {
		id?: string;
		membershipId: string;
		suscriptionId?: string;
		type: string;
		money: number;
		currency: string;
	}): Promise<{ txn_id: string; checkout_url: string; status_url: string } | string> {
		return await ApiStore.http
			.post(this.url.get_coinpayments, data, { headers: this.headers })
			.then(async response => {
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

	@action
	public async status_coinpayments(data: { txid: string }): Promise<any | string> {
		return await ApiStore.http
			.post(this.url.status_coinpayments, data, { headers: this.headers })
			.then(async response => {
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

	@action
	public async get_coinpayments_donation(data: {
		money: number;
		currency: string;
	}): Promise<{ checkout_url: string } | string> {
		return await ApiStore.http
			.post(this.url.get_coinpayments_donation, data)
			.then(async response => {
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
