<template>
	<div class="login-admin">
		<div class="body has-text-centered">
			<div class="box is-inline-block">
				<article class="media">
					<div class="media-content has-text-centered">
						<b-image class="logo" :src="require('../../assets/images/logo4.png')"></b-image>
						<p class="title">{{ $t('login.a') }}</p>
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
								<b-button @click="login()" rounded type="is-white">{{ $t('login.e') }}</b-button>
							</b-field>
						</section>
					</div>
				</article>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import PageChildBase from '../../utils/page_child_base.utils';
import { Component } from 'vue-property-decorator';
import { LoginDto } from '../../store';

@Component
export default class Login extends PageChildBase {
	private login_form: LoginDto = {
		username: '',
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
}
</script>

<style lang="scss">
@import '../../styles/initial_variables.scss';

.login-admin {
	height: 100vh;
	overflow-y: scroll;
	background-image: linear-gradient(135deg, $primary, #45bff6) !important;

	.body {
		padding-top: 4.5rem;
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
			}

			.media {
				padding: 4rem 0;

				@include mobile {
					padding: 8rem 0;
					height: 100%;

					.media-content {
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
						margin: 3rem 0;
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
			}
		}
	}
}
</style>
