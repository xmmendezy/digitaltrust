import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '@app/util/base.util';
import { IMembership } from '@app/api/api.interface';

@Entity({
	name: 'membership',
})
export class Membership extends BaseEntity implements IMembership {
	@Column({
		nullable: false,
	})
	public name: string;

	@Column({
		type: 'float8',
		default: 0,
	})
	public money_a: number;

	@Column({
		type: 'float8',
		default: 0,
	})
	public money_b: number;

	@Column({
		nullable: true,
	})
	public months: number;

	@Column({
		type: 'float',
		default: 0,
	})
	public interest: number;

	@Column({
		default: true,
	})
	public is_active: boolean;
}
