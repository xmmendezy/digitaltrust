import { Injectable } from '@nestjs/common';
import passport from 'passport';
import { Strategy, IVerifyOptions } from 'passport-local';
import { User } from '../dt.entity';

@Injectable()
export class LocalStrategy extends Strategy {
	constructor() {
		super(
			{
				usernameField: 'username',
				passReqToCallback: false,
			},
			async (
				username: string,
				password: string,
				done: (error: any, user?: any, options?: IVerifyOptions) => void,
			) => await this.login(username, password, done),
		);
		passport.use('dt_local', this as Strategy);
	}

	public async login(
		username: string,
		password: string,
		done: (error: any, user?: any, options?: IVerifyOptions) => void,
	) {
		return await User.createQueryBuilder('user')
			.leftJoinAndSelect('user.country', 'country')
			.leftJoinAndSelect('country.time_zones', 'time_zones')
			.where('user.username = :username')
			.orWhere('user.email = :username')
			.setParameters({ username })
			.getOne()
			.then(async (user: any) => {
				if (!user) {
					return Promise.reject('login.error.u1');
				}
				if (await user.compare_password(password)) {
					await user.time_login();
					await user.save();
					return done(null, user);
				} else {
					return Promise.reject('login.error.u2');
				}
			})
			.catch((e) => {
				done(e, false);
			});
	}
}
