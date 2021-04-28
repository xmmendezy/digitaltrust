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
	country__id: string;
	country: ICountry;
	data: {} | any;
	created: string | Date;
}

interface IUpdateUser {
	id?: string;
	email?: string;
	telephone?: string;
	lastname?: string;
	firstname?: string;
	change_password?: boolean;
	id_time_zone?: string;
	is_admin?: boolean;
	role?: 'admin' | 'user';
	status?: 'removed' | 'pending' | 'confirm';
	lastLogin?: Date;
	country__id?: string;
	country?: ICountry;
	data?: {} | any;
	created?: string | Date;
}

interface IUpdateUserData {
	firstname?: string;
	lastname?: string;
	id_time_zone?: string;
	data?: object;
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

export { IAuthData, IUser, IUpdateUser, IUpdateUserData, SignupDto, LoginDto, UserChangePasswordDto };
