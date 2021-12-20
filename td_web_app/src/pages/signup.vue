<template>
	<div class="signup">
		<div class="card card-main">
			<div class="card-content">
				<div class="is-flex is-justify-content-center">
					<div class="logo">
						<img class="is-justify-content-center" alt="TradingDigital" src="../assets/logo.png" />
						<p class="is-size-4 has-text-weight-bold is-justify-content-center">
							Bienvenido a TradingDigital
						</p>
					</div>
				</div>
				<o-steps
					v-model="activeStep"
					class="mt-5"
					icon-prev="chevron-left"
					icon-next="chevron-right"
					label-position="bottom"
				>
					<o-step-item step="1" label="Datos del perfil" :clickable="true">
						<form class="form mt-3">
							<o-field label="Nombre">
								<o-input maxlength="30"></o-input>
							</o-field>

							<o-field label="Apellido">
								<o-input maxlength="30"></o-input>
							</o-field>

							<o-field label="País">
								<Multiselect
									:options="['Costa Rica']"
									placeholder="Seleccionar..."
									noOptionsText="No hay opciones aún"
									noResultsText="No hay opciones aún"
									searchable
								/>
							</o-field>
						</form>
					</o-step-item>

					<o-step-item step="2" label="Datos del Usuario" :clickable="true">
						<form class="form mt-3">
							<o-field label="Nombre de usuario">
								<o-input maxlength="10"></o-input>
							</o-field>

							<o-field label="Correo">
								<o-input maxlength="40"></o-input>
							</o-field>

							<o-field label="Confirmar">
								<o-input type="password" maxlength="20" password-reveal> </o-input>
							</o-field>
						</form>
					</o-step-item>

					<o-step-item step="3" label="Curso" :clickable="true">
						<form class="form mt-3">
							<o-field label="Nombre">
								<o-input value="Xavier" maxlength="30"></o-input>
							</o-field>

							<o-field label="Apellido">
								<o-input value="Méndez" maxlength="30"></o-input>
							</o-field>

							<o-field label="País">
								<Multiselect
									:options="['Costa Rica']"
									placeholder="Seleccionar..."
									noOptionsText="No hay opciones aún"
									noResultsText="No hay opciones aún"
									searchable
								/>
							</o-field>
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
								v-if="!next.disabled"
								variant="primary"
								icon-pack="fas"
								icon-left="chevron-right"
								@click.prevent="next.action"
							/>
							<o-button
								v-if="!previous.disabled && next.disabled"
								variant="primary"
								tag="router-link"
								to="/pay"
							>
								Pagar el curso
							</o-button>
						</div>
					</template>
				</o-steps>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const activeStep = ref(0);
</script>

<route>
{
  meta: {
	  layout: "auth",
	  isFree: true,
  }
}
</route>
