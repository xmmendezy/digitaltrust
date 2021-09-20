import { Injectable } from '@nestjs/common';
import { Error } from '@app/util/base.util';
import {
	User,
	Country,
	Membership,
	Record,
	Suscription,
	Deposit,
	Withdrawal,
	SupportPayment,
	HLogin,
	HQuery,
} from './api.entity';
import {
	SignupDto,
	PreregisterDto,
	UserDto,
	TokenDto,
	UpdateDto,
	IRefer,
	IClient,
	IBalance,
	IBalanceDetail,
	RecordDto,
	DepositDto,
	WithdrawalDto,
	SupportPaymentDto,
} from './api.dto';
import { IRecord, PaymentMethod, UserRole, WithdrawalMethod } from './api.interface';

import { Decimal } from 'decimal.js';
import { DateTime } from 'luxon';
import jwt from 'jsonwebtoken';
import Stripe from 'stripe';
import Coinpayments from 'coinpayments';
import { MailerService } from '@nestjs-modules/mailer';
import { join } from 'path';
import { readFileSync } from 'fs';
import handlebars from 'handlebars';

import config from '@config';
import { moveMessagePortToContext } from 'worker_threads';

const stripe = new Stripe(config.stripe_secret_key, {
	apiVersion: '2020-08-27',
});

const coinpayments = new Coinpayments({ key: config.coinpayments_public_key, secret: config.coinpayments_secret_key });

@Injectable()
export class ApiService {
	constructor(private readonly mailerService: MailerService) {}

