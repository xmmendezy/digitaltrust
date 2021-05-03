import { Injectable } from '@nestjs/common';
import { Error } from '@app/util/base.util';
import { User, Country, Membership, Record, Suscription, Deposit, Withdrawal } from './api.entity';
import {
	SignupDto,
	UserDto,
	TokenDto,
	UpdateDto,
	IRefer,
	IClient,
	IBalance,
	IBalanceDetail,
	RecordDto,
} from './api.dto';
import { Decimal } from 'decimal.js';
import { DateTime } from 'luxon';

import jwt from 'jsonwebtoken';
import config from '@config';
import { IRecord } from './api.interface';

@Injectable()
export class ApiService {
	public async signup(data: SignupDto): Promise<TokenDto | Error> {
		const country = await Country.createQueryBuilder('country')
			.leftJoinAndSelect('country.time_zones', 'time_zones')
			.where('country.id = :id', { id: data.country })
			.getOne();
		if (!country) {
			return { error: 'validator.auth.i' };
		}
		const user = new User({ ...data, country });
		if (
			await User.createQueryBuilder('user')
				.where('user.telephone = :telephone', { telephone: user.telephone })
				.getCount()
		) {
			return { error: 'validator.auth.j' };
		}
		if (await User.createQueryBuilder('user').where('user.email = :email', { email: user.email }).getCount()) {
			return { error: 'validator.auth.k' };
		}
		await user.set_password(user.password);
		await user.save();
		if (user.errors.length) {
			return { error: user.errors[0] };
		}
		await user.time_login();
		await user.time_query();
		await user.save();
		return await this.createToken(user);
	}

	public async createToken(user: User | UserDto): Promise<TokenDto> {
		const expiresIn = config.jwt_expiration;
		const secretOrKey = config.secret_key;
		user = new UserDto(user);
		const user_data = JSON.parse(JSON.stringify(user));
		const accessToken = jwt.sign(user_data, secretOrKey, { expiresIn });
		return new TokenDto({
			expiresIn,
			accessToken,
			user,
		});
	}

	public async update(user: User, data: UpdateDto): Promise<UserDto | Error> {
		if (data.country != user.country.id) {
			const country = await Country.createQueryBuilder('country')
				.leftJoinAndSelect('country.time_zones', 'time_zones')
				.where('country.id = :id', { id: data.country })
				.getOne();
			if (country) {
				user.country = country;
			} else {
				return { error: 'validator.auth.i' };
			}
		}
		const keys = [
			'firstname',
			'lastname',
			'state',
			'address',
			'paypal_account',
			'stripe_account',
			'coinpayments_account',
		];
		const errors: string[] = [];
		for (const key in data) {
			if (Object.prototype.hasOwnProperty.call(data, key) && keys.find((k) => k === key)) {
				user[key] = data[key];
			}
		}
		if (data.password !== 'Secret00__') {
			user.set_password(data.password);
		}
		if (
			await User.createQueryBuilder('user')
				.where('user.telephone = :telephone', { telephone: user.telephone })
				.andWhere('user.id != :id', { id: user.id })
				.getCount()
		) {
			errors.push('validator.auth.j');
		} else {
			user.telephone = data.telephone;
		}
		if (
			await User.createQueryBuilder('user')
				.where('user.email = :email', { email: user.email })
				.andWhere('user.id != :id', { id: user.id })
				.getCount()
		) {
			errors.push('validator.auth.k');
		} else {
			user.email = data.email;
		}
		await user.save();
		if (user.errors.length) {
			return { error: user.errors[0] };
		}
		return { ...new UserDto(user), errors } as UserDto;
	}

	public async ref_user(id: string): Promise<IRefer> {
		const user = await User.findOne(id);
		if (user) {
			return { id: user.id, name: user.name };
		} else {
			return { id: '', name: '' };
		}
	}

	public async is_refer(user: User): Promise<IRefer[]> {
		return (await User.createQueryBuilder('user').where('user.ref = :id', { id: user.id }).getMany()).map((u) => {
			return { id: u.id, name: u.name };
		});
	}

