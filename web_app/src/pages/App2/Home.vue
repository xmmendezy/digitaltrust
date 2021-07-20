<template>
	<div class="home">
		<div v-for="i in 15" :key="i" class="box">I'm in a box.</div>
	</div>
</template>

<script lang="ts">
import PageChildBase from '../../utils/page_child_base.utils';
import { Component } from 'vue-property-decorator';

@Component
export default class Home extends PageChildBase {
	public async created() {
		await super.created();
	}
}
</script>

<style lang="scss">
@import '../../styles/initial_variables.scss';

.home {
	height: calc(100vh - 6rem);
	overflow-y: scroll;
	padding-right: 1rem;

	@include mobile {
		padding-right: 0.5rem !important;
	}

	.box {
		background-color: $box;
		color: white !important;
	}
}
</style>
