<template>
	<nav class="navbar secundary">
		<div class="container">
			<div class="navbar-brand">
				<router-link
					to="/"
					class="navbar-item title title-page has-text-primary"
					>DigitalTrust</router-link
				>
				<span
					class="navbar-burger burger main"
					data-target="navbarMenu"
				>
					<span></span>
					<span></span>
					<span></span>
				</span>
			</div>
			<div id="navbarMenu" class="navbar-menu">
				<div class="navbar-end">
					<router-link
						to="/"
						class="navbar-item title title-page has-text-primary"
						>DigitalTrust</router-link
					>
					<span
						class="navbar-burger burger is-active"
						data-target="navbarMenu"
					>
						<span></span>
						<span></span>
						<span></span>
					</span>
				</div>
			</div>
		</div>
	</nav>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";

const is_active = ref(false);

const route = useRoute();

const toogleMenu = () => {
	is_active.value = !is_active.value;
};
</script>

<style lang="scss" scoped>
@import "~/styles/variables.scss";

nav.navbar {
	padding: 1.5rem 9rem 0 9rem !important;

	@include touch {
		padding: 1rem 0.5rem 0 0.5rem !important;
	}

	.title-page {
		font-size: 24px !important;
		margin: 0 !important;
		padding: 0.5rem 0.75rem;
	}

	.navbar-burger {
		color: $black;

		&.is-active {
			color: $white;
		}
	}

	&.secundary {
		padding: 1.5rem 9rem !important;

		@include touch {
			padding: 0.5rem !important;
		}

		.navbar-menu.is-active {
			@include touch {
				padding-bottom: 2rem;
			}
		}
	}
}

a.navbar-item {
	color: $primary;
	margin-top: 0.5rem;
	font-size: 16px !important;
	font-weight: lighter;
	border-radius: 1rem;

	@include touch {
		text-align: left;
		padding-left: 1.5rem;
		padding-right: 1.5rem;
	}

	&.login {
		@include touch {
			text-align: right;
		}

		@include tablet {
			margin-left: 4rem;
		}
	}

	&.friendly {
		&:hover {
			font-weight: bold;
		}

		@include touch {
			text-align: right;
		}

		@include tablet {
			margin-left: 4rem;
		}
	}

	&.title {
		font-weight: 600;
	}

	&:hover {
		color: $white;
		background-color: $primary;
		font-size: 2rem;
	}
}

.navbar-menu {
	.navbar-end {
		.title-page {
			display: none;

			@include touch {
				display: inline-block;
				padding-left: 1.5rem;
				position: absolute;
				left: 0;
			}
		}

		.navbar-burger {
			display: none;

			@include touch {
				display: block;
			}
		}
	}

	@include touch {
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: fixed;
		left: -100%;
		top: 0;
		flex-direction: column;
		background: $primary;
		width: 75vw;
		height: 100vh;
		padding: 1.5rem 0;
		margin: 0;
		text-align: center;
		transition: 0.3s;
		z-index: 100;
	}

	&.is-active {
		@include touch {
			left: 0;
			padding-bottom: 6rem;
			-webkit-box-shadow: none !important;
			box-shadow: none !important;

			a.navbar-item {
				color: white;

				&:hover,
				&:focus {
					background-color: rgba(255, 255, 255, 0.15);
					font-weight: bold;
				}
			}
		}
	}
}
</style>
