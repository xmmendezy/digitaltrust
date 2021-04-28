import Vue from 'vue';
import Main from './Main.vue';
import './registerServiceWorker';
import { router } from './router';
import { store } from './store';
import VueMobileDetection from 'vue-mobile-detection';
import Buefy from 'buefy';
import VueFloatLabel from 'vue-float-label';
import './styles/index.scss';
import VueI18n from 'vue-i18n';
import { locale, fallbackLocale, messages } from './i18n';
import VueTelInput from 'vue-tel-input';
import { CComponents } from './utils/components.utils';

Vue.use(VueMobileDetection);

Vue.use(Buefy, { defaultIconPack: 'fas' });

Vue.use(VueI18n);

Vue.use(VueFloatLabel);

Vue.use(VueTelInput);

Vue.use(CComponents);

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	i18n: new VueI18n({
		locale,
		fallbackLocale,
		messages,
	}),
	render: h => h(Main),
}).$mount('#app');
