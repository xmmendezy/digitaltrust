import { Column, Entity, ManyToMany, JoinTable } from 'typeorm';

import { BaseEntityTD } from '@app/util/base.util';
import { INotice } from '../td.interface';
import { Course } from './course.entity';

@Entity({
	name: 'td_notice',
})
export class Notice extends BaseEntityTD implements INotice {
	constructor(data: INotice) {
		super();
		if (data) {
			this.title = data.title;
			this.description = data.description;
			this.url = data.url;
			this.courses = data.courses as Course[];
		}
	}

	@Column({
		nullable: false,
	})
	public title: string;

	@Column({
		type: 'text',
		default: '',
	})
	public description: string;

	@Column({
		default: '',
	})
	public url: string;

	@ManyToMany(() => Course, (courses) => courses.notices)
	@JoinTable()
	public courses: Course[];
}
