<template>
	<nav class="navbar is-white">
		<div class="navbar-brand">
			<router-link to="/" class="navbar-item">
				<img src="/images/logo.png" width="112" height="28" />
			</router-link>

			<a class="navbar-burger is-hidden-touch" @click="toogleMenu">
				<i class="fas navbar-burger-icon" :class="[is_active ? 'fa-times' : 'fa-bars']"></i>
			</a>
		</div>

		<div class="navbar-menu" :class="{ 'is-active': is_active }">
			<div class="navbar-end">
				<router-link v-if="route.path !== '/contact'" to="/contact" class="navbar-item is-hidden-touch">
					Contact us
				</router-link>

				<div class="navbar-header is-hidden-desktop">
					<a class="navbar-item mb-5">
						<img src="/images/logo.png" width="112" height="28" />
					</a>
					<router-link v-if="route.path !== '/contact'" to="/contact" class="navbar-item">
						Contact us
					</router-link>
				</div>
			</div>
		</div>
	</nav>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const is_active = ref(false);

const route = useRoute();

const toogleMenu = () => {
	is_active.value = !is_active.value;
};
</script>

<style lang="scss" scoped>
@import '~/styles/variables.scss';

@include desktop {
	.navbar {
		margin-left: 5rem;
		margin-right: 5rem;
	}

	.navbar-end {
		margin-top: 1rem;
	}
}

.navbar-burger {
	display: none;

	@include touch {
		display: block;

		.navbar-burger-icon {
			margin-top: 1rem;
		}
	}
}

.navbar-menu {
	@include touch {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-flow: column wrap;
		position: fixed;
		left: -100%;
		top: 0;
		flex-direction: column;
		background: $white;
		width: 75vw;
		height: 100vh;
		padding: 0.25rem 0;
		margin: 0;
		text-align: left;
		transition: 0.3s;
		z-index: 100;

		.navbar-end {
			display: flex;
			justify-content: space-between;
			align-items: center;
			flex-flow: column wrap;
			position: fixed;
			height: 100vh;

			.navbar-header,
			.navbar-footer {
				width: 75vw;
			}
		}
	}

	a.navbar-item {
		color: white;

		&:hover,
		&:focus {
			background-color: rgba(255, 255, 255, 0.15);
			font-weight: bold;
		}
	}

	&.is-active {
		@include touch {
			left: 0;
			padding-bottom: 6rem;
			-webkit-box-shadow: $box-shadow;
			box-shadow: $box-shadow;
		}
	}
}
</style>
