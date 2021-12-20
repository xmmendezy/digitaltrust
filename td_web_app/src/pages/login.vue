<template>
	<div class="login">
		<div class="card card-main">
			<div class="card-content">
				<div class="is-flex is-justify-content-center">
					<div class="logo">
						<img class="is-justify-content-center" alt="TradingDigital" src="../assets/logo.png" />
						<p class="is-size-3 has-text-weight-bold is-justify-content-center">TradingDigital</p>
					</div>
				</div>
				<div class="form">
					<o-field label="Usuario">
						<o-input maxlength="30"></o-input>
					</o-field>

					<o-field label="Contraseña">
						<o-input type="password" password-reveal> </o-input>
					</o-field>
					<o-field>
						<o-button variant="white" @click="isModalForgotPassword = !isModalForgotPassword">
							He olvidado mi contraseña
						</o-button>
					</o-field>
					<div class="pt-5 pb-5 is-justify-content-center">
						<o-button variant="primary" rounded tag="router-link" to="/">Ingresar</o-button>
					</div>
					<o-field>
						<o-button variant="white" tag="router-link" to="/signup"> ¿Aún no tienes cuenta? </o-button>
					</o-field>
				</div>
			</div>
		</div>

		<o-modal :active.sync="isModalForgotPassword" :width="640" scroll="clip">
			<div class="modal-card">
				<section class="modal-card-body">
					<p class="title mt-4">Recuperar contraseña</p>
					<p class="subtitle mt-5 mb-5 has-text-justified">
						Ingrese su correo relacionado a su cuenta TradingDigital, y le enviaremos un mensaje con su
						nueva contraseña temporal.
					</p>
					<o-field label="Correo" class="has-text-left">
						<o-input value="xmmendezy@gmail.com" maxlength="80"></o-input>
					</o-field>
					<div class="pt-5 pb-5 is-justify-content-center">
						<o-button variant="primary" rounded @click="isModalForgotPassword = !isModalForgotPassword">
							Enviar
						</o-button>
					</div>
				</section>
			</div>
		</o-modal>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isModalForgotPassword = ref(false);
</script>

<route>
{
  meta: {
	  layout: "auth",
	  isFree: true,
  }
}
</route>
