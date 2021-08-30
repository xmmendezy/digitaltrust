<template>
	<div class="home">
		<div class="columns">
			<div class="column">
				<div class="box detail">
					<h1 class="title">
						{{ $t('home.balance_now.title') }} -
						{{ store.api.DateTime.now().toFormat('LLLL yyyy') }}
					</h1>
					<div class="columns">
						<div class="column">
							<div class="box earning">
								<div class="columns has-text-left">
									<div class="column earning-text">{{ $t('home.balance_now.b') }}</div>
									<div class="column earning-money is-7">{{ formatMoney(balance_data.earning) }}</div>
								</div>
							</div>
							<div class="box withdrawal" @click="open_withdrawal">
								<div class="columns has-text-left">
									<div class="column withdrawal-text">{{ $t('home.balance_now.d') }}</div>
									<div class="column withdrawal-money is-7">
										{{ formatMoney(balance_data.withdrawal) }}
									</div>
								</div>
							</div>
						</div>
						<div class="column">
							<div class="box balance" @click="isOpenBalanceDetailModal = true">
								<div class="columns has-text-left">
									<div class="column balance-text">{{ $t('home.balance_now.a') }}</div>
									<div class="column balance-money is-7">{{ formatMoney(balance_data.balance) }}</div>
								</div>
								<div class="columns has-text-left">
									<div class="column investment-text">{{ $t('home.balance_now.c') }}</div>
									<div class="column investment-money is-7">
										{{ formatMoney(balance_data.investment) }}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="column is-4">
				<div class="box crypto">
					<h1 class="title">
						{{ $t('home.crypto.title') }}
					</h1>
					<div v-for="blockchain in blockchains" :key="blockchain.currency" class="columns is-mobile">
						<div class="column is-4 has-text-left">
							<h3>{{ blockchain.name }}</h3>
						</div>
						<div class="column">
							<b-image :src="blockchain.image"></b-image>
						</div>
						<div class="column">
							<b-icon icon="arrow-right" size="is-small" />
						</div>
						<div class="column is-4">
							{{ blockchain.dollar }}
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="box">
			<Chart />
		</div>

		<BalanceModal v-model="isOpenBalanceDetailModal" />

		<b-modal v-model="isOpenWithdrawalModal" :can-cancel="['x', 'escape']" class="model-withdrawal">
			<div class="card">
				<div class="card-content">
					<p class="title has-text-left">
						{{ $t('withdrawal.title') }}
					</p>
					<p class="subtitle has-text-left">
						{{ $t('withdrawal.subtitle') }}
					</p>
					<b-steps v-model="WithdrawalStep">
						<b-step-item step="1" :label="$t('withdrawal.step_1')" id="driver-guide-b-2">
							<div
								v-for="withdrawal_method in withdrawal_methods"
								:key="withdrawal_method"
								class="withdrawal-box"
							>
								<div class="columns is-mobile columns-withdrawal">
									<div
										class="column title has-text-left"
										@click="withdrawal_method_selected = withdrawal_method"
									>
										{{ $t(`payment_method.${withdrawal_method}`) }}
									</div>
									<div class="column is-1">
										<b-radio
											v-model="withdrawal_method_selected"
											:native-value="withdrawal_method"
										></b-radio>
									</div>
								</div>
							</div>
						</b-step-item>

						<b-step-item step="2" :label="$t('withdrawal.step_2')">
							<div class="message-withdrawal">
								<div class="column title has-text-left">
									{{ $t('withdrawal.description') }} {{ formatMoney(moneyWithdrawalMax) }}
								</div>
								<c-input
									v-model="moneyWithdrawal"
									:placeholder="$t('withdrawal.money')"
									type="number"
									:max="moneyWithdrawalMax"
									icon="fa-dollar-sign"
								>
								</c-input>
							</div>
						</b-step-item>

						<b-step-item step="3" :label="$t('withdrawal.step_3')">
							<div class="message-withdrawal">
								<div class="column title has-text-left">
									{{ $t('withdrawal.completed_description') }}
								</div>
							</div>
						</b-step-item>

						<template #navigation="{ previous, next }">
							<b-button
								v-if="WithdrawalStep === 1"
								outlined
								type="is-primary"
								icon-pack="fas"
								icon-left="chevron-left"
								@click.prevent="previous.action"
							>
								{{ $t('helper.prev') }}
							</b-button>
							<b-button
								v-if="WithdrawalStep === 0"
								outlined
								id="driver-guide-b-3"
								type="is-primary"
								icon-pack="fas"
								icon-right="chevron-right"
								@click.prevent="next.action()"
							>
								{{ $t('helper.next') }}
							</b-button>
							<b-button
								v-if="WithdrawalStep === 1"
								id="driver-guide-b-4"
								outlined
								type="is-primary"
								icon-pack="fas"
								icon-right="chevron-right"
								:disabled="moneyWithdrawal < 50 || moneyWithdrawal > moneyWithdrawalMax"
								@click.prevent="next.action"
							>
								{{ $t('helper.confirm') }}
							</b-button>
							<b-button
								v-if="WithdrawalStep === 2"
								outlined
								type="is-primary"
								icon-pack="fas"
								icon-right="check"
								@click.prevent="finish_withdrawal()"
							>
								{{ $t('helper.finish') }}
							</b-button>
						</template>
					</b-steps>
				</div>
			</div>
		</b-modal>
	</div>
</template>

<script lang="ts">
import PageChildBase from '../../utils/page_child_base.utils';
import { Component } from 'vue-property-decorator';
import { IBalance, IBalanceDetail } from '../../store';
import Chart from '../../components/Chart.vue';
import BalanceModal from '../../components/BalanceModal.vue';

