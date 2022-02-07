import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseEntityTD } from '@app/util/base.util';
import { IMessage } from '../td.interface';
import { User } from './user.entity';

@Entity({
	name: 'td_message',
})
export class Message extends BaseEntityTD implements IMessage {
	constructor(data: IMessage) {
		super();
		if (data) {
			this.own = data.own;
			this.content = data.content;
			this.user = data.user as User;
		}
	}

	@Column({
		nullable: false,
	})
	public own: boolean;

	@Column({
		type: 'text',
		default: '',
	})
	public content: string;

	@ManyToOne(() => User, (user) => user.messages)
	public user: User;
}
