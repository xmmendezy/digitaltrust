import { IsNotEmpty, Matches, IsEmail, Length } from 'class-validator';
import { BaseDTO } from '@app/util/base.util';
import { User } from './td.entity';
import { UserRole, UserStatus, PaymentMethod } from './td.interface';

interface ISignupDto {
	username: string;
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
		this.username = data.username;
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

	@IsNotEmpty({ message: 'validator.auth.a' })
	country!: string;

	ref!: string;

	freeSupport!: boolean;
}

class UserDto {
	constructor(data: User | UserDto) {
		this.id = data.id;
		this.username = data.username;
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
		this.banck_swift_code = data.banck_swift_code;
		this.banck_iban = data.banck_iban;
		this.can_remove = data instanceof User ? !data.lastDeposit : data.can_remove;
	}

	public id: string;
	public username: string;
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
	public banck_swift_code: string;
	public banck_iban: string;
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
	username: string;
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
	banck_swift_code: string;
	banck_iban: string;
}

class UpdateDto extends BaseDTO {
	constructor(data: IUpdateDto) {
		super();
		this.firstname = data.firstname;
		this.lastname = data.lastname;
		this.username = data.username;
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
		this.banck_swift_code = data.banck_swift_code;
		this.banck_iban = data.banck_iban;
	}

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
}

interface IRefer {
	id: string;
	name: string;
}

interface IClient {
	id: string;
	name: string;
	email: string;
	lastDeposit: number;
}

interface SuscriptionDto {
	membershipId: string;
	suscriptionId: string;
	type: PaymentMethod;
	date: number;
	money: number;
	reference: string;
}

export { SignupDto, UserDto, TokenDto, UpdateDto, IRefer, IClient, SuscriptionDto };
