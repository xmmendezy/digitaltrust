import { ConfigStore } from './store.utils';

// prettier-ignore
const url_origin = [
	'https://digitaltrustonline.net',
	'http://127.0.0.1:9001',
][
	process.env.NODE_ENV === 'production'
		? 0
		: 1
];

const config: ConfigStore = {
	origin: `${url_origin}`,
	Api: `${url_origin}/api`,
};

export default config;
