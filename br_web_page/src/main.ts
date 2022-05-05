import App from './app.vue';
import { ViteSSG } from 'vite-ssg';
import { createHead } from '@vueuse/head';
import { setupLayouts } from 'virtual:generated-layouts';
import routes from 'virtual:generated-pages';
import { createPinia } from 'pinia';
import Oruga from '@oruga-ui/oruga-next';
import OrugaConfig from './oruga';
import './styles/index.scss';

export const createApp = ViteSSG(App, { routes: setupLayouts(routes), base: import.meta.env.BASE_URL }, ({ app }) => {
	const pinia = createPinia();

	app.use(pinia);

	app.use(createHead());

	app.use(Oruga, OrugaConfig);
});
