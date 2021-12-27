import { Column, Entity, OneToMany, ManyToMany } from 'typeorm';
import { BaseEntityTD } from '@app/util/base.util';
import { ICourse } from '../td.interface';
import { User } from './user.entity';
import { Invoice } from './invoice.entity';
import { Notice } from './notice.entity';

@Entity({
	name: 'td_course',
})
export class Course extends BaseEntityTD implements ICourse {
	@Column({
		nullable: false,
	})
	public name: string;

	@Column({
		type: 'float8',
		default: 0,
	})
	public price: number;

	@Column({
		default: 1,
	})
	public months: number;

	@Column({
		default: false,
	})
	public blog: boolean;

	@OneToMany(() => User, (user) => user.course)
	public users: User[];

	@OneToMany(() => Invoice, (invoices) => invoices.course)
	public invoices: Invoice[];

	@ManyToMany(() => Notice, (notice) => notice.courses)
	public notices: Notice[];
}
