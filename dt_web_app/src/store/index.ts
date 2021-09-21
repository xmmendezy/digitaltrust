import Vue from 'vue';
import Vuex from 'vuex';
import { extractVuexModule, createProxy } from 'vuex-class-component';
import { ProxyWatchers } from 'vuex-class-component/dist/interfaces';
import { HttpBase } from './store.utils';

import config from './config.store';
import axios from 'axios';

import ApiStore from './api.module/api.store';
import UtilStore from './util.module/util.store';

Vue.use(Vuex);

ApiStore.setConfig(axios as HttpBase, config);
UtilStore.setConfig(axios as HttpBase, config);

const store = new Vuex.Store({
	modules: {
		...extractVuexModule(ApiStore),
		...extractVuexModule(UtilStore),
	},
});

type Store = {
	api: ProxyWatchers & ApiStore;
	util: ProxyWatchers & UtilStore;
};

const vxm: Store = {
	api: createProxy(store, ApiStore),
	util: createProxy(store, UtilStore),
};

export { store, vxm, Store };
export * from './types';
export * from './store.utils';
