<template>
	<div class="setting">
		<article class="box">
			<b-tabs>
				<b-tab-item :label="$t('setting.user.title')">
					<section class="form-user has-text-centered">
						<div class="columns">
							<div class="column">
								<c-input
									class="md"
									ref="input"
									v-model="update_form.username"
									@keyup.enter.native="update()"
									:placeholder="$t('setting.user.a')"
								></c-input>
							</div>
							<div class="column"></div>
						</div>
						<div class="columns">
							<div class="column">
								<c-input
									class="md"
									ref="input"
									v-model="update_form.firstname"
									@keyup.enter.native="update()"
									:placeholder="$t('setting.user.b')"
								></c-input>
							</div>
							<div class="column">
								<c-input
									class="md"
									v-model="update_form.lastname"
									@keyup.enter.native="update()"
									:placeholder="$t('setting.user.c')"
								></c-input>
							</div>
						</div>
						<div class="columns">
							<div class="column">
								<c-input
									class="md"
									v-model="update_form.email"
									@keyup.enter.native="update()"
									:placeholder="$t('setting.user.d')"
								></c-input>
							</div>
							<div class="column">
								<c-tel-input
									class="md"
									v-model="update_form.telephone"
									:defaultCountry="default_country"
									:autoDefaultCountry="false"
									@keyup.enter.native="update()"
									:placeholder="$t('setting.user.e')"
									@validate="validateNumber"
									@country-changed="changeCountry"
								></c-tel-input>
							</div>
						</div>
						<div class="columns">
							<div class="column">
								<c-input
									class="md"
									v-model="update_form.state"
									@keyup.enter.native="update()"
									:placeholder="$t('setting.user.f')"
								></c-input>
							</div>
							<div class="column">
								<c-input
									class="md"
									v-model="update_form.address"
									@keyup.enter.native="update()"
									:placeholder="$t('setting.user.g')"
								></c-input>
							</div>
						</div>
						<div class="columns">
							<div class="column">
								<c-input
									class="md"
									v-model="update_form.password"
									@keyup.enter.native="update()"
									:placeholder="$t('setting.user.h')"
									password
								></c-input>
							</div>
							<div class="column">
								<c-input
									class="md"
									v-model="update_form.password_confirm"
									@keyup.enter.native="update()"
									:placeholder="$t('setting.user.i')"
									password
								></c-input>
							</div>
						</div>
					</section>
				</b-tab-item>

				<b-tab-item v-if="!is_admin" :label="$t('setting.accounts.a')">
					<div class="columns">
						<div class="column">
							<section class="form-user has-text-centered">
								<div class="columns">
									<div class="column">
										<c-input
											class="md"
											v-model="update_form.paypal_account"
											@keyup.enter.native="update()"
											:placeholder="$t('setting.accounts.b')"
										></c-input>
									</div>
									<div class="column">
										<c-input
											class="md"
											v-model="update_form.stripe_account"
											@keyup.enter.native="update()"
											:placeholder="$t('setting.accounts.c')"
										></c-input>
									</div>
								</div>
								<div class="columns">
									<div class="column">
										<c-input
											class="md"
											v-model="update_form.coinpayments_account"
											@keyup.enter.native="update()"
											:placeholder="$t('setting.accounts.d')"
										></c-input>
									</div>
									<div class="column"></div>
								</div>

								<div class="columns">
									<div class="column has-text-left">
										<h3 class="title has-text-weight-bold">{{ $t('setting.accounts.e') }}</h3>
									</div>
									<div class="column is-hidden-mobile"></div>
								</div>
								<div class="columns">
									<div class="column">
										<c-input
											class="md"
											v-model="update_form.banck_name"
											@keyup.enter.native="update()"
											:placeholder="$t('setting.accounts.f')"
										></c-input>
									</div>
									<div class="column">
										<c-input
											class="md"
											v-model="update_form.banck_address"
											@keyup.enter.native="update()"
											:placeholder="$t('setting.accounts.g')"
										></c-input>
									</div>
								</div>
								<div class="columns">
									<div class="column">
										<c-input
											class="md"
											v-model="update_form.banck_account_name"
											@keyup.enter.native="update()"
											:placeholder="$t('setting.accounts.h')"
										></c-input>
									</div>
									<div class="column">
										<c-input
											class="md"
											v-model="update_form.banck_account"
											@keyup.enter.native="update()"
											:placeholder="$t('setting.accounts.i')"
										></c-input>
									</div>
								</div>
								<div class="columns">
									<div class="column">
										<c-input
											class="md"
											v-model="update_form.banck_routing_name"
											@keyup.enter.native="update()"
											:placeholder="$t('setting.accounts.j')"
										></c-input>
									</div>
									<div class="column">
										<c-input
											class="md"
											v-model="update_form.banck_account_username"
											@keyup.enter.native="update()"
											:placeholder="$t('setting.accounts.k')"
										></c-input>
									</div>
								</div>
								<div class="columns">
									<div class="column">
										<c-input
											class="md"
											v-model="update_form.banck_swift_code"
											@keyup.enter.native="update()"
											:placeholder="$t('setting.accounts.l')"
										></c-input>
									</div>
									<div class="column">
										<c-input
											class="md"
											v-model="update_form.banck_iban"
											@keyup.enter.native="update()"
											:placeholder="$t('setting.accounts.m')"
										></c-input>
									</div>
								</div>
							</section>
						</div>
					</div>
				</b-tab-item>
			</b-tabs>

			<b-field class="has-text-right">
				<b-button id="driver-guide-c-3" @click="update()" type="is-primary" inverted outlined>{{
					$t('setting.save')
				}}</b-button>
			</b-field>
		</article>
	</div>
