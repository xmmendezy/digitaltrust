import { ICountry } from '../util.module/util.type';

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

interface SignupDto {
	email: string;
	telephone: string;
	password: string;
	country: string;
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
