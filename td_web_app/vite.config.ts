import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import Pages from 'vite-plugin-pages';
import Layouts from 'vite-plugin-vue-layouts';

export default defineConfig({
	base: '/td_app',
	build: {
		outDir: path.resolve(__dirname, '../core/td_app'),
	},
	resolve: {
		alias: {
			'~/': `${path.resolve(__dirname, 'src')}/`,
			'~bulma': 'node_modules/bulma',
			'~bulma-floating-button': 'node_modules/bulma-floating-button',
			'~@oruga-ui': 'node_modules/@oruga-ui',
			'~@vueform': 'node_modules/@vueform',
			'~@fontsource': 'node_modules/@fontsource',
			'~@fortawesome': 'node_modules/@fortawesome',
			'~@vueup': 'node_modules/@vueup',
		},
	},
	plugins: [
		vue(),
		Pages(),
		Layouts({
			layoutsDir: 'src/layouts',
			defaultLayout: 'default',
		}),
		Components({
			dts: true,
			resolvers: IconsResolver({
				prefix: false,
				alias: {
					fas: 'fa-solid',
				},
			}) as any,
		}),
		Icons({
			compiler: 'vue3',
			autoInstall: true,
		}),
	],
	optimizeDeps: {
		include: ['vue', 'vue-router', '@vueuse/core'],
	},
});
