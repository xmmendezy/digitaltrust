import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './api/api.module';
import { join } from 'path';
import ormconfig from '@orm';
import config from '@config';

@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, 'view'),
			exclude: ['/api*', '/app*'],
			serveRoot: '/',
		}),
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, 'app'),
			serveRoot: '/app',
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
				from: `"DigitalTrust" <${config.email.user}>`,
			},
		}),
		ApiModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule { }
