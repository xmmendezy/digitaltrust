<template>
	<section class="login section">
		<div class="body has-text-centered is-flex">
			<div class="box">
				<article class="media">
					<div class="media-content has-text-centered">
						<b-image class="logo" :src="require('../assets/images/logo4.png')"></b-image>
						<p class="subtitle">{{ $t('trading.a') }}</p>
					</div>
				</article>
			</div>
		</div>

		<div class="points_1">
			<Points />
		</div>
		<div class="points_2">
			<Points />
		</div>
		<b-image class="digital-group" :src="require('../assets/images/logo-digitalgroup.png')"></b-image>
	</section>
</template>

<script lang="ts">
import PageChildBase from '../utils/page_child_base.utils';
import { Component } from 'vue-property-decorator';
import Points from '../components/Points.vue';

@Component({
	components: { Points },
})
export default class Login extends PageChildBase {
	public async created() {
		await super.created();
		const id: string = (this.$route.query.id as string) || '';
		if (id) {
			this.load_form_api(await this.store.api.link_traiding(id), () => {}, {
				e000: () => {
					this.toastError(this.$t('login.error.e000'));
				},
			});
			this.auth_data = this.store.api.auth_data;
			if (await this.store.api.isLogged()) {
				this.$i18n.locale = this.store.api.country.locale || 'en';
				this.toastSuccess(`${this.$t('helper.welcome')}, ${this.store.api.name}`);
				this.$router.push({ name: 'BuyMore' });
			} else {
				this.$router.push({ path: '/login' });
			}
		} else {
			this.$router.push({ path: '/login' });
		}
	}
}
</script>

<style lang="scss">
@import '../styles/initial_variables.scss';

.login {
	height: 100vh;
	overflow-y: scroll;
	background-image: linear-gradient(135deg, $primary, #45bff6) !important;

	@include mobile {
		padding: 2rem 0;
	}

	.body {
		height: 80vh;

		.box {
			width: 40%;
			margin: auto;
			background-color: transparent;
			box-shadow: none;

			@include until-widescreen {
				width: 60%;
			}

			@include mobile {
				width: 100%;
				height: 100%;
				border-radius: 0;
				padding: 0.75rem;
			}

			.media {
				padding: 2rem 0;
				background-color: transparent;

				@include mobile {
					padding: 1rem 0;
					height: 100%;

					.media-content {
						background-color: transparent;
						height: 100%;
					}
				}

				.logo {
					width: 15rem;
					margin: auto;
					margin-bottom: 1.5rem;

					@include mobile {
						width: 10rem;
					}
				}

				.subtitle {
					color: white !important;
					font-size: 28px;
					font-weight: normal !important;
				}

				.form {
					margin: auto;
					width: 70%;

					@include mobile {
						width: 90%;
					}

					.c-input {
						margin: 2rem 0;
					}

					.button.is-text {
						color: white !important;
						text-decoration-color: transparent;

						&:hover {
							background-color: rgba(255, 255, 255, 0.25);
						}
					}

					.button.is-white {
						padding: 1.5rem 1rem;
						margin: 1rem 0;
						width: 50%;
						color: $primary !important;
						font-weight: bold;
						box-shadow: 0 5px #5c5c5c6b;
					}
				}

				.is-divider {
					margin-left: auto;
					margin-right: auto;
					width: 90%;
				}

				.button.is-primary {
					padding: 1.5rem 1rem;
					margin: 1rem 0;
					width: 35%;
				}

				.columns {
					margin: 0;

					.column-terms {
						font-size: 12px;
						margin-left: 3rem;

						@include mobile {
							margin: auto;
							width: 50%;
						}
					}
				}
			}
		}
	}

	.modal {
		.animation-content {
			width: 40%;

			@include mobile {
				width: 90%;
			}

			.modal-card {
				width: 100%;
				border-radius: 12px;

				.modal-card-body {
					padding: 3rem;

					.title {
						color: $dark;
						font-size: 22px;
						font-weight: bold !important;
					}

					.subtitle {
						padding-top: 2rem;
						font-size: 18px;
					}
				}

				.button.is-primary {
					padding: 1.5rem 1rem;
					margin: 1rem 0;
					width: 50%;
				}
			}
		}
	}

	div[class^='points_'] {
		position: absolute;
		overflow: hidden;
	}

	.points_1 {
		top: 3rem;
		left: 7rem;

		@include mobile {
			bottom: 5rem;
			left: -3rem;
			transform: rotate(180deg);
		}
	}

	.points_2 {
		bottom: 1rem;
		right: 4rem;

		@include mobile {
			display: none;
		}
	}
}
</style>
