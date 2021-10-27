import { Column, Entity } from 'typeorm';
import { BaseEntity } from '@app/util/base.util';

@Entity({
	name: 'dt_suscribe_mail',
})
export class SuscribeMail extends BaseEntity {
	@Column({
		nullable: false,
		unique: true,
	})
	public email: string;
}
