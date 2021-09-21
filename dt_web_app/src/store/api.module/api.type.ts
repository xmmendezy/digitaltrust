import { IsNotEmpty, Matches, IsEmail, Length } from 'class-validator';
import { ClassBase } from '@app/utils/base.utils';
import { ICountry } from '../util.module/util.type';
import { data_countries } from '../util.module/util.data';

const ids_countries = Object.keys(data_countries);

interface IAuthData {
	expiresIn?: number;
	accessToken?: string;
	user?: IUser;
}

interface IUser {
	id: string;
	username: string;
	email: string;
	telephone: string;
	lastname: string;
	firstname: string;
	change_password: boolean;
	id_time_zone: string;
	is_admin: boolean;
	role: 'admin' | 'user';
	status: 'removed' | 'pending' | 'confirm';
	lastLogin: Date;
	seeWelcome: boolean;
	nextSupportPayment: number;
	country__id: string;
	country: ICountry;
	state: string;
	address: string;
	paypal_account: string;
	stripe_account: string;
	coinpayments_account: string;
	banck_name: string;
	banck_address: string;
	banck_account_name: string;
	banck_account: string;
	banck_routing_name: string;
	banck_account_username: string;
	banck_swift_code: string;
	banck_iban: string;
	can_remove: boolean;
	created: string | Date;
}

class UpdateDto extends ClassBase {
	constructor(data?: IUser) {
		super();
		if (data) {
			this.data = data;
			this.firstname = data.firstname;
			this.lastname = data.lastname;
			this.username = data.username;
			this.email = data.email;
			this.telephone = data.telephone;
			this.password = 'Secret00__';
			this.password_confirm = 'Secret00__';
			this.state = data.state;
			this.address = data.address;
			this.country = data.country__id;
			this.paypal_account = data.paypal_account;
			this.stripe_account = data.stripe_account;
			this.coinpayments_account = data.coinpayments_account;
			this.banck_name = data.banck_name;
			this.banck_address = data.banck_address;
			this.banck_account_name = data.banck_account_name;
			this.banck_account = data.banck_account;
			this.banck_routing_name = data.banck_routing_name;
			this.banck_account_username = data.banck_account_username;
			this.banck_swift_code = data.banck_swift_code;
			this.banck_iban = data.banck_iban;
			this.can_remove = data.can_remove;
		} else {
			this.firstname = '';
			this.lastname = '';
			this.username = '';
			this.email = '';
			this.telephone = '';
			this.password = '';
			this.password_confirm = '';
			this.state = '';
			this.address = '';
			this.country = '';
			this.paypal_account = '';
			this.stripe_account = '';
			this.coinpayments_account = '';
			this.banck_name = '';
			this.banck_address = '';
			this.banck_account_name = '';
			this.banck_account = '';
			this.banck_routing_name = '';
			this.banck_account_username = '';
			this.banck_swift_code = '';
			this.banck_iban = '';
			this.can_remove = false;
		}
	}

	data!: IUser;

	@Matches(/^[a-zA-Z-ZñÑáéíóúÁÉÍÓÚ\s]+$/, { always: true, message: 'validator.auth.b' })
	@IsNotEmpty({ message: 'validator.auth.a' })
	firstname!: string;

	@Matches(/^[a-zA-Z-ZñÑáéíóúÁÉÍÓÚ\s]+$/, { always: true, message: 'validator.auth.c' })
	@IsNotEmpty({ message: 'validator.auth.a' })
	lastname!: string;

	@Matches(/^[a-z][a-z0-9_-]{3,16}$/, { always: true, message: 'validator.auth.l' })
	@IsNotEmpty({ message: 'validator.auth.a' })
	username!: string;

	@IsEmail({}, { message: 'validator.auth.d' })
	@IsNotEmpty({ message: 'validator.auth.a' })
	email!: string;

	@IsNotEmpty({ message: 'validator.auth.a' })
	telephone!: string;

	@IsNotEmpty({ message: 'validator.auth.a' })
	state!: string;