</template>

<script lang="ts">
import PageChildBase from '../../utils/page_child_base.utils';
import { Component } from 'vue-property-decorator';
import { UpdateDto, ICountry } from '../../store';

@Component
export default class Setting extends PageChildBase {
	public update_form: UpdateDto = new UpdateDto();
	public default_country: string = '';

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
		this.default_country = (this.store.api.country as ICountry).code;
		if (this.auth_data && this.auth_data.user) {
			this.update_form = new UpdateDto(this.auth_data.user);
		}
	}

	public async mounted() {
		this.exec_is_render('input', input => {
			(input as any).focus();
		});
	}

	public async update() {
		if (this.update_form) {
			const errors: string[] = this.update_form.validate();
			if (!this.validationTelephone) {
				errors.push('validator.auth.h');
			}

			if (errors.length) {
				this.toastError(this.$t(errors[0]));
			} else {
				this.load_form_api(
					await this.store.api.update(this.update_form),
					data => {
						this.update_form = new UpdateDto(data.user);
						if ((data.user as any).errors.length) {
							this.toastWarning(this.$t('setting.not_ok'));
							for (const error of (data.user as any).errors) {
								this.toastError(this.$t(error));
							}
						} else {
							this.toastSuccess(this.$t('setting.ok'));
						}
					},
					{
						e000: () => {
							this.toastError(this.$t('error.e000'));
						},
					},
				);
				this.auth_data = this.store.api.auth_data;
			}
		}
	}

	public validateNumber(args: any) {
		if (args.valid) {
			this.validationTelephone = args.valid;
			if (args.number) {
				this.telephoneInternational = args.number;
			}
		}
	}

	public changeCountry(countryCode: any) {
		if (this.update_form) {
			this.countryEnabled = this.countriesAllow.find(element => element == countryCode.iso2) ?? '';
			this.update_form.telephone = '';
			const indexCountry = this.countriesAllow.findIndex(element => element == countryCode.iso2);
			this.update_form.country = this.countriesAllowIDS[indexCountry ?? ''] ?? '';
		}
	}
}
</script>

<style lang="scss">
@import '../../styles/initial_variables.scss';

.setting {
	height: calc(100vh - 6rem);
	overflow-y: scroll;
	padding-right: 1rem;

	.box {
		background-color: $box;
		color: white !important;
		padding: 4rem 0;

		.title {
			font-size: 25px;
			font-weight: bold;
			color: white !important;
		}

		.is-divider-vertical {
			padding: 1rem;
		}

		.b-tabs {
			margin: auto;
			width: 70%;

			@include mobile {
				width: 85%;
			}

			.tabs {
				li a {
					color: white;
					border-bottom: none;
				}
				li.is-active {
					font-size: 1.5rem;
					font-weight: bold;
				}
			}

			.tab-content {
				padding-top: 2.5rem;
			}
		}

		.form-user {
			width: 100%;

			.c-input,
			.c-tel-input {
				margin: 1rem 0;
			}
		}

		.button.is-primary {
			padding: 1.5rem 1rem;
			margin: 2rem;
			width: 30%;
		}
	}
}
</style>
