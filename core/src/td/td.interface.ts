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
	readonly username?: string;
	readonly email?: string;
	readonly password?: string;
	readonly change_password?: boolean;
	readonly firstname?: string;
	readonly lastname?: string;
	readonly telegram?: string;
	readonly role?: UserRole;
	readonly status?: UserStatus;
	readonly lastLogin?: number;
	readonly lastChangePassword?: number;
	readonly country?: any;
	readonly id_time_zone?: string;
	readonly ref?: string;
	readonly digital_trust?: boolean;
	readonly social_trading?: boolean;
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

interface ICourse {
	readonly id?: string;
	readonly name?: string;
	readonly price?: number;
	readonly months?: number;
	readonly blog?: boolean;
	readonly is_active?: boolean;
}

interface IInvoice {
	readonly payment_method?: 'paypal' | 'coinbase' | '4geeks';
	readonly payed?: boolean;
	readonly reference?: string;
	readonly course: ICourse;
	readonly user: IUser;
}

interface INotice {
	title: string;
	courses: ICourse[];
	description: string;
	url: string;
}

interface IBlog {
	title: string;
	courses: ICourse[];
	description: string;
	content: string;
}

interface IMessage {
	user: IUser;
	own: boolean;
	content: string;
}

export { IUser, UserRole, UserStatus, ICountry, ITimeZone, ICourse, IInvoice, INotice, IBlog, IMessage };
