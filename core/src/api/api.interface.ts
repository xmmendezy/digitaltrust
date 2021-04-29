enum UserRole {
	ADMIN = 'admin',
	USER = 'user',
}

enum UserStatus {
	REMOVED = 'removed',
	PENDING = 'pending',
	CONFIRM = 'confirm',
}

interface IUser {
	readonly id?: string;
	readonly email?: string;
	readonly telephone?: string;
	readonly password?: string;
	readonly change_password?: boolean;
	readonly firstname?: string;
	readonly lastname?: string;
	readonly role?: UserRole;
	readonly status?: UserStatus;
	readonly lastLogin?: Date;
	readonly lastChangePassword?: Date;
	readonly country?: any;
	readonly id_time_zone?: string;
	readonly state?: string;
	readonly address?: string;
	readonly paypal_account?: string;
	readonly stripe_account?: string;
	readonly coinpayments_account?: string;
	readonly ref?: string;
}

interface ITimeZone {
	readonly id?: string;
	readonly value?: string;
}

interface ICountry {
	readonly id?: string;
	readonly name?: string;
	readonly code?: string;
	readonly telephone_code?: string;
	readonly time_zones?: ITimeZone[];
}

interface IMembership {
	readonly id?: string;
	readonly name?: string;
	readonly money?: number;
	readonly months?: number;
	readonly interest?: number;
}

export { IUser, UserRole, UserStatus, ICountry, ITimeZone, IMembership };
