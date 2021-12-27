<template>
	<div class="tabs">
		<ul>
			<li>
				<router-link to="/">Inicio</router-link>
			</li>
			<li v-if="store.course_data?.blog">
				<router-link to="/blog">Blog</router-link>
			</li>
			<li>
				<router-link to="/setting">Configuración</router-link>
			</li>
			<li>
				<a @click="store.logout()">Salir</a>
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
import { useDataStore } from '~/store';

const store = useDataStore();
</script>

<style lang="scss" scoped>
@import '../styles/utils.scss';
@import '../styles/variables.scss';

.tabs ul {
	border: none;
	a {
		border: none;
	}

	.router-link-active.router-link-exact-active {
		color: $primary;
	}
}
</style>