	@IsNotEmpty({ message: 'validator.auth.a' })
	address!: string;

	@Matches(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{5,}$/, { always: true, message: 'validator.auth.e' })
	@Length(8, 50, { message: 'validator.auth.f' })
	@IsNotEmpty({ message: 'validator.auth.a' })
	password!: string;

	@Matches(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{5,}$/, { always: true, message: 'validator.auth.e' })
	@Length(8, 50, { message: 'validator.auth.f' })
	@IsNotEmpty({ message: 'validator.auth.a' })
	password_confirm!: string;

	@IsNotEmpty({ message: 'validator.auth.a' })
	country!: string;

	@IsNotEmpty({ message: 'validator.auth.a' })
	paypal_account!: string;

	@IsNotEmpty({ message: 'validator.auth.a' })
	stripe_account!: string;

	@IsNotEmpty({ message: 'validator.auth.a' })
	coinpayments_account!: string;

	banck_name!: string;
	banck_address!: string;
	banck_account_name!: string;
	banck_account!: string;
	banck_routing_name!: string;
	banck_account_username!: string;
	banck_swift_code!: string;
	banck_iban!: string;

	can_remove!: boolean;

	public validate(): string[] {
		if (!this.paypal_account) {
			this.paypal_account = this.data.paypal_account;
		}
		if (!this.stripe_account) {
			this.stripe_account = this.data.stripe_account;
		}
		if (!this.coinpayments_account) {
			this.coinpayments_account = this.data.coinpayments_account;
		}
		const errors = super.validate();
		if (!this.equalsPassword) {
			errors.push('validator.auth.g');
		}
		if (this.country && !ids_countries.find(id => id === this.country)) {
			errors.push('validator.auth.g');
		}
		return Array.from(new Set(errors));
	}

	get equalsPassword(): boolean {
		return this.password === this.password_confirm;
	}
}

class SignupDto extends ClassBase {
	constructor() {
		super();
		this.username = '';
		this.firstname = '';
		this.lastname = '';
		this.email = '';
		this.telephone = '';
		this.password = '';
		this.password_confirm = '';
		this.state = '';
		this.address = '';
		this.country = '';
		this.ref = '';
		this.freeSupport = false;
	}

	@Matches(/^[a-z][a-z0-9_-]{3,16}$/, { always: true, message: 'validator.auth.l' })
	@IsNotEmpty({ message: 'validator.auth.a' })
	username!: string;

	@Matches(/^[a-zA-Z-ZñÑáéíóúÁÉÍÓÚ\s]+$/, { always: true, message: 'validator.auth.b' })
	@IsNotEmpty({ message: 'validator.auth.a' })
	firstname!: string;

	@Matches(/^[a-zA-Z-ZñÑáéíóúÁÉÍÓÚ\s]+$/, { always: true, message: 'validator.auth.c' })
	@IsNotEmpty({ message: 'validator.auth.a' })
	lastname!: string;

	@IsEmail({}, { message: 'validator.auth.d' })
	@IsNotEmpty({ message: 'validator.auth.a' })
	email!: string;

	@IsNotEmpty({ message: 'validator.auth.a' })
	telephone!: string;

	@IsNotEmpty({ message: 'validator.auth.a' })
	state!: string;

	@IsNotEmpty({ message: 'validator.auth.a' })
	address!: string;

	@Matches(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{5,}$/, { always: true, message: 'validator.auth.e' })
	@Length(8, 50, { message: 'validator.auth.f' })
	@IsNotEmpty({ message: 'validator.auth.a' })
	password!: string;

	@Matches(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{5,}$/, { always: true, message: 'validator.auth.e' })
	@Length(8, 50, { message: 'validator.auth.f' })
	@IsNotEmpty({ message: 'validator.auth.a' })
	password_confirm!: string;

	@IsNotEmpty({ message: 'validator.auth.a' })
	country!: string;

	ref!: string;

	freeSupport!: boolean;

