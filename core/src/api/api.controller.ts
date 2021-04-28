import { Controller, Post, Body, Req, Request } from '@app/http';
import { ApiService } from './api.service';
import { SignupDto } from './api.dto';

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
}
