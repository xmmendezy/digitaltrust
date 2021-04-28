import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './api/api.module';
import { join } from 'path';
import ormconfig from '@orm';

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
		ApiModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
