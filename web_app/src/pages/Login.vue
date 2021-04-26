<template>
	<div class="login">
		<div class="body has-text-centered">
			<div class="box is-inline-block">
				<article class="media">
					<div class="media-content has-text-centered">
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
								<b-button @click="login()" type="is-text">{{ L('login.d') }}</b-button>
							</b-field>
							<b-field>
								<b-button @click="login()" type="is-primary">{{ L('login.e') }}</b-button>
							</b-field>
						</section>
						<div class="is-divider" data-content="o"></div>
						<b-button @click="login()" type="is-primary" outlined>{{ L('login.f') }}</b-button>
					</div>
				</article>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import PageChildBase from '../utils/page_child_base.utils';
import { Component } from 'vue-property-decorator';
import { LoginDto } from '../store';

@Component
export default class Login extends PageChildBase {
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
		this.load_form_api(await this.store.auth.login(this.login_form), () => {}, {
			e000: () => {
				this.toastError('Ha ocurrido un error, confirme su usuario y contraseña y vuelva a intentar');
			},
		});
		this.auth_data = this.store.auth.auth_data;
		if (await this.store.auth.isLogged()) {
			if (this.auth_data.user?.is_admin) {
				this.toastSuccess(`Bienvenido ${this.store.auth.name}`);
				this.$router.push('/');
			} else {
				this.toastSuccess('No tiene permisos para acceder a esta sección.');
				this.store.auth.logout();
			}
		}
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
			width: 35%;
			border-radius: 24px;
			margin: 0;
			position: absolute;
			top: 50%;
			left: 50%;
			-ms-transform: translate(-50%, -50%);
			transform: translate(-50%, -50%);

			.media {
				padding: 4rem 0;

				.title {
					color: $dark;
					font-size: 45px;
					font-weight: bold !important;
				}

				.form {
					margin: auto;
					width: 70%;

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
			}
		}
	}
}
</style>
