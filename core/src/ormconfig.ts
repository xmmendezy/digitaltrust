import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const ormconfig: TypeOrmModuleOptions = {
	type: process.env.ORMCONFIG_TYPE,
	host: process.env.ORMCONFIG_HOST,
	port: parseInt(process.env.ORMCONFIG_PORT),
	username: process.env.ORMCONFIG_USERNAME,
	password: process.env.ORMCONFIG_PASSWORD,
	database: process.env.ORMCONFIG_DATABASE,
	synchronize: true,
	entities: [__dirname + '/**/*.entity.{ts,js}'],
} as TypeOrmModuleOptions;

export default ormconfig;
