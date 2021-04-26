import { Controller, Get, Res, Response } from '@api/http';
import { ApiService } from './app.service';

@Controller()
export class ApiController {
	constructor(private readonly apiService: ApiService) {}

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
