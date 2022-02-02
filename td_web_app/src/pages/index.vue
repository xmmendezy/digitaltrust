<template>
	<div class="index">
		<div class="columns-content">
			<div class="column-content has-text-centered">
				<article class="card">
					<div class="card-content media">
						<div class="media-content">
							<div class="content">
								<p>
									<strong>{{ store.course_data?.name }}</strong>
									<br />
									<small>{{ parsePrice(store.course_data) }}</small>
									<br />
									<small
										>Próximo pago:
										{{
											store?.course_data ? parseDate(store.course_data.nextPayment) : '---'
										}}</small
									>
								</p>
							</div>
						</div>
					</div>
				</article>
				<ul class="elements fa-ul has-text-left">
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
					<ul class="elements fa-ul mt-3 has-text-left">
						<li>
							<span class="fa-li"><i class="fas fa-star"></i></span>
							<a href="https://www.investing.com/economic-calendar/" target="_blank">
								Economic Calendar
							</a>
						</li>
						<li>
							<span class="fa-li"><i class="fas fa-star"></i></span>
							<a href="https://www.forexfactory.com" target="_blank">
								Forexfactory
							</a>
						</li>
						<li>
							<span class="fa-li"><i class="fas fa-star"></i></span>
							<a href="https://www.dailyfx.com/sentiment" target="_blank">
								Dailyfx
							</a>
						</li>
						<li>
							<span class="fa-li"><i class="fas fa-star"></i></span>
							<a href="https://www.myfxbook.com/es/forex-calculators/position-size" target="_blank">
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
				</template>
			</div>
			<div class="column-content main">
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
import { ref } from 'vue';
import { useDataStore, ISubscribeCourse, INotice } from '~/store';
import { fromUnixTime, format } from 'date-fns';

const store = useDataStore();

const emit = defineEmits(['loading']);

const notices = ref<Array<INotice>>([]);

emit('loading');
store.notices().then(ns => {
	notices.value = ns;
	emit('loading');
});

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
</script>