	public async signup(data: SignupDto): Promise<TokenDto | Error> {
		const country = await Country.createQueryBuilder('country')
			.leftJoinAndSelect('country.time_zones', 'time_zones')
			.where('country.id = :id', { id: data.country })
			.getOne();
		if (!country) {
			return { error: 'validator.auth.i' };
		}
		if (
			await User.createQueryBuilder('user')
				.where('user.username = :username', { username: data.username })
				.getCount()
		) {
			return { error: 'validator.auth.m' };
		}
		const ref_is_admin = data.ref === 'admin';
		if (ref_is_admin) {
			data.ref = '';
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
		//if (ref_is_admin && data.freeSupport) {
		//	user.nextSupportPayment = user.DateTime.now().plus({ years: 1 }).toSeconds();
		//}
		user.nextSupportPayment = user.DateTime.now().plus({ years: 1 }).toSeconds();
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

	public async reset_password(email: string): Promise<Error> {
		const user = await User.createQueryBuilder('user')
			.leftJoinAndSelect('user.country', 'country')
			.leftJoinAndSelect('country.time_zones', 'time_zones')
			.where('user.email = :email', { email })
			.getOne();
		if (user) {
			const password: string = [
				'Hola12345',
				'Digital2021',
				'NewPassword2021',
				'Aa12Bb34Cc56',
				'ABCDEabcde',
				'MNOPQmnopq',
				'Mm12Nn34Oo56',
				'ZYXzyx212019',
				'DIGITAL2021',
				'HOLA12345',
			][Math.floor(Math.random() * 10)];
			await user.set_password(password);
			await user.save();
			const templeate_hbs = readFileSync(join(__dirname, '..', 'mails', 'new_password.hbs'), 'utf8');
			const template_compile = handlebars.compile(templeate_hbs);
			return await this.mailerService
				.sendMail({
					to: email,
					subject: 'DigitalTrust - New password',
					html: template_compile({
						password,
					}),
				})
				.then(() => {
					return { error: '' };
				})
				.catch(() => {
					return { error: 'e000' };
				});
		} else {
			return { error: 'e000' };
		}
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
			'banck_name',
			'banck_address',
			'banck_account_name',
			'banck_account',
			'banck_routing_name',
			'banck_account_username',
			'banck_swift_code',
			'banck_iban',
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
				.where('user.telephone = :telephone', { telephone: data.telephone })
				.andWhere('user.id != :id', { id: user.id })
				.getCount()
		) {
			errors.push('validator.auth.j');
		} else {
			user.telephone = data.telephone;
		}
		if (
			await User.createQueryBuilder('user')
				.where('user.email = :email', { email: data.email })
				.andWhere('user.id != :id', { id: user.id })
				.getCount()
		) {
			errors.push('validator.auth.k');
		} else {
			user.email = data.email;
		}
		if (
			await User.createQueryBuilder('user')
				.where('user.username = :username', { username: data.username })
				.andWhere('user.id != :id', { id: user.id })
				.getCount()
		) {
			errors.push('validator.auth.m');
		} else {
			user.username = data.username;
		}
		await user.save();
		if (user.errors.length) {
			return { error: user.errors[0] };
		}
		return { ...new UserDto(user), errors } as UserDto;
	}

	public async see_welcome(user: User): Promise<void> {
		user.seeWelcome = false;
		await user.save();
	}

	public async ref_user(id: string): Promise<IRefer> {
		const user = await User.findOne(id);
		if (user) {
			if ((await User.createQueryBuilder('user').where('user.ref = :id', { id: user.id }).getCount()) >= 2) {
				return { id: '', name: '' };
			}
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
				lastDeposit: user.lastDeposit,
				has_withdrawal: !!(await Withdrawal.createQueryBuilder()
					.where('"userId" = :id')
					.andWhere('status = :status')
					.setParameters({
						id: user.id,
						status: false,
					})
					.getCount()),
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

	public async remove_client(id: string) {
		await HLogin.createQueryBuilder().delete().where('"userId" = :id', { id }).execute();
		await HQuery.createQueryBuilder().delete().where('"userId" = :id', { id }).execute();
		await User.createQueryBuilder().delete().where('id = :id', { id }).execute();
	}

	public async binary_tree(user: User) {
		const data = [
			{
				name: '---',
				description: 'Level 1',
				children: [
					{
						name: '---',
						description: 'Level 2',
						children: [
							{
								name: '---',
								description: 'Level 3',
							},

							{
								name: '---',
								description: 'Level 3',
							},
						],
					},
					{
						name: '---',
						description: 'Level 2',
						children: [
							{
								name: '---',
								description: 'Level 3',
							},

							{
								name: '---',
								description: 'Level 3',
							},
						],
					},
				],
			},
			{
				name: '---',
				description: 'Level 1',
				children: [
					{
						name: '---',
						description: 'Level 2',
						children: [
							{
								name: '---',
								description: 'Level 3',
							},

							{
								name: '---',
								description: 'Level 3',
							},
						],
					},
					{
						name: '---',
						description: 'Level 2',
						children: [
							{
								name: '---',
								description: 'Level 3',
							},

							{
								name: '---',
								description: 'Level 3',
							},
						],
					},
				],
			},
		];
		const users_ref = await User.createQueryBuilder('user')
			.where('user.ref = :id', { id: user.id })
			.orderBy('created', 'ASC')
			.getMany();
		const level = (index: number, d: any, user_ref: User) => {
			if (index < 2) {
				d[index].name = user_ref.name;
			} else if (index >= 2 && index < 6) {
				level(index % 2, d[Math.floor(index / 2) - 1].children, user_ref);
			} else {
				level(
					index % 2,
					d[Math.floor((Math.floor((2 * (index - 6)) / 4) + 2) / 2) - 1].children[
						(Math.floor((2 * (index - 6)) / 4) + 2) % 2
					].children,
					user_ref,
				);
			}
		};
		for (let index = 0; index < users_ref.length; index++) {
			const user_ref = users_ref[index];
			level(index, data, user_ref);
		}
		return data;
	}

	public async memberships(user: User): Promise<Membership[]> {
		if (user.role === UserRole.ADMIN) {
			return await Membership.createQueryBuilder().orderBy('interest', 'ASC').getMany();
		} else {
			let memberships: Membership[] = [];
			if (await Suscription.createQueryBuilder().where('"userId" = :id', { id: user.id }).getCount()) {
				memberships = await Membership.createQueryBuilder()
					.where('is_active = :is_active', { is_active: false })
					.andWhere('id in (:...ids)', {
						ids: (
							await Suscription.createQueryBuilder().where('"userId" = :id', { id: user.id }).getMany()
						).map((s) => s.membershipId),
					})
					.orderBy('interest', 'ASC')
					.getMany();
			}
			memberships.push(
				...(await Membership.createQueryBuilder()
					.where('is_active = :is_active', { is_active: true })
					.orderBy('interest', 'ASC')
					.getMany()),
			);
			return memberships;
		}
	}

	public async suscriptions(user: User): Promise<Suscription[]> {
		return await Suscription.createQueryBuilder().where('"userId" = :id', { id: user.id }).getMany();
	}

	public async create_suscription(user: User, date: DateTime, membershipId: string): Promise<{ id: string }> {
		const membership = await Membership.createQueryBuilder().where('id = :membershipId', { membershipId }).getOne();
		if (membership) {
			const suscription = new Suscription({
				userId: user.id,
				date_begin: date.toSeconds(),
				date_end: date.plus({ months: membership.months }).toSeconds(),
				membershipId,
			});
			await suscription.save();
			if (suscription.errors.length) {
				return { id: '' };
			} else {
				return { id: suscription.id };
			}
		} else {
			return { id: '' };
		}
	}

	public async process_deposit(
		user: User,
		date: DateTime,
		data: DepositDto,
		is_admin: boolean,
	): Promise<{ valid: boolean }> {
		let membership: Membership;
		if (!data.suscriptionId) {
			membership = await Membership.createQueryBuilder().where('id = :id', { id: data.membershipId }).getOne();
			const suscription = new Suscription({
				userId: user.id,
				date_begin: date.toSeconds(),
				date_end: date.plus({ months: membership.months }).toSeconds(),
				membershipId: data.membershipId,
			});
			await suscription.save();
			if (suscription.errors.length) {
				return { valid: false };
			}
			data.suscriptionId = suscription.id;
		} else {
			const suscription = await Suscription.createQueryBuilder()
				.where('id = :id', { id: data.suscriptionId })
				.getOne();
			membership = await Membership.createQueryBuilder()
				.where('id = :id', { id: suscription.membershipId })
				.getOne();
		}
		const deposit = new Deposit({
			date: date.toSeconds(),
			suscriptionId: data.suscriptionId,
			money: parseFloat(data.money as any),
			payment_method: data.type,
			reference: data.reference,
		});
		await deposit.save();
		if (deposit.errors.length) {
			return { valid: false };
		}
		user.lastDeposit = date.toSeconds();
		if (!user.firstDeposit) {
			user.firstDeposit = date.toSeconds();
		}
		await user.save();
		if (is_admin) {
			await Record.createQueryBuilder()
				.delete()
				.where('date >= :date', { date: date.startOf('month').toSeconds() })
				.execute();
		}
		if (deposit.payment_method === PaymentMethod.BALANCE) {
			const withdrawal = new Withdrawal({
				userId: user.id,
				date: date.toSeconds(),
				money: data.money,
				withdrawal_method: WithdrawalMethod.INVESTMENT,
				status: true,
			});
			await withdrawal.save();
			if (withdrawal.errors.length) {
				await Deposit.createQueryBuilder().delete().where('id = :id', { id: deposit.id }).execute();
				return { valid: false };
			}
		}
		const templeate_hbs = readFileSync(join(__dirname, '..', 'mails', 'invoice.hbs'), 'utf8');
		const template_compile = handlebars.compile(templeate_hbs);
		await this.mailerService.sendMail({
			to: user.email,
			subject: 'DigitalTrust Invoice',
			html: template_compile({
				user: user.name,
				date: date.toLocaleString(),
				membership: membership.name,
				payment_method: {
					balance: 'Balance',
					bankcheck: 'Bank Check',
					paypal: 'PayPal',
					stripe: 'Stripe',
					blockchain: 'Coinpayments',
				}[data.type],
				money: parseFloat(data.money as any),
			}),
		});
		return { valid: true };
	}

	public async process_support_payment(
		user: User,
		date: DateTime,
		data: SupportPaymentDto,
	): Promise<{ valid: boolean }> {
		const deposit = new SupportPayment({
			date: date.toSeconds(),
			userId: user.id,
			money: parseFloat(data.money as any),
			payment_method: data.type,
			reference: data.reference,
		});
		await deposit.save();
		if (deposit.errors.length) {
			return { valid: false };
		}
		user.nextSupportPayment = date.plus({ years: 1 }).toSeconds();
		await user.save();
		return { valid: true };
	}

	public async withdrawals(user: User, date: DateTime): Promise<Withdrawal[]> {
		return await Withdrawal.createQueryBuilder()
			.where('"userId" = :id')
			.andWhere('date >= :date_begin')
			.andWhere('date <= :date_end')
			.setParameters({
				id: user.id,
				date_begin: date.toSeconds(),
				date_end: date.endOf('month').toSeconds(),
			})
			.getMany();
	}

	public async withdrawals_alert(user: User): Promise<Withdrawal[]> {
		return await Withdrawal.createQueryBuilder()
			.where('"userId" = :id')
			.andWhere('status = :status')
			.setParameters({
				id: user.id,
				status: false,
			})
			.getMany();
	}

	public async request_withdrawal(
		user: User,
		date: DateTime,
		data: WithdrawalDto,
		is_admin: boolean,
	): Promise<{ valid: boolean }> {
		const withdrawal = new Withdrawal({
			userId: user.id,
			date: date.toSeconds(),
			money: data.money,
			withdrawal_method: data.type,
			reference: data.reference,
		});
		if (is_admin) {
			withdrawal.status = true;
		}
		await withdrawal.save();
		if (withdrawal.errors.length) {
			return { valid: false };
		}
		if (is_admin) {
			await Record.createQueryBuilder()
				.delete()
				.where('date >= :date', { date: date.startOf('month').toSeconds() })
				.execute();
		}
		return { valid: true };
	}

	public async process_withdrawal(id: string): Promise<{ valid: boolean }> {
		const withdrawal = await Withdrawal.createQueryBuilder()
			.where('id = :id')
			.setParameters({
				id,
			})
			.getOne();
		if (withdrawal) {
			const user = await User.createQueryBuilder('user')
				.leftJoinAndSelect('user.country', 'country')
				.leftJoinAndSelect('country.time_zones', 'time_zones')
				.where('user.id = :id', { id: withdrawal.userId })
				.getOne();
			const balance = await this.balance_detail(user, user.DateTime.fromUnix(withdrawal.date).startOf('month'));
			if (balance.available_balance >= withdrawal.money) {
				withdrawal.status = true;
				await withdrawal.save();
				if (withdrawal.errors.length) {
					return { valid: false };
				}
				await Record.createQueryBuilder()
					.delete()
					.where('date >= :date', {
						date: user.DateTime.fromUnix(withdrawal.date).startOf('month').toSeconds(),
					})
					.execute();
				return { valid: true };
			}
		}
		return { valid: false };
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
				.diff(
					user.firstDeposit
						? user.DateTime.fromUnix(user.firstDeposit).startOf('month')
						: user.DateTime.fromDate(user.created).startOf('month'),
					'months',
				).months;
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

	public async balance_detail(user: User, date: DateTime): Promise<IBalanceDetail> {
		const balance: IBalanceDetail = {
			date: date.toSeconds(),
			available_balance: 0,
			balance: 0,
			withdrawal: 0,
			earning: 0,
			earning_extra: 0,
			investment: 0,
			suscriptions: [],
			moves: [],
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
			if (user.DateTime.now().startOf('month').toSeconds() === date.startOf('month').toSeconds()) {
				if (
					(await Record.createQueryBuilder()
						.where('"userId" = :id')
						.andWhere('date < :date')
						.setParameters({
							id: user.id,
							date: date.startOf('month').toSeconds(),
						})
						.orderBy('date', 'DESC')
						.getCount()) > 1
				) {
					const last_record = await Record.createQueryBuilder()
						.where('"userId" = :id')
						.andWhere('date = :date')
						.setParameters({
							id: user.id,
							date: date.startOf('month').minus({ months: 1 }).toSeconds(),
						})
						.orderBy('date', 'DESC')
						.getOne();
					balance.available_balance = new Decimal(last_record.balance).minus(balance.withdrawal).toNumber();
				}
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
					membershipId: suscription.membershipId,
					reinvestment: suscription.reinvestment,
				});
			}
			balance.moves = (
				await Deposit.createQueryBuilder()
					.where('"suscriptionId" in (:...ids)')
					.setParameters({
						ids: suscriptions.map((s) => s.id),
					})
					.getMany()
			).map((d) => {
				return {
					type: 'deposit',
					date: d.date,
					suscription: d.suscriptionId,
					money: d.money,
					method: d.payment_method,
					reference: d.reference !== 'default' ? d.reference : '',
					status: true,
				};
			});
			balance.moves.push(
				...(
					await Withdrawal.createQueryBuilder()
						.where('"userId" = :id')
						.setParameters({
							id: user.id,
						})
						.getMany()
				).map((w) => {
					return {
						type: 'withdrawal' as 'withdrawal',
						date: w.date,
						suscription: '',
						reference: w.reference !== 'default' ? w.reference : '',
						money: w.money,
						method: w.withdrawal_method,
						status: w.status,
					};
				}),
			);
		}
		balance.moves.sort((a, b) => b.date - a.date);
		return balance;
	}

	public async balance_send_mail(user: User, date: DateTime): Promise<{ valid: boolean }> {
		const balance: IBalanceDetail = await this.balance_detail(user, date);
		const templeate_hbs = readFileSync(join(__dirname, '..', 'mails', 'balance.hbs'), 'utf8');
		handlebars.registerHelper('ifEquals', function (arg1, arg2, options) {
			return arg1 == arg2 ? options.fn(this) : options.inverse(this);
		});
		const template_compile = handlebars.compile(templeate_hbs);
		const formatMoney = (n: number) => {
			if (n) {
				const x = n.toFixed(2).toString().split('.');
				let x1 = x[0];
				const rgx = /(\d+)(\d{3})/;
				while (rgx.test(x1)) {
					x1 = x1.replace(rgx, '$1' + ' ' + '$2');
				}
				return `$${x1}${x.length > 1 ? '.' + x[1] : ''}`;
			} else {
				return '$0';
			}
		};
		const formatDate = (n: number) => {
			return user.DateTime.fromUnix(n).toFormat('dd LLL yyyy');
		};
		const memberships = await Membership.createQueryBuilder()
			.where('id in (:...ids)', { ids: balance.suscriptions.map((s) => s.membershipId) })
			.getMany();
		const get_name_suscription = (id: string) => {
			const membership = memberships.find(
				(m) => m.id === balance.suscriptions.find((s) => s.id === id)?.membershipId,
			);
			return membership ? membership.name + ' ' + (membership.interest * 100).toFixed(1) + '%' : '---';
		};
		const payment_mehtods: { [key: string]: string } = {
			paypal: 'PayPal',
			stripe: 'Stripe',
			blockchain: 'CoinPayments',
			balance: 'Reinvestment',
			bankcheck: 'Bank Check',
			wire_transfer: 'Wire Transfer',
			investment: 'Investment',
		};
		const data = {
			user: user.name,
			date: formatDate(balance.date),
			available_balance: formatMoney(balance.available_balance),
			balance: formatMoney(balance.balance),
			investment: formatMoney(balance.investment),
			moves: balance.moves.map((m) => {
				return {
					...m,
					date: formatDate(m.date),
					money: formatMoney(m.money),
					suscription: get_name_suscription(m.suscription),
					method: payment_mehtods[m.method],
				};
			}),
		};
		return await this.mailerService
			.sendMail({
				to: user.email,
				//to: 'xmmendezy@gmail.com',
				subject: 'DigitalTrust - Balance',
				html: template_compile(data),
			})
			.then(() => {
				return { valid: true };
			})
			.catch(() => {
				return { valid: false };
			});
	}

	public async set_reinvestment(user: User, id: string, reinvestment: boolean): Promise<{ valid: boolean }> {
		const suscriptions = await Suscription.createQueryBuilder().where('"userId" = :id', { id: user.id }).getMany();
		if (reinvestment) {
			for (const suscription of suscriptions.filter((s) => s.id !== id)) {
				suscription.reinvestment = false;
				await suscription.save();
			}
		}
		const suscription = suscriptions.find((s) => s.id === id);
		suscription.reinvestment = reinvestment;
		await suscription.save();
		return { valid: !suscription.errors.length };
	}

	public async balance_graphic(user: User): Promise<{
		labels: number[];
		data: number[];
	}> {
		const data: {
			labels: number[];
			data: number[];
		} = {
			labels: [],
			data: [],
		};
		await this.records(user);
		const records = await Record.createQueryBuilder('record')
			.select('record.date')
			.addSelect('record.balance')
			.where('"userId" = :id', {
				id: user.id,
			})
			.orderBy('date', 'ASC')
			.getMany();
		for (const record of records) {
			data.labels.push(record.date);
			data.data.push(record.balance);
		}
		return data;
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
		if (
			date_begin.toSeconds() <
			(user.firstDeposit
				? user.DateTime.fromUnix(user.firstDeposit)
				: user.DateTime.fromDate(user.created)
			).toSeconds()
		) {
			date_begin = user.firstDeposit
				? user.DateTime.fromUnix(user.firstDeposit)
				: user.DateTime.fromDate(user.created);
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
										? date_end.toSeconds() === user.DateTime.now().endOf('month').toSeconds()
											? date_end.toSeconds()
											: date_end.plus({ days: 1 }).toSeconds()
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
							let dayDeposit: number = date_end.day - user.DateTime.fromUnix(deposit.date).day + 1;
							if (
								user.DateTime.now().startOf('month').toSeconds() > date_end.startOf('month').toSeconds()
							) {
								dayDeposit++;
							}
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
				.andWhere('status = :status')
				.setParameters({
					id: user.id,
					status: true,
					date_begin: date_begin.toSeconds(),
					date_end:
						date_end.toSeconds() === date_end.endOf('month').toSeconds()
							? date_end.toSeconds()
							: date_end.plus({ days: 1 }).toSeconds(),
				})
				.getMany();
			if (withdrawals.length) {
				irecord.withdrawal = withdrawals
					.map((w) => w.money)
					.reduce((d1, d2) => new Decimal(d1).plus(d2).toNumber(), 0);
			}
			if (
				date_begin.toSeconds() >
				(user.firstDeposit
					? user.DateTime.fromUnix(user.firstDeposit)
					: user.DateTime.fromDate(user.created)
				).toSeconds()
			) {
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

	public async get_stripe(data: DepositDto): Promise<{ id: string; reference: string }> {
		const success_url = `${config.url_root}/app/buy?success_stripe=true&${Object.entries(data)
			.map(([key, val]) => `${key}=${val}`)
			.join('&')}`;
		const membership = await Membership.createQueryBuilder().where('id = :id', { id: data.membershipId }).getOne();
		const session = await stripe.checkout.sessions.create({
			payment_method_types: ['card'],
			line_items: [
				{
					price_data: {
						currency: 'usd',
						product_data: {
							name: `Payment - ${membership.name}`,
						},
						unit_amount: parseInt(
							parseFloat(data.money as any)
								.toFixed(2)
								.toString()
								.replace('.', ''),
						),
					},
					quantity: 1,
				},
			],
			mode: 'payment',
			success_url,
			cancel_url: `${config.url_root}/app/buy?success_stripe=false`,
		});
		return { id: session.id, reference: session.payment_intent as string };
	}

	public async get_coinpayments(
		user: User,
		data: DepositDto & { currency: string },
	): Promise<{ txn_id: string; checkout_url: string; status_url: string }> {
		const success_url = `${config.url_root}/app/buy?success_coinpayments=true&${Object.entries(data)
			.map(([key, val]) => `${key}=${val}`)
			.join('&')}`;
		const membership = await Membership.createQueryBuilder().where('id = :id', { id: data.membershipId }).getOne();
		const { address } = await coinpayments.getCallbackAddress(data);
		return await coinpayments.createTransaction({
			currency1: 'USD',
			currency2: data.currency,
			amount: data.money,
			buyer_email: user.email,
			item_name: `Payment - ${membership.name}`,
			address,
			success_url,
			cancel_url: `${config.url_root}/app/buy?success_coinpayments=false`,
		});
	}

	public async status_coinpayments(txid: string): Promise<any> {
		return await coinpayments.getTx({ txid });
	}

	public async get_stripe_donation(data: { money: number }): Promise<{ id: string }> {
		const session = await stripe.checkout.sessions.create({
			payment_method_types: ['card'],
			line_items: [
				{
					price_data: {
						currency: 'usd',
						product_data: {
							name: 'Donation',
						},
						unit_amount: parseInt(
							parseFloat(data.money as any)
								.toFixed(2)
								.toString()
								.replace('.', ''),
						),
					},
					quantity: 1,
				},
			],
			mode: 'payment',
			success_url: `${config.url_root}/app/donations?step=2`,
			cancel_url: config.url_root,
		});
		return { id: session.id };
	}

	public async get_coinpayments_donation(data: {
		money: number;
		currency: string;
	}): Promise<{ checkout_url: string }> {
		const { address } = await coinpayments.getCallbackAddress(data);
		return await coinpayments.createTransaction({
			currency1: 'USD',
			currency2: data.currency,
			amount: data.money,
			buyer_email: 'admin@digitaltrustonline.net',
			item_name: 'Donation',
			address,
			success_url: config.url_root,
			cancel_url: config.url_root,
		});
	}

	public async get_stripe_support_payment(data: SupportPaymentDto): Promise<{ id: string; reference: string }> {
		const session = await stripe.checkout.sessions.create({
			payment_method_types: ['card'],
			line_items: [
				{
					price_data: {
						currency: 'usd',
						product_data: {
							name: 'Payment - Support DigitalTrust Web Service',
						},
						unit_amount: parseInt(
							parseFloat(data.money as any)
								.toFixed(2)
								.toString()
								.replace('.', ''),
						),
					},
					quantity: 1,
				},
			],
			mode: 'payment',
			success_url: `${config.url_root}/app?success_stripe_support=true`,
			cancel_url: `${config.url_root}/app?success_stripe_support=false`,
		});
		return { id: session.id, reference: session.payment_intent as string };
	}

	public async get_coinpayments_support_payment(
		user: User,
		data: SupportPaymentDto & { currency: string },
	): Promise<{ txn_id: string; checkout_url: string; status_url: string }> {
		const { address } = await coinpayments.getCallbackAddress(data);
		return await coinpayments.createTransaction({
			currency1: 'USD',
			currency2: data.currency,
			amount: data.money,
			buyer_email: user.email,
			item_name: 'Payment - Support DigitalTrust Web Service',
			address,
			success_url: `${config.url_root}/app?success_coinpayments_support=true`,
			cancel_url: `${config.url_root}/app?success_coinpayments_support=false`,
		});
	}

	public async preregister(data: PreregisterDto) {
		const templeate_hbs = readFileSync(join(__dirname, '..', 'mails', 'preregister.hbs'), 'utf8');
		const template_compile = handlebars.compile(templeate_hbs);
		return await this.mailerService
			.sendMail({
				to: config.email.info,
				subject: 'Preregister',
				html: template_compile(data),
			})
			.then(() => {
				return { valid: true };
			})
			.catch((e) => {
				return { valid: false };
			});
	}
}
