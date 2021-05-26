<template>
	<div class="setting" ref="setting">
		<article class="box">
			<div class="columns">
				<div class="column" :class="{ 'is-7': !is_admin }">
					<section class="form-user has-text-centered">
						<div class="columns">
							<div class="column has-text-left">
								<h3 class="title">{{ L('setting.user.a') }}</h3>
							</div>
							<div class="column is-hidden-mobile"></div>
						</div>
						<div class="columns">
							<div class="column">
								<c-input
									ref="input"
									v-model="update_form.firstname"
									@keyup.enter.native="update()"
									:placeholder="L('setting.user.b')"
								></c-input>
							</div>
							<div class="column">
								<c-input
									v-model="update_form.lastname"
									@keyup.enter.native="update()"
									:placeholder="L('setting.user.c')"
								></c-input>
							</div>
						</div>
						<div class="columns">
							<div class="column">
								<c-input
									v-model="update_form.email"
									@keyup.enter.native="update()"
									:placeholder="L('setting.user.d')"
								></c-input>
							</div>
							<div class="column">
								<c-tel-input
									v-model="update_form.telephone"
									:defaultCountry="default_country"
									:autoDefaultCountry="false"
									@keyup.enter.native="update()"
									:placeholder="L('setting.user.e')"
									@validate="validateNumber"
									@country-changed="changeCountry"
								></c-tel-input>
							</div>
						</div>
						<div class="columns">
							<div class="column">
								<c-input
									v-model="update_form.state"
									@keyup.enter.native="update()"
									:placeholder="L('setting.user.f')"
								></c-input>
							</div>
							<div class="column">
								<c-input
									v-model="update_form.address"
									@keyup.enter.native="update()"
									:placeholder="L('setting.user.g')"
								></c-input>
							</div>
						</div>
						<div class="columns">
							<div class="column">
								<c-input
									v-model="update_form.password"
									@keyup.enter.native="update()"
									:placeholder="L('setting.user.h')"
									password
								></c-input>
							</div>
							<div class="column">
								<c-input
									v-model="update_form.password_confirm"
									@keyup.enter.native="update()"
									:placeholder="L('setting.user.i')"
									password
								></c-input>
							</div>
						</div>
					</section>
				</div>

				<div v-if="!is_admin" class="is-divider-vertical is-hidden-mobile"></div>

				<div v-if="!is_admin" class="column">
					<section class="form-user has-text-centered">
						<div class="columns">
							<div class="column has-text-left">
								<h3 class="title">{{ L('setting.accounts.a') }}</h3>
							</div>
							<div class="column is-hidden-mobile"></div>
						</div>
						<div class="columns">
							<div class="column">
								<c-input
									v-model="update_form.paypal_account"
									@keyup.enter.native="update()"
									:placeholder="L('setting.accounts.b')"
								></c-input>
							</div>
						</div>
						<div class="columns">
							<div class="column">
								<c-input
									v-model="update_form.stripe_account"
									@keyup.enter.native="update()"
									:placeholder="L('setting.accounts.c')"
								></c-input>
							</div>
						</div>
						<div class="columns">
							<div class="column">
								<c-input
									v-model="update_form.coinpayments_account"
									@keyup.enter.native="update()"
									:placeholder="L('setting.accounts.d')"
								></c-input>
							</div>
						</div>
						<div class="columns">
							<div class="column">
								<c-input
									v-model="update_form.banck_account"
									@keyup.enter.native="update()"
									:placeholder="L('setting.accounts.e')"
								></c-input>
							</div>
						</div>
					</section>
				</div>
			</div>

			<b-field class="has-text-right">
				<b-button @click="update()" type="is-primary">{{ L('setting.save') }}</b-button>
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
	private update_form: UpdateDto = new UpdateDto();
	private default_country: string = '';

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

	private async update() {
		if (this.update_form) {
			const errors: string[] = this.update_form.validate();
			if (!this.validationTelephone) {
				errors.push('validator.auth.h');
			}

			if (errors.length) {
				this.toastError(this.L(errors[0]));
			} else {
				this.load_form_api(
					await this.store.api.update(this.update_form),
					data => {
						this.update_form = new UpdateDto(data.user);
						if ((data.user as any).errors.length) {
							this.toastSuccess(this.L('setting.not_ok'));
							for (const error of (data.user as any).errors) {
								this.toastError(this.L(error));
							}
						} else {
							this.toastSuccess(this.L('setting.ok'));
						}
					},
					{
						e000: () => {
							this.toastError(this.L('error.e000'));
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
	height: 100%;

	.box {
		height: 100%;
		padding: 4rem 0;

		.title {
			font-size: 25px;
			font-weight: bold;
		}

		.is-divider-vertical {
			padding: 0;
		}

		.form-user {
			margin: auto;
			width: 70%;

			@include mobile {
				width: 85%;
			}

			.columns:first-child,
			.columns:last-child {
				padding-bottom: 2rem;
			}

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
