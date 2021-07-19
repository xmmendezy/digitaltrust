import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
	{
		path: '*',
		redirect: '/',
	},
	{
		path: '',
		name: 'AppBase',
		component: () => import(/* webpackChunkName: "app-base" */ '@app/pages/AppBase.vue'),
		children: [
			{
				path: '',
				name: 'App',
				component: () => import(/* webpackChunkName: "app-main" */ '@app/pages/App/AppBase.vue'),
				children: [
					{
						path: '',
						name: 'Home',
						component: () => import(/* webpackChunkName: "home" */ '@app/pages/App/Home.vue'),
					},
					{
						path: 'donations_user',
						name: 'AppDonations',
						component: () => import(/* webpackChunkName: "app-donations" */ '@app/pages/Donations.vue'),
					},
					{
						path: 'setting',
						name: 'Setting',
						component: () => import(/* webpackChunkName: "setting" */ '@app/pages/App/Setting.vue'),
					},
				],
			},
			{
				path: 'app2',
				name: 'App2',
				component: () => import(/* webpackChunkName: "app-main2" */ '@app/pages/App2/AppBase.vue'),
				children: [
					{
						path: '',
						name: 'Home2',
						component: () => import(/* webpackChunkName: "home2" */ '@app/pages/App2/Home.vue'),
					},
				],
			},
			{
				path: 'admin',
				name: 'Admin',
				component: () => import(/* webpackChunkName: "app-admin" */ '@app/pages/App/AppBase.vue'),
				children: [
					{
						path: '',
						name: 'AdminHome',
						component: () => import(/* webpackChunkName: "admin-home" */ '@app/pages/Admin/Home.vue'),
						meta: {
							is_admin: true,
						},
					},
					{
						path: 'setting',
						name: 'AdminSetting',
						component: () => import(/* webpackChunkName: "admin-setting" */ '@app/pages/App/Setting.vue'),
						meta: {
							is_admin: true,
						},
					},
				],
				meta: {
					is_admin: true,
				},
			},
			{
				path: 'admin/login',
				name: 'AdminLogin',
				component: () => import(/* webpackChunkName: "admin-login" */ '@app/pages/Admin/Login.vue'),
				meta: {
					free_page: true,
				},
			},
			{
				path: '/login',
				name: 'Login',
				component: () => import(/* webpackChunkName: "login" */ '@app/pages/Login.vue'),
				meta: {
					free_page: true,
				},
			},
			{
				path: '/register',
				name: 'Register',
				component: () => import(/* webpackChunkName: "register" */ '@app/pages/Register.vue'),
				meta: {
					free_page: true,
				},
			},
			{
				path: '/preregister',
				name: 'Preregister',
				component: () => import(/* webpackChunkName: "register" */ '@app/pages/Preregister.vue'),
				meta: {
					free_page: true,
				},
			},
			{
				path: '/donations',
				name: 'Donations',
				component: () => import(/* webpackChunkName: "donations" */ '@app/pages/Donations.vue'),
				meta: {
					permanent_page: true,
				},
			},
		],
	},
];

export const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});
