import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from '@app/dt/http';
import passport from 'passport';
import { User } from '@app/dt/dt.entity';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
	async use(req: Request, res: Response, next: NextFunction) {
		return await passport.authenticate('jwt', { session: false }, (err, user: User, info) => {
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
