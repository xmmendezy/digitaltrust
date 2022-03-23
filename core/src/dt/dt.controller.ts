import { Controller, Get, Post, Patch, Delete, Body, Req, Request, Query, Param } from '@app/dt/http';
import { DTService } from './dt.service';
import { SignupDto, PreregisterDto, UpdateDto, DepositDto, WithdrawalDto, SupportPaymentDto } from './dt.dto';
import { User } from './dt.entity';
import { UserRole, IMembership } from './dt.interface';

@Controller('dt/api')
export class DTController {
	constructor(private readonly dtService: DTService) {}

	@Get('ping')
	public async ping() {
		return { error: '' };
	}

	@Get('suscribe_mail/:email')
	public async suscribe_mail(@Param('email') email: string) {
		return await this.dtService.suscribe_mail(email);
	}

	@Post('signup')
	public async signup(@Body() data: SignupDto) {
		data = new SignupDto(data);
		const errors = data.validate();
		if (errors.length) {
			return { error: errors[0] };
		} else {
			return await this.dtService.signup(data);
		}
	}

	@Post('link_traiding')
	public async link_traiding(@Body() data: { id: string }) {
		return await this.dtService.link_traiding(data.id);
	}

	@Post('login')
	public async login(@Req() req: Request) {
		return await this.dtService.createToken(req.user);
	}

	@Get('reset_password')
	public async reset_password(@Query('email') email: string) {
		return await this.dtService.reset_password(email);
	}

	@Patch('user')
	public async update(@Req() req: Request, @Body() data: UpdateDto) {
		data = new UpdateDto(data);
		const errors = data.validate();
		if (errors.length) {
			return { error: errors[0] };
		} else {
			return await this.dtService.update(req.user, data);
		}
	}

	@Patch('see_welcome')
	public async see_welcome(@Req() req: Request) {
		return await this.dtService.see_welcome(req.user);
	}

	@Get('ref_user')
	public async ref_user(@Query() query: { id: string }) {
		return await this.dtService.ref_user(query.id);
	}

	@Get('binary_tree')
	public async binary_tree(@Req() req: Request) {
		return await this.dtService.binary_tree(req.user);
	}

	@Get('is_refer')
	public async is_refer(@Req() req: Request) {
		return await this.dtService.is_refer(req.user);
	}

	@Get('clients')
	public async clients(@Req() req: Request) {
		if (req.user.role === 'admin') {
			return await this.dtService.clients();
		} else {
			return [];
		}
	}

	@Get('clients_vip')
	public async clients_vip(@Req() req: Request) {
		if (req.user.role === 'admin') {
			return await this.dtService.clients(true);
		} else {
			return [];
		}
	}

	@Get('client')
	public async client(@Req() req: Request, @Query() query: { id: string }) {
		if (req.user.role === 'admin') {
			return await this.dtService.client(query.id);
		} else {
			return [];
		}
	}

	@Patch('client')
	public async update_client(@Query() query: { id: string }, @Body() data: UpdateDto) {
		data = new UpdateDto(data);
		const errors = data.validate();
		if (errors.length) {
			return { error: errors[0] };
		} else {
			const user = await User.createQueryBuilder('user')
				.leftJoinAndSelect('user.country', 'country')
				.leftJoinAndSelect('country.time_zones', 'time_zones')
				.where('user.id = :id', { id: query.id })
				.getOne();
			if (!user) {
				return { error: 'login.error.u1' };
			}
			return await this.dtService.update(user, data);
		}
	}

	@Delete('client')
	public async remove_client(@Req() req: Request, @Query() query: { id: string }) {
		if (req.user.role === 'admin') {
			return await this.dtService.remove_client(query.id);
		} else {
			return [];
		}
	}

	@Get('memberships')
	public async memberships(@Req() req: Request) {
		return await this.dtService.memberships(req.user);
	}

	@Post('memberships')
	public async update_memberships(@Req() req: Request, @Body() data: IMembership[]) {
		return await this.dtService.update_memberships(req.user, data);
	}

	@Get('suscriptions')
	public async suscriptions(@Req() req: Request, @Query() query: { id: string }) {
		let user: User = req.user;
		if (query.id) {
			user = await User.createQueryBuilder('user')
				.leftJoinAndSelect('user.country', 'country')
				.leftJoinAndSelect('country.time_zones', 'time_zones')
				.where('user.id = :id', { id: query.id })
				.getOne();
		}
		return await this.dtService.suscriptions(user);
	}

