<template>
	<img :src="'/images/' + props.img" alt="image" />
</template>

<script setup lang="ts">
const props = defineProps({
	img: {
		type: String,
		default: "",
	},
});
</script>
