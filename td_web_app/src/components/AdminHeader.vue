<template>
	<div class="tabs">
		<ul>
			<li>
				<router-link to="/admin">Inicio</router-link>
			</li>
			<li>
				<router-link to="/admin/blog">Blog</router-link>
			</li>
			<li>
				<router-link to="/admin/setting">Configuración</router-link>
			</li>
			<li>
				<router-link to="/login">Salir</router-link>
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts"></script>

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
