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

	@Get('vision')
	public async vision(@Res() res: Response) {
		res.sendFile('vision.html', {
			root: 'view',
		});
	}

	@Get('es/vision')
	public async es_vision(@Res() res: Response) {
		res.sendFile('vision.html', {
			root: 'view/es',
		});
	}

	@Get('friendly')
	public async friendly(@Res() res: Response) {
		res.sendFile('friendly.html', {
			root: 'view',
		});
	}

	@Get('es/friendly')
	public async es_friendly(@Res() res: Response) {
		res.sendFile('friendly.html', {
			root: 'view/es',
		});
	}

	@Get('help')
	public async help(@Res() res: Response) {
		res.sendFile('help.html', {
			root: 'view',
		});
	}

	@Get('es/help')
	public async es_help(@Res() res: Response) {
		res.sendFile('help.html', {
			root: 'view/es',
		});
	}
}
