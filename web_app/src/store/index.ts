import Vue from 'vue';
import Vuex from 'vuex';
import { extractVuexModule, createProxy } from 'vuex-class-component';
import { HttpBase } from './store.utils';

import config from './config.store';
import axios from 'axios';

import AuthStore from './auth.module/auth.store';
import UtilStore from './util.module/util.store';

Vue.use(Vuex);

AuthStore.setConfig(axios as HttpBase, config);
UtilStore.setConfig(axios as HttpBase, config);

const store = new Vuex.Store({
	modules: {
		...extractVuexModule(AuthStore),
		...extractVuexModule(UtilStore),
	},
});

const vxm = {
	auth: createProxy(store, AuthStore),
	util: createProxy(store, UtilStore),
};

export { store, vxm };
export * from './types';
