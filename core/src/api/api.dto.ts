import { IsNotEmpty, Matches, IsEmail, Length } from 'class-validator';
import { BaseDTO } from '@app/util/base.util';
import { User } from './api.entity';
import { UserRole, UserStatus } from './api.interface';

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
		this.country__id =
			data instanceof User
				? (data as User).country
					? (data as User).country.id
					: ''
				: (data as UserDto).country__id;
		this.data = data.data;
		this.created = data.created;
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
	public data: object;
	public created: Date;
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

export { SignupDto, UserDto, TokenDto };
