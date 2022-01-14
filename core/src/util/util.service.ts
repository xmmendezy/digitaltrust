import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilService {
	static async serverSendMail(data: {
		message: string;
		email: string | string[];
		html?: boolean;
		subject?: string;
	}): Promise<boolean> {
		return true;
	}
}