	@Post('suscription')
	public async create_suscription(
		@Req() req: Request,
		@Query() query: { id: string },
		@Body() data: { membershipId: string; date?: number },
	) {
		let user: User = req.user;
		if (query.id) {
			user = await User.createQueryBuilder('user')
				.leftJoinAndSelect('user.country', 'country')
				.leftJoinAndSelect('country.time_zones', 'time_zones')
				.where('user.id = :id', { id: query.id })
				.getOne();
		}
		let date = user.DateTime.now();
		if (data.date) {
			date = user.DateTime.fromUnix(parseInt(data.date as any));
		}
		return await this.dtService.create_suscription(user, date, data.membershipId);
	}

	@Post('deposit')
	public async process_deposit(@Req() req: Request, @Body() data: DepositDto) {
		let user: User = req.user;
		if (data.id) {
			user = await User.createQueryBuilder('user')
				.leftJoinAndSelect('user.country', 'country')
				.leftJoinAndSelect('country.time_zones', 'time_zones')
				.where('user.id = :id', { id: data.id })
				.getOne();
		}
		let date = user.DateTime.now();
		if (data.date) {
			date = user.DateTime.fromUnix(parseInt(data.date as any));
		}
		return await this.dtService.process_deposit(user, date, data, req.user.role === UserRole.ADMIN);
	}

	@Post('support_payment')
	public async process_support_payment(@Req() req: Request, @Body() data: SupportPaymentDto) {
		let user: User = req.user;
		if (data.userId) {
			user = await User.createQueryBuilder('user')
				.leftJoinAndSelect('user.country', 'country')
				.leftJoinAndSelect('country.time_zones', 'time_zones')
				.where('user.id = :id', { id: data.userId })
				.getOne();
		}
		return await this.dtService.process_support_payment(user, user.DateTime.now(), data);
	}

	@Get('withdrawals')
	public async withdrawals(@Req() req: Request, @Query() query: { id: string; date: number }) {
		let user: User = req.user;
		if (query.id) {
			user = await User.createQueryBuilder('user')
				.leftJoinAndSelect('user.country', 'country')
				.leftJoinAndSelect('country.time_zones', 'time_zones')
				.where('user.id = :id', { id: query.id })
				.getOne();
		}
		let date = user.DateTime.now().startOf('month');
		if (query.date) {
			date = user.DateTime.fromUnix(parseInt(query.date as any)).startOf('month');
		}
		return await this.dtService.withdrawals(user, date);
	}

	@Get('withdrawals_alert')
	public async withdrawals_alert(@Req() req: Request, @Query() query: { id: string }) {
		let user: User = req.user;
		if (query.id) {
			user = await User.createQueryBuilder('user')
				.leftJoinAndSelect('user.country', 'country')
				.leftJoinAndSelect('country.time_zones', 'time_zones')
				.where('user.id = :id', { id: query.id })
				.getOne();
		}
		return await this.dtService.withdrawals_alert(user);
	}

	@Post('withdrawal')
	public async request_withdrawal(@Req() req: Request, @Body() data: WithdrawalDto) {
		let user: User = req.user;
		if (data.id) {
			user = await User.createQueryBuilder('user')
				.leftJoinAndSelect('user.country', 'country')
				.leftJoinAndSelect('country.time_zones', 'time_zones')
				.where('user.id = :id', { id: data.id })
				.getOne();
		}
		let date = user.DateTime.now();
		if (data.date) {
			date = user.DateTime.fromUnix(parseInt(data.date as any));
		}
		return await this.dtService.request_withdrawal(user, date, data, req.user.role === UserRole.ADMIN);
	}

	@Post('process_withdrawal')
	public async process_withdrawal(@Body() data: { id: string }) {
		return await this.dtService.process_withdrawal(data.id);
	}

	@Get('records')
	public async records(@Req() req: Request, @Query() query: { id: string }) {
		let user: User = req.user;
		if (query.id) {
			user = await User.createQueryBuilder('user')
				.leftJoinAndSelect('user.country', 'country')
				.leftJoinAndSelect('country.time_zones', 'time_zones')
				.where('user.id = :id', { id: query.id })
				.getOne();
		}
		return await this.dtService.records(user);
	}

	@Get('balance')
	public async balance(@Req() req: Request) {
		return await this.dtService.balance(req.user);
	}

