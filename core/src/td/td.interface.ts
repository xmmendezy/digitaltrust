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
	readonly seeWelcome?: boolean;
	readonly nextSupportPayment?: number;
	readonly country?: any;
	readonly id_time_zone?: string;
	readonly state?: string;
	readonly address?: string;
	readonly paypal_account?: string;
	readonly stripe_account?: string;
	readonly coinpayments_account?: string;
	readonly banck_name?: string;
	readonly banck_address?: string;
	readonly banck_account_name?: string;
	readonly banck_account?: string;
	readonly banck_routing_name?: string;
	readonly banck_account_username?: string;
	readonly banck_swift_code?: string;
	readonly banck_iban?: string;
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
	readonly description_es?: string;
	readonly description_en?: string;
	readonly is_active?: boolean;
}

interface ISuscription {
	readonly date?: number;
	readonly membershipId?: string;
	readonly userId?: string;
	readonly money?: number;
	readonly payment_method?: PaymentMethod;
	readonly reference?: string;
}

enum PaymentMethod {
	BALANCE = 'balance',
	BANKCHECK = 'bankcheck',
	PAYPAL = 'paypal',
	STRIPE = 'stripe',
	BLOCKCHAIN = 'blockchain',
	WIRE_TRANSFER = 'wire_transfer',
}

export { IUser, UserRole, UserStatus, ICountry, ITimeZone, IMembership, ISuscription, PaymentMethod };
