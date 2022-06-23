<template>
	<div class="register">
		<div class="body has-text-centered">
			<div class="box is-inline-block">
				<article class="media">
					<div class="media-content has-text-centered">
						<p class="title">{{ $t('register.a') }}</p>
						<p v-if="ref_name" class="subtitle">
							{{ $t('register.b') }} <b>{{ ref_name }}.</b>
						</p>
						<p v-else-if="ref_error" class="subtitle">
							{{ $t('register.ref_error') }}
						</p>
						<section class="form has-text-centered">
							<div class="columns">
								<div class="column">
									<c-input
										class="md"
										ref="input"
										v-model="signup_form.username"
										@keyup.enter.native="signup()"
										:placeholder="$t('register.u')"
									></c-input>
								</div>
								<div class="column"></div>
							</div>
							<div class="columns">
								<div class="column">
									<c-input
										class="md"
										v-model="signup_form.firstname"
										@keyup.enter.native="signup()"
										:placeholder="$t('register.c')"
									></c-input>
								</div>
								<div class="column">
									<c-input
										class="md"
										v-model="signup_form.lastname"
										@keyup.enter.native="signup()"
										:placeholder="$t('register.d')"
									></c-input>
								</div>
							</div>
							<div class="columns">
								<div class="column">
									<c-input
										class="md"
										v-model="signup_form.email"
										@keyup.enter.native="signup()"
										:placeholder="$t('register.e')"
									></c-input>
								</div>
								<div class="column">
									<c-tel-input
										class="md"
										v-model="signup_form.telephone"
										@keyup.enter.native="signup()"
										:placeholder="$t('register.f')"
										@validate="validateNumber"
										@country-changed="changeCountry"
									></c-tel-input>
								</div>
							</div>
							<div class="columns">
								<div class="column">
									<c-input
										class="md"
										v-model="signup_form.state"
										@keyup.enter.native="signup()"
										:placeholder="$t('register.g')"
									></c-input>
								</div>
								<div class="column">
									<c-input
										class="md"
										v-model="signup_form.address"
										@keyup.enter.native="signup()"
										:placeholder="$t('register.h')"
									></c-input>
								</div>
							</div>
							<div class="columns">
								<div class="column">
									<c-input
										class="md"
										v-model="signup_form.password"
										@keyup.enter.native="signup()"
										:placeholder="$t('register.i')"
										password
									></c-input>
								</div>
								<div class="column">
									<c-input
										class="md"
										v-model="signup_form.password_confirm"
										@keyup.enter.native="signup()"
										:placeholder="$t('register.j')"
										password
									></c-input>
								</div>
							</div>
							<div class="columns">
								<div class="column"></div>
								<div class="column column-check is-6 has-text-left">
									<b-field>
										<b-checkbox v-model="check1">
											{{ $t('helper.see') }}
											<a :href="publicPath + 'doc1.pdf'" target="_blank">{{
												$t('register.k')
											}}</a>
										</b-checkbox>
									</b-field>
									<b-field>
										<b-checkbox v-model="check2">
											{{ $t('helper.see') }}
											<a :href="publicPath + 'doc2.pdf'" target="_blank">{{
												$t('register.l')
											}}</a>
										</b-checkbox>
									</b-field>
								</div>
								<div class="column"></div>
							</div>
							<b-field>
								<b-button @click="signup()" type="is-white" :disabled="!(check1 && check2)">{{
									$t('register.m')
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
	public signup_form: SignupDto = new SignupDto();

	public ref_name: string = '';
	public ref_error: boolean = false;

	public check1: boolean = false;
	public check2: boolean = false;

	public telephoneInternational: string = '';
	public validationTelephone: any;
	public countryEnabled: string = '';
	public countriesAllow: string[] = [];
	public countriesAllowIDS: string[] = [];

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
						this.$router.push({ name: 'Preregister' });
					}
				},
				{
					e000: () => {
						this.toastError(this.$t('register.e000'));
					},
				},
			);
		} else {
			this.$router.push({ name: 'Preregister' });
		}
	}

	public async mounted() {
		this.exec_is_render('input', input => {
			(input as any).focus();
		});
	}

	public async signup() {
		if (this.check1 && this.check2) {
			const errors: string[] = this.signup_form.validate();
			if (!this.validationTelephone) {
				errors.push('validator.auth.h');
			}
			if (errors.length) {
				this.toastError(this.$t(errors[0]));
			} else {
				const telephone = this.signup_form.telephone;
				this.signup_form.telephone = this.telephoneInternational;
				this.load_form_api(await this.store.api.signup(this.signup_form), () => {}, {
					e000: () => {
						this.toastError(this.$t('error.e000'));
					},
				});
				this.auth_data = this.store.api.auth_data;
				this.signup_form.telephone = telephone;
				if (await this.store.api.isLogged()) {
					this.toastSuccess(`${this.$t('helper.welcome')}, ${this.store.api.name}`);
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
	height: 100vh;
	overflow-y: scroll;
	background-image: linear-gradient(135deg, $primary, #45bff6) !important;

	.body {
		padding-top: 4.5rem;
		height: 100vh;
		position: relative;

		.box {
			width: 60%;
			margin: auto;
			background-color: transparent;
			box-shadow: none;

			@include until-widescreen {
				width: 80%;
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
					padding: 3rem 0;
					height: 100%;

					.media-content {
						height: 100%;
					}
				}

				.title {
					color: white !important;
					font-size: 45px;
					font-weight: bold !important;
				}

				.subtitle {
					color: white !important;
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
						color: white !important;
						font-size: 12px;
						margin-left: 2rem;

						.check {
							border: 2px solid white !important;
						}

						.checkbox:hover {
							color: white;
							font-weight: bold;
						}

						.control-label {
							a {
								color: white !important;
							}

							&:hover {
								color: white !important;
								font-weight: bold;
							}
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
			}
		}
	}
}
</style>
