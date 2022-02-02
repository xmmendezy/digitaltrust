import { Column, Entity } from 'typeorm';
import { BaseEntityDT } from '@app/util/base.util';

@Entity({
	name: 'dt_suscribe_mail',
})
export class SuscribeMail extends BaseEntityDT {
	@Column({
		nullable: false,
		unique: true,
	})
	public email: string;
}
