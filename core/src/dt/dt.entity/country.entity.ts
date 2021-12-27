import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntityDT } from '@app/util/base.util';
import { ICountry } from '../dt.interface';
import { TimeZone } from './time_zone.entity';
import { User } from './user.entity';

@Entity({
	name: 'dt_country',
})
export class Country extends BaseEntityDT implements ICountry {
	@Column({
		nullable: false,
	})
	public name: string;

	@Column({
		nullable: true,
	})
	public code: string;

	@Column({
		nullable: false,
		default: 'es',
	})
	public locale: string;

	@Column({
		nullable: true,
	})
	public telephone_code: string;

	@OneToMany(() => TimeZone, (timezone) => timezone.country, {
		eager: true,
	})
	public time_zones: TimeZone[];

	@OneToMany(() => User, (user) => user.country)
	public users: User[];

	public id_time_zone: string;

	get time_zone(): TimeZone {
		if (this.id_time_zone) {
			return this.time_zones.find((tz) => tz.id === this.id_time_zone) || this.time_zones[0];
		} else {
			return this.time_zones[0];
		}
	}
}
