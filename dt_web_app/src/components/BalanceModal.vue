<template>
	<b-modal v-model="isOpenBalanceDetailModal" :can-cancel="['x', 'escape']" class="model-balance-detail">
		<div class="card">
			<div v-if="balance_detail_data" class="card-content">
				<p class="title has-text-left">{{ $t('balance.title') }} {{ user_name ? ' - ' + user_name : '' }}</p>
				<p class="subtitle has-text-left">{{ $t('balance.subtitle') }}</p>
				<b-tabs>
					<b-tab-item :label="$t('helper.summary')">
						<div class="box-balance">
							<div v-if="balance_detail_data.available_balance" class="columns has-text-left">
								<div class="column balance-text">{{ $t('balance.a') }}</div>
								<div class="column balance-money is-4">
									{{ formatMoney(balance_detail_data.available_balance) }}
								</div>
							</div>
							<div class="columns has-text-left">
								<div class="column balance-text">{{ $t('balance.b') }}</div>
								<div class="column balance-money is-4">
									{{ formatMoney(balance_detail_data.balance) }}
								</div>
							</div>
							<div class="columns has-text-left">
								<div class="column balance-text">{{ $t('balance.e') }}</div>
								<div class="column balance-money is-4">
									{{ formatMoney(balance_detail_data.investment) }}
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
											{{ $t('balance.suscription.a') }}: {{ formatMoney(suscription.investment) }}
										</div>
									</div>
								</div>
								<div class="column">
									<div class="columns has-text-left">
										<div class="column">
											{{ $t('balance.suscription.b') }}:
											{{
												store.api.DateTime.fromUnix(suscription.date_begin)
													.setLocale($i18n.locale)
													.toFormat('dd LLL yyyy')
											}}
										</div>
									</div>
									<div class="columns has-text-left">
										<div class="column">
											{{ $t('balance.suscription.c') }}:
											{{
												store.api.DateTime.fromUnix(suscription.date_end)
													.setLocale($i18n.locale)
													.toFormat('dd LLL yyyy')
											}}
										</div>
									</div>
								</div>
								<div class="column is-2">
									<b-switch
										v-model="suscription.reinvestment"
										type="is-success"
										@input="set_reinvestment(suscription.id)"
									>
										{{ $t('balance.suscription.d') }}
									</b-switch>
								</div>
							</div>
						</div>
					</b-tab-item>
					<b-tab-item
						v-if="balance_detail_data.moves.length"
						:label="$t('balance.moves.title')"
						class="moves"
					>
						<b-table :data="balance_detail_data.moves" sticky-header :mobile-cards="false">
							<b-table-column
								field="type"
								:label="$t('balance.moves.0')"
								header-class="header"
								v-slot="props"
							>
								<div class="has-text-center">
									<i
										class="fas"
										:class="[
											props.row.type === 'deposit'
												? 'fa-arrow-up has-text-success'
												: 'fa-arrow-down has-text-danger',
										]"
									></i>
								</div>
							</b-table-column>

							<b-table-column
								field="date"
								:label="$t('balance.moves.b')"
								header-class="header"
								v-slot="props"
							>
								<div class="has-text-left">
									{{
										store.api.DateTime.fromUnix(props.row.date)
											.setLocale($i18n.locale)
											.toFormat('dd LLL yyyy')
									}}
								</div>
							</b-table-column>

							<b-table-column
								field="money"
								:label="$t('balance.moves.c')"
								header-class="header"
								v-slot="props"
							>
								<div class="has-text-left">{{ formatMoney(props.row.money) }}</div>
							</b-table-column>

							<b-table-column
								field="suscription"
								:label="$t('balance.moves.a')"
								header-class="header"
								v-slot="props"
							>
								<div class="has-text-left">{{ get_name_suscription(props.row.suscription) }}</div>
							</b-table-column>

							<b-table-column
								field="method"
								:label="$t('balance.moves.d')"
								header-class="header"
								v-slot="props"
							>
								<div class="has-text-left">{{ $t(`payment_method.${props.row.method}`) }}</div>
							</b-table-column>

							<b-table-column
								field="reference"
								:label="$t('balance.moves.f')"
								header-class="header"
								v-slot="props"
							>
								<div class="has-text-center">
									{{ props.row.reference }}
								</div>
							</b-table-column>

							<b-table-column
								field="status"
								:label="$t('balance.moves.g')"
								header-class="header"
								v-slot="props"
							>
								<div v-if="props.row.type === 'withdrawal'" class="has-text-center">
									<i
										class="fas"
										:class="[
											props.row.status ? 'fa-check has-text-success' : 'fa-times has-text-gray',
										]"
									></i>
								</div>
								<div v-else class="has-text-center">---</div>
							</b-table-column>
						</b-table>
					</b-tab-item>
				</b-tabs>
				<div class="has-text-right">
					<b-button type="is-primary" @click="send_mail()" :loading="button_loading">{{
						$t('balance.sendmail')
					}}</b-button>
				</div>
			</div>
		</div>
	</b-modal>
