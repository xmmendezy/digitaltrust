import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import generateSitemap from 'vite-ssg-sitemap';
import Components from 'unplugin-vue-components/vite';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import Pages from 'vite-plugin-pages';
import Layouts from 'vite-plugin-vue-layouts';

export default defineConfig({
	resolve: {
		alias: {
			'~/': `${resolve(__dirname, 'src')}/`,
			'~bulma': 'node_modules/bulma',
			'~bulma-floating-button': 'node_modules/bulma-floating-button',
			'~@oruga-ui': 'node_modules/@oruga-ui',
			'~@fontsource': 'node_modules/@fontsource',
			'~@fortawesome': 'node_modules/@fortawesome',
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
	ssgOptions: {
		script: 'async',
		formatting: 'minify',
		onFinished() {
			generateSitemap();
		},
	},
	optimizeDeps: {
		include: ['vue', 'vue-router', '@vueuse/core'],
	},
} as any);
