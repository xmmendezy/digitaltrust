<template>
	<div class="tabs">
		<ul class="is-justify-content-flex-end">
			<li>
				<router-link to="/admin">Inicio</router-link>
			</li>
			<li class="is-hidden-mobile">
				<router-link to="/admin/notice">Comunicados</router-link>
			</li>
			<li class="is-hidden-mobile">
				<router-link to="/admin/blog">Blog</router-link>
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
