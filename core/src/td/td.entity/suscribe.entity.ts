import { Column, Entity } from 'typeorm';
import { BaseEntityTD } from '@app/util/base.util';

@Entity({
	name: 'td_suscribe_mail',
})
export class SuscribeMail extends BaseEntityTD {
	@Column({
		nullable: false,
		unique: true,
	})
	public email: string;
}
