<template>
	<div class="setting">
		<div class="columns-content">
			<div class="column-content">
				<p>Datos del Perfil</p>
				<form class="form">
					<o-field label="Nombre">
						<o-input v-model="user.firstname" maxlength="30" @keyup.enter="toUpdate"></o-input>
					</o-field>

					<o-field label="Apellido">
						<o-input v-model="user.lastname" maxlength="30" @keyup.enter="toUpdate"></o-input>
					</o-field>

					<o-field label="País">
						<Multiselect
							v-model="user.country"
							:options="countries"
							placeholder="Seleccionar..."
							noOptionsText="No hay opciones aún"
							noResultsText="No hay opciones aún"
							searchable
						/>
					</o-field>
				</form>
			</div>
			<div class="column-content">
				<p>Datos del Usuario</p>
				<form class="form">
					<o-field label="Nombre de usuario">
						<o-input v-model="user.username" maxlength="10" @keyup.enter="toUpdate"></o-input>
					</o-field>

					<o-field label="Correo">
						<o-input v-model="user.email" maxlength="40" @keyup.enter="toUpdate"></o-input>
					</o-field>

					<o-field label="Contraseña">
						<o-input
							v-model="user.password"
							type="password"
							maxlength="20"
							password-reveal
							@keyup.enter="toUpdate"
						>
						</o-input>
					</o-field>

					<o-field label="Confirmar contraseña">
						<o-input
							v-model="user.password_confirm"
							type="password"
							maxlength="20"
							password-reveal
							@keyup.enter="toUpdate"
						>
						</o-input>
					</o-field>
				</form>
			</div>
		</div>
		<o-button variant="primary" @click="toUpdate"> Guardar </o-button>
	</div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useDataStore, UpdateDto } from '~/store';

const store = useDataStore();

const emit = defineEmits(['loading']);

const user = reactive<UpdateDto>(new UpdateDto(store.user));

const countries = store.countries.map(c => ({ value: c.id, label: c.name }));

const toUpdate = () => {
	emit('loading');
	store.update(user).finally(() => {
		emit('loading');
	});
};
</script>
