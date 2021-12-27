import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseEntityDT } from '@app/util/base.util';
import { ITimeZone } from '../dt.interface';
import { Country } from './country.entity';

@Entity({
	name: 'dt_time_zone',
})
export class TimeZone extends BaseEntityDT implements ITimeZone {
	@Column({
		nullable: false,
	})
	public value: string;

	@ManyToOne(() => Country, (country) => country.time_zones)
	public country: Country;
}
