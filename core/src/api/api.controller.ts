import { Controller, Get, Post, Patch, Body, Req, Request, Query } from '@app/http';
import { ApiService } from './api.service';
import { SignupDto, UpdateDto } from './api.dto';

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

	@Get('memberships')
	public async memberships() {
		return await this.apiService.memberships();
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
			return await this.apiService.update_client(query.id, data);
		}
	}
}
