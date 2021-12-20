import { bulmaConfig } from '@oruga-ui/theme-bulma';

console.log(bulmaConfig.input);

export default {
	...bulmaConfig,
	iconPack: 'fas',
	field: {
		...bulmaConfig.field,
		rootClass: 'field is-floating-in-label',
	},
};
