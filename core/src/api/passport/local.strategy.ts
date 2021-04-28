import { Injectable } from '@nestjs/common';
import passport from 'passport';
import { Strategy, IVerifyOptions } from 'passport-local';
import { User } from '@app/api/api.entity';
import { UserStatus } from '@app/api/api.interface';

@Injectable()
export class LocalStrategy extends Strategy {
	constructor() {
		super(
			{
				usernameField: 'email',
				passReqToCallback: false,
			},
			async (email: string, password: string, done: (error: any, user?: any, options?: IVerifyOptions) => void) =>
				await this.login(email, password, done),
		);
		passport.use(this);
	}

	public async login(
		email: string,
		password: string,
		done: (error: any, user?: any, options?: IVerifyOptions) => void,
	) {
		return await User.createQueryBuilder('user')
			.leftJoinAndSelect('user.country', 'country')
			.leftJoinAndSelect('country.time_zones', 'time_zones')
			.where('user.email = :email', { email })
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