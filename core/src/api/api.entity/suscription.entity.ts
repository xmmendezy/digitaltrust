import { Entity, Column } from 'typeorm';
import { BaseEntity } from '@app/util/base.util';
import { ISuscription } from '../api.interface';

@Entity({
	name: 'suscription',
})
export class Suscription extends BaseEntity implements ISuscription {
	constructor(data: ISuscription) {
		super();
		if (data) {
			this.userId = data.userId;
			this.date_begin = data.date_begin;
			this.date_end = data.date_end;
			this.membershipId = data.membershipId;
			this.reinvestment = data.reinvestment;
		}
	}

	@Column('uuid')
	public userId: string;

	@Column({
		type: 'float8',
		default: 0,
	})
	public date_begin: number;

	@Column({
		type: 'float8',
		default: 0,
	})
	public date_end: number;

	@Column('uuid')
	public membershipId: string;

	@Column({
		default: false,
		nullable: false,
	})
	public reinvestment: boolean;
}
