import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { join } from 'path';
import ormconfig from '@orm';

@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, 'view'),
			exclude: ['/api*', '/app*'],
		}),
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, 'app'),
			serveRoot: '/app',
		}),
		TypeOrmModule.forRoot(ormconfig),
	],
	controllers: [ApiController],
	providers: [ApiService],
})
export class ApiModule {}
