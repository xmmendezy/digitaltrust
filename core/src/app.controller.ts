import { Controller, Get, Res, Response } from '@app/http';
import { AppService } from './app.service';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get('about')
	public async about(@Res() res: Response) {
		res.sendFile('about.html', {
			root: 'view',
		});
	}

	@Get('es/about')
	public async es_about(@Res() res: Response) {
		res.sendFile('about.html', {
			root: 'view/es',
		});
	}
}