@Component({
	components: { Chart, BalanceModal },
})
export default class Home extends PageChildBase {
	private balance_detail_data: IBalanceDetail = null as any;

	private balance_data: IBalance = {
		balance: 0,
		earning: 0,
		investment: 0,
	};

	private isOpenBalanceDetailModal: boolean = false;

	private isOpenWithdrawalModal: boolean = false;
	private WithdrawalStep: number = 0;
	private withdrawal_methods: string[] = ['bankcheck', 'wire_transfer', 'paypal', 'stripe', 'blockchain'];
	private withdrawal_method_selected: string = 'bankcheck';
	private moneyWithdrawal: number = 0;
	private moneyWithdrawalMax: number = 0;

	private blockchains: { name: string; currency: string; coingecko: string; image: string; dollar?: string }[] =
		this.store.util.deposit_blockchains;

	public async created() {
		await super.created();
		this.reload();
		for (const blockchain of this.blockchains) {
			await this.get_currency_to_dollar(blockchain);
		}
		this.$watch(
			'moneyWithdrawal',
			() => {
				if (this.moneyWithdrawal > this.moneyWithdrawalMax) {
					this.moneyWithdrawal = this.moneyWithdrawalMax;
				}
			},
			{ immediate: true },
		);
	}

	public reload() {
		this.get_balance();
	}

	private async get_balance() {
		this.load_form_api(await this.store.api.balance(), (data: IBalance) => {
			this.balance_data = data;
		});
	}

	public async open_withdrawal() {
		this.load_form_api(await this.store.api.balance_detail({ id: '' }), async (data: IBalanceDetail) => {
			this.balance_detail_data = data;
			this.withdrawal_method_selected = 'bankcheck';
			this.WithdrawalStep = 0;
			this.moneyWithdrawalMax = parseFloat(this.balance_detail_data.available_balance.toFixed(2));
			this.moneyWithdrawal = 0;
			this.isOpenWithdrawalModal = true;
		});
	}

	private async finish_withdrawal() {
		this.load_form_api(
			await this.store.api.request_withdrawal({
				type: this.withdrawal_method_selected,
				money: this.moneyWithdrawal,
			}),
			d => {
				if (d.valid) {
					this.toastSuccess(this.$t('withdrawal.success'));
					this.get_balance();
				} else {
					this.toastError(this.$t('withdrawal.error'));
				}
				this.isOpenWithdrawalModal = false;
			},
		);
	}

	private async get_currency_to_dollar(blockchain: {
		name: string;
		currency: string;
		coingecko: string;
		dollar?: string;
		image: string;
	}) {
		this.load_form_api(await this.store.api.get_currency_to_dollar(blockchain.coingecko), d => {
			blockchain.dollar = d ? this.formatMoney(d) : '---';
		});
	}
}
</script>

<style lang="scss">
@import '../../styles/initial_variables.scss';

.home {
	height: calc(100vh - 6rem);
	overflow-y: scroll;
	padding-right: 1rem;

	@include mobile {
		padding-right: 0.5rem !important;
	}

	.box {
		background-color: $box;
		color: white !important;

		.title {
			color: white !important;
		}

		&.earning {
			background-image: linear-gradient(150deg, #08853e, #57be84) !important;
		}

		.earning-text {
			font-size: 18px;
			font-weight: bold;
		}

		.earning-money {
			font-size: 24px;
			font-weight: bold;
		}

		&.balance {
			background-image: linear-gradient(150deg, #611bf7, #8b61e4) !important;
			cursor: pointer;
		}

		.balance-text {
			font-size: 24px;
			font-weight: bold;
		}

		.balance-money {
			font-size: 30px;
			font-weight: bold;
		}

		.investment-text {
			font-size: 20px;
			font-weight: bold;
		}

		.investment-money {
			font-size: 26px;
			font-weight: bold;
		}

		&.withdrawal {
			background-image: linear-gradient(150deg, #f71b52, #f87d9c) !important;
			cursor: pointer;
		}

		.withdrawal-text {
			font-size: 20px;
			font-weight: bold;
		}

		.withdrawal-money {
			font-size: 26px;
			font-weight: bold;
		}

		&.detail {
			height: 100%;
		}

		&.crypto {
			height: 100%;
			img {
				height: 35px;
				width: 35px;
				margin: auto;
			}

			.icon {
				height: 100%;
				width: 100%;

				i {
					margin: auto;
				}
			}
		}
	}

	.chartjs-render-monitor {
		height: 50vh !important;
		width: 100% !important;
	}

	.model-withdrawal {
		.title {
			font-size: 28px;
			padding-bottom: 2rem;
		}

		.subtitle {
			font-size: 18px;
			padding-bottom: 1rem;
			margin-bottom: 0;
		}

		.step-title {
			font-size: 20px;
			padding-top: 0.5rem;
			padding-bottom: 1rem;
			margin-bottom: 0;
			color: $black;
		}

		.withdrawal-box {
			&:first-child {
				margin-top: 3rem;
			}

			&:last-child {
				margin-bottom: 3rem;
			}

			.columns-withdrawal {
				width: auto !important;
				padding-left: 0 !important;
				padding-right: 0 !important;
				margin: auto;
				font-size: 16px;
				padding: 1rem 3rem;
				color: $gray;

				.title {
					font-size: 18px;
					color: $black;
					padding-bottom: 0.5rem;
					margin-bottom: 0;
				}
			}
		}

		.message-withdrawal {
			padding: 4rem 0;
			margin: auto;

			@include tablet {
				width: 60%;
			}
		}
	}
}
</style>
