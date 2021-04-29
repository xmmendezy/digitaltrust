<template>
	<div class="admin">
		<b-field class="has-text-right">
			<b-button @click="new_client()" type="is-primary">{{ L('admin.new_client') }}</b-button>
		</b-field>
		<article class="box">
			<b-table :data="client_data" sticky-header :mobile-cards="false">
				<b-table-column field="name" :label="L('admin.table_client.a')" header-class="header" v-slot="props">
					<div class="has-text-left" @click="edit_client(props.row.id)">
						{{ props.row.name }}
					</div>
				</b-table-column>
				<b-table-column field="email" :label="L('admin.table_client.b')" header-class="header" v-slot="props">
					<div class="has-text-left" @click="edit_client(props.row.id)">
						{{ props.row.email }}
					</div>
				</b-table-column>
				<b-table-column field="balance" :label="L('admin.table_client.c')" header-class="header" v-slot="props">
					<div class="has-text-left" @click="balance_client(props.row.id)">
						{{ formatMoney(props.row.balance) }}
					</div>
				</b-table-column>
				<b-table-column
					field="last_deposit"
					:label="L('admin.table_client.d')"
					header-class="header header-date has-text-right"
					v-slot="props"
				>
					<div class="has-text-right has-text-gray" @click="balance_client(props.row.id)">
						{{
							store.api.DateTime.fromISO(props.row.last_deposit)
								.setLocale($i18n.locale)
								.toFormat('dd/LLL/yyyy')
						}}
					</div>
				</b-table-column>
			</b-table>
		</article>

		<b-modal v-model="isOpenNewClientModal" :can-cancel="['x']">
			<div class="card">
				<div class="card-content modal-client">
					<div class="media">
						<div class="media-content has-text-centered">
							<p class="title">{{ L('admin.new_client') }}</p>
							<section class="form has-text-centered">
								<div class="columns">
									<div class="column">
										<c-input
											v-model="client_form.firstname"
											@keyup.enter.native="register_client()"
											:placeholder="L('register.c')"
										></c-input>
									</div>
									<div class="column">
										<c-input
											v-model="client_form.lastname"
											@keyup.enter.native="register_client()"
											:placeholder="L('register.d')"
										></c-input>
									</div>
								</div>
								<div class="columns">
									<div class="column">
										<c-input
											v-model="client_form.email"
											@keyup.enter.native="register_client()"
											:placeholder="L('register.e')"
										></c-input>
									</div>
									<div class="column">
										<c-tel-input
											v-model="client_form.telephone"
											@keyup.enter.native="register_client()"
											:placeholder="L('register.f')"
											@validate="validateNumber"
											@country-changed="changeCountry"
										></c-tel-input>
									</div>
								</div>
								<div class="columns">
									<div class="column">
										<c-input
											v-model="client_form.state"
											@keyup.enter.native="register_client()"
											:placeholder="L('register.g')"
										></c-input>
									</div>
									<div class="column">
										<c-input
											v-model="client_form.address"
											@keyup.enter.native="register_client()"
											:placeholder="L('register.h')"
										></c-input>
									</div>
								</div>
								<div class="columns">
									<div class="column">
										<c-input
											v-model="client_form.password"
											@keyup.enter.native="register_client()"
											:placeholder="L('register.i')"
											password
										></c-input>
									</div>
									<div class="column">
										<c-input
											v-model="client_form.password_confirm"
											@keyup.enter.native="register_client()"
											:placeholder="L('register.j')"
											password
										></c-input>
									</div>
								</div>
								<b-field>
									<b-button @click="register_client()" type="is-primary">{{
										L('admin.save_client')
									}}</b-button>
								</b-field>
							</section>
						</div>
					</div>
				</div>
			</div>
		</b-modal>

		<b-modal v-model="isOpenEditClientModal" :can-cancel="['x']">
			<div class="card">
				<div class="card-content model-update-client">
					<div class="columns">
						<div class="column is-7">
							<section class="form-user has-text-centered">
								<div class="columns">
									<div class="column has-text-left">
										<h3 class="title">{{ L('admin.edit_client') }}</h3>
									</div>
									<div class="column"></div>
								</div>
								<div class="columns">
									<div class="column">
										<c-input
											v-model="edit_client_form.firstname"
											@keyup.enter.native="update_client()"
											:placeholder="L('setting.user.b')"
										></c-input>
									</div>
									<div class="column">
										<c-input
											v-model="edit_client_form.lastname"
											@keyup.enter.native="update_client()"
											:placeholder="L('setting.user.c')"
										></c-input>
									</div>
								</div>
								<div class="columns">
									<div class="column">
										<c-input
											v-model="edit_client_form.email"
											@keyup.enter.native="update_client()"
											:placeholder="L('setting.user.d')"
										></c-input>
									</div>
									<div class="column">
										<c-tel-input
											v-model="edit_client_form.telephone"
											:defaultCountry="default_country"
											:autoDefaultCountry="false"
											@keyup.enter.native="update_client()"
											:placeholder="L('setting.user.e')"
											@validate="validateNumber"
											@country-changed="changeCountryUpdate"
										></c-tel-input>
									</div>
								</div>
								<div class="columns">
									<div class="column">
										<c-input
											v-model="edit_client_form.state"
											@keyup.enter.native="update_client()"
											:placeholder="L('setting.user.f')"
										></c-input>
									</div>
									<div class="column">
										<c-input
											v-model="edit_client_form.address"
											@keyup.enter.native="update_client()"
											:placeholder="L('setting.user.g')"
										></c-input>
									</div>
								</div>
								<div class="columns">
									<div class="column">
										<c-input
											v-model="edit_client_form.password"
											@keyup.enter.native="update_client()"
											:placeholder="L('setting.user.h')"
											password
										></c-input>
									</div>
									<div class="column">
										<c-input
											v-model="edit_client_form.password_confirm"
											@keyup.enter.native="update_client()"
											:placeholder="L('setting.user.i')"
											password
										></c-input>
									</div>
								</div>
							</section>
						</div>

						<div class="is-divider-vertical is-hidden-mobile"></div>

						<div class="column">
							<section class="form-user has-text-centered">
								<div class="columns">
									<div class="column has-text-left">
										<h3 class="title">{{ L('setting.accounts.a') }}</h3>
									</div>
									<div class="column"></div>
								</div>
								<div class="columns">
									<div class="column">
										<c-input
											v-model="edit_client_form.paypal_account"
											@keyup.enter.native="update_client()"
											:placeholder="L('setting.accounts.b')"
										></c-input>
									</div>
								</div>
								<div class="columns">
									<div class="column">
										<c-input
											v-model="edit_client_form.stripe_account"
											@keyup.enter.native="update_client()"
											:placeholder="L('setting.accounts.c')"
										></c-input>
									</div>
								</div>
								<div class="columns">
									<div class="column">
										<c-input
											v-model="edit_client_form.coinpayments_account"
											@keyup.enter.native="update_client()"
											:placeholder="L('setting.accounts.d')"
										></c-input>
									</div>
								</div>
							</section>
						</div>
					</div>

					<b-field class="has-text-right">
						<b-button @click="update_client()" type="is-primary">{{ L('setting.save') }}</b-button>
					</b-field>
				</div>
			</div>
		</b-modal>
	</div>
