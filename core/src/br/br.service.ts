import { Injectable } from '@nestjs/common';
import { Error } from '@app/util/base.util';

import { MailerService } from '@nestjs-modules/mailer';
import { join } from 'path';
import { readFileSync } from 'fs';
import handlebars from 'handlebars';

import config from '@config';

@Injectable()
export class BRService {
	constructor(private readonly mailerService: MailerService) {}

	public async send_data(data: any): Promise<Error> {
		const templeate_hbs = readFileSync(join(__dirname, '..', 'mails', 'br_new_data.hbs'), 'utf8');
		const template_compile = handlebars.compile(templeate_hbs);
		return await this.mailerService
			.sendMail({
				to: config.email.user,
				subject: 'BlackRockLoans - New data',
				html: template_compile(data),
			})
			.then(() => {
				return { error: '' };
			})
			.catch(() => {
				return { error: 'e000' };
			});
	}
}
