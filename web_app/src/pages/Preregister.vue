<template>
	<div class="register">
		<div class="body has-text-centered">
			<div class="box is-inline-block">
				<article class="media">
					<div class="media-content has-text-centered">
						<p class="title">{{ L('preregister.title') }}</p>
						<section class="form has-text-centered">
							<div class="columns">
								<div class="column">
									<c-input
										ref="input"
										v-model="preregister_form.firstname"
										@keyup.enter.native="preregister()"
										:placeholder="L('preregister.firstname')"
									></c-input>
								</div>
								<div class="column">
									<c-input
										v-model="preregister_form.lastname"
										@keyup.enter.native="preregister()"
										:placeholder="L('preregister.lastname')"
									></c-input>
								</div>
							</div>
							<div class="columns">
								<div class="column">
									<c-input
										v-model="preregister_form.email"
										@keyup.enter.native="preregister()"
										:placeholder="L('preregister.email')"
									></c-input>
								</div>
								<div class="column">
									<c-tel-input
										v-model="preregister_form.telephone"
										@keyup.enter.native="preregister()"
										:placeholder="L('preregister.telephone')"
										@validate="validateNumber"
										@country-changed="changeCountry"
									></c-tel-input>
								</div>
							</div>
							<div class="columns">
								<div class="column">
									<c-input
										v-model="preregister_form.state"
										@keyup.enter.native="preregister()"
										:placeholder="L('preregister.state')"
									></c-input>
								</div>
								<div class="column">
									<c-input
										v-model="preregister_form.address"
										@keyup.enter.native="preregister()"
										:placeholder="L('preregister.address')"
									></c-input>
								</div>
							</div>
							<div class="columns">
								<div class="column">
									<c-input
										v-model="preregister_form.ans_1"
										@keyup.enter.native="preregister()"
										:placeholder="L('preregister.ans_1')"
									></c-input>
								</div>
							</div>
							<div class="columns">
								<div class="column">
									<c-input
										v-model="preregister_form.ans_2"
										@keyup.enter.native="preregister()"
										:placeholder="L('preregister.ans_2')"
									></c-input>
								</div>
							</div>
							<div class="columns">
								<div class="column">
									<c-input
										v-model="preregister_form.ans_3"
										@keyup.enter.native="preregister()"
										:placeholder="L('preregister.ans_3')"
									></c-input>
								</div>
							</div>
							<div class="columns">
								<div class="column">
									<c-input
										v-model="preregister_form.ans_4"
										@keyup.enter.native="preregister()"
										:placeholder="L('preregister.ans_4')"
									></c-input>
								</div>
							</div>
							<div class="columns">
								<div class="column">
									<c-input
										v-model="preregister_form.ans_5"
										@keyup.enter.native="preregister()"
										:placeholder="L('preregister.ans_5')"
									></c-input>
								</div>
							</div>
							<div class="columns">
								<div class="column">
									<c-input
										v-model="preregister_form.ans_6"
										@keyup.enter.native="preregister()"
										:placeholder="L('preregister.ans_6')"
									></c-input>
								</div>
							</div>
							<div class="columns">
								<div class="column"></div>
								<div class="column column-check is-6 has-text-left">
									<b-field>
										<b-checkbox v-model="check1">
											{{ L('helper.see') }}
											<a :href="publicPath + 'doc1.pdf'" target="_blank">{{
												L('preregister.check1')
											}}</a>
										</b-checkbox>
									</b-field>
									<b-field>
										<b-checkbox v-model="check2">
											{{ L('helper.see') }}
											<a :href="publicPath + 'doc2.pdf'" target="_blank">{{
												L('preregister.check2')
											}}</a>
										</b-checkbox>
									</b-field>
								</div>
								<div class="column"></div>
							</div>
							<b-field>
								<b-button
									@click="preregister()"
									rounded
									type="is-white"
									:disabled="!(check1 && check2)"
									>{{ L('preregister.next') }}</b-button
								>
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
import { PreregisterDto, ICountry } from '../store';

@Component
export default class Preregister extends PageChildBase {
	private preregister_form: PreregisterDto = new PreregisterDto();

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
	}

	private async mounted() {
		this.exec_is_render('input', input => {
			(input as any).focus();
		});
	}

	private async preregister() {
		if (this.check1 && this.check2) {
			const errors: string[] = this.preregister_form.validate();
			if (!this.validationTelephone) {
				errors.push('validator.auth.h');
			}
			if (errors.length) {
				this.toastError(this.L(errors[0]));
			} else {
				this.preregister_form.telephone = this.telephoneInternational;
				this.load_form_api(
					await this.store.api.preregister(this.preregister_form),
					data => {
						if (data.valid) {
							this.toastSuccess(`${this.L('preregister.success')}, ${this.preregister_form.firstname}`);
							setTimeout(() => {
								location.href = '/';
							}, 4000);
						} else {
							this.toastError(this.L('error.e000'));
						}
					},
					{
						e000: () => {
							this.toastError(this.L('error.e000'));
						},
					},
				);
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
		this.preregister_form.telephone = '';
		const indexCountry = this.countriesAllow.findIndex(element => element == countryCode.iso2);
		this.preregister_form.country = this.countriesAllowIDS[indexCountry ?? ''] ?? '';
	}
}
</script>

<style lang="scss">
@import '../styles/initial_variables.scss';

.register {
	background-image: linear-gradient(135deg, $primary, #45bff6) !important;
	position: relative;
	padding-top: 0;

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
			background-color: transparent;
			box-shadow: none;

			@include until-widescreen {
				width: 80%;
				height: 90vh;
			}

			@include mobile {
				width: 100%;
				height: 100%;
				border-radius: 0;
			}

			.media {
				height: 90vh;
				padding: 3rem 0;

				.media-content {
					height: 100%;
					overflow-x: auto;
				}

				.title {
					color: white !important;
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

						.vfl-label {
							color: white !important;
						}

						.vfl-label + input {
							border-bottom: 2px solid white;
						}

						.fas {
							color: white !important;
						}

						.input,
						.vti__input {
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

					.column-check {
						color: white !important;
						font-size: 12px;
						margin-left: 2rem;

						.check {
							border: 2px solid white !important;
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
