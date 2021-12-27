import { Entity, Column } from 'typeorm';
import { BaseEntityDT } from '@app/util/base.util';
import { ISupportPayment, PaymentMethod } from '../dt.interface';

@Entity({
	name: 'dt_support_payment',
})
export class SupportPayment extends BaseEntityDT implements ISupportPayment {
	constructor(data: ISupportPayment) {
		super();
		if (data) {
			this.date = data.date;
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
