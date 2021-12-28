import { Controller, Get, Post, Patch, Delete, Body, Req, Request, Query, Param } from '@app/td/http';
import { TDService } from './td.service';
import { SignupDto, UpdateDto, NoticeDto, BlogDto, I4GeeksCharge } from './td.dto';
import { User } from './td.entity';

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

	@Get('subscribe_course')
	public async get_subscribe_course(@Req() req: Request) {
		return await this.tdService.get_subscribe_course(req.user);
	}

	@Post('subscribe_course')
	public async post_subscribe_course(@Req() req: Request, @Body() data: { course: string }) {
		return await this.tdService.post_subscribe_course(req.user, data.course);
	}

	@Get('status')
	public async status(@Req() req: Request) {
		return await this.tdService.status(req.user);
	}

	@Post('paypal')
	public async post_paypal(@Req() req: Request, @Body() data: { reference: string }) {
		return await this.tdService.post_paypal(req.user, data.reference);
	}

	@Get('coinbase')
	public async get_coinbase(@Req() req: Request) {
		return await this.tdService.get_coinbase(req.user);
	}

	@Post('coinbase')
	public async post_coinbase(@Body() data: { code: string }) {
		console.log(data);
		return await this.tdService.post_coinbase(data.code);
	}

	@Post('4geeks')
	public async post_4geeks(@Req() req: Request, @Body() data: I4GeeksCharge) {
		return await this.tdService.post_4geeks(req.user, data);
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

	@Get('ref_user')
	public async ref_user(@Query() query: { id: string }) {
		return await this.tdService.ref_user(query.id);
	}

	@Get('is_refer')
	public async is_refer(@Req() req: Request) {
		return await this.tdService.is_refer(req.user);
	}

	@Get('courses')
	public async courses(@Req() req: Request) {
		return await this.tdService.courses();
	}

	@Get('clients')
	public async clients(@Req() req: Request) {
		if (req.user.role === 'admin') {
			return await this.tdService.clients();
		} else {
			return [];
		}
	}

	@Get('subscribe_mails')
	public async subscribe_mails(@Req() req: Request) {
		if (req.user.role === 'admin') {
			return await this.tdService.subscribe_mails();
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

	@Get('notice')
	public async get_notices(@Req() req: Request) {
		return await this.tdService.get_notices(req.user);
	}

	@Post('notice')
	public async notice(@Req() req: Request, @Body() data: NoticeDto) {
		data = new NoticeDto(data);
		const errors = data.validate();
		if (errors.length) {
			return { error: errors[0] };
		} else {
			if (req.user.role === 'admin') {
				return await this.tdService.notice(data);
			} else {
				return { error: 'login.error.u1' };
			}
		}
	}

	@Delete('notice/:id')
	public async delete_notice(@Req() req: Request, @Param('id') id: string) {
		if (req.user.role === 'admin') {
			return await this.tdService.delete_notice(id);
		} else {
			return { error: 'login.error.u1' };
		}
	}

	@Get('blog')
	public async get_blogs(@Req() req: Request) {
		return await this.tdService.get_blogs(req.user);
	}

	@Post('blog')
	public async blog(@Req() req: Request, @Body() data: BlogDto) {
		data = new BlogDto(data);
		const errors = data.validate();
		if (errors.length) {
			return { error: errors[0] };
		} else {
			if (req.user.role === 'admin') {
				return await this.tdService.blog(data);
			} else {
				return { error: 'login.error.u1' };
			}
		}
	}

	@Delete('blog/:id')
	public async delete_blog(@Req() req: Request, @Param('id') id: string) {
		if (req.user.role === 'admin') {
			return await this.tdService.delete_blog(id);
		} else {
			return { error: 'login.error.u1' };
		}
	}
}
