import { Column, Entity } from 'typeorm';
import { BaseEntityTD } from '@app/util/base.util';

@Entity({
	name: 'td_subscribe_mail',
})
export class SubscribeMail extends BaseEntityTD {
	@Column({
		nullable: false,
		unique: true,
	})
	public email: string;
}
