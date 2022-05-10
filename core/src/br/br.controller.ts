import { Controller, Post, Body } from '@app/dt/http';
import { BRService } from './br.service';

@Controller('br/api')
export class BRController {
	constructor(private readonly brService: BRService) {}

	@Post('send_data')
	public async send_data(@Body() data: any) {
		return await this.brService.send_data(data);
	}
}
