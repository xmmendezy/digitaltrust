import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';
import { ScheduleModule } from '@nestjs/schedule';
import { AppException } from './app.exception';
import { DTModule } from './dt/dt.module';
import { TDModule } from './td/td.module';
import { BRModule } from './br/br.module';
import { join } from 'path';
import ormconfig from '@orm';
import config from '@config';

@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, 'dt_app'),
			serveRoot: '/dt_app',
		}),
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, 'td_app'),
			serveRoot: '/td_app',
		}),
		TypeOrmModule.forRoot(ormconfig),
		MailerModule.forRoot({
			transport: {
				host: 'send.one.com',
				port: 587,
				secure: false,
				requireTLS: true,
				auth: {
					user: config.email.user,
					pass: config.email.password,
				},
			},
			defaults: {
				from: `"DigitalGroup.co" <${config.email.user}>`,
			},
		}),
		ScheduleModule.forRoot(),
		DTModule,
		TDModule,
		BRModule,
	],
	controllers: [],
	providers: [
		{
			provide: APP_FILTER,
			useClass: AppException,
		},
	],
})
export class AppModule {}
