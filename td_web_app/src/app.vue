<template>
	<div class="trading-app-page" :class="{ auth: route.meta.isFree }">
		<router-view />
	</div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();
</script>
