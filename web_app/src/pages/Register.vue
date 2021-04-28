<template>
	<div class="register">
		<div class="body has-text-centered">
			<div class="box is-inline-block">
				<article class="media">
					<div class="media-content has-text-centered">
						<p class="title">{{ L('register.a') }}</p>
						<p v-if="ref_name" class="subtitle">
							{{ L('register.b') }} <b>{{ ref_name }}.</b>
						</p>
						<section class="form has-text-centered">
							<div class="columns">
								<div class="column">
									<c-input
										ref="input"
										v-model="signup_form.firstname"
										@keyup.enter.native="signup()"
										:placeholder="L('register.c')"
									></c-input>
								</div>
								<div class="column">
									<c-input
										v-model="signup_form.lastname"
										@keyup.enter.native="signup()"
										:placeholder="L('register.d')"
									></c-input>
								</div>
							</div>
							<div class="columns">
								<div class="column">
									<c-input
										v-model="signup_form.email"
										@keyup.enter.native="signup()"
										:placeholder="L('register.e')"
									></c-input>
								</div>
								<div class="column">
									<c-tel-input
										v-model="signup_form.telephone"
										@keyup.enter.native="signup()"
										:placeholder="L('register.f')"
										@validate="validateNumber"
										@country-changed="changeCountry"
									></c-tel-input>
								</div>
							</div>
							<div class="columns">
								<div class="column">
									<c-input
										v-model="signup_form.state"
										@keyup.enter.native="signup()"
										:placeholder="L('register.g')"
									></c-input>
								</div>
								<div class="column">
									<c-input
										v-model="signup_form.address"
										@keyup.enter.native="signup()"
										:placeholder="L('register.h')"
									></c-input>
								</div>
							</div>
							<div class="columns">
								<div class="column">
									<c-input
										v-model="signup_form.password"
										@keyup.enter.native="signup()"
										:placeholder="L('register.i')"
										password
									></c-input>
								</div>
								<div class="column">
									<c-input
										v-model="signup_form.password_confirm"
										@keyup.enter.native="signup()"
										:placeholder="L('register.j')"
										password
									></c-input>
								</div>
							</div>
							<b-field>
								<b-button @click="signup()" type="is-primary">{{ L('register.k') }}</b-button>
							</b-field>
						</section>
					</div>
				</article>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import PageChildBase from '../utils/page_child_base.utils';
import { Component } from 'vue-property-decorator';
import { SignupDto, ICountry } from '../store';

@Component
export default class Register extends PageChildBase {
	private signup_form: SignupDto = new SignupDto();

	private ref_name = '';

	private telephoneInternational: string = '';
	private validationTelephone: any;
	private countryEnabled: string = '';
	private countriesAllow: string[] = [];
	private countriesAllowIDS: string[] = [];

	public async created() {
		await super.created();
		(await this.store.util.getCountries()).map((c: ICountry) => {
			this.countriesAllow.push(c.code || '');
			this.countriesAllowIDS.push(c.id || '');
		});
		if ('ref' in this.$route.query) {
			this.load_form_api(
				await this.store.auth.ref_user(this.$route.query.ref as string),
				ref_user => {
					this.signup_form.ref = ref_user.ref;
					this.ref_name = ref_user.name;
				},
				{
					e000: () => {
						this.toastError(this.L('register.e000'));
					},
				},
			);
		}
	}

	private async mounted() {
		const timer = setInterval(() => {
			if (this.$refs.input) {
				clearInterval(timer);
				(this.$refs.input as any).focus();
			}
		}, 10);
	}

	public validateNumber(args: any) {
		if (args) {
			this.validationTelephone = args.valid;
			if (args.number) {
				this.telephoneInternational = args.number;
			}
		}
	}

	private async signup() {
		const errors: string[] = this.signup_form.validate();
		if (!this.validationTelephone) {
			errors.push('validator.auth.h');
		}
		if (errors.length) {
			this.toastError(this.L(errors[0]));
		} else {
			const telephone = this.signup_form.telephone;
			this.signup_form.telephone = this.telephoneInternational;
			this.load_form_api(await this.store.auth.signup(this.signup_form), () => {}, {
				e000: () => {
					this.toastError(this.L('error.e000'));
				},
			});
			this.auth_data = this.store.auth.auth_data;
			this.signup_form.telephone = telephone;
			if (await this.store.auth.isLogged()) {
				this.toastSuccess(`${this.L('helper.welcome')}, ${this.store.auth.name}`);
				this.$router.push('/');
			}
		}
	}

	public changeCountry(countryCode: any) {
		this.countryEnabled = this.countriesAllow.find(element => element == countryCode.iso2) ?? '';
		this.signup_form.telephone = '';
		const indexCountry = this.countriesAllow.findIndex(element => element == countryCode.iso2);
		this.signup_form.country = this.countriesAllowIDS[indexCountry ?? ''] ?? '';
	}
}
</script>

<style lang="scss">
@import '../styles/initial_variables.scss';

.register {
	.body {
		padding-top: 4.5rem;
		height: 100vh;
		position: relative;

		.box {
			width: 60%;
			border-radius: 24px;
			margin: 0;
			position: absolute;
			top: 50%;
			left: 50%;
			-ms-transform: translate(-50%, -50%);
			transform: translate(-50%, -50%);
			transition: width 150ms ease-out;

			@include until-widescreen {
				width: 80%;
			}

			@include mobile {
				width: 90%;
			}

			.media {
				padding: 4rem 0;

				.title {
					color: $dark;
					font-size: 45px;
					font-weight: bold !important;
				}

				.subtitle {
					padding-top: 2rem;
					font-size: 18px;
				}

				.form {
					margin: auto;
					width: 70%;

					.c-input,
					.c-tel-input {
						margin: 1rem 0;
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
			}
		}
	}
}
</style>
