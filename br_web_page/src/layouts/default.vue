<template>
	<nav-bar />
	<div class="main">
		<router-view v-slot="{ Component, route }">
			<transition :name="route.meta.transitionName">
				<component :is="Component" />
			</transition>
		</router-view>
	</div>
</template>

<script setup lang="ts"></script>

<style lang="scss">
.main {
	overflow-y: scroll;
	height: 95vh;
}
</style>
