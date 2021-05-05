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
					<div class="has-text-left" @click="records_client(props.row.id)">
						{{ formatMoney(props.row.balance) }}
					</div>
				</b-table-column>
				<b-table-column
					field="lastDeposit"
					:label="L('admin.table_client.d')"
					header-class="header header-center has-text-right"
					v-slot="props"
				>
					<div class="has-text-right has-text-gray" @click="records_client(props.row.id)">
						{{
							props.row.lastDeposit
								? store.api.DateTime.fromUnix(props.row.lastDeposit)
										.setLocale($i18n.locale)
										.toFormat('dd LLLL yyyy')
								: '---'
						}}
					</div>
				</b-table-column>

				<b-table-column
					field="has_withdrawal"
					:label="L('admin.table_client.e')"
					header-class="header header-center has-text-center"
					v-slot="props"
				>
					<div class="has-text-center">
						<b-button
							v-if="props.row.has_withdrawal"
							type="is-ghost"
							@click="withdrawal_client(props.row.id)"
						>
							<i class="fas fa-exclamation has-text-danger"></i>
						</b-button>
						<span v-else>---</span>
					</div>
				</b-table-column>
			</b-table>
		</article>

		<b-modal v-model="isOpenNewClientModal" :can-cancel="['x', 'escape']">
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

		<b-modal v-model="isOpenEditClientModal" :can-cancel="['x', 'escape']">
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

		<b-modal v-model="isOpenRecordsClientModal" :can-cancel="['x', 'escape']">
			<div class="card">
				<div v-if="isTableBalance" class="card-content model-records-client">
					<p class="title" v-if="client_data_now">
						{{ formatName(client_data_now) }}
					</p>
					<b-table
						:data="records_client_data"
						sticky-header
						:mobile-cards="false"
						@click="row => balance_detail(row.date)"
					>
						<b-table-column
							field="balance"
							:label="L('home.table_balance.a')"
							header-class="header"
							centered
							v-slot="props"
						>
							{{ formatMoney(props.row.balance) }}
						</b-table-column>
						<b-table-column
							field="withdrawal"
							:label="L('home.table_balance.b')"
							header-class="header"
							v-slot="props"
						>
							<div class="has-text-left">{{ formatMoney(props.row.withdrawal) }}</div>
						</b-table-column>

						<b-table-column
							field="earning"
							:label="L('home.table_balance.c')"
							header-class="header"
							v-slot="props"
						>
							<div class="has-text-left">{{ formatMoney(props.row.earning) }}</div>
						</b-table-column>

						<b-table-column
							field="earning"
							:label="L('home.table_balance.d')"
							header-class="header"
							v-slot="props"
						>
							<div class="has-text-left">{{ formatMoney(props.row.investment) }}</div>
						</b-table-column>

						<b-table-column
							field="month"
							:label="L('home.table_balance.d')"
							header-class="header header-center has-text-right"
							v-slot="props"
						>
							<div class="has-text-right has-text-gray">
								{{
									store.api.DateTime.fromFormat(props.row.date, 'yyyy-LL')
										.setLocale($i18n.locale)
										.setZone(client_timezone_now.value)
										.toFormat('LLL yyyy')
								}}
							</div>
						</b-table-column>
					</b-table>
				</div>
				<div v-else class="card-content model-balance_detail">
					<div class="columns reverse-columns">
						<div class="column">
							<p class="title has-text-left">
								{{ L('balance.title') }} -
								{{
									store.api.DateTime.fromUnix(balance_detail_data.date)
										.setZone(client_timezone_now.value)
										.toFormat('LLLL yyyy')
								}}
							</p>
						</div>
						<div class="column is-2 has-text-right">
							<b-button @click="isTableBalance = true" type="is-light" icon-right="arrow-left" />
						</div>
					</div>
					<p class="subtitle has-text-left">{{ L('balance.subtitle') }}</p>
					<div class="box-balance">
						<div v-if="balance_detail_data.available_balance" class="columns has-text-left">
							<div class="column balance-text">{{ L('balance.a') }}</div>
							<div class="column balance-money is-4">
								{{ formatMoney(balance_detail_data.available_balance) }}
							</div>
						</div>
						<div class="columns has-text-left">
							<div class="column balance-text">{{ L('balance.b') }}</div>
							<div class="column balance-money is-4">{{ formatMoney(balance_detail_data.balance) }}</div>
						</div>
						<div class="columns has-text-left">
							<div class="column balance-text">{{ L('balance.c') }}</div>
							<div class="column balance-money is-4">{{ formatMoney(balance_detail_data.earning) }}</div>
						</div>
						<div class="columns has-text-left">
							<div class="column balance-text">{{ L('balance.d') }}</div>
							<div class="column balance-money is-4">
								{{ formatMoney(balance_detail_data.earning_extra) }}
							</div>
						</div>
						<div class="columns has-text-left">
							<div class="column balance-text">{{ L('balance.e') }}</div>
							<div class="column balance-money is-4">
								{{ formatMoney(balance_detail_data.investment) }}
							</div>
						</div>
						<div class="columns has-text-left">
							<div class="column balance-text">{{ L('balance.f') }}</div>
							<div class="column balance-money is-4">
								{{ formatMoney(balance_detail_data.withdrawal) }}
							</div>
						</div>
					</div>
					<div
						v-for="suscription in balance_detail_data.suscriptions"
						:key="suscription.id"
						class="suscription-box"
					>
						<div class="columns columns-suscription">
							<div class="column">
								<div class="columns has-text-left">
									<div class="column title">{{ get_name_suscription(suscription.id) }}</div>
								</div>
								<div class="columns has-text-left">
									<div class="column">
										{{ L('balance.suscription.a') }}: {{ formatMoney(suscription.investment) }}
									</div>
								</div>
							</div>
							<div class="column">
								<div class="columns has-text-left">
									<div class="column">
										{{ L('balance.suscription.b') }}:
										{{
											store.api.DateTime.fromUnix(suscription.date_begin)
												.setZone(client_timezone_now.value)
												.toFormat('dd LLL yyyy')
										}}
									</div>
								</div>
								<div class="columns has-text-left">
									<div class="column">
										{{ L('balance.suscription.c') }}:
										{{
											store.api.DateTime.fromUnix(suscription.date_end)
												.setZone(client_timezone_now.value)
												.toFormat('dd LLL yyyy')
										}}
									</div>
								</div>
							</div>
						</div>
					</div>
					<div v-if="balance_detail_data.deposits.length" class="deposits">
						<p class="title has-text-left">{{ L('balance.deposits.title') }}</p>
						<b-table :data="balance_detail_data.deposits" sticky-header :mobile-cards="false">
							<b-table-column
								field="suscription"
								:label="L('balance.deposits.a')"
								header-class="header"
								v-slot="props"
							>
								<div class="has-text-left">{{ get_name_suscription(props.row.suscription) }}</div>
							</b-table-column>

							<b-table-column
								field="date"
								:label="L('balance.deposits.b')"
								header-class="header"
								v-slot="props"
							>
								<div class="has-text-left">
									{{
										store.api.DateTime.fromUnix(props.row.date)
											.setZone(client_timezone_now.value)
											.toFormat('dd LLL yyyy')
									}}
								</div>
							</b-table-column>

							<b-table-column
								field="money"
								:label="L('balance.deposits.c')"
								header-class="header"
								v-slot="props"
							>
								<div class="has-text-left">{{ formatMoney(props.row.money) }}</div>
							</b-table-column>

							<b-table-column
								field="payment_method"
								:label="L('balance.deposits.d')"
								header-class="header"
								v-slot="props"
							>
								<div class="has-text-left">{{ L(`payment_method.${props.row.payment_method}`) }}</div>
							</b-table-column>
						</b-table>
					</div>
					<div v-if="balance_detail_data.withdrawals.length" class="withdrawals">
						<p class="title has-text-left">{{ L('balance.withdrawals.title') }}</p>
						<b-table :data="balance_detail_data.withdrawals" sticky-header :mobile-cards="false">
							<b-table-column
								field="date"
								:label="L('balance.withdrawals.a')"
								header-class="header"
								v-slot="props"
							>
								<div class="has-text-left">
									{{
										store.api.DateTime.fromUnix(props.row.date)
											.setZone(client_timezone_now.value)
											.toFormat('dd LLL yyyy')
									}}
								</div>
							</b-table-column>

							<b-table-column
								field="money"
								:label="L('balance.withdrawals.b')"
								header-class="header"
								v-slot="props"
							>
								<div class="has-text-left">{{ formatMoney(props.row.money) }}</div>
							</b-table-column>

							<b-table-column
								field="withdrawal_method"
								:label="L('balance.withdrawals.c')"
								header-class="header"
								v-slot="props"
							>
								<div class="has-text-left">
									{{ L(`payment_method.${props.row.withdrawal_method}`) }}
								</div>
							</b-table-column>

							<b-table-column
								field="status"
								:label="L('balance.withdrawals.d')"
								header-class="header header-center has-text-center"
								v-slot="props"
							>
								<div class="has-text-center">
									<i
										class="fas"
										:class="[
											props.row.status ? 'fa-check has-text-success' : 'fa-times has-text-gray',
										]"
									></i>
								</div>
							</b-table-column>
						</b-table>
					</div>
				</div>
			</div>
		</b-modal>

		<b-modal v-model="isOpenWithdrawalsModal" :can-cancel="['x', 'escape']">
			<div class="card">
				<div class="card-content model-withdrawals-client">
					<p class="title">{{ L('balance.withdrawals.title') }}</p>
					<b-table :data="withdrawals_client_data" sticky-header :mobile-cards="false">
						<b-table-column
							field="date"
							:label="L('balance.withdrawals.a')"
							header-class="header"
							v-slot="props"
						>
							<div class="has-text-left">
								{{
									store.api.DateTime.fromUnix(props.row.date)
										.setZone(client_timezone_now.value)
										.toFormat('dd LLL yyyy')
								}}
							</div>
						</b-table-column>

						<b-table-column
							field="money"
							:label="L('balance.withdrawals.b')"
							header-class="header"
							v-slot="props"
						>
							<div class="has-text-left">{{ formatMoney(props.row.money) }}</div>
						</b-table-column>

						<b-table-column
							field="withdrawal_method"
							:label="L('balance.withdrawals.c')"
							header-class="header"
							v-slot="props"
						>
							<div class="has-text-left">
								{{ L(`payment_method.${props.row.withdrawal_method}`) }}
							</div>
						</b-table-column>

						<b-table-column
							field="has_withdrawal"
							:label="L('helper.confirm')"
							header-class="header header-center has-text-center"
							v-slot="props"
						>
							<div class="has-text-center">
								<b-button type="is-ghost" @click="withdrawal_accept(props.row.id)">
									<i class="fas fa-check has-text-success"></i>
								</b-button>
							</div>
						</b-table-column>
					</b-table>
				</div>
			</div>
		</b-modal>
	</div>
