import { Column, Entity, ManyToMany, JoinTable } from 'typeorm';

import { BaseEntityTD } from '@app/util/base.util';
import { IBlog } from '../td.interface';
import { Course } from './course.entity';

@Entity({
	name: 'td_blog',
})
export class Blog extends BaseEntityTD implements IBlog {
	constructor(data: IBlog) {
		super();
		if (data) {
			this.title = data.title;
			this.description = data.description;
			this.content = data.content;
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
		type: 'text',
		default: '',
	})
	public content: string;

	@ManyToMany(() => Course, (courses) => courses.notices)
	@JoinTable()
	public courses: Course[];
}
