<template>
	<div class="index">
		<div class="columns-content">
			<div class="column-content has-text-centered">
				<article v-if="store.course && store.course !== 'none'" class="card">
					<div class="card-content media">
						<div class="media-content">
							<div class="content">
								<p>
									<strong>{{ store.course_data?.name }}</strong>
									<br />
									<small>{{ parsePrice(store.course_data) }}</small>
									<br />
									<small>
										Próximo pago:
										{{ store?.course_data ? parseDate(store.course_data.nextPayment) : '---' }}
										<a v-if="toPay" href="/td_app/signup" target="_blank">¡Pagar ahora!</a>
									</small>
								</p>
							</div>
						</div>
					</div>
				</article>
				<div v-if="store.user" class="mt-4 is-size-5">
					<div class="columns is-justify-content-center mt-2">
						<div class="column" :class="[store.course && store.course === 'none' ? 'is-6' : 'is-8']">
							<p class="subtitle is-size-6">
								{{ social_trading_text }}
								<br v-if="store.course && store.course === 'none'" />
								<o-button
									v-if="!store.user.social_trading"
									class="button is-ghost"
									@click="set_social_trading"
								>
									<i class="fas fa-star"></i> Ingresa al grupo del Social Trading
								</o-button>
							</p>
						</div>
					</div>
					<div class="columns is-justify-content-center mt-2">
						<div class="column" :class="[store.course && store.course === 'none' ? 'is-6' : 'is-8']">
							<p class="subtitle is-size-6">
								{{ digital_trust_text }}
								<br v-if="store.course && store.course === 'none'" />
								<o-button
									class="button is-ghost"
									tag="a"
									:href="
										'https://www.digitaltrustcompany.com/dt_app/link_traiding?id=' + store.user.id
									"
									target="_blank"
								>
									<i class="fas fa-coins"></i> {{ digital_trust_link }}
								</o-button>
							</p>
						</div>
					</div>
					<div v-if="store.course && store.course === 'none'" class="columns is-justify-content-center mt-6">
						<div class="column is-8">
							<p class="subtitle is-size-6">
								Inscribirse a un curso y comenzar a aprender
								<br />
								<o-button class="button is-ghost" tag="router-link" to="/signup?signup_course=true">
									<i class="fas fa-users-class"></i> Ver los cursos
								</o-button>
							</p>
						</div>
					</div>
				</div>
				<ul v-if="store.course && store.course !== 'none'" class="elements fa-ul has-text-left mt-2">
					<li>
						<span class="fa-li"><i class="fas fa-book"></i></span>
						<router-link to="/ebook/1"> Ebook - La biblia de las candelas </router-link>
					</li>
					<li>
						<span class="fa-li"><i class="fab fa-facebook"></i></span>
						<a href="https://www.facebook.com/groups/1581445272215796" target="_blank">
							Grupo privado de Facebook
						</a>
					</li>
					<li>
						<span class="fa-li"><i class="fab fa-telegram"></i></span>
						<a :href="store.course_data?.telegram" target="_blank"> Comunidad de Telegram </a>
					</li>
				</ul>
				<template v-if="store.course_data && store.course_data.id !== 'b19b80ca-bfe2-4b58-8a24-8b0723e5c2ec'">
					<p class="mt-5 mb-0 is-size-5 has-text-weight-bold">Enlaces de interes</p>
					<div class="columns">
						<div class="column">
							<ul class="elements fa-ul mt-3 has-text-left">
								<li>
									<span class="fa-li"><i class="fas fa-star"></i></span>
									<a href="https://www.investing.com/economic-calendar/" target="_blank">
										Economic Calendar
									</a>
								</li>
								<li>
									<span class="fa-li"><i class="fas fa-star"></i></span>
									<a href="https://www.forexfactory.com" target="_blank"> Forexfactory </a>
								</li>
								<li>
									<span class="fa-li"><i class="fas fa-star"></i></span>
									<a href="https://www.dailyfx.com/sentiment" target="_blank"> Dailyfx </a>
								</li>
							</ul>
						</div>
						<div class="column">
							<ul class="elements fa-ul mt-3 has-text-left">
								<li>
									<span class="fa-li"><i class="fas fa-star"></i></span>
									<a
										href="https://www.myfxbook.com/es/forex-calculators/position-size"
										target="_blank"
									>
										Forex Calculators
									</a>
								</li>
								<li>
									<span class="fa-li"><i class="fas fa-star"></i></span>
									<a href="https://es.tradingview.com/u/DigitalTrust/" target="_blank">
										DigitalTrust en TradingView
									</a>
								</li>
							</ul>
						</div>
					</div>
				</template>
			</div>
			<div v-if="store.course && store.course !== 'none'" class="column-content main">
				<p class="has-text-centered">Comunicados</p>
				<article class="card" v-for="notice in notices" :key="notice.id">
					<div class="card-content media">
						<div class="media-content">
							<div class="content">
								<nav class="level is-mobile">
									<div class="level-left">
										<strong>{{ notice.title }}</strong>
									</div>
									<div class="level-right">
										{{ parseDate(notice.created) }}
									</div>
								</nav>
								<p><strong>Descripción</strong></p>
								<div class="notice-description ql-editor" v-html="notice.description"></div>
								<p v-if="notice.url">
									<a :href="notice.url" target="_blank"> Enlace</a>
								</p>
							</div>
						</div>
					</div>
				</article>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useDataStore, ISubscribeCourse, INotice } from '~/store';
import { fromUnixTime, format, getUnixTime } from 'date-fns';

const store = useDataStore();

const emit = defineEmits(['loading']);

const notices = ref<Array<INotice>>([]);

const toPay = ref(false);

const digital_trust_text = computed(() => {
	if (store.user && store.user.digital_trust) {
		return 'Ir a DigitalTrust donde manejamos su capital y le pagamos de un 5% a un 7% mensual.';
	} else {
		return 'Manejamos su capital y le pagamos de un 5% a un 7% mensual.';
	}
});

const digital_trust_link = computed(() => {
	if (store.user && store.user.digital_trust) {
		return 'Ver mis inversiones en DigitalTrust';
	} else {
		return 'Invertir en DigitalTrust';
	}
});

const social_trading_text = computed(() => {
	if (store.user && store.user.social_trading) {
		return 'Gracias por pertenecer a Social Trading. Te agregaremos al canal privado de Telegram y te enviaremos un correo con todos los detalles e información';
	} else {
		return '¡Unete a Social Trading y mantente al día en el mundo del trading!';
	}
});

let is_load_notices = false;

const get_notices = () => {
	if (!is_load_notices) {
		emit('loading');
		is_load_notices = true;
		store
			.notices()
			.then(ns => {
				notices.value = ns;
				toPay.value = store.course_data ? getUnixTime(new Date()) > store.course_data.nextPayment : false;
			})
			.finally(() => {
				emit('loading');
				is_load_notices = false;
			});
	}
};

store.$subscribe(() => {
	if (store.course && store.course !== 'none') {
		get_notices();
	}
});

get_notices();

const parsePrice = (course?: ISubscribeCourse) => {
	if (course) {
		return '$' + course.price + '/90 días';
	} else {
		return '---';
	}
};

const parseDate = (date: number) => {
	return format(fromUnixTime(date), 'dd/MM/yyyy');
};

const set_social_trading = () => {
	emit('loading');
	store.set_social_trading().finally(() => {
		emit('loading');
	});
};
</script>
