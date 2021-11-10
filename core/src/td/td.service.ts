import { Injectable } from '@nestjs/common';
import { Error } from '@app/util/base.util';
import { User, Country, Membership, Suscription, HLogin, HQuery, SuscribeMail } from './td.entity';
import { SignupDto, PreregisterDto, UserDto, TokenDto, UpdateDto, IRefer, IClient, SuscriptionDto } from './td.dto';
import { UserRole, IMembership } from './td.interface';

import { DateTime } from 'luxon';
import jwt from 'jsonwebtoken';
import Stripe from 'stripe';
import Coinpayments from 'coinpayments';
import { MailerService } from '@nestjs-modules/mailer';
import { join } from 'path';
import { readFileSync } from 'fs';
import handlebars from 'handlebars';

import config from '@config';

const stripe = new Stripe(config.stripe_secret_key, {
	apiVersion: '2020-08-27',
});

const coinpayments = new Coinpayments({ key: config.coinpayments_public_key, secret: config.coinpayments_secret_key });

@Injectable()
export class TDService {
	constructor(private readonly mailerService: MailerService) {}

	public async suscribe_mail(email: string): Promise<Error> {
		const re =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (re.test(String(email).toLowerCase())) {
			const suscibe = await SuscribeMail.createQueryBuilder().where('email = :email', { email }).getOne();
			if (suscibe) {
				return { error: 'no_valid' };
			}
			await SuscribeMail.createQueryBuilder().insert().values({ email }).execute();
			return { error: '' };
		} else {
			return { error: 'no_valid' };
		}
	}

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

	public async update_memberships(user: User, data: IMembership[]): Promise<Membership[]> {
		if (user.role === UserRole.ADMIN) {
			const memberships = await Membership.createQueryBuilder().getMany();
			for (const membership_n of data) {
				const membership = memberships.find((m) => m.id === membership_n.id);
				if (membership) {
					if (
						membership_n.description_en !== membership.description_en ||
						membership_n.description_es !== membership.description_es ||
						membership_n.is_active !== membership.is_active
					) {
						membership.description_en = membership_n.description_en;
						membership.description_es = membership_n.description_es;
						membership.is_active = membership_n.is_active;
						await membership.save();
					}
				} else {
					if (
						membership_n.name &&
						membership_n.description_en &&
						membership_n.description_es &&
						membership_n.money_a &&
						membership_n.money_b &&
						membership_n.months &&
						membership_n.interest &&
						membership_n.is_active
					) {
						await Membership.createQueryBuilder()
							.insert()
							.values({ ...membership_n, interest: membership_n.interest / 100 })
							.execute();
					}
				}
			}
			return await Membership.createQueryBuilder().orderBy('interest', 'ASC').getMany();
		} else {
			return [];
		}
	}

	public async suscriptions(user: User): Promise<Suscription[]> {
		return await Suscription.createQueryBuilder().where('"userId" = :id', { id: user.id }).getMany();
	}

	public async create_suscription(
		user: User,
		date: DateTime,
		data: DepositDto,
		membershipId: string,
	): Promise<{ id: string }> {
		const membership = await Membership.createQueryBuilder().where('id = :membershipId', { membershipId }).getOne();
		if (membership) {
			const suscription = new Suscription({
				userId: user.id,
				date: date.toSeconds(),
				membershipId,
				money: parseFloat(data.money as any),
				payment_method: data.type,
				reference: data.reference,
			});
			await suscription.save();
			if (suscription.errors.length) {
				return { id: '' };
			}
			user.lastDeposit = date.toSeconds();
			if (!user.firstDeposit) {
				user.firstDeposit = date.toSeconds();
			}
			await user.save();
			return { id: suscription.id };
		} else {
			return { id: '' };
		}
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
