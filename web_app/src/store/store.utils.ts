import { ICountry } from './util.module/util.type';
import {
	DateTime as LuxonDateTime,
	DateTimeOptions as LuxonDateTimeOptions,
	DateObject,
	Duration as DurationLuxon,
	DurationOptions,
	DurationObject,
} from 'luxon';

import { IUser } from './api.module/api.type';

type DataDict = string | number | boolean | Date | null | undefined | DataDict[] | Dict;

type Dict = { [key: string]: DataDict };

interface ConfigStore {
	origin: string;
	Api: string;
}

type Method =
	| 'get'
	| 'GET'
	| 'delete'
	| 'DELETE'
	| 'head'
	| 'HEAD'
	| 'options'
	| 'OPTIONS'
	| 'post'
	| 'POST'
	| 'put'
	| 'PUT'
	| 'patch'
	| 'PATCH'
	| 'purge'
	| 'PURGE'
	| 'link'
	| 'LINK'
	| 'unlink'
	| 'UNLINK';

type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream';

interface HttpBasicCredentials {
	username: string;
	password: string;
}

interface HttpRequestConfig {
	url?: string;
	method?: Method;
	baseURL?: string;
	headers?: any;
	params?: any;
	paramsSerializer?: (params: any) => string;
	data?: any;
	timeout?: number;
	timeoutErrorMessage?: string;
	withCredentials?: boolean;
	auth?: HttpBasicCredentials;
	responseType?: ResponseType;
	xsrfCookieName?: string;
	xsrfHeaderName?: string;
	onUploadProgress?: (progressEvent: any) => void;
	onDownloadProgress?: (progressEvent: any) => void;
	maxContentLength?: number;
	validateStatus?: (status: number) => boolean;
	maxRedirects?: number;
	socketPath?: string | null;
	httpAgent?: any;
	httpsAgent?: any;
}

interface HttpResponse<T = any> {
	data: T;
	status: number;
	statusText: string;
	headers: any;
	config: HttpRequestConfig;
	request?: any;
}

// eslint-disable-next-line
interface HttpPromise<T = any> extends Promise<HttpResponse<T>> {}

interface HttpInterceptorManager<V> {
	use(onFulfilled?: (value: V) => V | Promise<V>, onRejected?: (error: any) => any): number;
	eject(id: number): void;
}

interface HttpBase {
	(config: HttpRequestConfig): HttpPromise;
	(url: string, config?: HttpRequestConfig): HttpPromise;
	defaults: HttpRequestConfig;
	interceptors: {
		request: HttpInterceptorManager<HttpRequestConfig>;
		response: HttpInterceptorManager<HttpResponse>;
	};
	getUri(config?: HttpRequestConfig): string;
	request<T = any, R = HttpResponse<T>>(config: HttpRequestConfig): Promise<R>;
	get<T = any, R = HttpResponse<T>>(url: string, config?: HttpRequestConfig): Promise<R>;
	delete<T = any, R = HttpResponse<T>>(url: string, config?: HttpRequestConfig): Promise<R>;
	head<T = any, R = HttpResponse<T>>(url: string, config?: HttpRequestConfig): Promise<R>;
	options<T = any, R = HttpResponse<T>>(url: string, config?: HttpRequestConfig): Promise<R>;
	post<T = any, R = HttpResponse<T>>(url: string, data?: any, config?: HttpRequestConfig): Promise<R>;
	put<T = any, R = HttpResponse<T>>(url: string, data?: any, config?: HttpRequestConfig): Promise<R>;
	patch<T = any, R = HttpResponse<T>>(url: string, data?: any, config?: HttpRequestConfig): Promise<R>;
}

interface IHeader {
	Authorization?: string;
	'Content-Type': string;
}

interface IBaseStore {
	headers: IHeader;
}

const get_user = function (): IUser {
	return JSON.parse(localStorage.getItem('user') || '{}') as IUser;
};

const get_headers = function (): IHeader {
	if (localStorage.getItem('accessToken') || undefined) {
		return {
			Authorization: 'Bearer ' + localStorage.getItem('accessToken') || undefined,
			'Content-Type': 'application/json',
		};
	} else {
		return {
			'Content-Type': 'application/json',
		};
	}
};

const get_country = async function (e: any, id?: string): Promise<ICountry> {
	return await e.$store.dispatch('util/get_country', id, { root: true });
};

const user_is_admin = function (): boolean {
	const user = JSON.parse(localStorage.getItem('user') || '{}');
	return user?.role === 'admin';
};

const set_data = async function (
	e: any,
	data: { key: string; data: DataDict; only_store?: boolean },
): Promise<DataDict> {
	return await e.$store.dispatch('util/set_data', data, { root: true });
};

const clear_data = async function (e: any, key?: string): Promise<void> {
	return await e.$store.dispatch('util/clear_data', key, { root: true });
};

const get_data = async function (e: any, key: string): Promise<DataDict> {
	return await e.$store.dispatch('util/get_data', key, { root: true });
};

const get_errors = function (e: any): string {
	if (e.response) {
		if ([200, 201].indexOf(e.response.status) === -1) {
			if (e.response.status === 500) {
				return 'e000';
			}
			if (e.response.status === 401) {
				return 'e001';
			}
			if (e.response.status === 403) {
				return 'e003';
			}
			if (e.response.status === 404) {
				return 'e004';
			}
		}
	}
	if (e.data) {
		if (e.data.error) {
			return e.data.error;
		}
	}
	return '';
};

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

function DateTime(e: any): DateTimeFunc {
	return e.$store.rootGetters['auth/DateTime'] as DateTimeFunc;
}

function Duration(e: any): DurationFunc {
	return e.$store.rootGetters['util/Duration'] as DurationFunc;
}

export {
	HttpBase,
	HttpRequestConfig,
	ConfigStore,
	IHeader,
	IBaseStore,
	DataDict,
	Dict,
	DateTimeOptions,
	DateTimeFunc,
	DurationFunc,
	DateObject,
	DateTime,
	Duration,
	get_user,
	get_headers,
	user_is_admin,
	get_country,
	set_data,
	clear_data,
	get_data,
	get_errors,
};
