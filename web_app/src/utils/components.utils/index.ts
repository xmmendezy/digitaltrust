import Vue from 'vue';

import CInput from './c-input.vue';
import CTelInput from './c-tel-input.vue';

const CComponents = {
	install: (vue: typeof Vue) => {
		vue.component('CInput', CInput);
		vue.component('CTelInput', CTelInput);
	},
};

export { CComponents, CInput, CTelInput };
