import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity({
	name: 'h_login',
})
export class HLogin extends BaseEntity {
	constructor(user: User, date: Date) {
		super();
		this.user = user;
		this.date = date;
	}

	@PrimaryGeneratedColumn('uuid')
	public id: string;

	@ManyToOne(() => User, (user) => user.h_login)
	public user: User;

	@Column('timestamptz')
	public date: Date;
}

@Entity({
	name: 'h_query',
})
export class HQuery extends BaseEntity {
	constructor(user: User, date: Date) {
		super();
		this.user = user;
		this.date = date;
	}

	@PrimaryGeneratedColumn('uuid')
	public id: string;

	@ManyToOne(() => User, (user) => user.h_login)
	public user: User;

	@Column('timestamptz')
	public date: Date;
}