	public async memberships(): Promise<Membership[]> {
		return await Membership.createQueryBuilder()
			.where('is_active = :is_active', { is_active: true })
			.orderBy('money', 'ASC')
			.getMany();
	}

	public async suscriptions(user: User): Promise<Suscription[]> {
		return await Suscription.createQueryBuilder().where('"userId" = :id', { id: user.id }).getMany();
	}

	public async clients(): Promise<IClient[]> {
		const clients: IClient[] = [];
		for (const user of await User.createQueryBuilder('user')
			.leftJoinAndSelect('user.country', 'country')
			.leftJoinAndSelect('country.time_zones', 'time_zones')
			.where('user.role = :role', { role: 'user' })
			.getMany()) {
			clients.push({
				id: user.id,
				name: user.name,
				email: user.email,
				balance: (
					await this.record(
						user,
						user.DateTime.now().startOf('month'),
						user.DateTime.now().minus({ days: 1 }),
					)
				).balance,
				last_deposit: new Date().toISOString(),
				has_message: false,
			});
		}
		return clients;
	}

	public async client(id: string): Promise<UserDto> {
		return new UserDto(
			await User.createQueryBuilder('user')
				.leftJoinAndSelect('user.country', 'country')
				.where('user.id = :id', { id })
				.getOne(),
		);
	}

	public async update_client(id: string, data: UpdateDto): Promise<UserDto | Error> {
		const user = await User.findOne(id);
		if (!user) {
			return { error: 'login.error.u1' };
		}
		if (data.country != user.country.id) {
			const country = await Country.createQueryBuilder('country')
				.leftJoinAndSelect('country.time_zones', 'time_zones')
				.where('country.id = :id', { id: data.country })
				.getOne();
			if (country) {
				user.country = country;
			} else {
				return { error: 'validator.auth.i' };
			}
		}
		const keys = [
			'firstname',
			'lastname',
			'state',
			'address',
			'paypal_account',
			'stripe_account',
			'coinpayments_account',
		];
		const errors: string[] = [];
		for (const key in data) {
			if (Object.prototype.hasOwnProperty.call(data, key) && keys.find((k) => k === key)) {
				user[key] = data[key];
			}
		}
		if (data.password !== 'Secret00__') {
			user.set_password(data.password);
		}
		if (
			await User.createQueryBuilder('user')
				.where('user.telephone = :telephone', { telephone: user.telephone })
				.andWhere('user.id != :id', { id: user.id })
				.getCount()
		) {
			errors.push('validator.auth.j');
		} else {
			user.telephone = data.telephone;
		}
		if (
			await User.createQueryBuilder('user')
				.where('user.email = :email', { email: user.email })
				.andWhere('user.id != :id', { id: user.id })
				.getCount()
		) {
			errors.push('validator.auth.k');
		} else {
			user.email = data.email;
		}
		await user.save();
		if (user.errors.length) {
			return { error: user.errors[0] };
		}
		return { ...new UserDto(user), errors } as UserDto;
	}

	public async records(user: User): Promise<RecordDto[]> {
		const suscriptions = await Suscription.createQueryBuilder().where('"userId" = :id', { id: user.id }).getMany();
		if (suscriptions.length) {
			const records: Record[] = [];
			const record = (await this.record(
				user,
				user.DateTime.now().startOf('month'),
				user.DateTime.now().minus({ days: 1 }),
				suscriptions,
				await Membership.createQueryBuilder()
					.where('id in (:...ids)', { ids: suscriptions.map((s) => s.membershipId) })
					.getMany(),
			)) as Record;
			if (record) {
				record.date = user.DateTime.now().startOf('month').toSeconds();
				records.push(record);
			}
			const months = user.DateTime.now()
				.startOf('month')
				.diff(user.DateTime.fromDate(user.created).startOf('month'), 'months').months;
			if (months) {
				const month_i = user.DateTime.now().minus({ months: 1 });
				records.push(
					...(await Record.createQueryBuilder()
						.where('"userId" = :id')
						.andWhere('date in (:...dates)')
						.setParameters({
							id: user.id,
							dates: [...Array(Math.ceil(months))].map((_, i) => {
								return month_i.minus({ months: i }).startOf('month').toSeconds();
							}),
						})
						.orderBy('date', 'DESC')
						.getMany()),
				);
			}

			return records.map((r: Record) => {
				return {
					date: user.DateTime.fromUnix(r.date).toFormat('yyyy-LL'),
					balance: r.balance,
					withdrawal: r.withdrawal,
					earning: r.earning,
					earning_extra: r.earning_extra,
					investment: r.investment,
				};
			});
		} else {
			return [];
		}
	}

