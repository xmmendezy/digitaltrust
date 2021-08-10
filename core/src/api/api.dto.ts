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
	freeSupport: boolean;
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
		this.freeSupport = data.freeSupport;
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

	freeSupport!: boolean;
}

interface IPreregisterDto {
	firstname: string;
	lastname: string;
	email: string;
	telephone: string;
	state: string;
	address: string;
	country: string;
	ans_1: string;
	ans_2: string;
	ans_3: string;
	ans_4: string;
	ans_5: string;
	ans_6: string;
}

class PreregisterDto extends BaseDTO {
	constructor(data: IPreregisterDto) {
		super();
		this.firstname = data.firstname;
		this.lastname = data.lastname;
		this.email = data.email;
		this.telephone = data.telephone;
		this.state = data.state;
		this.address = data.address;
		this.country = data.country;
		this.ans_1 = data.ans_1;
		this.ans_2 = data.ans_2;
		this.ans_3 = data.ans_3;
		this.ans_4 = data.ans_4;
		this.ans_5 = data.ans_5;
		this.ans_6 = data.ans_6;
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
		this.seeWelcome = data.seeWelcome;
		this.nextSupportPayment = data.nextSupportPayment;
		this.country__id = data instanceof User ? data.country.id : data.country__id;
		this.created = data.created;
		this.state = data.state;
		this.address = data.address;
		this.paypal_account = data.paypal_account;
		this.stripe_account = data.stripe_account;
		this.coinpayments_account = data.coinpayments_account;
		this.banck_name = data.banck_name;
		this.banck_address = data.banck_address;
		this.banck_account_name = data.banck_account_name;
		this.banck_account = data.banck_account;
		this.banck_routing_name = data.banck_routing_name;
		this.banck_account_username = data.banck_account_username;
		this.can_remove = data instanceof User ? !data.lastDeposit : data.can_remove;
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
	public seeWelcome: boolean;
	public nextSupportPayment: number;
	public country__id: string;
	public created: Date;
	public state: string;
	public address: string;
	public paypal_account: string;
	public stripe_account: string;
	public coinpayments_account: string;
	public banck_name: string;
	public banck_address: string;
	public banck_account_name: string;
	public banck_account: string;
	public banck_routing_name: string;
	public banck_account_username: string;
	public can_remove: boolean;
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
	banck_name: string;
	banck_address: string;
	banck_account_name: string;
	banck_account: string;
	banck_routing_name: string;
	banck_account_username: string;
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
		this.banck_name = data.banck_name;
		this.banck_address = data.banck_address;
		this.banck_account_name = data.banck_account_name;
		this.banck_account = data.banck_account;
		this.banck_routing_name = data.banck_routing_name;
		this.banck_account_username = data.banck_account_username;
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

	banck_name!: string;
	banck_address!: string;
	banck_account_name!: string;
	banck_account!: string;
	banck_routing_name!: string;
	banck_account_username!: string;
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
	lastDeposit: number;
	has_withdrawal: boolean;
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
	reference: string;
}

interface IWithdrawal {
	date: number;
	money: number;
	withdrawal_method: WithdrawalMethod;
	status: boolean;
}

interface IMove {
	type: 'deposit' | 'withdrawal';
	date: number;
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
	}[];
	moves: IMove[];
}

interface DepositDto {
	id?: string;
	membershipId: string;
	suscriptionId: string;
	type: PaymentMethod;
	money: number;
	date?: number;
	reference: string;
}

interface WithdrawalDto {
	id: string;
	type: WithdrawalMethod;
	money: number;
	date?: number;
}

interface SupportPaymentDto {
	userId?: string;
	type: PaymentMethod;
	money: number;
	date?: number;
	reference: string;
}

export {
	SignupDto,
	PreregisterDto,
	UserDto,
	TokenDto,
	UpdateDto,
	IRefer,
	IClient,
	RecordDto,
	IBalance,
	IBalanceDetail,
	DepositDto,
	WithdrawalDto,
	SupportPaymentDto,
};
