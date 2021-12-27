<template></template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useDataStore } from '~/store';

const store = useDataStore();

onMounted(() => {
	store.logout();
});
</script>
