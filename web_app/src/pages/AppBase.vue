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
	}
}
</script>

<style lang="scss">
@import '../styles/initial_variables.scss';

.app-base > .donations {
	background-image: linear-gradient(135deg, $primary, #45bff6) !important;
	height: 100vh !important;
	position: relative;
	padding-top: 0;

	.body {
		padding-top: 4.5rem;
		height: 100vh !important;
		margin-left: 0.75rem;
		position: relative;

		&.paypalExtend {
			height: 1500px !important;

			@include mobile {
				height: 1000px !important;
			}

			@include mobile {
				.box {
					height: 100% !important;
					margin-top: 15%;
				}
			}
		}

		@include mobile {
			.box {
				height: max-content !important;
			}
		}
	}
}
</style>
