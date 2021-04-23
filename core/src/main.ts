import { addAliases } from 'module-alias';
import { join } from 'path';

addAliases({
	'@api': __dirname,
	'@config': join(__dirname, 'config'),
	'@orm': join(__dirname, 'ormconfig'),
});

import 'module-alias/register';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ApiModule } from './api.module';
import config from '@config';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { json, urlencoded } from 'body-parser';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(ApiModule);
	app.enableCors();
	app.setViewEngine('hbs');
	app.setGlobalPrefix('api');
	app.use(helmet());
	app.use(
		rateLimit({
			windowMs: 5 * 60 * 1000,
			max: 10000,
		}),
	);
	app.use(json({ limit: '50mb' }));
	app.use(urlencoded({ limit: '50mb', extended: true }));

	if (config.production) {
		app.set('trust proxy', true);
	}

	await app.listen(config.port);
}

bootstrap();
