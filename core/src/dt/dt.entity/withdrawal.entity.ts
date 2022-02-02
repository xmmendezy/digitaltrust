import { Entity, Column } from 'typeorm';
import { BaseEntityDT } from '@app/util/base.util';
import { IWithdrawal, WithdrawalMethod } from '../dt.interface';

@Entity({
	name: 'dt_withdrawal',
})
export class Withdrawal extends BaseEntityDT implements IWithdrawal {
	constructor(data: IWithdrawal) {
		super();
		if (data) {
			this.userId = data.userId;
			this.date = data.date;
			this.money = data.money;
			this.withdrawal_method = data.withdrawal_method;
			this.status = data.status;
			this.reference = data.reference;
		}
	}

	@Column('uuid')
	public userId: string;

	@Column({
		type: 'float8',
		default: 0,
	})
	public date: number;

	@Column({
		type: 'float8',
		default: 0,
	})
	public money: number;

	@Column({
		type: 'enum',
		enum: WithdrawalMethod,
		nullable: false,
	})
	public withdrawal_method: WithdrawalMethod;

	@Column({
		default: false,
		nullable: false,
	})
	public status: boolean;

	@Column({
		default: 'default',
	})
	public reference: string;
}