	public async balance(user: User): Promise<IBalance> {
		const balance: IBalance = {
			balance: 0,
			withdrawal: 0,
			earning: 0,
			investment: 0,
		};
		const suscriptions = await Suscription.createQueryBuilder().where('"userId" = :id', { id: user.id }).getMany();
		if (suscriptions.length) {
			const memberships = await Membership.createQueryBuilder()
				.where('id in (:...ids)', { ids: suscriptions.map((s) => s.membershipId) })
				.getMany();
			return (await this.record(
				user,
				user.DateTime.now().startOf('month'),
				user.DateTime.now().minus({ days: 1 }),
				suscriptions,
				memberships,
			)) as IBalance;
		}
		return balance;
	}

	public async balance_detail(user: User, date: DateTime) {
		const balance: IBalanceDetail = {
			date: date.toSeconds(),
			available_balance: 0,
			balance: 0,
			withdrawal: 0,
			earning: 0,
			earning_extra: 0,
			investment: 0,
			suscriptions: [],
			deposits: [],
			withdrawals: [],
		};
		const suscriptions = await Suscription.createQueryBuilder().where('"userId" = :id', { id: user.id }).getMany();
		if (suscriptions.length) {
			const memberships = await Membership.createQueryBuilder()
				.where('id in (:...ids)', { ids: suscriptions.map((s) => s.membershipId) })
				.getMany();

			const record = await this.record(
				user,
				date.startOf('month'),
				user.DateTime.now().startOf('month').valueOf() === date.startOf('month').valueOf()
					? user.DateTime.now().minus({ days: 1 })
					: date.endOf('month'),
				suscriptions,
				memberships,
			);
			balance.balance = record.balance;
			balance.withdrawal = record.withdrawal;
			balance.earning = record.earning;
			balance.earning_extra = record.earning_extra;
			balance.investment = record.investment;
			if (user.DateTime.now().startOf('month').valueOf() === date.startOf('month').valueOf()) {
				const last_record = await this.record(
					user,
					date.startOf('month').minus({ months: 1 }),
					date.endOf('month').minus({ months: 1 }),
					suscriptions,
					memberships,
				);
				balance.available_balance = last_record.balance;
			}
			for (const suscription of suscriptions) {
				balance.suscriptions.push({
					id: suscription.id,
					investment: (
						await Deposit.createQueryBuilder()
							.where('"suscriptionId" = :id')
							.setParameters({
								id: suscription.id,
							})
							.getMany()
					).reduce((a, b) => new Decimal(b.money).plus(a).toNumber(), 0),
					date_begin: suscription.date_begin,
					date_end: suscription.date_end,
				});
			}

			balance.deposits = (
				await Deposit.createQueryBuilder()
					.where('"suscriptionId" in (:...ids)')
					.andWhere('date >= :date_begin')
					.andWhere('date <= :date_end')
					.setParameters({
						ids: suscriptions.map((s) => s.id),
						date_begin: date.startOf('month').toSeconds(),
						date_end: date.endOf('month').toSeconds(),
					})
					.orderBy('"suscriptionId"', 'ASC')
					.getMany()
			).map((d) => {
				return {
					date: d.date,
					suscription: d.suscriptionId,
					money: d.money,
					payment_method: d.payment_method,
				};
			});
			balance.withdrawals = (
				await Withdrawal.createQueryBuilder()
					.where('"userId" = :id')
					.andWhere('date >= :date_begin')
					.andWhere('date <= :date_end')
					.setParameters({
						id: user.id,
						date_begin: date.startOf('month').toSeconds(),
						date_end: date.endOf('month').toSeconds(),
					})
					.getMany()
			).map((d) => {
				return {
					date: d.date,
					money: d.money,
					withdrawal_method: d.withdrawal_method,
				};
			});
		}
		return balance;
	}

