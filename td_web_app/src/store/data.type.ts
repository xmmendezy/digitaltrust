import { Ref } from 'vue';
import { IsNotEmpty, Matches, IsEmail, Length, ValidationError, validateSync } from 'class-validator';
import { data_countries } from './country.data';
import { Quill, Sources } from 'quill';
import Delta from 'quill-delta';

const ids_countries = Object.keys(data_countries);

function extract_errors(obj: ValidationError): string[] {
	return (obj.constraints ? Object.values(obj.constraints) : []).concat(...(obj.children || []).map(extract_errors));
}

abstract class ClassBase {
	public validate(): string[] {
		return Array.from(new Set(([] as string[]).concat(...validateSync(this).map(extract_errors))));
	}
}

export interface IError {
	error: string;
}

export type Response<T = {}> = IError & T;

export interface ICountry {
	id: string;
	name: string;
}

export interface ILogin {
	username: string;
	password: string;
}

export class SignupDto extends ClassBase {
	constructor() {
		super();
		this.username = '';
		this.firstname = '';
		this.lastname = '';
		this.email = '';
		this.password = '';
		this.password_confirm = '';
		this.country = '';
		this.ref = '';
	}

	@Matches(/^[a-z][a-z0-9_-]{3,16}$/, { always: true, message: 'validator.auth.l' })
	@IsNotEmpty({ message: 'validator.auth.a' })
	username!: string;

	@Matches(/^[a-zA-Z-ZñÑáéíóúÁÉÍÓÚ\s]+$/, { always: true, message: 'validator.auth.b' })
	@IsNotEmpty({ message: 'validator.auth.a' })
	firstname!: string;

	@Matches(/^[a-zA-Z-ZñÑáéíóúÁÉÍÓÚ\s]+$/, { always: true, message: 'validator.auth.c' })
	@IsNotEmpty({ message: 'validator.auth.a' })
	lastname!: string;

	@IsEmail({}, { message: 'validator.auth.d' })
	@IsNotEmpty({ message: 'validator.auth.a' })
	email!: string;

	@Matches(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{5,}$/, { always: true, message: 'validator.auth.e' })
	@Length(8, 50, { message: 'validator.auth.f' })
	@IsNotEmpty({ message: 'validator.auth.a' })
	password!: string;

	@Matches(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{5,}$/, { always: true, message: 'validator.auth.e' })
	@Length(8, 50, { message: 'validator.auth.f' })
	@IsNotEmpty({ message: 'validator.auth.a' })
	password_confirm!: string;

	@IsNotEmpty({ message: 'validator.auth.a' })
	country!: string;

	ref!: string;

	public validate(): string[] {
		const errors = super.validate();
		if (!this.equalsPassword) {
			errors.push('validator.auth.g');
		}
		if (this.country && !ids_countries.find(id => id === this.country)) {
			errors.push('validator.auth.g');
		}
		return Array.from(new Set(errors));
	}

	get equalsPassword(): boolean {
		return this.password === this.password_confirm;
	}
}

export enum UserRole {
	ADMIN = 'admin',
	USER = 'user',
}

enum UserStatus {
	REMOVED = 'removed',
	PENDING = 'pending',
	CONFIRM = 'confirm',
}

export interface IUser {
	id: string;
	username: string;
	password: string;
	email: string;
	lastname: string;
	firstname: string;
	change_password: boolean;
	id_time_zone: string;
	role: UserRole;
	status: UserStatus;
	lastLogin: number;
	country__id: string;
	created: number;
}

export class UpdateDto extends ClassBase {
	constructor(data?: IUser) {
		super();
		if (data) {
			this.data = data;
			this.firstname = data.firstname;
			this.lastname = data.lastname;
			this.username = data.username;
			this.email = data.email;
			this.password = 'Secret00__';
			this.password_confirm = 'Secret00__';
			this.country = data.country__id;
		} else {
			this.firstname = '';
			this.lastname = '';
			this.username = '';
			this.email = '';
			this.password = '';
			this.password_confirm = '';
			this.country = '';
		}
	}

	data!: IUser;

	@Matches(/^[a-zA-Z-ZñÑáéíóúÁÉÍÓÚ\s]+$/, { always: true, message: 'validator.auth.b' })
	@IsNotEmpty({ message: 'validator.auth.a' })
	firstname!: string;

	@Matches(/^[a-zA-Z-ZñÑáéíóúÁÉÍÓÚ\s]+$/, { always: true, message: 'validator.auth.c' })
	@IsNotEmpty({ message: 'validator.auth.a' })
	lastname!: string;

	@Matches(/^[a-z][a-z0-9_-]{3,16}$/, { always: true, message: 'validator.auth.l' })
	@IsNotEmpty({ message: 'validator.auth.a' })
	username!: string;

	@IsEmail({}, { message: 'validator.auth.d' })
	@IsNotEmpty({ message: 'validator.auth.a' })
	email!: string;

	@Matches(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{5,}$/, { always: true, message: 'validator.auth.e' })
	@Length(8, 50, { message: 'validator.auth.f' })
	@IsNotEmpty({ message: 'validator.auth.a' })
	password!: string;

	@Matches(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{5,}$/, { always: true, message: 'validator.auth.e' })
	@Length(8, 50, { message: 'validator.auth.f' })
	@IsNotEmpty({ message: 'validator.auth.a' })
	password_confirm!: string;

	@IsNotEmpty({ message: 'validator.auth.a' })
	country!: string;

