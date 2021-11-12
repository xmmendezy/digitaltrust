import { Injectable } from '@nestjs/common';
import passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../dt.entity';
import config from '@config';

@Injectable()
export class JwtStrategy extends Strategy {
	constructor() {
		super(
			{
				jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
				passReqToCallback: true,
				secretOrKey: config.secret_key,
			},
			async (req, payload, next) => await this.verify(req, payload, next),
		);
		passport.use('dt_jwt', this as Strategy);
	}

	public async verify(req, payload, done) {
		return await User.createQueryBuilder('user')
			.leftJoinAndSelect('user.country', 'country')
			.leftJoinAndSelect('country.time_zones', 'time_zones')
			.where('user.id = :id', { id: payload.id })
			.getOne()
			.then(async (user: any) => {
				if (!user) {
					return Promise.reject('login.error.u1');
				}
				await user.time_query();
				await user.save();
				done(null, user);
			})
			.catch((e) => {
				done(e, false);
			});
	}
}
