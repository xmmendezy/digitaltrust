import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity({
	name: 'td_h_login',
})
export class HLogin extends BaseEntity {
	constructor(user: User, date: number) {
		super();
		this.user = user;
		this.date = date;
	}

	@PrimaryGeneratedColumn('uuid')
	public id: string;

	@ManyToOne(() => User, (user) => user.h_login)
	public user: User;

	@Column({
		type: 'float8',
		nullable: true,
		default: 0,
	})
	public date: number;
}

@Entity({
	name: 'td_h_query',
})
export class HQuery extends BaseEntity {
	constructor(user: User, date: number) {
		super();
		this.user = user;
		this.date = date;
	}

	@PrimaryGeneratedColumn('uuid')
	public id: string;

	@ManyToOne(() => User, (user) => user.h_login)
	public user: User;

	@Column({
		type: 'float8',
		nullable: true,
		default: 0,
	})
	public date: number;
}
