import { Injectable } from '@nestjs/common';
import { Error } from '@app/util/base.util';
import { User, Country } from './api.entity';
import { SignupDto, UserDto, TokenDto } from './api.dto';

import jwt from 'jsonwebtoken';
import config from '@config';

@Injectable()
export class ApiService {
	public async signup(data: SignupDto, test: boolean = false): Promise<TokenDto | Error> {
		const country = await Country.createQueryBuilder('country')
			.leftJoinAndSelect('country.time_zones', 'time_zones')
			.where('country.id = :id', { id: data.country })
			.getOne();
		if (!country) {
			return { error: 'validator.auth.i' };
		}
		const user = new User({ ...data, country });
		const error: Error = { error: '' };
		if (
			await User.createQueryBuilder('user')
				.where('user.telephone = :telephone', { telephone: user.telephone })
				.getCount()
		) {
			return { error: 'validator.auth.j' };
		}
		if (await User.createQueryBuilder('user').where('user.email = :email', { email: user.email }).getCount()) {
			return { error: 'validator.auth.k' };
		}
		await user.set_password(user.password);
		await user.save();
		if (user.errors.length) {
			return { error: user.errors[0] };
		}
		await user.time_login();
		await user.time_query();
		await user.save();
		return await this.createToken(user);
	}

	public async createToken(user: User | UserDto): Promise<TokenDto> {
		const expiresIn = config.jwt_expiration;
		const secretOrKey = config.secret_key;
		user = new UserDto(user);
		const user_data = JSON.parse(JSON.stringify(user));
		const accessToken = jwt.sign(user_data, secretOrKey, { expiresIn });
		return new TokenDto({
			expiresIn,
			accessToken,
			user,
		});
	}
}
