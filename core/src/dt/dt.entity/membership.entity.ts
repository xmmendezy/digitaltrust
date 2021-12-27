import { Column, Entity } from 'typeorm';
import { BaseEntityDT } from '@app/util/base.util';
import { IMembership } from '../dt.interface';

@Entity({
	name: 'dt_membership',
})
export class Membership extends BaseEntityDT implements IMembership {
	@Column({
		nullable: false,
	})
	public name: string;

	@Column({
		nullable: true,
	})
	public description_es: string;

	@Column({
		nullable: true,
	})
	public description_en: string;

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
