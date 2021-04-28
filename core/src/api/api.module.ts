import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { User, Country, TimeZone, HQuery, HLogin } from './api.entity';
import { LoginMiddleware, JwtMiddleware } from './api.middlewares';

import { JwtStrategy, LocalStrategy } from './passport';

@Module({
	imports: [TypeOrmModule.forFeature([User, Country, TimeZone, HQuery, HLogin])],
	controllers: [ApiController],
	providers: [ApiService, JwtStrategy, LocalStrategy],
	exports: [ApiService],
})
export class ApiModule implements NestModule {
	public configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoginMiddleware).forRoutes('/api/login');
		consumer.apply(JwtMiddleware).exclude('/api/login', '/api/signup').forRoutes(ApiController);
	}
}