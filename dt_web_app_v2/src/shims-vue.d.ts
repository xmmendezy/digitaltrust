// eslint-disable-next-line @typescript-eslint/no-empty-interface
declare interface Window {
	// extend the window
}

declare module '*.vue' {
	import { DefineComponent } from 'vue';
	const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, unknown>;
	export default component;
}

declare module 'pages-generated' {
	// eslint-disable-next-line import/no-duplicates
	import type { RouteRecordRaw } from 'vue-router';
	const routes: RouteRecordRaw[];
	export default routes;
}

declare module 'virtual:generated-pages' {
	// eslint-disable-next-line import/no-duplicates
	import type { RouteRecordRaw } from 'vue-router';
	const routes: RouteRecordRaw[];
	export default routes;
}

declare module 'virtual:vite-icons/*' {
	import { FunctionalComponent, SVGAttributes } from 'vue';
	const component: FunctionalComponent<SVGAttributes>;
	export default component;
}
