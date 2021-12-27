import { Entity, Column } from 'typeorm';
import { BaseEntityDT } from '@app/util/base.util';
import { IDeposit, PaymentMethod } from '../dt.interface';

@Entity({
	name: 'dt_deposit',
})
export class Deposit extends BaseEntityDT implements IDeposit {
	constructor(data: IDeposit) {
		super();
		if (data) {
			this.date = data.date;
			this.suscriptionId = data.suscriptionId;
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
	public suscriptionId: string;

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
