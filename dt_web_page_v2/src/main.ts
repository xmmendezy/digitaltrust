import App from "./app.vue";
import { ViteSSG } from "vite-ssg";
import { createI18n } from "vue-i18n";
import { createHead } from "@vueuse/head";
import { setupLayouts } from "virtual:generated-layouts";
import routes from "virtual:generated-pages";
import { createPinia } from "pinia";
import { MotionPlugin } from "@vueuse/motion";
import es from "./i18n/es.json";
import en from "./i18n/en.json";
import "./styles/index.scss";

export const createApp = ViteSSG(
	App,
	{ routes: setupLayouts(routes), base: import.meta.env.BASE_URL },
	({ app }) => {
		const pinia = createPinia();

		app.use(pinia);

		app.use(createHead());

		app.use(
			createI18n({
				locale: 'es',
				messages: {
					es,
					en,
				},
			})
		);

		app.use(MotionPlugin);
	}
);
