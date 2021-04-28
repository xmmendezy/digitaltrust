<template>
	<div class="app-base">
		<transition name="fade" mode="out-in">
			<router-view ref="child_page" @emit-error="error = true"></router-view>
		</transition>
	</div>
</template>

<script lang="ts">
import PageBase from '../utils/page_base.utils';
import { Component } from 'vue-property-decorator';

@Component
export default class AppBase extends PageBase {
	private error: boolean = false;

	public async created() {
		await super.created();
		const time_reload_mobile = 4000000;
		const time_reload_desktop = 400000;
		setInterval(
			() => {
				if (this.$refs.child_page) {
					(this.$refs.child_page as any).reload();
				}
			},
			this.$isMobile() ? time_reload_mobile : time_reload_desktop,
		);
	}
}
</script>
