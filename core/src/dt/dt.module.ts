import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DTController } from './dt.controller';
import { DTService } from './dt.service';
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
	SuscribeMail,
	Record,
} from './dt.entity';
import { LoginMiddleware, JwtMiddleware } from './dt.middlewares';

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
			SuscribeMail,
			Record,
		]),
	],
	controllers: [DTController],
	providers: [DTService, JwtStrategy, LocalStrategy],
	exports: [DTService],
})
export class DTModule implements NestModule {
	public configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoginMiddleware).forRoutes('/dt/api/login');
		consumer
			.apply(JwtMiddleware)
			.exclude(
				'/dt/api/ping',
				'/dt/api/suscribe_mail/:email',
				'/dt/api/login',
				'/dt/api/reset_password',
				'/dt/api/signup',
				'/dt/api/link_traiding',
				'/dt/api/preregister',
				'/dt/api/ref_user',
				'/dt/api/get_stripe_donation',
				'/dt/api/get_coinpayments_donation',
			)
			.forRoutes(DTController);
	}
}
