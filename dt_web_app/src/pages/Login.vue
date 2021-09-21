<template>
	<section class="login section">
		<div class="body has-text-centered">
			<div class="box">
				<article class="media">
					<div class="media-content has-text-centered">
						<b-image class="logo" :src="require('../assets/images/logo4.png')"></b-image>
						<p class="subtitle">{{ $t('login.a') }}</p>
						<section class="form has-text-centered">
							<b-field>
								<c-input
									class="md"
									ref="input"
									v-model="login_form.username"
									@keyup.enter.native="login()"
									:placeholder="$t('login.b')"
								></c-input>
							</b-field>
							<b-field>
								<c-input
									class="md"
									v-model="login_form.password"
									@keyup.enter.native="login()"
									:placeholder="$t('login.c')"
									password
								>
								</c-input>
							</b-field>
							<b-field>
								<vue-hcaptcha
									sitekey="64ba7c4f-e890-4fbf-bffe-4c3364b64e87"
									@verify="captcha()"
								></vue-hcaptcha>
							</b-field>
							<b-field>
								<b-button @click="isModalForgotPassword = true" type="is-text">
									{{ $t('login.d') }}
								</b-button>
							</b-field>
							<b-field>
								<b-button :disabled="!valid_form" @click="login()" rounded type="is-white">{{
									$t('login.e')
								}}</b-button>
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
					<p class="title">{{ $t('login.forgot_password.a') }}</p>
					<p class="subtitle has-text-justified">{{ $t('login.forgot_password.b') }}</p>
					<b-field>
						<c-input
							v-model="email_forgot_password"
							@keyup.enter.native="passowrd_forgot()"
							:placeholder="$t('login.forgot_password.c')"
						>
						</c-input>
					</b-field>
					<b-field>
						<b-button @click="passowrd_forgot()" type="is-primary">{{
							$t('login.forgot_password.d')
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
import VueHcaptcha from '@hcaptcha/vue-hcaptcha';

@Component({
	components: { Points, VueHcaptcha },
})
export default class Login extends PageChildBase {
	private isModalForgotPassword: boolean = false;
	private email_forgot_password: string = '';

	private telephone: string = '+16469803342';

	private valid_captcha: boolean = false;

	private login_form: LoginDto = {
		username: '',
		password: '',
	};

	public async created() {
		await super.created();
	}

	public captcha() {
		this.valid_captcha = true;
	}

	get valid_form(): boolean {
		return this.valid_captcha && !!this.login_form.username && !!this.login_form.password;
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
		if (!this.valid_form) {
			return;
		}
		this.load_form_api(await this.store.api.login(this.login_form), () => {}, {
			e000: () => {
				this.toastError(this.$t('login.error.e000'));
			},
		});
		this.auth_data = this.store.api.auth_data;
		if (await this.store.api.isLogged()) {
			this.$i18n.locale = this.store.api.country.locale || 'en';
			this.toastSuccess(`${this.$t('helper.welcome')}, ${this.store.api.name}`);
			if (this.auth_data?.user?.role === 'admin') {
				this.$router.push({ name: 'AdminHome' });
			} else {
				this.$router.push({ name: 'Home' });
			}
		}
	}

	public async passowrd_forgot() {
		if (this.email_forgot_password) {
			if (await this.store.api.reset_password(this.email_forgot_password)) {
				this.toastSuccess(this.$t('helper.password_suscess'), 5000);
			} else {
				this.toastError(this.$t('helper.password_error'), 8000);
			}
		} else {
			this.toastError(this.$t('error.u5'));
		}
		this.isModalForgotPassword = false;
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
		height: 100vh;

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
