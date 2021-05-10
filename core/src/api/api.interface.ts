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
	readonly firstDeposit?: number;
	readonly lastDeposit?: number;
	readonly nextSupportPayment?: number;
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
	readonly money_a?: number;
	readonly money_b?: number;
	readonly months?: number;
	readonly interest?: number;
}

interface ISuscription {
	readonly userId?: string;
	readonly date_begin?: number;
	readonly date_end?: number;
	readonly membershipId?: string;
}

enum PaymentMethod {
	BALANCE = 'balance',
	PAYPAL = 'paypal',
	STRIPE = 'stripe',
	BLOCKCHAIN = 'blockchain',
}

enum WithdrawalMethod {
	INVESTMENT = 'investment',
	PAYPAL = 'paypal',
	STRIPE = 'stripe',
	BLOCKCHAIN = 'blockchain',
	BANKCHECK = 'bankcheck',
}

interface IDeposit {
	readonly date?: number;
	readonly suscriptionId?: string;
	readonly money?: number;
	readonly payment_method?: PaymentMethod;
	readonly reference?: string;
}

interface IWithdrawal {
	readonly date?: number;
	readonly userId?: string;
	readonly money?: number;
	readonly withdrawal_method?: WithdrawalMethod;
	readonly status?: boolean;
}

interface ISupportPayment {
	readonly date?: number;
	readonly userId?: string;
	readonly money?: number;
	readonly payment_method?: PaymentMethod;
	readonly reference?: string;
}

interface IRecord {
	userId?: string;
	date?: number;
	balance?: number;
	withdrawal?: number;
	earning?: number;
	earning_extra?: number;
	investment?: number;
}

export {
	IUser,
	UserRole,
	UserStatus,
	ICountry,
	ITimeZone,
	IMembership,
	ISuscription,
	IDeposit,
	IWithdrawal,
	ISupportPayment,
	PaymentMethod,
	WithdrawalMethod,
	IRecord,
};