	public validate(): string[] {
		const errors = super.validate();
		if (!this.equalsPassword) {
			errors.push('validator.auth.g');
		}
		if (this.country && !ids_countries.find(id => id === this.country)) {
			errors.push('validator.auth.g');
		}
		return Array.from(new Set(errors));
	}

	get equalsPassword(): boolean {
		return this.password === this.password_confirm;
	}
}

class PreregisterDto extends ClassBase {
	constructor() {
		super();
		this.firstname = '';
		this.lastname = '';
		this.email = '';
		this.telephone = '';
		this.state = '';
		this.address = '';
		this.country = '';
		this.ans_1 = '';
	}

	@Matches(/^[a-zA-Z-ZñÑáéíóúÁÉÍÓÚ\s]+$/, { always: true, message: 'validator.auth.b' })
	@IsNotEmpty({ message: 'validator.auth.a' })
	firstname!: string;

	@Matches(/^[a-zA-Z-ZñÑáéíóúÁÉÍÓÚ\s]+$/, { always: true, message: 'validator.auth.c' })
	@IsNotEmpty({ message: 'validator.auth.a' })
	lastname!: string;

	@IsEmail({}, { message: 'validator.auth.d' })
	@IsNotEmpty({ message: 'validator.auth.a' })
	email!: string;

	@IsNotEmpty({ message: 'validator.auth.a' })
	telephone!: string;

	@IsNotEmpty({ message: 'validator.auth.a' })
	state!: string;

	@IsNotEmpty({ message: 'validator.auth.a' })
	address!: string;

	@IsNotEmpty({ message: 'validator.auth.a' })
	country!: string;

	@IsNotEmpty({ message: 'validator.auth.a' })
	ans_1!: string;

	@IsNotEmpty({ message: 'validator.auth.a' })
	ans_2!: string;

	@IsNotEmpty({ message: 'validator.auth.a' })
	ans_3!: string;

	@IsNotEmpty({ message: 'validator.auth.a' })
	ans_4!: string;

	@IsNotEmpty({ message: 'validator.auth.a' })
	ans_5!: string;

	@IsNotEmpty({ message: 'validator.auth.a' })
	ans_6!: string;

	public validate(): string[] {
		const errors = super.validate();
		if (this.country && !ids_countries.find(id => id === this.country)) {
			errors.push('validator.auth.g');
		}
		return Array.from(new Set(errors));
	}
}

interface LoginDto {
	username: string;
	password: string;
}

interface UserChangePasswordDto {
	oldPassword: string;
	newPassword: string;
}

interface IRefer {
	id: string;
	name: string;
}

interface IMembership {
	id: string;
	name: string;
	description_es: string;
	description_en: string;
	money_a: number;
	money_b: number;
	months: number;
	interest: number;
	is_active: boolean;
}

interface ISuscription {
	id: string;
	userId: string;
	date_begin: number;
	date_end: number;
	membershipId: string;
}

interface IClient {
	id: string;
	name: string;
	email: string;
	balance: number;
	lastDeposit: number;
	has_withdrawal: boolean;
}

interface IRecord {
	date: string;
	balance: number;
	withdrawal: number;
	earning: number;
	investment: number;
}

interface IBalance {
	balance: number;
	earning: number;
	investment: number;
}

interface IDeposit {
	date: number;
	suscription: string;
	money: number;
	payment_method: string;
}

interface IWithdrawal {
	date: number;
	money: number;
	withdrawal_method: string;
	status: boolean;
}

interface IMove {
	date: number;
	type: 'deposit' | 'withdrawal';
	suscription: string;
	money: number;
	method: string;
	reference: string;
	status: boolean;
}

interface IBalanceDetail {
	date: number;
	available_balance: number;
	balance: number;
	earning: number;
	earning_extra: number;
	withdrawal: number;
	investment: number;
	suscriptions: {
		id: string;
		investment: number;
		date_begin: number;
		date_end: number;
		membershipId: string;
		reinvestment: boolean;
	}[];
	moves: IMove[];
}

export {
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
	IDeposit,
	IWithdrawal,
};