	public validate(): string[] {
		const errors = super.validate();
		if (!this.equalsPassword) {
			errors.push('validator.auth.g');
		}
		if (this.country && !ids_countries.find(id => id === this.country)) {
			errors.push('validator.auth.g');
		}
		return Array.from(new Set(errors));
	}

	get equalsPassword(): boolean {
		return this.password === this.password_confirm;
	}
}

export interface IToken {
	expiresIn: number;
	accessToken: string;
	user: IUser;
}

export interface ICourse {
	id: string;
	name: string;
	price: number;
	months: number;
	blog: boolean;
}

export interface ISubscribeCourse {
	id: string;
	name: string;
	price: number;
	months: number;
	blog: boolean;
	telegram: string;
	payed: boolean;
	nextPayment: number;
}

export interface IClient {
	id: string;
	name: string;
	email: string;
	course: string;
	created: number;
	payed: boolean;
}

export interface ISubscribeMail {
	id: string;
	email: string;
}

export interface ComponentQuillEditor {
	editor: Ref<Element | undefined>;
	getEditor: () => Element;
	getToolbar: () => Element;
	getQuill: () => Quill;
	getContents: (index?: number | undefined, length?: number | undefined) => string | Delta | undefined;
	setContents: (content: string | Delta, source?: Sources) => void;
	getHTML: () => string;
	setHTML: (html: string) => void;
	pasteHTML: (html: string, source?: Sources) => void;
	getText: (index?: number | undefined, length?: number | undefined) => string;
	setText: (text: string, source?: Sources) => void;
	reinit: () => void;
}

export class NoticeDto extends ClassBase {
	constructor(editor: ComponentQuillEditor) {
		super();
		this.id = '';
		this.title = '';
		this.courses = [];
		this.url = '';
		this.editor = editor;
	}

	public clean() {
		this.id = '';
		this.title = '';
		this.courses = [];
		this.editor?.setContents('');
		this.url = '';
	}

	public setHTML(html: string) {
		this.editor?.setHTML(html);
	}

	id!: string;

	@Matches(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9¿¡][a-zA-ZñÑáéíóúÁÉÍÓÚ0-9][a-zA-ZñÑáéíóúÁÉÍÓÚ0-9_\-,.¿?¡!\s]{3,70}$/, {
		always: true,
		message: 'validator.editor.b',
	})
	@IsNotEmpty({ message: 'validator.editor.a' })
	title!: string;

	courses!: string[];

	description!: string;

	url!: string;

	all_courses!: string[];

	editor: ComponentQuillEditor | undefined;

	public validate(): string[] {
		const errors = super.validate();
		if (!this.all_courses.filter(c => this.courses.includes(c)).length) {
			errors.push('validator.editor.c');
		}
		if (this.editor !== undefined) {
			if (this.editor.getText() === '\n') {
				errors.push('validator.editor.d');
			}
			this.description = this.editor.getHTML();
		} else {
			errors.push('validator.editor.e');
		}
		return Array.from(new Set(errors));
	}
}

export interface INotice {
	id: string;
	title: string;
	courses: string[];
	description: string;
	url: string;
	created: number;
}

export class BlogDto extends ClassBase {
	constructor(editor_description: ComponentQuillEditor, editor_content: ComponentQuillEditor) {
		super();
		this.id = '';
		this.title = '';
		this.courses = [];
		this.editor_description = editor_description;
		this.editor_content = editor_content;
	}

	public clean() {
		this.id = '';
		this.title = '';
		this.courses = [];
		this.editor_description?.setContents('');
		this.editor_content?.setContents('');
	}

	public setDescriptionHTML(html: string) {
		this.editor_description?.setHTML(html);
	}

	public setContentHTML(html: string) {
		this.editor_content?.setHTML(html);
	}

	id!: string;

	@Matches(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9¿¡][a-zA-ZñÑáéíóúÁÉÍÓÚ0-9][a-zA-ZñÑáéíóúÁÉÍÓÚ0-9_\-,.¿?¡!\s]{3,70}$/, {
		always: true,
		message: 'validator.editor.b',
	})
	@IsNotEmpty({ message: 'validator.editor.a' })
	title!: string;

	courses!: string[];

	description!: string;
	content!: string;

	all_courses!: string[];

	editor_description: ComponentQuillEditor | undefined;
	editor_content: ComponentQuillEditor | undefined;

	public validate(): string[] {
		const errors = super.validate();
		if (!this.all_courses.filter(c => this.courses.includes(c)).length) {
			errors.push('validator.editor.c');
		}
		if (this.editor_description !== undefined) {
			if (this.editor_description.getText() === '\n') {
				errors.push('validator.editor.d');
			}
			this.description = this.editor_description.getHTML();
		} else {
			errors.push('validator.editor.e');
		}
		if (this.editor_content !== undefined) {
			if (this.editor_content.getText() === '\n') {
				errors.push('validator.editor.d');
			}
			this.content = this.editor_content.getHTML();
		} else {
			errors.push('validator.editor.e');
		}
		return Array.from(new Set(errors));
	}
}

export interface IBlog {
	id: string;
	title: string;
	courses: string[];
	description: string;
	content: string;
	created: number;
}

export interface IMessage {
	id: string;
	name: string;
	own: boolean;
	content: string;
	created: number;
}

export interface I4GeeksCharge {
	amount: number;
	description: string;
	entity_description: string;
	currency: string;
	credit_card_number: number;
	credit_card_security_code_number: number;
	exp_month: number;
	exp_year: number;
}
