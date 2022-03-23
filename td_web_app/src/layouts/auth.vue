<template>
	<div style="position: relative">
		<router-view @loading="changeLoading" />
		<o-loading v-model:active="isLoading"></o-loading>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useDataStore } from '~/store';

const store = useDataStore();

const isLoading = ref(false);

const changeLoading = () => {
	isLoading.value = !isLoading.value;
};

if (store.authenticated) {
	store.myCourse()
}
</script>
