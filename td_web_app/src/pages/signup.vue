<template>
	<div class="signup has-text-centered">
		<div class="card card-main">
			<div class="card-content">
				<div class="is-flex is-justify-content-center">
					<div class="logo">
						<img class="is-justify-content-center" alt="TradingDigital" src="../assets/logo.png" />
						<p class="is-size-4 has-text-weight-bold is-justify-content-center">
							{{ store.authenticated && !store.payed ? 'Pagar curso' : 'Bienvenido a TradingDigital' }}
						</p>
					</div>
				</div>
				<o-steps
					v-if="!paypal_payment && !_4geeksActive"
					v-model="activeStep"
					class="mt-5"
					icon-prev="chevron-left"
					icon-next="chevron-right"
					label-position="bottom"
				>
					<o-step-item step="1" label="Datos del Perfil" :visible="!store.authenticated">
						<form class="form mt-3">
							<o-field label="Nombre">
								<o-input v-model="signup.firstname" maxlength="30"></o-input>
							</o-field>

							<o-field label="Apellido">
								<o-input v-model="signup.lastname" maxlength="30"></o-input>
							</o-field>

							<o-field label="País">
								<Multiselect
									v-model="signup.country"
									:options="countries"
									placeholder="Seleccionar..."
									noOptionsText="No hay opciones aún"
									noResultsText="No hay opciones aún"
									searchable
								/>
							</o-field>
						</form>
					</o-step-item>

					<o-step-item step="2" label="Datos del Usuario" :visible="!store.authenticated">
						<form class="form mt-3">
							<o-field label="Nombre de usuario">
								<o-input v-model="signup.username" maxlength="10"></o-input>
							</o-field>

							<o-field label="Correo">
								<o-input v-model="signup.email" type="email" maxlength="40"></o-input>
							</o-field>

							<o-field label="Contraseña">
								<o-input v-model="signup.password" type="password" maxlength="20" password-reveal>
								</o-input>
							</o-field>

							<o-field label="Confirmar contraseña">
								<o-input
									v-model="signup.password_confirm"
									type="password"
									maxlength="20"
									password-reveal
								>
								</o-input>
							</o-field>
						</form>
					</o-step-item>

					<o-step-item step="3" label="Curso" :visible="!store.authenticated">
						<form class="form mt-3">
							<article class="card" v-for="c in courses" :key="c.id">
								<div class="card-content media">
									<div class="media-content">
										<div class="content">
											<p>
												<strong>{{ c.name }}</strong>
												<br />
												<small>{{ parsePrice(c) }}</small>
											</p>
										</div>
									</div>
									<div class="media-right">
										<o-field>
											<o-switch
												:modelValue="course === c.id"
												:disabled="course === c.id"
												variant="primary"
												@input="course = c.id"
											></o-switch>
										</o-field>
									</div>
								</div>
							</article>
						</form>
					</o-step-item>

					<o-step-item step="4" label="Pagar">
						<form class="form mt-3">
							<article class="card">
								<div class="card-content media">
									<div class="media-content">
										<div class="content">
											<p>
												<strong>Paypal</strong>
											</p>
										</div>
									</div>
									<div class="media-right">
										<o-field>
											<o-switch
												:modelValue="payment_method === 'paypal'"
												:disabled="payment_method === 'paypal'"
												variant="primary"
												@input="payment_method = 'paypal'"
											></o-switch>
										</o-field>
									</div>
								</div>
							</article>
							<article class="card">
								<div class="card-content media">
									<div class="media-content">
										<div class="content">
											<p>
												<strong>Coinbase</strong>
											</p>
										</div>
									</div>
									<div class="media-right">
										<o-field>
											<o-switch
												:modelValue="payment_method === 'coinbase'"
												:disabled="payment_method === 'coinbase'"
												variant="primary"
												@input="payment_method = 'coinbase'"
											></o-switch>
										</o-field>
									</div>
								</div>
							</article>
							<article class="card">
								<div class="card-content media">
									<div class="media-content">
										<div class="content">
											<p>
												<strong>4Geeks</strong>
											</p>
										</div>
									</div>
									<div class="media-right">
										<o-field>
											<o-switch
												:modelValue="payment_method === '4geeks'"
												:disabled="payment_method === '4geeks'"
												variant="primary"
												@input="payment_method = '4geeks'"
											></o-switch>
										</o-field>
									</div>
								</div>
							</article>
						</form>
					</o-step-item>

					<template #navigation="{ previous, next }">
						<div class="buttons is-justify-content-center mt-6">
							<o-button
								v-if="!previous.disabled"
								variant="primary"
								icon-pack="fas"
								icon-left="chevron-left"
								@click.prevent="previous.action"
							/>
							<o-button
								v-if="
									(activeStep === 1 && signup.firstname && signup.lastname && signup.country) ||
									(activeStep === 2 &&
										signup.username &&
										signup.email &&
										signup.password &&
										signup.password_confirm)
								"
								variant="primary"
								icon-pack="fas"
								icon-left="chevron-right"
								@click.prevent="next.action"
							/>
							<o-button
								v-if="activeStep === 3 && course"
								variant="primary"
								icon-pack="fas"
								icon-left="chevron-right"
								@click.prevent="next.action"
							/>
							<o-button
								v-if="
									(!previous.disabled && next.disabled && payment_method) ||
									(store.authenticated && !store.payed && payment_method)
								"
								variant="primary"
								@click="toPay"
							>
								Pagar el curso
							</o-button>
						</div>
					</template>
				</o-steps>

				<div id="paypal-button-container" class="mt-6"></div>

				<div v-if="_4geeksActive">
					<vue-paycard :value-fields="valueCard" :labels="labelscard" />
					<form class="form mt-3">
						<o-field label="Número de tarjeta">
							<o-input
								:modelValue="valueCard.cardNumber"
								id="v-card-number"
								data-card-field
								maxlength="19"
								type="tel"
								@input="updateCardNumber"
							></o-input>
						</o-field>
						<o-field label="Propietario">
							<o-input
								v-model="valueCard.cardName"
								id="v-card-name"
								data-card-field
								type="text"
							></o-input>
						</o-field>
						<div class="buttons" style="gap: 1.5rem">
							<o-field root-class="no" label="Fecha de expiración" grouped>
								<o-select v-model="valueCard.cardMonth" id="v-card-month" data-card-field>
									<option v-for="n in 12" :key="'m' + n" :value="n">{{ n }}</option>
								</o-select>
								<o-select v-model="valueCard.cardYear" id="v-card-year" data-card-field>
									<option v-for="n in 12" :key="'y' + n" :value="2020 + n">{{ 2020 + n }}</option>
								</o-select>
							</o-field>
							<o-field label="CVV">
								<o-input
									v-model="valueCard.cardCvv"
									id="v-card-cvv"
									data-card-field
									type="text"
								></o-input>
							</o-field>
						</div>
						<o-button variant="primary" @click="_4geeks"> Pagar </o-button>
					</form>
				</div>
			</div>
		</div>

		<o-modal v-model:active="isAlertPaymentActive" :width="640" scroll="clip">
			<div class="modal-card alert">
				<header class="modal-card-head">
					<p class="modal-card-title">¿Usted ya ha pagado el curso?</p>
				</header>
				<section class="modal-card-body has-text-justified">
					<p>
						Si ha utilizado Coinbase es posible que demore un poco hasta que el sistema este actualizado, si
						este es el caso le recomendamos volver a ingresar más tarde.
					</p>
				</section>
				<footer class="modal-card-foot is-justify-content-flex-end">
					<o-button @click="isAlertPaymentActive = false">De acuerdo</o-button>
				</footer>
			</div>
		</o-modal>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { useDataStore, SignupDto, ICourse } from '~/store';
