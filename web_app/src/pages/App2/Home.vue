<template>
	<div class="home tile is-ancestor"></div>
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
	height: 100%;
}
</style>
