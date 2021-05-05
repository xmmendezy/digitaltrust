import { Controller, Get, Post, Patch, Body, Req, Request, Query } from '@app/http';
import { ApiService } from './api.service';
import { SignupDto, UpdateDto, DepositDto, WithdrawalDto } from './api.dto';
import { User } from './api.entity';
import { UserRole } from './api.interface';

@Controller('api')
export class ApiController {
	constructor(private readonly apiService: ApiService) {}

	@Post('signup')
	public async signup(@Body() data: SignupDto) {
		data = new SignupDto(data);
		const errors = data.validate();
		if (errors.length) {
			return { error: errors[0] };
		} else {
			return await this.apiService.signup(data);
		}
	}

	@Post('login')
	public async login(@Req() req: Request) {
		return await this.apiService.createToken(req.user);
	}

	@Patch('user')
	public async update(@Req() req: Request, @Body() data: UpdateDto) {
		data = new UpdateDto(data);
		const errors = data.validate();
		if (errors.length) {
			return { error: errors[0] };
		} else {
			return await this.apiService.update(req.user, data);
		}
	}

	@Get('ref_user')
	public async ref_user(@Query() query: { id: string }) {
		return await this.apiService.ref_user(query.id);
	}

	@Get('is_refer')
	public async is_refer(@Req() req: Request) {
		return await this.apiService.is_refer(req.user);
	}

	@Get('clients')
	public async clients(@Req() req: Request) {
		if (req.user.role === 'admin') {
			return await this.apiService.clients();
		} else {
			return [];
		}
	}

	@Get('client')
	public async client(@Req() req: Request, @Query() query: { id: string }) {
		if (req.user.role === 'admin') {
			return await this.apiService.client(query.id);
		} else {
			return [];
		}
	}

	@Patch('client')
	public async update_client(@Req() req: Request, @Query() query: { id: string }, @Body() data: UpdateDto) {
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
			return await this.apiService.update(user, data);
		}
	}

	@Get('memberships')
	public async memberships() {
		return await this.apiService.memberships();
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
		return await this.apiService.suscriptions(user);
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
		return await this.apiService.create_suscription(user, date, data.membershipId);
	}

	@Post('deposit')
	public async process_deposit(@Req() req: Request, @Body() data: DepositDto) {
		const user: User = req.user;
		let date = user.DateTime.now();
		if (data.date) {
			date = user.DateTime.fromUnix(parseInt(data.date as any));
		}
		return await this.apiService.process_deposit(user, date, data);
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
		return await this.apiService.withdrawals(user, date);
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
		return await this.apiService.withdrawals_alert(user);
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
		return await this.apiService.request_withdrawal(user, date, data, req.user.role === UserRole.ADMIN);
	}

	@Post('process_withdrawal')
	public async process_withdrawal(@Body() data: { id: string }) {
		return await this.apiService.process_withdrawal(data.id);
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
		return await this.apiService.records(user);
	}

	@Get('balance')
	public async balance(@Req() req: Request) {
		return await this.apiService.balance(req.user);
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
		return await this.apiService.balance_detail(user, date);
	}
}
