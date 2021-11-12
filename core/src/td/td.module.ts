import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TDController } from './td.controller';
import { TDService } from './td.service';
import { User, Country, TimeZone, HQuery, HLogin, Membership, Suscription, SuscribeMail } from './td.entity';
import { LoginMiddleware, JwtMiddleware } from './td.middlewares';

import { JwtStrategy, LocalStrategy } from './passport';

@Module({
	imports: [
		TypeOrmModule.forFeature([User, Country, TimeZone, HQuery, HLogin, Membership, Suscription, SuscribeMail]),
	],
	controllers: [TDController],
	providers: [TDService, JwtStrategy, LocalStrategy],
	exports: [TDService],
})
export class TDModule implements NestModule {
	public configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoginMiddleware).forRoutes('/td/api/login');
		consumer
			.apply(JwtMiddleware)
			.exclude(
				'/td/api/ping',
				'/td/api/suscribe_mail/:email',
				'/td/api/login',
				'/td/api/reset_password',
				'/td/api/signup',
				'/td/api/preregister',
				'/td/api/ref_user',
			)
			.forRoutes(TDController);
	}
}
