import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from '@app/td/http';
import passport from 'passport';
import { User } from '@app/td/td.entity';

@Injectable()
export class LoginMiddleware implements NestMiddleware {
	async use(req: Request, res: Response, next: NextFunction) {
		return await passport.authenticate('td_local', { session: false }, (err, user: User, info) => {
			if (err) {
				res.json({ error: err });
				return;
			} else if (typeof info !== 'undefined') {
				switch (info.message) {
					case 'No auth token':
					case 'invalid signature':
					case 'jwt malformed':
						res.json({ error: 'login.error.u1' });
						break;
					case 'jwt expired':
						res.json({ error: 'login.error.u3' });
						break;
				}
				return;
			} else {
				req.user = user;
				next();
			}
		})(req, res, next);
	}
}
