<template>
	<div class="login has-text-centered">
		<div class="columns">
			<div class="column">
				<div class="card card-main">
					<div class="card-content">
						<div class="is-flex is-justify-content-center">
							<div class="logo">
								<img class="is-justify-content-center" alt="TradingDigital" src="../assets/logo.png" />
								<p class="is-size-3 has-text-weight-bold is-justify-content-center">TradingDigital</p>
							</div>
						</div>
						<form class="form">
							<o-field label="Usuario">
								<o-input v-model="login.username" maxlength="30" @keyup.enter="toLogin"></o-input>
							</o-field>

							<o-field label="Contraseña">
								<o-input
									v-model="login.password"
									type="password"
									password-reveal
									@keyup.enter="toLogin"
								>
								</o-input>
							</o-field>
							<o-field>
								<o-button variant="white" @click="isModalForgotPassword = !isModalForgotPassword">
									He olvidado mi contraseña
								</o-button>
							</o-field>
							<div class="pt-5 pb-5 is-justify-content-center">
								<o-button variant="primary" rounded @click="toLogin">Ingresar</o-button>
							</div>
							<o-field>
								<o-button variant="white" tag="router-link" to="/signup">
									¿Aún no tienes cuenta?
								</o-button>
							</o-field>
						</form>
					</div>
				</div>
			</div>
			<div class="column is-hidden-mobile">
				<img class="is-justify-content-center" alt="TradingDigital" src="../assets/login.png" />
			</div>
		</div>

		<o-modal v-model:active="isModalForgotPassword" :width="640" scroll="clip">
			<div class="modal-card alert large">
				<section class="modal-card-body">
					<p class="title mt-4">Recuperar contraseña</p>
					<p class="subtitle mt-5 mb-5 has-text-justified">
						Ingrese su correo relacionado a su cuenta TradingDigital, y le enviaremos un mensaje con su
						nueva contraseña temporal.
					</p>
					<o-field label="Correo" class="has-text-left">
						<o-input v-model="forgot_password" maxlength="80"></o-input>
					</o-field>
					<div class="pt-5 pb-5 is-justify-content-center">
						<o-button variant="primary" rounded @click="resetPassword"> Enviar </o-button>
					</div>
				</section>
			</div>
		</o-modal>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useDataStore, ILogin, UserRole } from '~/store';
import { useRouter } from 'vue-router';

const store = useDataStore();
const router = useRouter();

const emit = defineEmits(['loading']);

const isModalForgotPassword = ref(false);

const login = reactive<ILogin>({
	username: '',
	password: '',
});

const forgot_password = ref('');

const toLogin = () => {
	emit('loading');
	store
		.login(login)
		.then(error => {
			emit('loading');
			if (!error) {
				router.push(store.user?.role === UserRole.ADMIN ? '/admin' : '/');
			}
		})
		.catch(() => {
			emit('loading');
		});
};

const resetPassword = () => {
	isModalForgotPassword.value = false;
	emit('loading');
	store
		.reset_password(forgot_password.value)
		.then(error => {
			emit('loading');
			if (!error) {
				store.notification('Se ha enviado una contraseña temporal a su correo', 'link');
			}
		})
		.catch(() => {
			emit('loading');
		});
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
