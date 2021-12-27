import App from './app.vue';
import { createApp } from 'vue';
import { createHead } from '@vueuse/head';
import { router } from './router';
import { createPinia } from 'pinia';
import { piniaPersist } from './store/persist';
import Oruga from '@oruga-ui/oruga-next';
import OrugaConfig from './oruga';
import Multiselect from '@vueform/multiselect';
import VuePdf from 'vue3-pdfjs';
import { QuillEditor } from '@vueup/vue-quill';
import './styles/index.scss';

const app = createApp(App);

app.use(router);

const pinia = createPinia();

pinia.use(piniaPersist);

app.use(pinia);

app.use(createHead());

app.use(Oruga, OrugaConfig);

app.use(VuePdf);

app.component('Multiselect', Multiselect);

app.component('QuillEditor', QuillEditor);

app.mount('#main_app');