import { loadScript, PayPalNamespace } from '@paypal/paypal-js';
import { useRouter } from 'vue-router';

const store = useDataStore();
const router = useRouter();

const emit = defineEmits(['loading']);

const activeStep = ref(1);
const isAlertPaymentActive = ref(false);
const _4geeksActive = ref(false);

onMounted(() => {
	if (store.authenticated && !store.payed) {
		activeStep.value = 4;
		isAlertPaymentActive.value = true;
	}
});

const paypal_payment = ref(false);

const signup = reactive<SignupDto>(new SignupDto());

const course = ref(store.course || '');

const payment_method = ref<'paypal' | 'coinbase' | '4geeks' | ''>('');

const valueCard = reactive({
	cardName: '',
	cardNumber: '',
	cardMonth: '',
	cardYear: '',
	cardCvv: '',
});

const labelscard = {
	cardName: 'Nombre Completo',
	cardHolder: 'Propietario',
	cardMonth: 'MM',
	cardYear: 'YY',
	cardExpires: 'Expira',
	cardCvv: 'CVV',
};

const countries = store.countries.map(c => ({ value: c.id, label: c.name }));

const courses = ref<Array<ICourse>>([]);

store.courses().then(cs => {
	courses.value = cs;
});

const parsePrice = (course: ICourse) => {
	return '$' + course.price + '/' + { 1: 'Mes', 6: 'Semestre', 12: 'Año' }[course.months];
};

