import { IsNotEmpty, Matches, IsEmail, Length } from 'class-validator';
import { BaseDTO } from '@app/util/base.util';
import { User } from './td.entity';
import { UserRole, UserStatus } from './td.interface';

interface ISignupDto {
	username: string;
	firstname: string;
	lastname: string;
	telegram: string;
	email: string;
	password: string;
	country: string;
	ref: string;
	digital_trust: boolean;
	social_trading: boolean;
}

class SignupDto extends BaseDTO {
	constructor(data: ISignupDto) {
		super();
		this.username = data.username;
		this.firstname = data.firstname;
		this.lastname = data.lastname;
		this.telegram = data.telegram;
		this.email = data.email;
		this.password = data.password;
		this.country = data.country;
		this.ref = data.ref;
		this.digital_trust = data.digital_trust;
		this.social_trading = data.social_trading;
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

	@Matches(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{5,}$/, { always: true, message: 'validator.auth.e' })
	@Length(8, 50, { message: 'validator.auth.f' })
	@IsNotEmpty({ message: 'validator.auth.a' })
	password!: string;

	@IsNotEmpty({ message: 'validator.auth.a' })
	country!: string;

	ref!: string;

	telegram!: string;

	digital_trust!: boolean;

	social_trading!: boolean;
}

interface IClientDto extends ISignupDto {
	id?: string;
	course: string;
	course_price: string;
	payed: boolean;
}

class ClientDto extends SignupDto {
	constructor(data: IClientDto) {
		super(data);
		if (data.id) {
			this.id = data.id;
		}
		this.course = data.course;
		this.course_price = data.course_price;
		this.payed = data.payed;
	}

	id!: string;

	course!: string;

	course_price!: string;

	payed!: boolean;
}

class UserDto {
	constructor(data: User | UserDto) {
		this.id = data.id;
		this.username = data.username;
		this.email = data.email;
		this.firstname = data.firstname;
		this.lastname = data.lastname;
		this.telegram = data.telegram;
		this.change_password = data.change_password;
		this.id_time_zone = data instanceof User ? (data as User).id_time_zone : data.id_time_zone;
		this.role = data.role;
		this.status = data.status;
		this.lastLogin = data.lastLogin;
		this.country__id = data instanceof User ? data.country.id : data.country__id;
		this.created = data.created;
		this.digital_trust = data.digital_trust;
		this.social_trading = data.social_trading;
	}

	public id: string;
	public username: string;
	public email: string;
	public telephone: string;
	public lastname: string;
	public firstname: string;
	public telegram: string;
	public change_password: boolean;
	public id_time_zone: string;
	public role: UserRole;
	public status: UserStatus;
	public lastLogin: number;
	public seeWelcome: boolean;
	public country__id: string;
	public created: number;
	public digital_trust: boolean;
	public social_trading: boolean;
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
	telegram: string;
	password: string;
	country: string;
}

class UpdateDto extends BaseDTO {
	constructor(data: IUpdateDto) {
		super();
		this.firstname = data.firstname;
		this.lastname = data.lastname;
		this.username = data.username;
		this.email = data.email;
		this.telegram = data.telegram;
		this.password = data.password;
		this.country = data.country;
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

	@Matches(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{5,}$/, { always: true, message: 'validator.auth.e' })
	@Length(8, 50, { message: 'validator.auth.f' })
	@IsNotEmpty({ message: 'validator.auth.a' })
	password!: string;

	@IsNotEmpty({ message: 'validator.auth.a' })
	country!: string;

	telegram!: string;
}

interface IRefer {
	id: string;
	name: string;
}

interface IClient {
	id: string;
	name: string;
	email: string;
	course: string;
	created: number;
	next_payment: number;
	payed: boolean;
}

interface ISubscribeMail {
	id: string;
	email: string;
}

interface ISubscribeCourse {
	id: string;
	name: string;
	price: number;
	months: number;
	blog: boolean;
	telegram: string;
	payed: boolean;
	nextPayment: number;
}

class NoticeDto extends BaseDTO {
	constructor(data: NoticeDto) {
		super();
		this.id = data.id;
		this.title = data.title;
		this.courses = data.courses;
		this.description = data.description;
		this.url = data.url;
	}

	id!: string;

	@Matches(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9¿¡][a-zA-ZñÑáéíóúÁÉÍÓÚ0-9][a-zA-ZñÑáéíóúÁÉÍÓÚ0-9_\-,.¿?¡!\s]{3,70}$/, {
		always: true,
		message: 'validator.editor.b',
	})
	@IsNotEmpty({ message: 'validator.editor.a' })
	title!: string;

	courses!: string[];

	description!: string;
	url!: string;
}

class BlogDto extends BaseDTO {
	constructor(data: BlogDto) {
		super();
		this.id = data.id;
		this.title = data.title;
		this.courses = data.courses;
		this.description = data.description;
		this.content = data.content;
	}

	id!: string;

	@Matches(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9¿¡][a-zA-ZñÑáéíóúÁÉÍÓÚ0-9][a-zA-ZñÑáéíóúÁÉÍÓÚ0-9_\-,.¿?¡!\s]{3,70}$/, {
		always: true,
		message: 'validator.editor.b',
	})
	@IsNotEmpty({ message: 'validator.editor.a' })
	title!: string;

	courses!: string[];

	description!: string;
	content!: string;
}

interface I4GeeksCharge {
	amount: number;
	description: string;
	entity_description: string;
	currency: string;
	credit_card_number: number;
	credit_card_security_code_number: number;
	exp_month: number;
	exp_year: number;
}

export {
	SignupDto,
	UserDto,
	TokenDto,
	ClientDto,
	UpdateDto,
	NoticeDto,
	BlogDto,
	IRefer,
	IClient,
	ISubscribeMail,
	ISubscribeCourse,
	I4GeeksCharge,
};
