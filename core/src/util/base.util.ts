import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, VersionColumn, BaseEntity } from 'typeorm';
import { validateSync, ValidationError } from 'class-validator';
import {
	DateTime as LuxonDateTime,
	DateTimeOptions as LuxonDateTimeOptions,
	DateObject,
	Duration as DurationLuxon,
	DurationOptions,
	DurationObject,
} from 'luxon';

function deepCopy<T>(target: any): T {
	if (target === null) {
		return target;
	}
	if (target instanceof Date) {
		return new Date(target.getTime()) as any;
	}
	if (target instanceof Array) {
		const cp = [] as any[];
		(target as any[]).forEach((v) => {
			cp.push(v);
		});
		return cp.map((n: any) => deepCopy<any>(n)) as any;
	}
	if (typeof target === 'object' && target !== {}) {
		const cp = { ...(target as { [key: string]: any }) } as { [key: string]: any };
		Object.keys(cp).forEach((k) => {
			cp[k] = deepCopy<any>(cp[k]);
		});
		return cp as T;
	}
}

abstract class Base extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	public id: string;

	@CreateDateColumn({ type: 'timestamptz' })
	public created: Date;

	@UpdateDateColumn({ type: 'timestamptz' })
	public updated: Date;

	@VersionColumn()
	public version: number;

	public errors: string[] = [];
}

function enumToArray<T>(target: any): T[] {
	return Object.keys(target).map((key) => target[key]);
}

function extract_errors(obj: ValidationError): string[] {
	return (obj.constraints ? Object.values(obj.constraints) : []).concat(...obj.children.map(extract_errors));
}

abstract class BaseDTO {
	public validate(): string[] {
		return Array.from(new Set(([] as string[]).concat(...validateSync(this).map(extract_errors))));
	}
}

interface Error {
	error: string;
}

type DateTimeOptions = LuxonDateTimeOptions & { keepLocalTime?: boolean };

type DateTimeFunc = {
	utc: () => LuxonDateTime;
	now: () => LuxonDateTime;
	local: (
		year?: number,
		month?: number,
		day?: number,
		hour?: number,
		minute?: number,
		second?: number,
		millisecond?: number,
	) => LuxonDateTime;
	fromISO: (text: string, options?: DateTimeOptions) => LuxonDateTime;
	fromUnix: (seconds: number, options?: DateTimeOptions) => LuxonDateTime;
	fromDate: (date: Date, options?: DateTimeOptions) => LuxonDateTime;
	fromFormat: (text: string, format: string, options?: DateTimeOptions) => LuxonDateTime;
	fromObject: (obj: DateObject, options: { keepLocalTime?: boolean }) => LuxonDateTime;
	clone: (datetime: LuxonDateTime) => LuxonDateTime;
};

type DurationFunc = {
	fromISO: (text: string, options?: DurationOptions) => DurationLuxon;
	fromISOTime: (text: string, options?: DurationOptions) => DurationLuxon;
	fromMillis: (number: number, options?: DurationOptions) => DurationLuxon;
	fromObject: (Object: DurationObject) => DurationLuxon;
};

const Duration: DurationFunc = {
	fromISO: (text: string, options?: DurationOptions) => DurationLuxon.fromISO(text, options),
	fromISOTime: (text: string, options?: DurationOptions) => DurationLuxon.fromISOTime(text, options),
	fromMillis: (number: number, options?: DurationOptions) => DurationLuxon.fromMillis(number, options),
	fromObject: (Object: DurationObject) => DurationLuxon.fromObject(Object),
};

export {
	Base as BaseEntity,
	BaseDTO,
	Error,
	DateTimeFunc,
	DateTimeOptions,
	DateObject,
	Duration,
	deepCopy,
	enumToArray,
};
