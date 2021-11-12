import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseEntity } from '@app/util/base.util';
import { ITimeZone } from '../td.interface';
import { Country } from './country.entity';

@Entity({
	name: 'td_time_zone',
})
export class TimeZone extends BaseEntity implements ITimeZone {
	@Column({
		nullable: false,
	})
	public value: string;

	@ManyToOne(() => Country, (country) => country.time_zones)
	public country: Country;
}
