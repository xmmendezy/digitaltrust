import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import {
	User,
	Country,
	TimeZone,
	HQuery,
	HLogin,
	Membership,
	Suscription,
	Deposit,
	Withdrawal,
	SupportPayment,
	Record,
} from './api.entity';
import { LoginMiddleware, JwtMiddleware } from './api.middlewares';

import { JwtStrategy, LocalStrategy } from './passport';

@Module({
	imports: [
		TypeOrmModule.forFeature([
			User,
			Country,
			TimeZone,
			HQuery,
			HLogin,
			Membership,
			Suscription,
			Deposit,
			Withdrawal,
			SupportPayment,
			Record,
		]),
	],
	controllers: [ApiController],
	providers: [ApiService, JwtStrategy, LocalStrategy],
	exports: [ApiService],
})
export class ApiModule implements NestModule {
	public configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoginMiddleware).forRoutes('/api/login');
		consumer
			.apply(JwtMiddleware)
			.exclude(
				'/api/login',
				'/api/signup',
				'/api/ref_user',
				'/api/get_stripe_donation',
				'/api/get_coinpayments_donation',
			)
			.forRoutes(ApiController);
	}
}
