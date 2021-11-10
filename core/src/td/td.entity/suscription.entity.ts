import { Entity, Column } from 'typeorm';
import { BaseEntity } from '@app/util/base.util';
import { ISuscription, PaymentMethod } from '../td.interface';

@Entity({
	name: 'dt_suscription',
})
export class Suscription extends BaseEntity implements ISuscription {
	constructor(data: ISuscription) {
		super();
		if (data) {
			this.date = data.date;
			this.membershipId = data.membershipId;
			this.userId = data.userId;
			this.money = data.money;
			this.payment_method = data.payment_method;
			this.reference = data.reference;
		}
	}

	@Column({
		type: 'float8',
		default: 0,
	})
	public date: number;

	@Column('uuid')
	public membershipId: string;

	@Column('uuid')
	public userId: string;

	@Column({
		type: 'float8',
		default: 0,
	})
	public money: number;

	@Column({
		type: 'enum',
		enum: PaymentMethod,
		nullable: false,
	})
	public payment_method: PaymentMethod;

	@Column({
		default: 'default',
	})
	public reference: string;
}