</template>

<script lang="ts">
import PageChildBase from '../../utils/page_child_base.utils';
import { Component } from 'vue-property-decorator';
import {
	ICountry,
	IClient,
	SignupDto,
	UpdateDto,
	IUser,
	ITimeZone,
	IMembership,
	ISuscription,
	IRecord,
	IBalanceDetail,
	IWithdrawal,
} from '../../store';

@Component
export default class Admin extends PageChildBase {
	private client_data: IClient[] = [];
	private memberships_data: IMembership[] = [];

	private isOpenNewClientModal: boolean = false;
	private client_form: SignupDto = new SignupDto();

	private isOpenEditClientModal: boolean = false;
	private edit_client_form: UpdateDto = new UpdateDto();
	private id_edit_client: string = '';
	private default_country: string = '';

	private isOpenRecordsClientModal: boolean = false;
	private records_client_data: IRecord[] = [];
	private balance_detail_data: IBalanceDetail = null as any;
	private suscriptions_data: ISuscription[] = [];
	private isTableBalance: boolean = true;

	private client_data_now: IUser = null as any;
	private client_timezone_now: ITimeZone = null as any;

	private isOpenWithdrawalsModal: boolean = false;
	private withdrawals_client_data: IWithdrawal[] = null as any;

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
		this.get_memberships();
		this.get_clients();
	}

	public reload() {
		this.get_clients();
	}

	private async get_memberships() {
		this.load_form_api(await this.store.api.memberships(), (memberships_data: IMembership[]) => {
			this.memberships_data = memberships_data;
		});
	}

	private async get_clients() {
		this.load_form_api(await this.store.api.clients(), (data: IClient[]) => {
			this.client_data = data;
		});
	}

	private async new_client() {
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

	private async edit_client(id: string) {
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

	private validateNumber(args: any) {
		if (args) {
			this.validationTelephone = args.valid;
			if (args.number) {
				this.telephoneInternational = args.number;
			}
		}
	}

	private changeCountry(countryCode: any) {
		this.countryEnabled = this.countriesAllow.find(element => element == countryCode.iso2) ?? '';
		this.client_form.telephone = '';
		const indexCountry = this.countriesAllow.findIndex(element => element == countryCode.iso2);
		this.client_form.country = this.countriesAllowIDS[indexCountry ?? ''] ?? '';
	}

	private changeCountryUpdate(countryCode: any) {
		if (this.edit_client_form) {
			this.countryEnabled = this.countriesAllow.find(element => element == countryCode.iso2) ?? '';
			this.edit_client_form.telephone = '';
			const indexCountry = this.countriesAllow.findIndex(element => element == countryCode.iso2);
			this.edit_client_form.country = this.countriesAllowIDS[indexCountry ?? ''] ?? '';
		}
	}

	private async get_data_client_now(id: string) {
		if (!this.client_data_now || this.client_data_now.id !== id) {
			this.load_form_api(await this.store.api.client(id), async (data: IUser) => {
				this.client_data_now = data;
				this.client_data_now.country = await this.store.util.get_country(data.country__id);
				const id_time_zone = this.client_data_now.id_time_zone;
				if (id_time_zone) {
					this.client_timezone_now =
						this.client_data_now.country.time_zones.find(tz => tz.id === id_time_zone) ||
						this.client_data_now.country.time_zones[0];
				} else {
					this.client_timezone_now = this.client_data_now.country.time_zones[0];
				}
			});
		}
	}

	private async records_client(id: string) {
		await this.get_data_client_now(id);
		this.load_form_api(await this.store.api.records(id), (data: IRecord[]) => {
			this.records_client_data = data;
			this.isOpenRecordsClientModal = true;
			this.isTableBalance = true;
		});
	}

	private async withdrawal_client(id: string) {
		await this.get_data_client_now(id);
		this.load_form_api(await this.store.api.withdrawals_alert(id), (data: IWithdrawal[]) => {
			this.withdrawals_client_data = data;
			this.isOpenWithdrawalsModal = true;
		});
	}

	private async withdrawal_accept(id: string) {
		this.$buefy.dialog.confirm({
			message: this.L('helper.continue_task'),
			confirmText: this.L('helper.confirm'),
			cancelText: this.L('helper.cancel'),
			onConfirm: async () => {
				this.load_form_api(await this.store.api.process_withdrawal({ id }), result => {
					if (result.valid) {
						this.get_clients();
						this.isOpenWithdrawalsModal = false;
						this.toastSuccess(this.L('helper.success_task'));
					} else {
						this.toastError(this.L('helper.error_task'));
					}
				});
			},
		});
	}

	private async balance_detail(date: number) {
		if (typeof date === 'string') {
			date = this.store.api.DateTime.fromFormat(date, 'yyyy-LL').toSeconds();
		}
		const id = this.client_data_now.id;
		this.load_form_api(await this.store.api.suscriptions(id), (data: ISuscription[]) => {
			this.suscriptions_data = data;
		});
		this.load_form_api(await this.store.api.balance_detail({ id, date }), (data: IBalanceDetail) => {
			this.balance_detail_data = data;
			this.isTableBalance = false;
		});
	}

	private get_name_suscription(id: string) {
		return this.memberships_data.find(m => m.id === this.suscriptions_data.find(s => s.id === id)?.membershipId)
			?.name;
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
			height: 48rem;
		}

		.header {
			padding-top: 0.9rem;
			padding-bottom: 0.9rem;

			color: $gray;

			&:first-child {
				padding-left: 3rem;
			}

			&:last-child {
				padding-right: 3rem;
			}

			&.header-center .th-wrap span {
				&.is-relative {
					width: 90%;
				}
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

	.model-records-client {
		.title {
			font-size: 25px;
			font-weight: bold;
		}

		.table-wrapper {
			overflow-x: hidden;
			height: 29rem;
		}

		.header {
			padding-top: 0.9rem;
			padding-bottom: 0.9rem;

			color: $gray;

			&.header-center span {
				width: 100%;
			}
		}

		tbody tr td {
			padding-top: 0.9rem;
			padding-bottom: 0.9rem;
		}
	}

	.model-balance_detail {
		@include mobile {
			.reverse-columns {
				flex-direction: column-reverse;
				display: flex;
			}
		}

		.title {
			font-size: 28px;
			padding-bottom: 2rem;
		}

		.subtitle {
			font-size: 20px;
			padding-bottom: 1rem;
			margin-bottom: 0;
		}

		.box-balance {
			padding: 1rem 2rem;
			margin-bottom: 2rem;

			.balance-text {
				font-size: 20px;
				color: $gray;
			}
		}

		.suscription-box {
			border-top: 1px solid $border;

			&:last-child {
				border-bottom: 1px solid $border;
			}

			.columns-suscription {
				padding: 1rem 1.5rem;
				color: $gray;

				.title {
					font-size: 26px;
					color: $black;
					padding-bottom: 0.5rem;
				}
			}
		}

		.deposits,
		.withdrawals {
			.title {
				padding: 1rem;
				margin-top: 1rem;
				margin-bottom: 0;
			}

			.table {
				padding: 0 1.5rem;

				.header {
					padding-top: 0.9rem;
					padding-bottom: 0.9rem;
					color: $gray;

					&.header-center .th-wrap span {
						&.is-relative {
							width: 90%;
						}
					}
				}
			}
		}
	}

	.model-withdrawals-client {
		.title {
			font-size: 25px;
			font-weight: bold;
		}

		.table-wrapper {
			overflow-x: hidden;
		}

		.header {
			padding-top: 0.9rem;
			padding-bottom: 0.9rem;

			color: $gray;

			&.header-center span {
				width: 100%;
			}
		}

		tbody tr td {
			padding-top: 0.9rem;
			padding-bottom: 0.9rem;
		}
	}
}
</style>
