import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
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
						path: 'setting',
						name: 'Setting',
						component: () => import(/* webpackChunkName: "setting" */ '@app/pages/App/Setting.vue'),
					},
				],
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
		],
	},
];

export const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});
