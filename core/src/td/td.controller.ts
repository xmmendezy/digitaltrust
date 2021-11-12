import { Controller, Get, Post, Patch, Delete, Body, Req, Request, Query, Param } from '@app/dt/http';
import { TDService } from './td.service';
import { SignupDto, UpdateDto, SuscriptionDto } from './td.dto';
import { User } from './td.entity';
import { UserRole, IMembership } from './td.interface';

@Controller('td/api')
export class TDController {
	constructor(private readonly tdService: TDService) {}

	@Get('ping')
	public async ping() {
		return { error: '' };
	}

	@Get('suscribe_mail/:email')
	public async suscribe_mail(@Param('email') email: string) {
		return await this.tdService.suscribe_mail(email);
	}

	@Post('signup')
	public async signup(@Body() data: SignupDto) {
		data = new SignupDto(data);
		const errors = data.validate();
		if (errors.length) {
			return { error: errors[0] };
		} else {
			return await this.tdService.signup(data);
		}
	}

	@Post('login')
	public async login(@Req() req: Request) {
		return await this.tdService.createToken(req.user);
	}

	@Get('reset_password')
	public async reset_password(@Query('email') email: string) {
		return await this.tdService.reset_password(email);
	}

	@Patch('user')
	public async update(@Req() req: Request, @Body() data: UpdateDto) {
		data = new UpdateDto(data);
		const errors = data.validate();
		if (errors.length) {
			return { error: errors[0] };
		} else {
			return await this.tdService.update(req.user, data);
		}
	}

	@Patch('see_welcome')
	public async see_welcome(@Req() req: Request) {
		return await this.tdService.see_welcome(req.user);
	}

	@Get('ref_user')
	public async ref_user(@Query() query: { id: string }) {
		return await this.tdService.ref_user(query.id);
	}

	@Get('is_refer')
	public async is_refer(@Req() req: Request) {
		return await this.tdService.is_refer(req.user);
	}

	@Get('clients')
	public async clients(@Req() req: Request) {
		if (req.user.role === 'admin') {
			return await this.tdService.clients();
		} else {
			return [];
		}
	}

	@Get('client')
	public async client(@Req() req: Request, @Query() query: { id: string }) {
		if (req.user.role === 'admin') {
			return await this.tdService.client(query.id);
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
			return await this.tdService.update(user, data);
		}
	}

	@Delete('client')
	public async remove_client(@Req() req: Request, @Query() query: { id: string }) {
		if (req.user.role === 'admin') {
			return await this.tdService.remove_client(query.id);
		} else {
			return [];
		}
	}

	@Get('memberships')
	public async memberships(@Req() req: Request) {
		return await this.tdService.memberships(req.user);
	}

	@Post('memberships')
	public async update_memberships(@Req() req: Request, @Body() data: IMembership[]) {
		return await this.tdService.update_memberships(req.user, data);
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
		return await this.tdService.suscriptions(user);
	}

	@Post('suscription')
	public async create_suscription(@Req() req: Request, @Query() query: { id: string }, @Body() data: SuscriptionDto) {
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
		return await this.tdService.create_suscription(user, date, data);
	}
}
