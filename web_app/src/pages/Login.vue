<template>
	<div class="login">
		<div class="body has-text-centered">
			<div class="box is-inline-block">
				<article class="media">
					<div class="media-content has-text-centered">
						<b-image class="logo" :src="require('../assets/images/logo2.png')"></b-image>
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
							<b-field>
								<b-button @click="login()" type="is-primary">{{ L('login.e') }}</b-button>
							</b-field>
						</section>
						<div class="is-divider" data-content="o"></div>
						<b-button tag="router-link" to="/register" type="is-primary" outlined>
							{{ L('login.f') }}
						</b-button>
						<div class="columns">
							<div class="column"></div>
							<div class="column column-terms is-5 has-text-left">
								<b-field>
									{{ L('helper.see') }}
									<a :href="publicPath + 'doc1.pdf'" target="_blank">{{ L('register.k') }}</a>
								</b-field>
								<b-field>
									{{ L('helper.see') }}
									<a :href="publicPath + 'doc2.pdf'" target="_blank">{{ L('register.l') }}</a>
								</b-field>
							</div>
							<div class="column"></div>
						</div>
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
	</div>
</template>

<script lang="ts">
import PageChildBase from '../utils/page_child_base.utils';
import { Component } from 'vue-property-decorator';
import { LoginDto } from '../store';

@Component
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
				`https://wa.me/${this.telephone}?text=Hola, necesito ayuda con mi contraseña. Mi correo es ${this.email_forgot_password}.`,
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

				@include mobile {
					padding: 3rem 0;
					height: 100%;

					.media-content {
						height: 100%;
					}
				}

				.logo {
					width: 12rem;
					margin: auto;
					margin-bottom: 3rem;
				}

				.title {
					color: $dark;
					font-size: 32px;
					font-weight: bold !important;
				}

				.form {
					margin: auto;
					width: 70%;

					@include mobile {
						width: 90%;
					}

					.button.is-text {
						text-decoration-color: $primary;
						text-underline-offset: 50%;
					}

					.button.is-primary {
						padding: 1.5rem 1rem;
						margin: 1rem 0;
						width: 50%;
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
}
</style>
