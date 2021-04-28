<template>
	<div class="setting">
		<article class="box">
			<!-- Put any content you want -->
		</article>
	</div>
</template>

<script lang="ts">
import PageChildBase from '../../utils/page_child_base.utils';
import { Component } from 'vue-property-decorator';

@Component
export default class Setting extends PageChildBase {
	public async created() {
		await super.created();
	}
}
</script>

<style lang="scss">
.setting {
	height: 100%;

	.box {
		height: 100%;
	}
}
</style>