const updateCardNumber = (e: any) => {
	valueCard.cardNumber = e.target.value.replace(/ /g, '');
	valueCard.cardNumber = (valueCard.cardNumber.match(/.{1,4}/g) || ['']).join(' ');
};

const paypal = () => {
	emit('loading');
	loadScript({ 'client-id': store.config.PayPal.client_id || '' })
		.then((paypal: PayPalNamespace | null) => {
			if (paypal && paypal.Buttons) {
				paypal_payment.value = true;
				paypal
					.Buttons({
						createOrder: (_, actions) => {
							_;
							return actions.order.create({
								purchase_units: [
									{
										amount: {
											value: (
												courses.value.find(c => c.id === course.value)?.price || 1
											).toString(),
										},
									},
								],
							});
						},
						onApprove: async (data, _) => {
							_;
							await store.post_paypal(data.orderID).then(async () => {
								await store.status().then(async v => {
									store.payed = v.payed;
									router.push('/');
								});
							});
						},
					})
					.render('#paypal-button-container');
			} else {
				store.notification('e000', 'danger');
				router.push('/');
			}
		})
		.catch(() => {
			store.notification('e000', 'danger');
			router.push('/');
		});
};

const coinbase = () => {
	emit('loading');
	store
		.get_coinbase()
		.then(url => {
			console.log('url', url);
			if (url) {
				window.open(url, '_blank');
			}
		})
		.finally(() => {
			emit('loading');
		});
};

const _4geeks = () => {
	emit('loading');
	const c = courses.value.find(c => c.id === course.value);
	if (c) {
		store
			.post_4geeks({
				amount: c.price,
				description: 'TradingDigital - ' + c.name,
				entity_description: 'TradingDigital - ' + c.name,
				currency: 'usd',
				credit_card_number: parseInt(valueCard.cardNumber.split(' ').join('')),
				credit_card_security_code_number: parseInt(valueCard.cardCvv),
				exp_month: parseInt(valueCard.cardMonth),
				exp_year: parseInt(valueCard.cardYear),
			})
			.then(async () => {
				await store.status().then(async v => {
					store.payed = v.payed;
					router.push('/');
				});
			})
			.finally(() => {
				emit('loading');
			});
	}
};

const toPay = () => {
	emit('loading');
	if (store.authenticated && !store.payed) {
		if (payment_method.value === 'paypal') {
			paypal();
		} else if (payment_method.value === 'coinbase') {
			coinbase();
		} else if (payment_method.value === '4geeks') {
			emit('loading');
			_4geeksActive.value = true;
		}
	} else {
		store
			.signup(signup)
			.then(error => {
				emit('loading');
				if (!error) {
					store.subscribeCourse(course.value).then(error => {
						if (!error) {
							emit('loading');
							if (payment_method.value === 'paypal') {
								paypal();
							} else if (payment_method.value === 'coinbase') {
								coinbase();
							} else if (payment_method.value === '4geeks') {
								emit('loading');
								_4geeksActive.value = true;
							}
						}
					});
				}
			})
			.catch(() => {
				emit('loading');
			});
	}
};
</script>

<route>
{
  meta: {
	  layout: "auth",
	  isFree: true,
  }
}
</route>
