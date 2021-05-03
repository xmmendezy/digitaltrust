import { Entity, Column } from 'typeorm';
import { BaseEntity } from '@app/util/base.util';
import { IRecord } from '../api.interface';

@Entity({
	name: 'record',
})
export class Record extends BaseEntity implements IRecord {
	constructor(data: IRecord) {
		super();
		if (data) {
			this.userId = data.userId;
			this.date = data.date;
			this.balance = data.balance;
			this.withdrawal = data.withdrawal;
			this.earning = data.earning;
			this.earning_extra = data.earning_extra;
			this.investment = data.investment;
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
	public balance: number;

	@Column({
		type: 'float8',
		default: 0,
	})
	public withdrawal: number;

	@Column({
		type: 'float8',
		default: 0,
	})
	public earning: number;

	@Column({
		type: 'float8',
		default: 0,
	})
	public earning_extra: number;

	@Column({
		type: 'float8',
		default: 0,
	})
	public investment: number;
}
