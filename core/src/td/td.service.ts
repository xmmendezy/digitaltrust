import { Injectable } from '@nestjs/common';
import { Error } from '@app/util/base.util';
import { User, Country, HLogin, HQuery, SubscribeMail, Course, Invoice, Notice, Blog } from './td.entity';
import {
	SignupDto,
	UserDto,
	TokenDto,
	UpdateDto,
	IRefer,
	IClient,
	ISubscribeMail,
	ISubscribeCourse,
	NoticeDto,
	BlogDto,
	I4GeeksCharge,
} from './td.dto';

import jwt from 'jsonwebtoken';
import { MailerService } from '@nestjs-modules/mailer';
import { join } from 'path';
import { readFileSync } from 'fs';
import handlebars from 'handlebars';
import axios from 'axios';
import gpayments from 'gpayments';
import { DateTime } from 'luxon';

import config from '@config';
import { UserRole, UserStatus } from './td.interface';

const gpApi = gpayments({
	clientId: config.td._4geeks_client_id,
	clientSecret: config.td._4geeks_secret_key,
});

@Injectable()
export class TDService {
	constructor(private readonly mailerService: MailerService) {}

	public async suscribe_mail(email: string): Promise<Error> {
		const re =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (re.test(String(email).toLowerCase())) {
			const suscibe = await SubscribeMail.createQueryBuilder().where('email = :email', { email }).getOne();
			if (suscibe) {
				return { error: 'no_valid' };
			}
			await SubscribeMail.createQueryBuilder()
				.insert()
				.values({ email, created: DateTime.utc().toSeconds(), updated: DateTime.utc().toSeconds() })
				.execute();
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

	public async newClientNotification(user: User) {
		const templeate_hbs = readFileSync(join(__dirname, '..', 'mails', 'td_new_client.hbs'), 'utf8');
		const template_compile = handlebars.compile(templeate_hbs);
		return await this.mailerService
			.sendMail({
				to: config.td.email_notification,
				subject: 'TradingDigital - Nuevo cliente',
				html: template_compile({
					name: user.name,
					email: user.email,
					course: user.course.name,
				}),
			})
			.then(() => {
				return { error: '' };
			})
			.catch(() => {
				return { error: 'e000' };
			});
	}

	public async get_subscribe_course(user: User): Promise<ISubscribeCourse | Error> {
		const course = await Course.createQueryBuilder('course')
			.leftJoinAndSelect('course.users', 'user')
			.where('user.id = :id', { id: user.id })
			.getOne();
		if (course) {
			const invoice = await Invoice.createQueryBuilder('invoice')
				.leftJoinAndSelect('invoice.user', 'user')
				.where('user.id = :id', { id: user.id })
				.orderBy('invoice.created', 'DESC')
				.getOne();
			return {
				id: course.id,
				name: course.name,
				price: course.price,
				months: course.months,
				blog: course.blog,
				telegram: course.telegram,
				payed: invoice.payed,
				nextPayment: user.nextPayment,
			};
		} else {
			return { error: 'course.a' };
		}
	}

	public async post_subscribe_course(user: User, id: string): Promise<Course | Error> {
		const course = await Course.createQueryBuilder('course')
			.leftJoinAndSelect('course.users', 'user')
			.where('course.id = :id', { id })
			.getOne();
		if (course) {
			if (course.users.find((u) => u.id === user.id)) {
				return { error: 'course.b' };
			} else {
				user.course = course;
				user.nextPayment = user.DateTime.utc().minus({ minutes: 5 }).toSeconds();
				await user.save();
				const invoice = new Invoice({ user, course });
				await invoice.save();
				return course;
			}
		} else {
			return { error: 'course.a' };
		}
	}

	public async status(user: User) {
		if (
			await Invoice.createQueryBuilder('invoice')
				.leftJoinAndSelect('invoice.user', 'user')
				.leftJoinAndSelect('invoice.course', 'course')
				.where('user.id = :id', { id: user.id })
				.andWhere('invoice.payed = FALSE')
				.getCount()
		) {
			return { payed: false };
		} else {
			return { payed: true };
		}
	}

	public async post_paypal(user: User, reference: string) {
		const invoice = await Invoice.createQueryBuilder('invoice')
			.leftJoinAndSelect('invoice.user', 'user')
			.leftJoinAndSelect('invoice.course', 'course')
			.where('user.id = :id', { id: user.id })
			.andWhere('invoice.payed = FALSE')
			.getOne();
		if (invoice && reference) {
			invoice.payment_method = 'paypal';
			invoice.payed = true;
			invoice.reference = reference;
			invoice.coinbase_url = '';
			await invoice.save();
			user.nextPayment = user.DateTime.utc().plus({ months: invoice.course.months }).toSeconds();
			user.status = UserStatus.CONFIRM;
			await user.save();
			await this.newClientNotification(user);
			return { error: '' };
		} else {
			return { error: 'invoice.a' };
		}
	}

	public async get_coinbase(user: User) {
		const invoice = await Invoice.createQueryBuilder('invoice')
			.leftJoinAndSelect('invoice.user', 'user')
			.leftJoinAndSelect('invoice.course', 'course')
			.where('user.id = :id', { id: user.id })
			.andWhere('invoice.payed = FALSE')
			.getOne();
		if (invoice) {
			if (invoice.coinbase_url) {
				return { error: '', url: invoice.coinbase_url };
			} else {
				const data = {
					business_name: 'TradingDigital',
					customer_email: user.email,
					customer_name: user.name,
					local_price: {
						amount: invoice.course.price * 0.75,
						currency: 'USD',
					},
					memo: 'TradingDigital - ' + invoice.course.name,
				};
				const res = await axios
					.post<{
						data: {
							code: string;
							hosted_url: string;
						};
					}>('https://api.commerce.coinbase.com/invoices', data, {
						headers: { 'X-CC-Api-Key': config.td.coinbase_secret_key, 'X-CC-Version': '2018-03-22' },
					})
					.then((res) => {
						if (res.status === 201) {
							return {
								code: res.data.data.code,
								hosted_url: res.data.data.hosted_url,
							};
						} else {
							return {
								code: '',
								hosted_url: '',
							};
						}
					});
				if (res.code) {
					invoice.payment_method = 'coinbase';
					invoice.reference = res.code;
					invoice.coinbase_url = res.hosted_url;
					await invoice.save();
					return { error: '', url: res.hosted_url };
				} else {
					return { error: 'invoice.a' };
				}
			}
		} else {
			return { error: 'invoice.a' };
		}
	}

	public async post_coinbase(reference: string) {
		const invoice = await Invoice.createQueryBuilder('invoice')
			.leftJoinAndSelect('invoice.user', 'user')
			.leftJoinAndSelect('invoice.course', 'course')
			.where('invoice.reference = :reference', { reference })
			.getOne();
		if (invoice && reference) {
			invoice.payment_method = 'coinbase';
			invoice.payed = true;
			await invoice.save();
			const user = invoice.user;
			user.nextPayment = user.DateTime.utc().plus({ months: invoice.course.months }).toSeconds();
			user.status = UserStatus.CONFIRM;
			await user.save();
			await this.newClientNotification(user);
		}
	}

	public async post_4geeks(user: User, data: I4GeeksCharge) {
		const invoice = await Invoice.createQueryBuilder('invoice')
			.leftJoinAndSelect('invoice.user', 'user')
			.leftJoinAndSelect('invoice.course', 'course')
			.where('user.id = :id', { id: user.id })
			.andWhere('invoice.payed = FALSE')
			.getOne();
		if (invoice) {
			const reference: string = await gpApi.charges
				.create(data)
				.then((res) => res.charge_id)
				.catch((e) => {
					return '';
				});
			if (reference) {
				invoice.payment_method = '4geeks';
				invoice.payed = true;
				invoice.reference = reference;
				invoice.coinbase_url = '';
				await invoice.save();
				user.nextPayment = user.DateTime.utc().plus({ months: invoice.course.months }).toSeconds();
				user.status = UserStatus.CONFIRM;
				await user.save();
				await this.newClientNotification(user);
				return { error: '' };
			} else {
				return { error: 'invoice.b' };
			}
		} else {
			return { error: 'invoice.b' };
		}
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
			const templeate_hbs = readFileSync(join(__dirname, '..', 'mails', 'td_new_password.hbs'), 'utf8');
			const template_compile = handlebars.compile(templeate_hbs);
			return await this.mailerService
				.sendMail({
					to: email,
					subject: 'TradingDigital - Nueva contraseña',
					html: template_compile({
						password,
					}),
				})
				.then(() => {
					return { error: '' };
				})
				.catch((e) => {
					console.log(e);
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
		const keys = ['firstname', 'lastname'];
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
		return { ...new UserDto(user), error: '' } as UserDto;
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

	public async courses(): Promise<Course[]> {
		return await Course.createQueryBuilder().orderBy('months').getMany();
	}

	public async clients(): Promise<IClient[]> {
		const clients: IClient[] = [];
		for (const user of await User.createQueryBuilder('user')
			.leftJoinAndSelect('user.course', 'course')
			.where('user.role = :role', { role: 'user' })
			.getMany()) {
			clients.push({
				id: user.id,
				name: user.name,
				email: user.email,
				course: user.course.name,
				created: user.created,
				payed: !(await Invoice.createQueryBuilder('invoice')
					.leftJoinAndSelect('invoice.user', 'user')
					.leftJoinAndSelect('invoice.course', 'course')
					.where('user.id = :id', { id: user.id })
					.andWhere('invoice.payed = FALSE')
					.getCount()),
			});
		}
		return clients;
	}

	public async subscribe_mails(): Promise<ISubscribeMail[]> {
		const subscribe_mails: ISubscribeMail[] = [];
		for (const user of await User.createQueryBuilder('user')
			.where('user.role = :role', { role: 'user' })
			.getMany()) {
			subscribe_mails.push({
				id: user.id,
				email: user.email,
			});
		}
		const check = subscribe_mails.map((sm) => sm.email);
		for (const subscribe_mail of await SubscribeMail.createQueryBuilder().getMany()) {
			if (!check.includes(subscribe_mail.email)) {
				subscribe_mails.push({
					id: subscribe_mail.id,
					email: subscribe_mail.email,
				});
			}
		}
		return subscribe_mails;
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

	public async get_notices(user: User) {
		const notices_query = Notice.createQueryBuilder('notice').leftJoinAndSelect('notice.courses', 'course');
		if (user.role === UserRole.USER) {
			notices_query.where('course.id = :id', { id: user.course.id });
			const notices = (await notices_query.orderBy('notice.created', 'DESC').getMany()).map((n) => ({
				id: n.id,
				title: n.title,
				courses: n.courses.map((c) => c.id),
				description: n.description,
				url: n.url,
				created: n.created,
			}));
			(await this.get_blogs(user)).map((b) => {
				notices.push({
					id: b.id,
					title: b.title,
					courses: b.courses,
					description: b.description,
					url: '/td_app/blog?id=' + b.id,
					created: b.created,
				});
			});
			return notices.sort((na, nb) => nb.created - na.created);
		} else {
			return (await notices_query.orderBy('notice.created', 'DESC').getMany()).map((n) => ({
				id: n.id,
				title: n.title,
				courses: n.courses.map((c) => c.id),
				description: n.description,
				url: n.url,
				created: n.created,
			}));
		}
	}

	public async notice(data: NoticeDto) {
		const courses = await Course.createQueryBuilder('course').whereInIds(data.courses).getMany();
		let notice: Notice;
		if (data.id) {
			notice = await Notice.findOne(data.id);
			notice = new Notice({ ...notice, ...data, courses });
			notice.id = data.id;
		} else {
			notice = new Notice({ ...data, courses });
		}
		await notice.save();
		return { error: '' };
	}

	public async delete_notice(id: string) {
		const notice = await Notice.findOne(id);
		await notice.remove();
		return { error: '' };
	}

	public async get_blogs(user: User) {
		const blogs_query = Blog.createQueryBuilder('blog').leftJoinAndSelect('blog.courses', 'course');
		if (user.role === UserRole.USER) {
			blogs_query.where('course.id = :id', { id: user.course.id });
		}
		return (await blogs_query.orderBy('blog.created', 'DESC').getMany()).map((b) => ({
			id: b.id,
			title: b.title,
			courses: b.courses.map((c) => c.id),
			description: b.description,
			content: b.content,
			created: b.created,
		}));
	}

	public async blog(data: BlogDto) {
		const courses = await Course.createQueryBuilder('course').whereInIds(data.courses).getMany();
		let blog: Blog;
		if (data.id) {
			blog = await Blog.findOne(data.id);
			blog = new Blog({ ...blog, ...data, courses });
			blog.id = data.id;
		} else {
			blog = new Blog({ ...data, courses });
		}
		await blog.save();
		return { error: '' };
	}

	public async delete_blog(id: string) {
		const blog = await Blog.findOne(id);
		await blog.remove();
		return { error: '' };
	}
}
