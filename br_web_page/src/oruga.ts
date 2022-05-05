import { bulmaConfig } from '@oruga-ui/theme-bulma';

export default {
	...bulmaConfig,
	iconPack: 'fas',
	field: {
		...bulmaConfig.field,
		rootClass: (_: any, c: any) => {
			if (c.props.rootClass === 'no') {
				return 'field has-text-left';
			} else {
				return 'field is-floating-in-label';
			}
		},
	},
	table: {
		...bulmaConfig.table,
		mobileCards: false,
	},
	modal: {
		...bulmaConfig.modal,
		canCancel: ['escape', 'x'],
	},
};
