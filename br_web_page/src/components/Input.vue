<template>
	<div class="field">
		<label class="label">{{ label }}</label>
		<div class="control">
			<input class="input" type="text" v-model="value" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { useVModel } from '@vueuse/core';

const emit = defineEmits(['update:modelValue']);

const props = defineProps({
	label: {
		type: String,
		default: 'Label',
	},
	modelValue: {
		type: String,
		default: '',
	},
});

const value = useVModel(props, 'modelValue', emit);
</script>
