import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import bcrypt from 'bcryptjs';

import { BaseEntityTD, DateTimeFunc, DateTimeOptions, DateObject } from '@app/util/base.util';
import { IUser, UserRole, UserStatus } from '../td.interface';
import { Country } from './country.entity';
import { Course } from './course.entity';
import { Invoice } from './invoice.entity';
import { TimeZone } from './time_zone.entity';
import { HLogin, HQuery } from './history.entity';
import { DateTime } from 'luxon';

@Entity({
	name: 'td_user',
})
export class User extends BaseEntityTD implements IUser {
	constructor(data: IUser) {
		super();
		if (data) {
			this.id = data.id;
			this.username = data.username;
			this.email = data.email;
			this.password = data.password;
			this.change_password = data.change_password;
			this.lastname = data.lastname;
			this.firstname = data.firstname;
			this.role = data.role;
			this.status = data.status;
			this.lastLogin = data.lastLogin;
			this.lastChangePassword = data.lastChangePassword;
			this.country = data.country as Country;
			if (data.id_time_zone) {
				this.id_time_zone = data.id_time_zone;
			} else {
				this.id_time_zone = this.country.time_zones[0].id;
			}
			this.country.id_time_zone = this.id_time_zone;
			this.ref = data.ref;
		}
	}

	@Column({
		nullable: true,
		unique: true,
	})
	public username: string;

	@Column({
		nullable: true,
		unique: true,
	})
	public email: string;

	@Column({
		nullable: false,
	})
	public password: string;

	@Column({
		default: false,
	})
	public change_password: boolean;

	@Column({
		nullable: false,
	})
	public firstname: string;

	@Column({
		nullable: false,
	})
	public lastname: string;

	@Column({
		type: 'enum',
		enum: UserRole,
		default: UserRole.USER,
	})
	public role: UserRole;

	@Column({
		type: 'enum',
		enum: UserStatus,
		default: UserStatus.PENDING,
	})
	public status: UserStatus;

	@Column({
		type: 'float8',
		nullable: true,
	})
	public lastLogin: number;

	@Column({
		type: 'float8',
		nullable: true,
	})
	public lastQuery: number;

	@Column({
		type: 'float8',
		nullable: true,
	})
	public nextPayment: number;

	@Column({
		type: 'float8',
		nullable: true,
	})
	public lastChangePassword: number;

	@OneToMany(() => HLogin, (h_login) => h_login.user)
	public h_login: HLogin[];

	@OneToMany(() => HQuery, (h_query) => h_query.user)
	public h_query: HQuery[];

	@ManyToOne(() => Country, (country) => country.users)
	public country: Country;

	@ManyToOne(() => Course, (course) => course.users)
	public course: Course;

	@OneToMany(() => Invoice, (invoices) => invoices.user)
	public invoices: Invoice[];

	@Column({
		default: '',
	})
	public id_time_zone: string;

	@Column({
		default: '',
	})
	public ref: string;

	get name(): string {
		if (this.firstname && this.lastname) {
			return `${this.firstname} ${this.lastname}`;
		} else if (this.lastname) {
			return this.lastname;
		} else if (this.firstname) {
			return this.firstname;
		}
		return '';
	}

	get DateTime(): DateTimeFunc {
		return {
			utc: () => DateTime.utc().setLocale(this.country.locale),
			now: () => DateTime.now().setLocale(this.country.locale).setZone(this.time_zone.value),
			local: (
				year?: number,
				month?: number,
				day?: number,
				hour?: number,
				minute?: number,
				second?: number,
				millisecond?: number,
			) =>
				DateTime.local(year, month, day, hour, minute, second, millisecond)
					.setLocale(this.country.locale)
					.setZone(this.time_zone.value),
			fromISO: (text: string, options?: DateTimeOptions) =>
				DateTime.fromISO(text, options).setLocale(this.country.locale).setZone(this.time_zone.value),
			fromUnix: (seconds: number, options?: DateTimeOptions) =>
				DateTime.fromSeconds(seconds, options).setLocale(this.country.locale).setZone(this.time_zone.value),
			fromDate: (date: Date, options?: DateTimeOptions) =>
				DateTime.fromJSDate(date, options).setLocale(this.country.locale).setZone(this.time_zone.value),
			fromFormat: (text: string, format: string, options?: DateTimeOptions) =>
				DateTime.fromFormat(text, format, options).setLocale(this.country.locale).setZone(this.time_zone.value),
			fromObject: (obj: DateObject) =>
				DateTime.fromObject(obj).setLocale(this.country.locale).setZone(this.time_zone.value),
			clone: (datetime: DateTime) =>
				DateTime.fromISO(datetime.toISO()).setLocale(this.country.locale).setZone(this.time_zone.value),
		};
	}

	get time_zone(): TimeZone {
		this.country.id_time_zone = this.id_time_zone;
		return this.country.time_zone;
	}

	public async save(): Promise<this> {
		if (this.id) {
			if (this.email) {
				if (
					await User.createQueryBuilder()
						.where('email = :email', { email: this.email })
						.andWhere('id != :id', { id: this.id })
						.getCount()
				) {
					this.errors.push('u16');
				}
			}
		}
		return super.save();
	}

	static async hash_password(password: string) {
		return await bcrypt.hash(password, 10);
	}

	static async compare_hash_password(password_1: string, password_2: string) {
		return await bcrypt.compare(password_1, password_2);
	}

	public async set_password(password: string) {
		this.password = await User.hash_password(password);
		this.lastChangePassword = this.DateTime.utc().toSeconds();
	}

	public async compare_password(password: string): Promise<boolean> {
		const isValid = await User.compare_hash_password(password, this.password);
		if (!isValid) {
			this.errors = ['u23'];
		}
		return isValid;
	}

	public async time_login() {
		this.lastLogin = this.DateTime.utc().toSeconds();
		await HLogin.createQueryBuilder()
			.insert()
			.values([
				{
					user: this,
					date: this.lastLogin,
				},
			])
			.execute();
	}

	public async time_query() {
		this.lastQuery = this.DateTime.utc().toSeconds();
		await HQuery.createQueryBuilder()
			.insert()
			.values([
				{
					user: this,
					date: this.lastQuery,
				},
			])
			.execute();
	}
}
