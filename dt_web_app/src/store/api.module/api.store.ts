import { createModule, mutation, action } from 'vuex-class-component';
import { ICountry, ITimeZone } from '../util.module/util.type';
import { data_countries } from '../util.module/util.data';
import {
	IAuthData,
	IUser,
	UpdateDto,
	PreregisterDto,
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
			preregister: `${ApiStore.config.Api}/preregister`,
			login: `${ApiStore.config.Api}/login`,
			user: `${ApiStore.config.Api}/user`,
			see_welcome: `${ApiStore.config.Api}/see_welcome`,
			reset_password: `${ApiStore.config.Api}/reset_password`,
			change_password: `${ApiStore.config.Api}/change_password`,
			ref_user: `${ApiStore.config.Api}/ref_user`,
			is_refer: `${ApiStore.config.Api}/is_refer`,
			memberships: `${ApiStore.config.Api}/memberships`,
			suscriptions: `${ApiStore.config.Api}/suscriptions`,
			clients: `${ApiStore.config.Api}/clients`,
			client: `${ApiStore.config.Api}/client`,
			binary_tree: `${ApiStore.config.Api}/binary_tree`,
			records: `${ApiStore.config.Api}/records`,
			balance: `${ApiStore.config.Api}/balance`,
			balance_detail: `${ApiStore.config.Api}/balance_detail`,
			balance_send_mail: `${ApiStore.config.Api}/balance_send_mail`,
			set_reinvestment: `${ApiStore.config.Api}/set_reinvestment`,
			balance_graphic: `${ApiStore.config.Api}/balance_graphic`,
			deposit: `${ApiStore.config.Api}/deposit`,
			withdrawal: `${ApiStore.config.Api}/withdrawal`,
			withdrawals_alert: `${ApiStore.config.Api}/withdrawals_alert`,
			process_withdrawal: `${ApiStore.config.Api}/process_withdrawal`,
			get_stripe: `${ApiStore.config.Api}/get_stripe`,
			get_stripe_donation: `${ApiStore.config.Api}/get_stripe_donation`,
			get_stripe_support_payment: `${ApiStore.config.Api}/get_stripe_support_payment`,
			get_coinpayments: `${ApiStore.config.Api}/get_coinpayments`,
			get_coinpayments_donation: `${ApiStore.config.Api}/get_coinpayments_donation`,
			get_coinpayments_support_payment: `${ApiStore.config.Api}/get_coinpayments_support_payment`,
			status_coinpayments: `${ApiStore.config.Api}/status_coinpayments`,
			support_payment: `${ApiStore.config.Api}/support_payment`,
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
			accessToken: this._access_token || '',
			expiresIn: parseInt(localStorage.getItem('expiresIn') || '0'),
			user: this._user || ({} as any),
		};
	}

	get user(): IUser | undefined {
		return this._user;
	}

	get isAdmin() {
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
		return (this.user as IUser).country || data_countries['e0bf3ed3-90ee-444c-a5e7-433c4c5deefb'];
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
				DateTime.fromISO(text, options).setLocale(this.country.locale).setZone(this.time_zone.value, options),
			fromUnix: (seconds: number, options?: DateTimeOptions) =>
				DateTime.fromSeconds(seconds, options)
					.setLocale(this.country.locale)
					.setZone(this.time_zone.value, options),
			fromDate: (date: Date, options?: DateTimeOptions) =>
				DateTime.fromJSDate(date, options)
					.setLocale(this.country.locale)
					.setZone(this.time_zone.value, options),
			fromFormat: (text: string, format: string, options?: DateTimeOptions) =>
				DateTime.fromFormat(text, format, options)
					.setLocale(this.country.locale)
					.setZone(this.time_zone.value, options),
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
	public update_user(data: UpdateDto | { country?: ICountry; change_password?: boolean; seeWelcome?: boolean }) {
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
	public async preregister(data: PreregisterDto): Promise<{ valid: boolean } | string> {
		return await ApiStore.http
			.post(this.url.preregister, data)
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
	public async reset_password(email: string): Promise<boolean> {
		return await ApiStore.http
			.get(this.url.reset_password, { params: { email } })
			.then(async response => {
				if (get_errors(response)) {
					return false;
				}
				return true;
			})
			.catch(() => {
				return false;
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
	public async see_welcome(): Promise<{ valid: boolean } | string> {
		return await ApiStore.http
			.patch(this.url.see_welcome, {}, { headers: this.headers })
			.then(async response => {
				const error = get_errors(response);
				if (error) {
					return error;
				}
				this.update_user({
					seeWelcome: false,
				});
				return { valid: true };
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
	public async update_memberships(data: IMembership[]): Promise<IMembership[]> {
		return await ApiStore.http
			.post(`${this.url.memberships}`, data, { headers: this.headers })
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
	public async remove_client(id: string): Promise<string> {
		return await ApiStore.http
			.delete(this.url.client, { params: { id }, headers: this.headers })
			.then(async response => {
				const error = get_errors(response);
				if (error) {
					return error;
				}
				return '';
			})
			.catch(e => {
				return get_errors(e);
			});
	}

	@action
	public async binary_tree(): Promise<any> {
		return await ApiStore.http
			.get(`${this.url.binary_tree}`, { headers: this.headers })
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
	public async balance_detail(params: { id?: string }): Promise<IBalanceDetail> {
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
	public async balance_send_mail(params: { id?: string }): Promise<{ valid: boolean }> {
		return await ApiStore.http
			.get(`${this.url.balance_send_mail}`, { params, headers: this.headers })
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
	public async set_reinvestment(params: {
		user_id: string;
		id: string;
		reinvestment: boolean;
	}): Promise<{ valid: boolean }> {
		return await ApiStore.http
			.get(`${this.url.set_reinvestment}`, { params, headers: this.headers })
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
	public async balance_graphic(params: { id?: string }): Promise<{
		labels: number[];
		data: number[];
	}> {
		return await ApiStore.http
			.get(`${this.url.balance_graphic}`, { params, headers: this.headers })
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
		reference?: string;
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

	@action
	public async proccess_support_payment(data: {
		type: string;
		money: number;
		reference: string;
	}): Promise<{ valid: boolean } | string> {
		return await ApiStore.http
			.post(this.url.support_payment, data, { headers: this.headers })
			.then(async response => {
				const error = get_errors(response);
				if (error) {
					return error;
				}
				this.update_user({
					nextSupportPayment: this.DateTime.now().plus({ years: 1 }).toSeconds(),
				} as any);
				return response.data;
			})
			.catch(e => {
				return get_errors(e);
			});
	}

	@action
	public async get_stripe_support_payment(data: {
		money: number;
	}): Promise<{ id: string; reference: string } | string> {
		return await ApiStore.http
			.post(this.url.get_stripe_support_payment, data, { headers: this.headers })
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
	public async get_coinpayments_support_payment(data: {
		money: number;
		currency: string;
	}): Promise<{ txn_id: string; checkout_url: string; status_url: string } | string> {
		return await ApiStore.http
			.post(this.url.get_coinpayments_support_payment, data, { headers: this.headers })
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
	public async get_currency_to_dollar(currency: string) {
		return await ApiStore.http
			.get('https://api.coingecko.com/api/v3/simple/price', {
				params: { ids: currency.toLowerCase(), vs_currencies: 'usd' },
			})
			.then(async response => {
				return response.data[currency].usd;
			})
			.catch(() => {
				return 0;
			});
	}
}
