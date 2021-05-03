import { IsNotEmpty, Matches, IsEmail, Length } from 'class-validator';
import { BaseDTO } from '@app/util/base.util';
import { User } from './api.entity';
import { UserRole, UserStatus, PaymentMethod, WithdrawalMethod } from './api.interface';

interface ISignupDto {
	firstname: string;
	lastname: string;
	email: string;
	telephone: string;
	password: string;
	state: string;
	address: string;
	country: string;
	ref: string;
}

class SignupDto extends BaseDTO {
	constructor(data: ISignupDto) {
		super();
		this.firstname = data.firstname;
		this.lastname = data.lastname;
		this.email = data.email;
		this.telephone = data.telephone;
		this.password = data.password;
		this.state = data.state;
		this.address = data.address;
		this.country = data.country;
		this.ref = data.ref;
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

	@IsNotEmpty({ message: 'validator.auth.a' })
	country!: string;

	ref!: string;
}

class UserDto {
	constructor(data: User | UserDto) {
		this.id = data.id;
		this.email = data.email;
		this.telephone = data.telephone;
		this.firstname = data.firstname;
		this.lastname = data.lastname;
		this.change_password = data.change_password;
		this.id_time_zone = data instanceof User ? (data as User).id_time_zone : data.id_time_zone;
		this.role = data.role;
		this.status = data.status;
		this.lastLogin = data.lastLogin;
		this.country__id = data instanceof User ? data.country.id : data.country__id;
		this.created = data.created;
		this.state = data.state;
		this.address = data.address;
		this.paypal_account = data.paypal_account;
		this.stripe_account = data.stripe_account;
		this.coinpayments_account = data.coinpayments_account;
	}

	public id: string;
	public email: string;
	public telephone: string;
	public lastname: string;
	public firstname: string;
	public change_password: boolean;
	public id_time_zone: string;
	public role: UserRole;
	public status: UserStatus;
	public lastLogin: Date;
	public country__id: string;
	public created: Date;
	public state: string;
	public address: string;
	public paypal_account: string;
	public stripe_account: string;
	public coinpayments_account: string;
}

class TokenDto {
	constructor(data: { expiresIn?: number; accessToken?: string; user: UserDto }) {
		this.expiresIn = data.expiresIn;
		this.accessToken = data.accessToken;
		this.user = data.user;
	}

	public expiresIn: number;
	public accessToken: string;
	public user: UserDto;
}

interface IUpdateDto {
	firstname: string;
	lastname: string;
	email: string;
	telephone: string;
	state: string;
	address: string;
	password: string;
	country: string;
	paypal_account: string;
	stripe_account: string;
	coinpayments_account: string;
}

class UpdateDto extends BaseDTO {
	constructor(data: IUpdateDto) {
		super();
		this.firstname = data.firstname;
		this.lastname = data.lastname;
		this.email = data.email;
		this.telephone = data.telephone;
		this.password = data.password;
		this.state = data.state;
		this.address = data.address;
		this.country = data.country;
		this.paypal_account = data.paypal_account;
		this.stripe_account = data.stripe_account;
		this.coinpayments_account = data.coinpayments_account;
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

	@IsNotEmpty({ message: 'validator.auth.a' })
	country!: string;

	@IsNotEmpty({ message: 'validator.auth.a' })
	paypal_account!: string;

	@IsNotEmpty({ message: 'validator.auth.a' })
	stripe_account!: string;

	@IsNotEmpty({ message: 'validator.auth.a' })
	coinpayments_account!: string;
}

interface IRefer {
	id: string;
	name: string;
}

interface IClient {
	id: string;
	name: string;
	email: string;
	balance: number;
	last_deposit: string;
	has_message: boolean;
}

interface RecordDto {
	date: string;
	balance: number;
	earning: number;
	earning_extra: number;
	withdrawal: number;
	investment: number;
}

interface IBalance {
	balance: number;
	earning: number;
	withdrawal: number;
	investment: number;
}

interface IDeposit {
	date: number;
	suscription: string;
	money: number;
	payment_method: PaymentMethod;
}

interface IWithdrawal {
	date: number;
	money: number;
	withdrawal_method: WithdrawalMethod;
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
	}[];
	deposits: IDeposit[];
	withdrawals: IWithdrawal[];
}

export { SignupDto, UserDto, TokenDto, UpdateDto, IRefer, IClient, RecordDto, IBalance, IBalanceDetail };
