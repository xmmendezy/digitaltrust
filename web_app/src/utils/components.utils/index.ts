import Vue from 'vue';

import CInput from './c-input.vue';

const CComponents = {
	install: (vue: typeof Vue) => {
		vue.component('CInput', CInput);
	},
};

export { CComponents, CInput };
