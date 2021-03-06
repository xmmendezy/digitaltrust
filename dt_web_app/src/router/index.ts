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
						path: 'buy',
						name: 'BuyMore',
						component: () => import(/* webpackChunkName: "buy" */ '@app/pages/App/BuyMore.vue'),
					},
					{
						path: 'binary_tree',
						name: 'BinaryTree',
						component: () => import(/* webpackChunkName: "binary_tree" */ '@app/pages/App/BinaryTree.vue'),
					},
					{
						path: 'donations_user',
						name: 'AppDonations',
						component: () => import(/* webpackChunkName: "donations_user" */ '@app/pages/Donations.vue'),
					},
					{
						path: 'setting',
						name: 'Setting',
						component: () => import(/* webpackChunkName: "setting" */ '@app/pages/App/Setting.vue'),
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
						path: 'vip',
						name: 'AdminVIP',
						component: () => import(/* webpackChunkName: "admin-vip" */ '@app/pages/Admin/VIP.vue'),
						meta: {
							is_admin: true,
						},
					},
					{
						path: 'membership',
						name: 'AdminMembership',
						component: () =>
							import(/* webpackChunkName: "admin-membership" */ '@app/pages/Admin/Membership.vue'),
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
				name: 'register',
				component: () => import(/* webpackChunkName: "register" */ '@app/pages/Register.vue'),
				meta: {
					free_page: true,
				},
			},
			{
				path: '/preregister',
				name: 'Preregister',
				component: () => import(/* webpackChunkName: "preregister" */ '@app/pages/Preregister.vue'),
				meta: {
					free_page: true,
				},
			},
			{
				path: '/link_traiding',
				name: 'LinkTrading',
				component: () => import(/* webpackChunkName: "link_traiding" */ '@app/pages/LinkTrading.vue'),
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