	@Get('balance_detail')
	public async balance_detail(@Req() req: Request, @Query() query: { id: string; date: number }) {
		let user: User = req.user;
		if (query.id) {
			user = await User.createQueryBuilder('user')
				.leftJoinAndSelect('user.country', 'country')
				.leftJoinAndSelect('country.time_zones', 'time_zones')
				.where('user.id = :id', { id: query.id })
				.getOne();
		}
		let date = user.DateTime.now().startOf('month');
		if (query.date) {
			date = user.DateTime.fromUnix(parseInt(query.date as any)).startOf('month');
		}
		return await this.dtService.balance_detail(user, date);
	}

	@Get('balance_send_mail')
	public async balance_send_mail(@Req() req: Request, @Query() query: { id: string; date: number }) {
		let user: User = req.user;
		if (query.id) {
			user = await User.createQueryBuilder('user')
				.leftJoinAndSelect('user.country', 'country')
				.leftJoinAndSelect('country.time_zones', 'time_zones')
				.where('user.id = :id', { id: query.id })
				.getOne();
		}
		let date = user.DateTime.now().startOf('month');
		if (query.date) {
			date = user.DateTime.fromUnix(parseInt(query.date as any)).startOf('month');
		}
		return await this.dtService.balance_send_mail(user, date);
	}

	@Get('set_reinvestment')
	public async set_reinvestment(
		@Req() req: Request,
		@Query() query: { user_id: string; id: string; reinvestment: string },
	) {
		let user: User = req.user;
		if (query.user_id) {
			user = await User.createQueryBuilder('user')
				.leftJoinAndSelect('user.country', 'country')
				.leftJoinAndSelect('country.time_zones', 'time_zones')
				.where('user.id = :id', { id: query.user_id })
				.getOne();
		}
		return await this.dtService.set_reinvestment(user, query.id, query.reinvestment === 'true');
	}

	@Get('balance_graphic')
	public async balance_graphic(@Req() req: Request, @Query() query: { id: string }) {
		let user: User = req.user;
		if (query.id) {
			user = await User.createQueryBuilder('user')
				.leftJoinAndSelect('user.country', 'country')
				.leftJoinAndSelect('country.time_zones', 'time_zones')
				.where('user.id = :id', { id: query.id })
				.getOne();
		}
		return await this.dtService.balance_graphic(user);
	}

	@Post('get_stripe')
	public async get_stripe(@Body() data: DepositDto) {
		return await this.dtService.get_stripe(data);
	}

	@Post('get_coinpayments')
	public async get_coinpayments(@Req() req: Request, @Body() data: DepositDto & { currency: string }) {
		let user: User = req.user;
		if (data.id) {
			user = await User.createQueryBuilder('user')
				.leftJoinAndSelect('user.country', 'country')
				.leftJoinAndSelect('country.time_zones', 'time_zones')
				.where('user.id = :id', { id: data.id })
				.getOne();
		}
		return await this.dtService.get_coinpayments(user, data);
	}

	@Post('status_coinpayments')
	public async status_coinpayments(@Body() data: { txid: string }) {
		return await this.dtService.status_coinpayments(data.txid);
	}

	@Post('get_stripe_donation')
	public async get_stripe_donation(@Body() data: { money: number }) {
		return await this.dtService.get_stripe_donation(data);
	}

	@Post('get_coinpayments_donation')
	public async get_coinpayments_donation(@Body() data: { money: number; currency: string }) {
		return await this.dtService.get_coinpayments_donation(data);
	}

	@Post('get_stripe_support_payment')
	public async get_stripe_support_payment(@Body() data: SupportPaymentDto) {
		return await this.dtService.get_stripe_support_payment(data);
	}

	@Post('get_coinpayments_support_payment')
	public async get_coinpayments_support_payment(
		@Req() req: Request,
		@Body() data: SupportPaymentDto & { currency: string },
	) {
		let user: User = req.user;
		if (data.userId) {
			user = await User.createQueryBuilder('user')
				.leftJoinAndSelect('user.country', 'country')
				.leftJoinAndSelect('country.time_zones', 'time_zones')
				.where('user.id = :id', { id: data.userId })
				.getOne();
		}
		return await this.dtService.get_coinpayments_support_payment(user, data);
	}

	@Post('preregister')
	public async preregister(@Body() data: PreregisterDto) {
		data = new PreregisterDto(data);
		const errors = data.validate();
		if (errors.length) {
			return { error: errors[0] };
		} else {
			return await this.dtService.preregister(data);
		}
	}
}