</template>

<script lang="ts">
import PageChildBase from '../../utils/page_child_base.utils';
import { Component } from 'vue-property-decorator';
import { ICountry, IClient, SignupDto, UpdateDto, IUser } from '../../store';

@Component
export default class Admin extends PageChildBase {
	public client_data: IClient[] = [];

	private isOpenNewClientModal: boolean = false;
	private client_form: SignupDto = new SignupDto();

	private isOpenEditClientModal: boolean = false;
	private edit_client_form: UpdateDto = new UpdateDto();
	private id_edit_client: string = '';
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
		this.get_clients();
	}

	public reload() {
		this.get_clients();
	}

	public async get_clients() {
		this.load_form_api(await this.store.api.clients(), (data: IClient[]) => {
			this.client_data = data;
		});
	}

	public async new_client() {
		this.client_form = new SignupDto();
		this.telephoneInternational = '';
		this.isOpenNewClientModal = true;
	}

	private async register_client() {
		const errors: string[] = this.client_form.validate();
		if (!this.validationTelephone) {
			errors.push('validator.auth.h');
		}
		if (errors.length) {
			this.toastError(this.L(errors[0]));
		} else {
			this.client_form.telephone = this.telephoneInternational;
			this.load_form_api(
				await this.store.api.register_client(this.client_form),
				() => {
					this.isOpenNewClientModal = false;
					this.get_clients();
				},
				{
					e000: () => {
						this.toastError(this.L('error.e000'));
					},
				},
			);
		}
	}

	public async edit_client(id: string) {
		this.id_edit_client = id;
		this.load_form_api(await this.store.api.client(id), async (data: IUser) => {
			this.edit_client_form = new UpdateDto();
			this.isOpenEditClientModal = true;
			this.default_country = (await this.store.util.get_country(data.country__id)).code;
			this.telephoneInternational = '';
			this.edit_client_form = new UpdateDto(data);
		});
	}

	private async update_client() {
		if (this.edit_client_form) {
			const errors: string[] = this.edit_client_form.validate();
			if (!this.validationTelephone) {
				errors.push('validator.auth.h');
			}

			if (errors.length) {
				this.toastError(this.L(errors[0]));
			} else {
				this.load_form_api(
					await this.store.api.update_client({ id: this.id_edit_client, data: this.edit_client_form }),
					data => {
						this.edit_client_form = new UpdateDto(data);
						if ((data as any).errors.length) {
							this.toastSuccess(this.L('setting.not_ok'));
							for (const error of (data as any).errors) {
								this.toastError(this.L(error));
							}
						} else {
							this.edit_client_form = new UpdateDto();
							this.id_edit_client = '';
							this.isOpenEditClientModal = false;
							this.get_clients();
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
		if (args) {
			this.validationTelephone = args.valid;
			if (args.number) {
				this.telephoneInternational = args.number;
			}
		}
	}

	public changeCountry(countryCode: any) {
		this.countryEnabled = this.countriesAllow.find(element => element == countryCode.iso2) ?? '';
		this.client_form.telephone = '';
		const indexCountry = this.countriesAllow.findIndex(element => element == countryCode.iso2);
		this.client_form.country = this.countriesAllowIDS[indexCountry ?? ''] ?? '';
	}

	public changeCountryUpdate(countryCode: any) {
		if (this.edit_client_form) {
			this.countryEnabled = this.countriesAllow.find(element => element == countryCode.iso2) ?? '';
			this.edit_client_form.telephone = '';
			const indexCountry = this.countriesAllow.findIndex(element => element == countryCode.iso2);
			this.edit_client_form.country = this.countriesAllowIDS[indexCountry ?? ''] ?? '';
		}
	}

	public async balance_client(id: string) {
		console.log('Hola', id);
	}
}
</script>

<style lang="scss">
@import '../../styles/initial_variables.scss';

.admin {
	height: 100%;

	.box {
		padding: 2rem 0;

		.table-wrapper {
			overflow-x: hidden;
			height: 48rem;
		}

		.header {
			padding-top: 0.9rem;
			padding-bottom: 0.9rem;

			color: $border;

			&:first-child {
				padding-left: 3rem;
			}

			&:last-child {
				padding-right: 3rem;
			}

			&.header-date span {
				width: 100%;
			}
		}

		tbody tr td {
			padding-top: 0.9rem;
			padding-bottom: 0.9rem;

			&:first-child {
				padding-left: 3rem;
			}

			&:last-child {
				padding-right: 3rem;
			}
		}
	}

	.modal-client {
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

	.model-update-client {
		padding-top: 4rem;

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
