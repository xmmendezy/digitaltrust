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
	banck_account: string;
	created: string | Date;
}

class UpdateDto extends ClassBase {
	constructor(data?: IUser) {
		super();
		if (data) {
			this.data = data;
			this.firstname = data.firstname;
			this.lastname = data.lastname;
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
			this.banck_account = data.banck_account;
		} else {
			this.firstname = '';
			this.lastname = '';
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
			this.banck_account = '';
		}
	}

	data!: IUser;

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

	@IsNotEmpty({ message: 'validator.auth.a' })
	paypal_account!: string;

	@IsNotEmpty({ message: 'validator.auth.a' })
	stripe_account!: string;

	@IsNotEmpty({ message: 'validator.auth.a' })
	coinpayments_account!: string;

	banck_account!: string;

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

interface LoginDto {
	email: string;
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
	money_a: number;
	money_b: number;
	months: number;
	interest: number;
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
	}[];
	deposits: IDeposit[];
	withdrawals: IWithdrawal[];
}

export {
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
};
