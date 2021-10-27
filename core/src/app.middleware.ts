import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from '@app/http';

@Injectable()
export class ViewMiddleware implements NestMiddleware {
	async use(req: Request, res: Response, next: NextFunction) {
		console.log(req.path);
		if (req.path.match('^(?!dt|td).*')) {
			next();
		} else {
			res.json({ error: 'page' });
			res.sendStatus(200);
			res.end();
		}
	}
}
