import { defineStore } from 'pinia';
import { mande } from 'mande';
import {
	IUser,
	ILogin,
	SignupDto,
	UpdateDto,
	ClientDto,
	NoticeDto,
	INotice,
	BlogDto,
	IBlog,
	IMessage,
	IToken,
	ICourse,
	ISubscribeCourse,
	IClient,
	ISubscribeMail,
	I4GeeksCharge,
	Response,
} from './data.type';
import { data_countries } from './country.data';
import { data_errors } from './error.data';
import { router } from '~/router';
import { useProgrammatic } from '@oruga-ui/oruga-next';

const config = {
	PayPal: {
		client_id: import.meta.env.VITE_PAYPAL_PUBLIC_KEY as string,
	},
};

interface State {
	base_url: string;
	authenticated: boolean;
	jwt?: string;
	user?: IUser;
	course?: string;
	course_data?: ISubscribeCourse;
	payed?: boolean;
	notice_edit?: INotice;
}

export const useDataStore = defineStore('data', {
	state: (): State => ({
		base_url:
			import.meta.env.PROD || import.meta.env.MODE === 'app'
				? 'https://www.unotrades.com/td/api'
				: 'http://localhost:9001/td/api',
		authenticated: false,
		jwt: undefined,
		user: undefined,
		course: undefined,
		course_data: undefined,
		payed: undefined,
		notice_edit: undefined,
	}),
	getters: {
		countries() {
			return Object.values(data_countries);
		},
		config() {
			return config;
		},
	},
	actions: {
		http(path: string, auth = false) {
			const http = mande(this.base_url + '/' + path);
			if (this.jwt && auth) {
				http.options.headers.Authorization = 'Bearer ' + this.jwt;
			}
			return http;
		},
		notification(message: string, status: 'success' | 'link' | 'danger' | 'warning') {
			const { oruga } = useProgrammatic();
			const message_error = data_errors[message];
			oruga.notification.open({
				duration: 5000,
				message: message_error
					? message_error
					: status === 'link'
					? message
					: `Mensaje con código de error: ${message}`,
				position: 'bottom-right',
				variant: status,
				closable: true,
			});
		},
		async login(data: ILogin) {
			if (data.username && data.password) {
				const res = await this.http('login').post<Response<IToken>>('', data);
				if (res.accessToken) {
					this.authenticated = true;
					this.jwt = res.accessToken;
					this.user = res.user;
					return '';
				} else {
					this.notification(res.error, 'warning');
					return res.error;
				}
			} else {
				this.notification('login.error.u3', 'warning');
				return 'login.error.u3';
			}
		},
		logout() {
			this.jwt = undefined;
			this.user = undefined;
			this.course = undefined;
			this.course_data = undefined;
			this.notice_edit = undefined;
			this.authenticated = false;
			router.push({ path: '/login' });
		},
		async signup(data: SignupDto) {
			const errors = data.validate();
			if (!errors.length) {
				const res = await this.http('signup').post<Response<IToken>>('', data);
				if (res.accessToken) {
					this.authenticated = true;
					this.jwt = res.accessToken;
					this.user = res.user;
					return '';
				} else {
					this.notification(res.error, 'warning');
					return res.error;
				}
			} else {
				this.notification(errors[0], 'warning');
				return errors[0];
			}
		},
		async update(data: UpdateDto) {
			const errors = data.validate();
			if (!errors.length) {
				const res = await this.http('user', true).patch<Response<IUser>>('', data);
				if (res.error) {
					this.notification(res.error, 'warning');
					return res.error;
				} else {
					this.user = res;
					return '';
				}
			} else {
				this.notification(errors[0], 'warning');
				return errors[0];
			}
		},
		async set_social_trading() {
			const res = await this.http('user', true).post<Response<IUser>>('social');
			if (res.error) {
				this.notification(res.error, 'warning');
				return res.error;
			} else {
				if (this.user) {
					this.user.social_trading = true;
				}
				return '';
			}
		},
		async reset_password(email: string) {
			const res = await this.http('reset_password', true).get<Response>('?email=' + email);
			if (res.error) {
				this.notification(res.error, 'warning');
				return res;
			} else {
				return '';
			}
		},
		async myCourse() {
			if (this.course && this.course_data) {
				return this.course_data;
			}
			const res = await this.http('subscribe_course', true).get<Response<ISubscribeCourse>>('');
			if (res.error) {
				this.course = 'none';
				this.notification(res.error, 'warning');
				if (res.error === 'login.error.u1') {
					this.logout();
				}
				return res;
			} else {
				this.course = res.id;
				this.course_data = res;
				return res;
			}
		},
		async subscribeCourse(course: string) {
			const res = await this.http('subscribe_course', true).post<Response<ICourse>>('', { course });
			if (res.error) {
				this.notification(res.error, 'warning');
				return res.error;
			} else {
				this.course = res.id;
				return '';
			}
		},
		async courses() {
			return await this.http('courses').get<ICourse[]>('');
		},
		async courses_all() {
			return await this.http('courses', true).get<ICourse[]>('all');
		},
		async updateCourses(data: ICourse[]) {
			return await this.http('courses', true).patch<ICourse[]>('', data);
		},
		async status() {
			return await this.http('status', true).get<{ payed: boolean }>('');
		},
		async post_paypal(reference: string) {
			const res = await this.http('paypal', true).post<Response>('', { reference });
			if (res.error) {
				this.notification(res.error, 'warning');
				return res.error;
			} else {
				return '';
			}
		},
		async get_coinbase() {
			const res = await this.http('coinbase', true).get<Response<{ url: string }>>('');
			if (res.error) {
				this.notification(res.error, 'warning');
				return '';
			} else {
				return res.url;
			}
		},
		async post_4geeks(data: I4GeeksCharge) {
			const res = await this.http('4geeks', true).post<Response>('', data);
			if (res.error) {
				this.notification(res.error, 'warning');
				return res.error;
			} else {
				return '';
			}
		},
		async clients() {
			return await this.http('clients', true).get<IClient[]>('');
		},
		async subscribe_mails() {
			return await this.http('subscribe_mails', true).get<ISubscribeMail[]>('');
		},
		async notice(data: NoticeDto) {
			const errors = data.validate();
			if (!errors.length) {
				const res = await this.http('notice', true).post<Response>('', {
					id: data.id,
					title: data.title,
					courses: data.courses,
					description: data.description,
					url: data.url,
				});
				if (res.error) {
					this.notification(res.error, 'warning');
					return res.error;
				} else {
					return '';
				}
			} else {
				this.notification(errors[0], 'warning');
				return errors[0];
			}
		},
		async notices() {
			return await this.http('notice', true).get<INotice[]>('');
		},
		async delete_notice(id: string) {
			const res = await this.http('notice', true).delete<Response>(id);
			return res.error;
		},
		async blog(data: BlogDto) {
			const errors = data.validate();
			if (!errors.length) {
				const res = await this.http('blog', true).post<Response>('', {
					id: data.id,
					title: data.title,
					courses: data.courses,
					description: data.description,
					content: data.content,
				});
				if (res.error) {
					this.notification(res.error, 'warning');
					return res.error;
				} else {
					return '';
				}
			} else {
				this.notification(errors[0], 'warning');
				return errors[0];
			}
		},
		async blogs() {
			return await this.http('blog', true).get<IBlog[]>('');
		},
		async delete_blog(id: string) {
			const res = await this.http('blog', true).delete<Response>(id);
			return res.error;
		},
		async messages(id: string = '') {
			return await this.http('message', true).get<IMessage[]>(id);
		},
		async message(message: { id?: string; content: string }) {
			const res = await this.http('message', true).post<Response>('', message);
			return res.error;
		},
		async getClient(id: string) {
			const res = await this.http('client', true).get<Response<ClientDto>>('?id=' + id);
			if (res.error) {
				this.notification(res.error, 'warning');
				return res;
			}
			return res;
		},
		async addClient(data: ClientDto) {
			const errors = data.validate();
			if (!errors.length) {
				const res = await this.http('client', true).post<Response>('', data);
				if (res.error) {
					this.notification(res.error, 'warning');
				}
				return res.error;
			} else {
				this.notification(errors[0], 'warning');
				return errors[0];
			}
		},
		async updateClient(data: ClientDto) {
			const errors = data.validate();
			if (!errors.length) {
				const res = await this.http('client', true).patch<Response>('', data);
				if (res.error) {
					this.notification(res.error, 'warning');
				}
				return res.error;
			} else {
				this.notification(errors[0], 'warning');
				return errors[0];
			}
		},
	},
});