	public async record(
		user: User,
		date_begin: DateTime,
		date_end: DateTime,
		suscriptions: Suscription[] = [],
		memberships: Membership[] = [],
		save: boolean = false,
	): Promise<IRecord> {
		const irecord: IRecord = {
			balance: 0,
			withdrawal: 0,
			earning: 0,
			earning_extra: 0,
			investment: 0,
		};
		if (
			date_begin.toSeconds() >= date_end.toSeconds() &&
			date_begin.startOf('month').toSeconds() !== user.DateTime.now().startOf('month').toSeconds()
		) {
			return irecord;
		}
		if (date_begin.toSeconds() < user.DateTime.fromDate(user.created).toSeconds()) {
			date_begin = user.DateTime.fromDate(user.created);
		}
		if (!suscriptions.length) {
			suscriptions = await Suscription.createQueryBuilder().where('"userId" = :id', { id: user.id }).getMany();
		}
		if (suscriptions.length) {
			const days = date_end.day - date_begin.day + 1;
			const daysInMonth = date_end.daysInMonth;
			if (!memberships.length) {
				memberships = await Membership.createQueryBuilder()
					.where('id in (:...ids)', { ids: suscriptions.map((s) => s.membershipId) })
					.getMany();
			}
			for (const suscription of suscriptions) {
				const deposits: Deposit[] = [];
				if (
					user.DateTime.fromUnix(suscription.date_begin).startOf('month').toSeconds() <=
						date_begin.startOf('month').toSeconds() &&
					user.DateTime.fromUnix(suscription.date_end).startOf('month').toSeconds() >=
						date_end.startOf('month').toSeconds()
				) {
					deposits.push(
						...(await Deposit.createQueryBuilder()
							.where('"suscriptionId" = :id')
							.andWhere('date >= :date_begin')
							.andWhere('date <= :date_end')
							.setParameters({
								id: suscription.id,
								date_begin:
									date_begin.toSeconds() > suscription.date_begin
										? date_begin.toSeconds()
										: suscription.date_begin,
								date_end:
									suscription.date_end > date_end.toSeconds()
										? date_end.toSeconds()
										: suscription.date_end,
							})
							.getMany()),
					);
					if (date_begin.toSeconds() > suscription.date_begin) {
						deposits.push(
							...(await Deposit.createQueryBuilder()
								.where('"suscriptionId" = :id')
								.andWhere('date < :date_begin')
								.setParameters({
									id: suscription.id,
									date_begin: date_begin.toSeconds(),
								})
								.getMany()),
						);
					}
				}
				if (deposits.length) {
					const membership = memberships.find((m) => m.id === suscription.membershipId);
					for (const deposit of deposits) {
						if (deposit.date < date_begin.toSeconds()) {
							if (days === daysInMonth) {
								irecord.earning = new Decimal(irecord.earning)
									.plus(new Decimal(deposit.money).times(membership.interest))
									.toNumber();
							} else {
								irecord.earning = new Decimal(irecord.earning)
									.plus(
										new Decimal(deposit.money)
											.times(membership.interest)
											.times(days)
											.div(daysInMonth),
									)
									.toNumber();
							}
						} else {
							const dayDeposit = daysInMonth - user.DateTime.fromUnix(deposit.date).day + 1;
							if (dayDeposit === daysInMonth) {
								irecord.earning = new Decimal(irecord.earning)
									.plus(new Decimal(deposit.money).times(membership.interest))
									.toNumber();
							} else {
								irecord.earning = new Decimal(irecord.earning)
									.plus(
										new Decimal(deposit.money)
											.times(membership.interest)
											.times(dayDeposit)
											.div(daysInMonth),
									)
									.toNumber();
							}
						}
						irecord.investment = new Decimal(irecord.investment).plus(deposit.money).toNumber();
					}
				}
			}
			for (const user_ref of await User.createQueryBuilder('user')
				.where('user.ref = :id', { id: user.id })
				.getMany()) {
				for (const suscription of await Suscription.createQueryBuilder()
					.where('"userId" = :id')
					.andWhere('date_begin >= :date_i')
					.andWhere('date_begin <= :date_o')
					.setParameters({ id: user_ref.id, date_i: date_begin.toSeconds(), date_o: date_end.toSeconds() })
					.getMany()) {
					let i = 0;
					let interest = 0.07;
					for (const deposit of await Deposit.createQueryBuilder()
						.where('"suscriptionId" = :id')
						.andWhere('date >= :date_i')
						.andWhere('date <= :date_o')
						.setParameters({
							id: suscription.id,
							date_i: date_begin.toSeconds(),
							date_o: date_end.toSeconds(),
						})
						.getMany()) {
						irecord.earning_extra = new Decimal(irecord.earning_extra)
							.plus(new Decimal(deposit.money).times(interest))
							.toNumber();
						if (!i) {
							i = 1;
							interest = 0.03;
						}
					}
				}
				for (const suscription of await Suscription.createQueryBuilder()
					.where('"userId" = :id')
					.andWhere('date_begin < :date_i')
					.setParameters({ id: user_ref.id, date_i: date_begin.toSeconds() })
					.getMany()) {
					for (const deposit of await Deposit.createQueryBuilder()
						.where('"suscriptionId" = :id')
						.andWhere('date >= :date_i')
						.andWhere('date <= :date_o')
						.setParameters({
							id: suscription.id,
							date_i: date_begin.toSeconds(),
							date_o: date_end.toSeconds(),
						})
						.getMany()) {
						irecord.earning_extra = new Decimal(irecord.earning_extra)
							.plus(new Decimal(deposit.money).times(0.03))
							.toNumber();
					}
				}
			}
			const withdrawals: Withdrawal[] = await Withdrawal.createQueryBuilder()
				.where('"userId" = :id')
				.andWhere('date >= :date_begin')
				.andWhere('date <= :date_end')
				.setParameters({
					id: user.id,
					date_begin: date_begin.toSeconds(),
					date_end: date_end.toSeconds(),
				})
				.getMany();
			if (withdrawals.length) {
				irecord.withdrawal = withdrawals
					.map((w) => w.money)
					.reduce((d1, d2) => new Decimal(d1).plus(d2).toNumber(), 0);
			}
			if (date_begin.toSeconds() > user.DateTime.fromDate(user.created).toSeconds()) {
				let prev_record: IRecord = await Record.createQueryBuilder()
					.where('"userId" = :id')
					.andWhere('date = :date')
					.setParameters({
						id: user.id,
						date: date_begin.minus({ month: 1 }).startOf('month').toSeconds(),
					})
					.getOne();
				if (prev_record) {
					irecord.balance = new Decimal(irecord.balance).plus(prev_record.balance).toNumber();
				} else {
					prev_record = await this.record(
						user,
						date_begin.minus({ month: 1 }).startOf('month'),
						date_begin.minus({ month: 1 }).endOf('month'),
						suscriptions,
						memberships,
						true,
					);
					irecord.balance = new Decimal(irecord.balance).plus(prev_record.balance).toNumber();
				}
			}
			irecord.balance = new Decimal(irecord.balance)
				.plus(irecord.earning)
				.plus(irecord.earning_extra)
				.minus(irecord.withdrawal)
				.toNumber();
			if (save) {
				let record: Record = await Record.createQueryBuilder()
					.where('"userId" = :id')
					.andWhere('date = :date')
					.setParameters({ id: user.id, date: date_begin.startOf('month').toSeconds() })
					.getOne();
				if (record) {
					irecord.balance = record.balance;
					irecord.earning = record.earning;
					irecord.earning_extra = record.earning_extra;
					irecord.withdrawal = record.withdrawal;
					irecord.investment = record.investment;
				} else {
					record = new Record({ ...irecord, userId: user.id, date: date_begin.startOf('month').toSeconds() });
					await record.save();
				}
			}
		}
		return irecord;
	}
}
