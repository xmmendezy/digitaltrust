import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import ViteComponents from 'unplugin-vue-components/vite';
import VitePages from 'vite-plugin-pages';
import Layouts from 'vite-plugin-vue-layouts';

export default defineConfig({
	resolve: {
		alias: {
			'~/': `${path.resolve(__dirname, 'src')}/`,
			'~bulma': 'node_modules/bulma',
			'~bulma-floating-button': 'node_modules/bulma-floating-button',
			'~@oruga-ui': 'node_modules/@oruga-ui',
			'~@vueform': 'node_modules/@vueform',
			'~@fontsource': 'node_modules/@fontsource',
			'~@fortawesome': 'node_modules/@fortawesome',
			'~vue3-openlayers': 'node_modules/vue3-openlayers',
		},
	},
	plugins: [
		vue(),
		VitePages(),
		Layouts({
			layoutsDir: 'src/layouts',
			defaultLayout: 'default',
		}),
		ViteComponents({
			dts: true,
		}),
	],
	optimizeDeps: {
		include: ['vue', 'vue-router', '@vueuse/core'],
	},
});
