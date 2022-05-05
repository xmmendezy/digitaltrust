<template>
	<router-view v-slot="{ Component, route }">
		<transition :name="route.meta.transitionName">
			<component :is="Component" />
		</transition>
	</router-view>
</template>

<script setup lang="ts"></script>
