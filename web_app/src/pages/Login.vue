<template>
	<section class="login section">
		<div class="body has-text-centered">
			<div class="box is-inline-block">
				<article class="media">
					<div class="media-content has-text-centered">
						<b-image class="logo" :src="require('../assets/images/logo4.png')"></b-image>
						<br />
						<br />
						<p class="title">{{ L('login.a') }}</p>
						<section class="form has-text-centered">
							<b-field>
								<c-input
									ref="input"
									v-model="login_form.email"
									@keyup.enter.native="login()"
									:placeholder="L('login.b')"
								></c-input>
							</b-field>
							<b-field>
								<c-input
									v-model="login_form.password"
									@keyup.enter.native="login()"
									:placeholder="L('login.c')"
									password
								>
								</c-input>
							</b-field>
							<b-field>
								<b-button @click="isModalForgotPassword = true" type="is-text">
									{{ L('login.d') }}
								</b-button>
							</b-field>
							<br />
							<br />
							<b-field>
								<b-button @click="login()" rounded type="is-white">{{ L('login.e') }}</b-button>
							</b-field>
						</section>
					</div>
				</article>
			</div>
		</div>

		<b-modal
			v-model="isModalForgotPassword"
			has-modal-card
			trap-focus
			:destroy-on-hide="false"
			aria-role="dialog"
			aria-label="Forgot password"
			aria-modal
		>
			<div class="modal-card">
				<section class="modal-card-body">
					<p class="title">{{ L('login.forgot_password.a') }}</p>
					<p class="subtitle has-text-justified">{{ L('login.forgot_password.b') }}</p>
					<b-field>
						<c-input
							v-model="email_forgot_password"
							@keyup.enter.native="passowrd_forgot()"
							:placeholder="L('login.forgot_password.c')"
						>
						</c-input>
					</b-field>
					<b-field>
						<b-button @click="passowrd_forgot()" type="is-primary">{{
							L('login.forgot_password.d')
						}}</b-button>
					</b-field>
				</section>
			</div>
		</b-modal>

		<div class="points_1">
			<Points />
		</div>
		<div class="points_2">
			<Points />
		</div>
	</section>
</template>

<script lang="ts">
import PageChildBase from '../utils/page_child_base.utils';
import { Component } from 'vue-property-decorator';
import { LoginDto } from '../store';
import Points from '../components/Points.vue';

@Component({
	components: { Points },
})
export default class Login extends PageChildBase {
	private isModalForgotPassword: boolean = false;
	private email_forgot_password: string = '';

	private telephone: string = '+16469803342';

	private login_form: LoginDto = {
		email: '',
		password: '',
	};

	public async created() {
		await super.created();
	}

	private async mounted() {
		const timer = setInterval(() => {
			if (this.$refs.input) {
				clearInterval(timer);
				(this.$refs.input as any).focus();
			}
		}, 10);
	}

	private async login() {
		this.load_form_api(await this.store.api.login(this.login_form), () => {}, {
			e000: () => {
				this.toastError(this.L('login.error.e000'));
			},
		});
		this.auth_data = this.store.api.auth_data;
		if (await this.store.api.isLogged()) {
			this.$i18n.locale = this.store.api.country.locale || 'en';
			this.toastSuccess(`${this.L('helper.welcome')}, ${this.store.api.name}`);
			if (this.auth_data?.user?.role === 'admin') {
				this.$router.push({ name: 'AdminHome' });
			} else {
				this.$router.push({ name: 'Home' });
			}
		}
	}

	public async passowrd_forgot() {
		if (this.email_forgot_password) {
			window.open(
				`https://wa.me/${this.telephone}?text=Hi, I need help with my password. My email is ${this.email_forgot_password}.`,
				'_blank',
			);
		} else {
			this.toastError(this.L('error.u5'));
		}
		this.isModalForgotPassword = false;
	}
}
</script>

<style lang="scss">
@import '../styles/initial_variables.scss';

.login {
	background-image: linear-gradient(135deg, $primary, #45bff6) !important;
	position: relative;
	padding: 0;

	.body {
		padding-top: 4.5rem;
		height: 100vh;
		position: relative;

		.box {
			width: 40%;
			border-radius: 24px;
			margin: 0;
			position: absolute;
			top: 50%;
			left: 50%;
			-ms-transform: translate(-50%, -50%);
			transform: translate(-50%, -50%);
			transition: width 150ms ease-out;
			background-color: transparent;
			box-shadow: none;

			@include until-widescreen {
				width: 60%;
			}

			@include mobile {
				width: 100%;
				height: 100%;
				border-radius: 0;
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
					margin-bottom: 3rem;

					@include mobile {
						width: 10rem;
					}
				}

				.title {
					color: white !important;
					font-size: 32px;
					font-weight: normal !important;
				}

				.form {
					margin: auto;
					width: 70%;

					@include mobile {
						width: 90%;
					}

					.c-input {
						.vfl-label {
							color: white !important;
						}

						.vfl-label + input {
							border-bottom: 2px solid white;
						}

						.fas {
							color: white !important;
						}

						.input {
							color: white !important;
							background-color: transparent !important;

							&::placeholder {
								color: white !important;
							}

							&:-ms-input-placeholder {
								color: white !important;
							}

							&::-ms-input-placeholder {
								color: white !important;
							}
						}
					}

					.button.is-text {
						color: white !important;
						text-decoration-color: transparent;
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
