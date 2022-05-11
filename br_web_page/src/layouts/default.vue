<template>
	<nav-bar />
	<div class="main">
		<router-view />
	</div>
</template>

<script setup lang="ts"></script>

<style lang="scss">
.main {
	overflow-y: scroll;
	height: 95vh;
}
</style>
