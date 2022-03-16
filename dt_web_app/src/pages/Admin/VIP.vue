<template>
	<div class="admin">
		<b-field class="has-text-right">
			<b-button @click="new_client()" type="is-primary">{{ $t('admin.new_client') }}</b-button>
		</b-field>
		<article class="box">
			<b-table :data="client_data" sticky-header :mobile-cards="false">
				<b-table-column field="name" :label="$t('admin.table_client.a')" header-class="header" v-slot="props">
					<div class="has-text-left" @click="edit_client(props.row.id)">
						{{ props.row.name }}
					</div>
				</b-table-column>
				<b-table-column field="email" :label="$t('admin.table_client.b')" header-class="header" v-slot="props">
					<div class="has-text-left" @click="edit_client(props.row.id)">
						{{ props.row.email }}
					</div>
				</b-table-column>
				<b-table-column
					field="balance"
					:label="$t('admin.table_client.c')"
					header-class="header"
					v-slot="props"
				>
					<div class="has-text-left" @click="balance_detail_client(props.row.id)">
						{{ formatMoney(props.row.balance) }}
					</div>
				</b-table-column>
				<b-table-column
					field="lastDeposit"
					:label="$t('admin.table_client.d')"
					header-class="header"
					v-slot="props"
				>
					<div class="has-text-left" @click="balance_detail_client(props.row.id)">
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
					:label="$t('admin.table_client.e')"
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

				<b-table-column
					field="deposit"
					:label="$t('admin.table_client.f')"
					header-class="header header-center has-text-center"
					v-slot="props"
				>
					<div class="has-text-center">
						<b-button outlined type="is-white" @click="open_deposit(props.row.id)">
							<i class="fas fa-plus"></i>
						</b-button>
					</div>
				</b-table-column>

				<b-table-column
					field="withdrawal"
					:label="$t('admin.table_client.g')"
					header-class="header header-center has-text-center"
					v-slot="props"
				>
					<div class="has-text-center">
						<b-button outlined type="is-white" @click="open_withdrawal(props.row.id)">
							<i class="fas fa-minus"></i>
						</b-button>
					</div>
				</b-table-column>
			</b-table>
		</article>

		<b-modal v-model="isOpenNewClientModal" :can-cancel="['x', 'escape']">
			<div class="card">
				<div class="card-content modal-client">
					<div class="media">
						<div class="media-content has-text-centered">
							<p class="title">{{ $t('admin.new_client') }}</p>
							<section class="form has-text-centered">
								<div class="columns">
									<div class="column">
										<c-input
											ref="input"
											v-model="client_form.username"
											@keyup.enter.native="register_client()"
											:placeholder="$t('register.u')"
										></c-input>
									</div>
									<div class="column"></div>
								</div>
								<div class="columns">
									<div class="column">
										<c-input
											v-model="client_form.firstname"
											@keyup.enter.native="register_client()"
											:placeholder="$t('register.c')"
										></c-input>
									</div>
									<div class="column">
										<c-input
											v-model="client_form.lastname"
											@keyup.enter.native="register_client()"
											:placeholder="$t('register.d')"
										></c-input>
									</div>
								</div>
								<div class="columns">
									<div class="column">
										<c-input
											v-model="client_form.email"
											@keyup.enter.native="register_client()"
											:placeholder="$t('register.e')"
										></c-input>
									</div>
									<div class="column">
										<c-tel-input
											v-model="client_form.telephone"
											@keyup.enter.native="register_client()"
											:placeholder="$t('register.f')"
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
											:placeholder="$t('register.g')"
										></c-input>
									</div>
									<div class="column">
										<c-input
											v-model="client_form.address"
											@keyup.enter.native="register_client()"
											:placeholder="$t('register.h')"
										></c-input>
									</div>
								</div>
								<div class="columns">
									<div class="column">
										<c-input
											v-model="client_form.password"
											@keyup.enter.native="register_client()"
											:placeholder="$t('register.i')"
											password
										></c-input>
									</div>
									<div class="column">
										<c-input
											v-model="client_form.password_confirm"
											@keyup.enter.native="register_client()"
											:placeholder="$t('register.j')"
											password
										></c-input>
									</div>
								</div>
								<div class="columns">
									<div class="column">
										<b-field>
											<b-checkbox v-model="client_form.freeSupport">
												{{ $t('register.free_support') }}
											</b-checkbox>
										</b-field>
									</div>
									<div class="column"></div>
								</div>
								<b-field>
									<b-button @click="register_client()" type="is-primary">{{
										$t('admin.save_client')
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
						<div class="column has-text-left">
							<h3 class="title">{{ $t('admin.edit_client') }}</h3>
						</div>
						<div class="column"></div>
					</div>

					<b-tabs>
						<b-tab-item :label="$t('setting.user.a')">
							<section class="form-user has-text-centered">
								<div class="columns">
									<div class="column">
										<c-input
											ref="input"
											v-model="edit_client_form.username"
											@keyup.enter.native="update()"
											:placeholder="$t('setting.user.a')"
										></c-input>
									</div>
									<div class="column"></div>
								</div>
								<div class="columns">
									<div class="column">
										<c-input
											ref="input"
											v-model="edit_client_form.firstname"
											@keyup.enter.native="update_client()"
											:placeholder="$t('setting.user.b')"
										></c-input>
									</div>
									<div class="column">
										<c-input
											v-model="edit_client_form.lastname"
											@keyup.enter.native="update_client()"
											:placeholder="$t('setting.user.c')"
										></c-input>
									</div>
								</div>
								<div class="columns">
									<div class="column">
										<c-input
											v-model="edit_client_form.email"
											@keyup.enter.native="update_client()"
											:placeholder="$t('setting.user.d')"
										></c-input>
									</div>
									<div class="column">
										<c-tel-input
											v-model="edit_client_form.telephone"
											:defaultCountry="default_country"
											:autoDefaultCountry="false"
											@keyup.enter.native="update_client()"
											:placeholder="$t('setting.user.e')"
											@validate="validateNumber"
											@country-changed="changeCountry"
										></c-tel-input>
									</div>
								</div>
								<div class="columns">
									<div class="column">
										<c-input
											v-model="edit_client_form.state"
											@keyup.enter.native="update_client()"
											:placeholder="$t('setting.user.f')"
										></c-input>
									</div>
									<div class="column">
										<c-input
											v-model="edit_client_form.address"
											@keyup.enter.native="update_client()"
											:placeholder="$t('setting.user.g')"
										></c-input>
									</div>
								</div>
								<div class="columns">
									<div class="column">
										<c-input
											v-model="edit_client_form.password"
											@keyup.enter.native="update_client()"
											:placeholder="$t('setting.user.h')"
											password
										></c-input>
									</div>
									<div class="column">
										<c-input
											v-model="edit_client_form.password_confirm"
											@keyup.enter.native="update_client()"
											:placeholder="$t('setting.user.i')"
											password
										></c-input>
									</div>
								</div>
							</section>
						</b-tab-item>

						<b-tab-item :label="$t('setting.accounts.a')">
							<div class="columns">
								<div class="column">
									<section class="form-user has-text-centered">
										<div class="columns">
											<div class="column">
												<c-input
													v-model="edit_client_form.paypal_account"
													@keyup.enter.native="update_client()"
													:placeholder="$t('setting.accounts.b')"
												></c-input>
											</div>
											<div class="column">
												<c-input
													v-model="edit_client_form.stripe_account"
													@keyup.enter.native="update_client()"
													:placeholder="$t('setting.accounts.c')"
												></c-input>
											</div>
										</div>
										<div class="columns">
											<div class="column">
												<c-input
													v-model="edit_client_form.coinpayments_account"
													@keyup.enter.native="update_client()"
													:placeholder="$t('setting.accounts.d')"
												></c-input>
											</div>
											<div class="column"></div>
										</div>

										<div class="columns">
											<div class="column has-text-left">
												<h3 class="title has-text-weight-bold">
													{{ $t('setting.accounts.e') }}
												</h3>
											</div>
											<div class="column is-hidden-mobile"></div>
										</div>
										<div class="columns">
											<div class="column">
												<c-input
													v-model="edit_client_form.banck_name"
													@keyup.enter.native="update_client()"
													:placeholder="$t('setting.accounts.f')"
												></c-input>
											</div>
											<div class="column">
												<c-input
													v-model="edit_client_form.banck_address"
													@keyup.enter.native="update_client()"
													:placeholder="$t('setting.accounts.g')"
												></c-input>
											</div>
										</div>
										<div class="columns">
											<div class="column">
												<c-input
													v-model="edit_client_form.banck_account_name"
													@keyup.enter.native="update_client()"
													:placeholder="$t('setting.accounts.h')"
												></c-input>
											</div>
											<div class="column">
												<c-input
													v-model="edit_client_form.banck_account"
													@keyup.enter.native="update_client()"
													:placeholder="$t('setting.accounts.i')"
												></c-input>
											</div>
										</div>
										<div class="columns">
											<div class="column">
												<c-input
													v-model="edit_client_form.banck_routing_name"
													@keyup.enter.native="update_client()"
													:placeholder="$t('setting.accounts.j')"
												></c-input>
											</div>
											<div class="column">
												<c-input
													v-model="edit_client_form.banck_account_username"
													@keyup.enter.native="update_client()"
													:placeholder="$t('setting.accounts.k')"
												></c-input>
											</div>
										</div>
										<div class="columns">
											<div class="column">
												<c-input
													v-model="edit_client_form.banck_swift_code"
													@keyup.enter.native="update_client()"
													:placeholder="$t('setting.accounts.l')"
												></c-input>
											</div>
											<div class="column">
												<c-input
													v-model="edit_client_form.banck_iban"
													@keyup.enter.native="update_client()"
													:placeholder="$t('setting.accounts.m')"
												></c-input>
											</div>
										</div>
									</section>
								</div>
							</div>
						</b-tab-item>
					</b-tabs>

					<div class="columns">
						<div class="column"></div>
						<div class="column is-4 buttons has-text-right">
							<b-button v-if="edit_client_form.can_remove" @click="delete_client()" type="is-danger">
								{{ $t('setting.delete') }}
							</b-button>
							<b-button @click="update_client()" type="is-primary">{{ $t('setting.save') }}</b-button>
						</div>
					</div>
				</div>
			</div>
		</b-modal>

		<BalanceModal
			v-model="isOpenBalanceDetailClientModal"
			:user_name="client_data_now ? formatName(client_data_now) : ''"
			:user_id="client_data_now ? client_data_now.id : ''"
		/>

		<b-modal v-model="isOpenWithdrawalsModal" :can-cancel="['x', 'escape']">
			<div class="card">
				<div class="card-content model-withdrawals-client">
					<p class="title">
						{{ $t('balance.withdrawals.title') }}
						{{ client_data_now ? ' - ' + formatName(client_data_now) : '' }}
					</p>
					<b-table :data="withdrawals_client_data" sticky-header :mobile-cards="false">
						<b-table-column
							field="date"
							:label="$t('balance.withdrawals.a')"
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
							:label="$t('balance.withdrawals.b')"
							header-class="header"
							v-slot="props"
						>
							<div class="has-text-left">{{ formatMoney(props.row.money) }}</div>
						</b-table-column>

						<b-table-column
							field="withdrawal_method"
							:label="$t('balance.withdrawals.c')"
							header-class="header"
							v-slot="props"
						>
							<div class="has-text-left">
								{{ $t(`payment_method.${props.row.withdrawal_method}`) }}
							</div>
						</b-table-column>

						<b-table-column
							field="has_withdrawal"
							:label="$t('helper.confirm')"
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

		<b-modal v-model="isOpenWithdrawalModal" :can-cancel="['x', 'escape']">
			<div class="card">
				<div class="card-content modal-client">
					<div class="media">
						<div class="media-content has-text-centered">
							<p class="title">
								{{ $t('withdrawal.title') }}
								{{ client_data_now ? ' - ' + formatName(client_data_now) : '' }}
								{{ balance_detail_data ? formatMoney(balance_detail_data.balance) : '' }}
							</p>
							<section class="form has-text-centered">
								<div class="columns">
									<div class="column">
										<b-field :label="$t('withdrawal.step_1')">
											<b-select v-model="withdrawal_method_selected" expanded>
												<option
													v-for="withdrawal_method in withdrawal_methods"
													:key="withdrawal_method"
													:value="withdrawal_method"
												>
													{{ $t(`payment_method.${withdrawal_method}`) }}
												</option>
											</b-select>
										</b-field>
									</div>
									<div class="column">
										<b-field :label="$t('withdrawal.date')">
											<b-datepicker
												v-model="dateWithdrawal"
												:locale="$i18n.locale"
												icon="calendar-alt"
											>
											</b-datepicker>
										</b-field>
									</div>
								</div>
								<br />
								<br />
								<br />
								<div class="columns">
									<div class="column">
										<c-input
											v-model="moneyWithdrawal"
											:placeholder="$t('withdrawal.money')"
											type="number"
											:max="moneyWithdrawalMax"
											icon="fa-dollar-sign"
										>
										</c-input>
									</div>
									<div class="column">
										<c-input
											v-model="referenceWithdrawal"
											:placeholder="$t('withdrawal.reference')"
										>
										</c-input>
									</div>
								</div>

								<p>{{ $t('withdrawal.description') }} {{ formatMoney(moneyWithdrawalMax) }}</p>

								<br />
								<br />
								<br />

								<b-field>
									<b-button
										type="is-primary"
										:disabled="moneyWithdrawal < 50 || moneyWithdrawal > moneyWithdrawalMax"
										@click="finish_withdrawal()"
									>
										{{ $t('helper.confirm') }}
									</b-button>
								</b-field>
							</section>
						</div>
					</div>
				</div>
			</div>
		</b-modal>

		<b-modal v-model="isOpenDepositModal" :can-cancel="['x', 'escape']">
			<div class="card">
				<div class="card-content modal-client">
					<div class="media">
						<div class="media-content has-text-centered">
							<p class="title">
								{{ $t('deposit.title') }}
								{{ client_data_now ? ' - ' + formatName(client_data_now) : '' }}
								{{ balance_detail_data ? formatMoney(balance_detail_data.balance) : '' }}
							</p>
							<section class="form has-text-centered">
								<div class="columns">
									<div class="column">
										<b-field :label="$t('deposit.step_1')">
											<b-select v-model="deposit_membership_selected" expanded>
												<option
													v-for="deposit_suscription in deposit_suscriptions"
													:key="deposit_suscription.membershipId"
													:value="deposit_suscription.membershipId"
												>
													{{ deposit_suscription.name }} {{ deposit_suscription.interest }}%
													{{ deposit_suscription.suscriptionId ? ' &#9733; ' : '' }}
												</option>
											</b-select>
										</b-field>
									</div>
									<div class="column">
										<b-field :label="$t('deposit.step_2')">
											<b-select v-model="deposit_method_selected" expanded>
												<option
													v-for="deposit_method in deposit_methods"
													:key="deposit_method"
													:value="deposit_method"
												>
													{{ $t(`payment_method.${deposit_method}`) }}
												</option>
											</b-select>
										</b-field>
									</div>
								</div>
								<div class="columns">
									<div class="column">
										<c-input
											v-model="moneyDeposit"
											:placeholder="$t('deposit.money')"
											type="number"
											:min="moneyDepositMin"
											:max="moneyDepositMax"
											icon="fa-dollar-sign"
										>
										</c-input>
									</div>
									<div class="column">
										<c-input v-model="referenceDeposit" :placeholder="$t('deposit.reference')">
										</c-input>
									</div>
								</div>
								<div class="columns">
									<div class="column">
										<b-field :label="$t('deposit.date')">
											<b-datepicker
												v-model="dateDeposit"
												:locale="$i18n.locale"
												icon="calendar-alt"
												position="is-top-right"
											>
											</b-datepicker>
										</b-field>
									</div>
									<div class="column">
										<b-field
											v-if="deposit_method_selected === 'blockchain'"
											:label="$t('deposit.method')"
										>
											<b-select v-model="deposit_blockchain_currency" expanded>
												<option
													v-for="deposit_blockchain in deposit_blockchains"
													:key="deposit_blockchain.currency"
													:value="deposit_blockchain"
												>
													{{ deposit_blockchain.name }}
												</option>
											</b-select>
										</b-field>
									</div>
								</div>
								<div class="columns columns-button">
									<div class="column">
										<b-field>
											<b-button
												type="is-primary"
												:disabled="
													moneyDeposit < moneyDepositMin || moneyDeposit > moneyDepositMax
												"
												@click="proccess_deposit()"
											>
												{{ $t('helper.confirm') }}
											</b-button>
										</b-field>
									</div>
									<div
										v-if="
											deposit_method_selected !== 'balance' &&
											deposit_method_selected !== 'bankcheck'
										"
										class="column is-6"
									>
										{{ $t('admin.url_pay') }}
										<div class="url-pay">
											{{ url_pay }}
										</div>
									</div>
								</div>
							</section>
						</div>
					</div>
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
import BalanceModal from '../../components/BalanceModal.vue';

@Component({
	components: { BalanceModal },
})
export default class Admin extends PageChildBase {
	private client_data: IClient[] = [];
	private memberships_data: IMembership[] = [];

	private isOpenNewClientModal: boolean = false;
	private client_form: SignupDto = new SignupDto();

	private isOpenEditClientModal: boolean = false;
	private edit_client_form: UpdateDto = new UpdateDto();
	private id_edit_client: string = '';
	private default_country: string = '';

	private isOpenBalanceDetailClientModal: boolean = false;
	private records_client_data: IRecord[] = [];
	private balance_detail_data: IBalanceDetail = null as any;
	private suscriptions_data: ISuscription[] = [];
	private isTableBalance: boolean = true;

	private client_data_now: IUser = null as any;
	private client_timezone_now: ITimeZone = null as any;

	private isOpenWithdrawalsModal: boolean = false;
	private withdrawals_client_data: IWithdrawal[] = null as any;

	private isOpenWithdrawalModal: boolean = false;
	private withdrawal_methods: string[] = ['bankcheck', 'wire_transfer', 'paypal', 'stripe', 'blockchain'];
	private withdrawal_method_selected: string = 'bankcheck';
	private moneyWithdrawal: number = 0;
	private moneyWithdrawalMax: number = 0;
	private dateWithdrawal: Date = new Date();
	private referenceWithdrawal: string = '';

	private isOpenDepositModal: boolean = false;
	private deposit_suscriptions: {
		name: string;
		membershipId: string;
		suscriptionId: string;
		min_money: number;
	}[] = [];
	private deposit_membership_selected: string = '';
	private deposit_methods: string[] = ['balance', 'bankcheck', 'wire_transfer', 'paypal', 'stripe', 'blockchain'];
	private deposit_method_selected: string = 'balance';
	private deposit_blockchains: { name: string; currency: string; image: string }[] =
		this.store.util.deposit_blockchains;
	private deposit_blockchain_currency: { name: string; currency: string; image: string } =
		this.deposit_blockchains[0];
	private moneyDeposit: number = 0;
	private moneyDepositMin: number = 100;
	private moneyDepositMax: number = 100000000;
	private dateDeposit: Date = new Date();
	private referenceDeposit: string = '';

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
		this.$watch(
			'moneyWithdrawal',
			() => {
				if (this.moneyWithdrawal > this.moneyWithdrawalMax) {
					this.moneyWithdrawal = this.moneyWithdrawalMax;
				}
			},
			{ immediate: true },
		);
		this.$watch(
			'deposit_membership_selected',
			() => {
				if (this.balance_detail_data) {
					// prettier-ignore
					this.moneyDepositMin = this.balance_detail_data.suscriptions.find(
						s => s.membershipId === this.deposit_membership_selected,
					)
						? 100
						: this.deposit_suscriptions.find(s => s.membershipId === this.deposit_membership_selected)
							?.min_money || 100;
					if (this.moneyDepositMin > this.moneyDepositMax) {
						this.moneyDepositMax = 100000000;
					}
					this.moneyDeposit = this.moneyDepositMin;
				}
			},
			{ immediate: true },
		);
		this.$watch(
			'deposit_method_selected',
			() => {
				if (this.balance_detail_data && this.deposit_method_selected === 'balance') {
					this.moneyDepositMax = parseFloat(this.balance_detail_data.available_balance.toFixed(2));
					if (this.moneyDepositMin > this.moneyDepositMax) {
						this.moneyDepositMax = 100000000;
					}
				} else {
					this.moneyDepositMax = 100000000;
				}
			},
			{ immediate: true },
		);
		this.$watch(
			'moneyDeposit',
			() => {
				if (this.moneyDeposit > this.moneyDepositMax) {
					this.moneyDeposit = this.moneyDepositMax;
				}
				const old_moneyDeposit = this.moneyDeposit;
				this.sleep(1200).then(() => {
					if (old_moneyDeposit === this.moneyDeposit && this.moneyDeposit < this.moneyDepositMin) {
						this.moneyDeposit = this.moneyDepositMin;
					}
				});
			},
			{ immediate: true },
		);
	}

	public reload() {
		this.get_clients();
	}

	public get url_pay() {
		const url_base = 'https://digitaltrustonline.net/app/buy';
		if (this.moneyDeposit) {
			return `${url_base}?directDeposit=true&money=${this.moneyDeposit}&method=${this.deposit_method_selected}&membership=${this.deposit_membership_selected}`;
		} else {
			return url_base;
		}
	}

	private async get_memberships() {
		this.load_form_api(await this.store.api.memberships(), (memberships_data: IMembership[]) => {
			this.memberships_data = memberships_data;
		});
	}

	private async get_clients() {
		this.load_form_api(await this.store.api.clients_vip(), (data: IClient[]) => {
			this.client_data = data;
		});
	}

	private async new_client() {
		this.client_form = new SignupDto();
		this.client_form.ref = 'admin';
		this.client_form.freeSupport = true;
		this.telephoneInternational = '';
		this.isOpenNewClientModal = true;
	}

	private async register_client() {
		const errors: string[] = this.client_form.validate();
		if (!this.validationTelephone) {
			errors.push('validator.auth.h');
		}
		if (errors.length) {
			this.toastError(this.$t(errors[0]));
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
						this.toastError(this.$t('error.e000'));
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
				this.toastError(this.$t(errors[0]));
			} else {
				this.load_form_api(
					await this.store.api.update_client({ id: this.id_edit_client, data: this.edit_client_form }),
					data => {
						this.edit_client_form = new UpdateDto(data);
						if ((data as any).errors.length) {
							this.toastSuccess(this.$t('setting.not_ok'));
							for (const error of (data as any).errors) {
								this.toastError(this.$t(error));
							}
						} else {
							this.edit_client_form = new UpdateDto();
							this.id_edit_client = '';
							this.isOpenEditClientModal = false;
							this.get_clients();
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

	private async delete_client() {
		this.$buefy.dialog.confirm({
			title: this.$t('setting.remove.a') as string,
			message: this.$t('setting.remove.b') as string,
			cancelText: this.$t('setting.remove.c') as string,
			confirmText: this.$t('setting.remove.d') as string,
			type: 'is-danger',
			hasIcon: true,
			onConfirm: async () => {
				this.load_form_api(
					await this.store.api.remove_client(this.id_edit_client),
					() => {
						this.edit_client_form = new UpdateDto();
						this.id_edit_client = '';
						this.isOpenEditClientModal = false;
						this.get_clients();
						this.toastSuccess(this.$t('setting.ok'));
					},
					{
						e000: () => {
							this.toastError(this.$t('error.e000'));
						},
					},
				);
			},
		});
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

	private async balance_detail_client(id: string) {
		await this.get_data_client_now(id);
		this.isOpenBalanceDetailClientModal = true;
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
			message: this.$t('helper.continue_task') as string,
			confirmText: this.$t('helper.confirm') as string,
			cancelText: this.$t('helper.cancel') as string,
			onConfirm: async () => {
				this.load_form_api(await this.store.api.process_withdrawal({ id }), result => {
					if (result.valid) {
						this.get_clients();
						this.isOpenWithdrawalsModal = false;
						this.toastSuccess(this.$t('helper.success_task'));
					} else {
						this.toastError(this.$t('helper.error_task'));
					}
				});
			},
		});
	}

	private async open_withdrawal(id: string) {
		await this.get_data_client_now(id);
		this.load_form_api(await this.store.api.balance_detail({ id }), (data: IBalanceDetail) => {
			this.balance_detail_data = data;
			this.withdrawal_method_selected = 'bankcheck';
			this.moneyWithdrawalMax = parseFloat(this.balance_detail_data.balance.toFixed(2));
			this.moneyWithdrawal = 0;
			this.dateWithdrawal = new Date();
			this.referenceWithdrawal = '';
			this.isOpenWithdrawalModal = true;
		});
	}

	private async finish_withdrawal() {
		this.load_form_api(
			await this.store.api.request_withdrawal({
				id: this.client_data_now.id,
				type: this.withdrawal_method_selected,
				money: this.moneyWithdrawal,
				date: this.store.api.DateTime.fromDate(this.dateWithdrawal).toSeconds(),
				reference: this.referenceWithdrawal,
			}),
			d => {
				if (d.valid) {
					this.toastSuccess(this.$t('withdrawal.success'));
					this.get_clients();
				} else {
					this.toastError(this.$t('withdrawal.error'));
				}
				this.isOpenWithdrawalModal = false;
			},
		);
	}

	private async open_deposit(id: string) {
		await this.get_data_client_now(id);
		this.load_form_api(await this.store.api.balance_detail({ id }), (data: IBalanceDetail) => {
			this.balance_detail_data = data;
			this.deposit_suscriptions = this.memberships_data.map(m => {
				const suscription = this.balance_detail_data.suscriptions.find(s => s.membershipId === m.id);
				return {
					name: m.name,
					months: m.months,
					min_money: m.money_a,
					money_a: m.money_a,
					money_b: m.money_b,
					interest: (m.interest * 100).toFixed(1),
					membershipId: m.id,
					suscriptionId: suscription?.id || '',
					investment: suscription?.investment || 0,
				};
			});
			this.deposit_membership_selected = this.deposit_suscriptions[1].membershipId;
			this.deposit_method_selected = 'balance';
			this.moneyDeposit = 0;
			this.moneyDepositMax = parseFloat(this.balance_detail_data.available_balance.toFixed(2));
			this.moneyDepositMin = this.balance_detail_data.suscriptions.find(
				s => s.membershipId === this.deposit_membership_selected,
			)
				? 100
				: this.deposit_suscriptions[1].min_money;
			if (this.moneyDepositMin > this.moneyDepositMax) {
				this.moneyDepositMax = 100000000;
			}
			this.dateDeposit = new Date();
			this.referenceDeposit = '';
			this.isOpenDepositModal = true;
		});
	}

	public async proccess_deposit() {
		this.load_form_api(
			await this.store.api.process_deposit({
				id: this.client_data_now.id,
				type: this.deposit_method_selected,
				membershipId: this.deposit_membership_selected,
				suscriptionId: this.balance_detail_data.suscriptions.find(
					s => s.membershipId === this.deposit_membership_selected,
				)?.id,
				money: this.moneyDeposit,
				reference: this.referenceDeposit,
				date: this.store.api.DateTime.fromDate(this.dateDeposit).toSeconds(),
			}),
			d => {
				if (d.valid) {
					this.isOpenDepositModal = false;
					this.toastSuccess(this.$t('deposit.success'));
					this.get_clients();
				} else {
					this.toastError(this.$t('deposit.error'));
				}
				this.isOpenWithdrawalModal = false;
			},
		);
	}
}
</script>

<style lang="scss">
@import '../../styles/initial_variables.scss';

.admin {
	height: calc(100vh - 6rem);
	overflow-y: scroll;
	padding-right: 1rem;

	@include mobile {
		padding-right: 0.5rem !important;
	}

	.box {
		background-color: $box;
		color: white !important;

		.table-wrapper {
			height: calc(100vh - 12rem);
		}

		.table {
			background-color: transparent;
			color: white !important;
		}

		.header {
			padding-top: 0.9rem;
			padding-bottom: 0.9rem;

			color: white !important;

			&:first-child {
				background: linear-gradient(135deg, #3f84dc, #4086dc) !important;
				padding-left: 3rem;
			}

			&:nth-child(2) {
				background: linear-gradient(135deg, #4086dc, #4189dc) !important;
			}

			&:nth-child(3) {
				background: linear-gradient(135deg, #4189dc, #418bdc) !important;
			}

			&:nth-child(4) {
				background: linear-gradient(135deg, #418bdc, #428ddc) !important;
			}

			&:nth-child(5) {
				background: linear-gradient(135deg, #428ddc, #428edc) !important;
			}

			&:nth-child(6) {
				background: linear-gradient(135deg, #428edc, #438fdc) !important;
			}

			&:last-child {
				background: linear-gradient(135deg, #438fdc, #4390dc) !important;
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
				font-size: 35px;
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

				.label {
					color: #aaa;
					font-size: 18px !important;
					font-weight: 100;
					opacity: 1;
					text-align: left;
				}

				.helper {
					margin: auto;
				}

				.columns-button {
					padding-top: 2rem;
				}

				.url-pay {
					margin-top: 1.5rem;
					font-size: 13px;
					white-space: pre-wrap;
					word-wrap: break-word;
					border-bottom: 1px solid $border;
					color: $black;

					@include touch {
						font-size: 10px;
					}
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

		.b-tabs {
			margin: auto;
			width: 100%;

			@include mobile {
				width: 95%;
			}

			.tabs {
				li a {
					color: $gray;
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
			margin: auto;
			width: 80%;

			.columns:first-child,
			.columns:last-child {
				padding-bottom: 2rem;
			}

			.c-input,
			.c-tel-input {
				margin: 1rem 0;
			}
		}

		.button {
			.is-primary,
			.is-danger {
				padding: 1.5rem 1rem;
				margin: 2rem;
				width: 60%;
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

	.dropdown-content {
		background-color: white !important;
	}
}
</style>
