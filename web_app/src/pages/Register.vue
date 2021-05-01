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
						<p v-else-if="ref_error" class="subtitle">
							{{ L('register.ref_error') }}
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
							<div class="columns">
								<div class="column"></div>
								<div class="column column-check is-6 has-text-left">
									<b-field>
										<b-checkbox v-model="check1">
											{{ L('helper.see') }}
											<a :href="publicPath + 'doc1.pdf'" target="_blank">{{ L('register.k') }}</a>
										</b-checkbox>
									</b-field>
									<b-field>
										<b-checkbox v-model="check2">
											{{ L('helper.see') }}
											<a :href="publicPath + 'doc2.pdf'" target="_blank">{{ L('register.l') }}</a>
										</b-checkbox>
									</b-field>
								</div>
								<div class="column"></div>
							</div>
							<b-field>
								<b-button @click="signup()" type="is-primary" :disabled="!(check1 && check2)">{{
									L('register.m')
								}}</b-button>
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
import { SignupDto, ICountry, IRefer } from '../store';

@Component
export default class Register extends PageChildBase {
	private signup_form: SignupDto = new SignupDto();

	private ref_name: string = '';
	private ref_error: boolean = false;

	private check1: boolean = false;
	private check2: boolean = false;

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
				await this.store.api.ref_user(this.$route.query.ref as string),
				(ref_user: IRefer) => {
					if (ref_user.id) {
						this.signup_form.ref = ref_user.id;
						this.ref_name = ref_user.name;
					} else {
						this.ref_error = true;
					}
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
		this.exec_is_render('input', input => {
			(input as any).focus();
		});
	}

	private async signup() {
		if (this.check1 && this.check2) {
			const errors: string[] = this.signup_form.validate();
			if (!this.validationTelephone) {
				errors.push('validator.auth.h');
			}
			if (errors.length) {
				this.toastError(this.L(errors[0]));
			} else {
				const telephone = this.signup_form.telephone;
				this.signup_form.telephone = this.telephoneInternational;
				this.load_form_api(await this.store.api.signup(this.signup_form), () => {}, {
					e000: () => {
						this.toastError(this.L('error.e000'));
					},
				});
				this.auth_data = this.store.api.auth_data;
				this.signup_form.telephone = telephone;
				if (await this.store.api.isLogged()) {
					this.toastSuccess(`${this.L('helper.welcome')}, ${this.store.api.name}`);
					this.$router.push('/');
				}
			}
		}
	}

	public validateNumber(args: any) {
		if (args) {
			this.validationTelephone = args.valid;
			if (args.number) {
				this.telephoneInternational = args.number;
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
				width: 100%;
				height: 100%;
				border-radius: 0;
			}

			.media {
				padding: 4rem 0;

				@include mobile {
					padding: 3rem 0;
					height: 100%;

					.media-content {
						height: 100%;
					}
				}

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

					@include mobile {
						width: 90%;
					}

					.c-input,
					.c-tel-input {
						margin: 1rem 0;
					}

					.column-check {
						font-size: 12px;
						margin-left: 2rem;
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
}
</style>
