import { createApp } from 'vue';
import { createHead } from '@vueuse/head';
import { createRouter, createWebHistory } from 'vue-router';
import { setupLayouts } from 'virtual:generated-layouts';
import routes from 'virtual:generated-pages';
import Oruga from '@oruga-ui/oruga-next';
import OrugaConfig from './oruga';
import Multiselect from '@vueform/multiselect';
import App from './app.vue';
import './styles/index.scss';

const app = createApp(App);

const router = createRouter({
	routes: setupLayouts(routes),
	history: createWebHistory(),
});

router.afterEach((to, from) => {
	const toDepth = to.path.split('/').length;
	const fromDepth = from.path.split('/').length;
	to.meta.transitionName = toDepth === fromDepth ? 'fade' : toDepth < fromDepth ? 'slide-right' : 'slide-left';
});

app.use(router);

app.component('Multiselect', Multiselect);

app.use(createHead());

app.use(Oruga, OrugaConfig);

app.mount('#main_app');