</template>

<script lang="ts">
import PageChildBase from '../utils/page_child_base.utils';
import { Component, ModelSync, Watch, Prop } from 'vue-property-decorator';
import { IBalanceDetail, IMembership, ISuscription } from '../store';

@Component
export default class BalanceModal extends PageChildBase {
	@ModelSync('value', 'change', { type: Boolean, default: false }) isOpenBalanceDetailModal!: boolean;
	@Prop({ type: String, default: '' }) readonly user_id!: string;
	@Prop({ type: String, default: '' }) readonly user_name!: string;

	private balance_detail_data: IBalanceDetail = null as any;

	private memberships_data: IMembership[] = [];
	private suscriptions_data: ISuscription[] = [];

	private button_loading: boolean = false;

	public async created() {
		await super.created();
	}

	@Watch('isOpenBalanceDetailModal', { immediate: true })
	public changeOpenBalanceDetailModal() {
		if (this.isOpenBalanceDetailModal) {
			this.get_memberships();
			this.get_suscriptions();
			this.balance_detail();
		}
	}

	private async get_memberships() {
		this.load_form_api(await this.store.api.memberships(), (memberships_data: IMembership[]) => {
			this.memberships_data = memberships_data;
		});
	}

	private async get_suscriptions() {
		this.load_form_api(await this.store.api.suscriptions(this.user_id), (data: ISuscription[]) => {
			this.suscriptions_data = data;
		});
	}

	private async balance_detail() {
		this.load_form_api(await this.store.api.balance_detail({ id: this.user_id }), (data: IBalanceDetail) => {
			this.balance_detail_data = data;
			this.isOpenBalanceDetailModal = true;
		});
	}

	private get_name_suscription(id: string) {
		const membership = this.memberships_data.find(
			m => m.id === this.suscriptions_data.find(s => s.id === id)?.membershipId,
		);
		return membership ? membership.name + ' ' + (membership.interest * 100).toFixed(1) + '%' : '---';
	}

	private async send_mail() {
		this.button_loading = true;
		this.load_form_api(await this.store.api.balance_send_mail({ id: this.user_id }), (data: { valid: boolean }) => {
			this.button_loading = false;
			if (data.valid) {
				this.toastSuccess(this.$t('helper.success'));
			} else {
				this.toastError(this.$t('helper.error'));
			}
		});
	}

	private async set_reinvestment(id: string) {
		const suscription = this.balance_detail_data.suscriptions.find(s => s.id === id);
		if (suscription) {
			if (suscription.reinvestment) {
				this.balance_detail_data.suscriptions
					.filter(s => s.id !== id)
					.forEach(s => {
						s.reinvestment = false;
					});
				this.$buefy.snackbar.open(this.$t('balance.reinvestment') as string);
			}
			this.load_form_api(
				await this.store.api.set_reinvestment({
					user_id: this.user_id,
					id,
					reinvestment: suscription.reinvestment,
				}),
				(data: { valid: boolean }) => {
					this.button_loading = false;
					if (data.valid) {
						this.toastSuccess(this.$t('helper.success'));
					} else {
						this.toastError(this.$t('helper.error'));
					}
				},
			);
		}
	}
}
</script>

<style lang="scss">
@import '../styles/initial_variables.scss';

.model-balance-detail {
	.title {
		font-size: 28px;
		padding-bottom: 2rem;
	}

	.subtitle {
		font-size: 20px;
		padding-bottom: 1rem;
		margin-bottom: 0;
	}

	.b-tabs {
		margin: auto;

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

			@include mobile {
				padding: 0;
			}
		}
	}

	.box-balance {
		padding: 1rem 2rem;
		margin-bottom: 2rem;

		.balance-text {
			font-size: 20px;
			padding: 0.25rem 0;
			color: $gray;
		}

		.balance-money {
			padding: 0.25rem 0;
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

	.moves {
		.title {
			padding: 1rem;
			margin-top: 1rem;
			margin-bottom: 0;
		}

		.table-wrapper {
			height: 50vh;
			overflow-x: hidden;

			@include mobile {
				overflow-x: auto;
			}
		}

		.table {
			padding: 0 1.5rem;

			@include mobile {
				padding: 0;
			}

			.header {
				padding-top: 0.9rem;
				padding-bottom: 0.9rem;
				color: $gray;

				&.header-center span {
					width: 100%;
				}
			}
		}
	}
}
</style>
