import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseEntityTD } from '@app/util/base.util';
import { IInvoice } from '../td.interface';
import { User } from './user.entity';
import { Course } from './course.entity';

@Entity({
	name: 'td_invoice',
})
export class Invoice extends BaseEntityTD implements IInvoice {
	constructor(data: IInvoice) {
		super();
		if (data) {
			this.user = data.user as User;
			this.course = data.course as Course;
		}
	}

	@Column({
		nullable: true,
		default: '',
	})
	public payment_method: 'paypal' | 'coinbase' | '4geeks';

	@Column({
		default: false,
	})
	public payed: boolean;

	@Column({
		nullable: true,
		default: '',
	})
	public reference: string;

	@Column({
		nullable: true,
		default: '',
	})
	public coinbase_url: string;

	@ManyToOne(() => Course, (courses) => courses.invoices)
	public course: Course;

	@ManyToOne(() => User, (user) => user.invoices)
	public user: User;
}
