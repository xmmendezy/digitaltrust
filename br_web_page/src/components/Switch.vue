<template>
	<div class="field">
		<label class="label">{{ label }}</label>
		<div class="control">
			<div class="pretty p-switch p-fill p-smooth">
				<input v-model="value" type="checkbox" />
				<div class="state p-primary">
					<label></label>
				</div>
			</div>
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
		type: Boolean,
		default: false,
	},
});

const value = useVModel(props, 'modelValue', emit);
</script>

<style lang="scss" scoped>
.pretty {
	margin-top: 0.5rem;
	font-size: 1.5rem;
}
</style>
