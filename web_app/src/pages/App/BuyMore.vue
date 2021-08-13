<template>
	<div class="buy-more">
		<div class="body">
			<div class="box">
				<div class="card-content">
					<p class="title has-text-left">
						{{ $t('deposit.title') }}
					</p>
					<p class="subtitle has-text-left">
						{{ $t('deposit.subtitle') }}
					</p>
					<b-steps v-model="DepositStep">
						<b-step-item step="1" :label="$t('deposit.step_1')" :clickable="false">
							<div class="buttons is-centered prices">
								<div
									v-for="membership in deposit_memberships"
									:key="membership.id"
									class="button box-membership"
									:class="{ 'box-suscription': !!membership.suscriptionId }"
								>
									<b-tooltip
										:label="membership.description"
										type="is-primary is-light"
										position="is-bottom"
										multilined
									>
										<p class="title">
											{{ get_name_membership(membership.id) }}
										</p>
									</b-tooltip>

									<div>
										<b-button
											class="is-circular button-add"
											icon-right="plus"
											@click="deposit_membership_selected = membership.id"
										/>
									</div>

									<div v-if="deposit_membership_selected === membership.id">
										{{ membership.min_money }}
									</div>
								</div>
							</div>
						</b-step-item>

						<b-step-item step="2" :label="$t('deposit.step_2')" :clickable="false">
							<div v-for="deposit_method in deposit_methods" :key="deposit_method" class="deposit-box">
								<div class="columns columns-deposit">
									<div
										class="column title has-text-left"
										@click="deposit_method_selected = deposit_method"
									>
										{{ $t(`payment_method.${deposit_method}`) }}
									</div>
									<div class="column is-1">
										<b-radio
											v-model="deposit_method_selected"
											:native-value="deposit_method"
										></b-radio>
									</div>
								</div>
							</div>
						</b-step-item>

						<b-step-item
							step="3"
							:label="$t(!has_button_payment ? 'deposit.step_3' : 'deposit.to_pay')"
							:clickable="false"
						>
							<div
								v-if="!has_button_payment && deposit_method_selected !== 'blockchain'"
								class="message-deposit"
							>
								<div class="column title has-text-left">
									{{ $t('deposit.description') }}
								</div>
								<c-input
									v-model="moneyDeposit"
									:placeholder="$t('deposit.money')"
									type="number"
									icon="fa-dollar-sign"
								>
								</c-input>
							</div>
							<div
								v-if="!has_button_payment && deposit_method_selected === 'blockchain'"
								class="message-deposit"
							>
								<p v-if="directDeposit" class="deposit-direct-text">{{ deposit_direct_text }}</p>
								<div v-else>
									<div class="column title has-text-left">
										{{ $t('deposit.description_dollar') }}
									</div>
									<c-input
										v-model="moneyDeposit"
										:placeholder="$t('deposit.money')"
										type="number"
										icon="fa-dollar-sign"
									>
									</c-input>
								</div>
								<div class="columns">
									<div
										v-for="deposit_blockchain in deposit_blockchains"
										:key="deposit_blockchain.currency"
										class="column"
										@click="deposit_blockchain_currency = deposit_blockchain"
									>
										<div
											class="card card-blockchain"
											:class="{
												'blockchain-selected':
													deposit_blockchain_currency === deposit_blockchain,
											}"
										>
											<div class="media">
												<div class="media-content">
													<b-image :src="deposit_blockchain.image" ratio="1by1"></b-image>
													<h3>{{ deposit_blockchain.name }}</h3>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div v-if="has_button_payment && deposit_method_selected === 'paypal'">
								<p v-if="directDeposit" class="deposit-direct-text">{{ deposit_direct_text }}</p>
								<div
									ref="paypal-button-container"
									id="paypal-button-container"
									class="container-pay"
								></div>
							</div>
							<div
								v-if="has_button_payment && deposit_method_selected === 'stripe'"
								class="container-pay"
							>
								<b-loading active></b-loading>
							</div>
							<div
								v-if="has_button_payment && deposit_method_selected === 'blockchain'"
								class="container-pay"
							>
								<b-loading active></b-loading>
							</div>
						</b-step-item>

						<b-step-item step="4" :label="$t('deposit.step_4')" :clickable="false">
							<div class="message-deposit">
								<div class="column title has-text-left">
									{{ $t('deposit.completed_description') }}
								</div>
							</div>
						</b-step-item>

						<template #navigation="{ previous, next }">
							<b-button
								v-if="DepositStep === 1 || (DepositStep === 2 && !has_button_payment && !directDeposit)"
								outlined
								type="is-primary"
								icon-pack="fas"
								icon-left="chevron-left"
								@click.prevent="previous.action"
							>
								{{ $t('helper.prev') }}
							</b-button>
							<b-button
								v-if="DepositStep === 0 || DepositStep === 1"
								outlined
								type="is-primary"
								icon-pack="fas"
								icon-right="chevron-right"
								@click.prevent="next.action()"
							>
								{{ $t('helper.next') }}
							</b-button>
							<b-button
								v-if="DepositStep === 2 && !has_button_payment"
								outlined
								type="is-primary"
								icon-pack="fas"
								icon-right="dollar-sign"
								@click.prevent="to_pay()"
							>
								{{ $t('helper.to_pay') }}
							</b-button>
							<b-button
								v-if="DepositStep === 3"
								outlined
								type="is-primary"
								icon-pack="fas"
								icon-right="check"
								@click.prevent="isOpenDepositModal = false"
							>
								{{ $t('helper.finish') }}
							</b-button>
						</template>
					</b-steps>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import PageChildBase from '../../utils/page_child_base.utils';
import { Component } from 'vue-property-decorator';
import { IMembership, IBalanceDetail } from '../../store';

@Component
export default class Home extends PageChildBase {
	private memberships_data: IMembership[] = [];
	private tabMembershipActive: number = 0;
	private moneyMembershipActive: number = 0;
	private moneyMembershipMin: number = 0;
	private balance_detail_data: IBalanceDetail = null as any;

	private DepositStep: number = 0;
	private has_button_payment: boolean = false;
	private deposit_memberships: {
		id: string;
		name: string;
		description: string;
		months: number;
		min_money: number;
		interest: string;
		suscriptionId: string;
		investment: number;
	}[] = [];
	private deposit_membership_selected: string = '';
	private deposit_methods: string[] = ['balance', 'paypal', 'stripe', 'blockchain'];
	private deposit_method_selected: string = 'balance';
	private deposit_blockchains: { name: string; currency: string; image: string }[] =
		this.store.util.deposit_blockchains;
	private deposit_blockchain_currency: { name: string; currency: string; image: string } =
		this.deposit_blockchains[0];
	private moneyDeposit: number = 0;
	private moneyDepositAvailable: number = 0;

	public async created() {
		await super.created();
		await this.get_memberships();
		this.load_form_api(await this.store.api.balance_detail({ id: '' }), async (data: IBalanceDetail) => {
			this.balance_detail_data = data;
			if (this.balance_detail_data.available_balance) {
				this.deposit_methods = ['balance', 'paypal', 'stripe', 'blockchain'];
				this.deposit_method_selected = 'balance';
			} else {
				this.deposit_methods = ['paypal', 'stripe', 'blockchain'];
				this.deposit_method_selected = 'paypal';
			}
			this.DepositStep = 0;
			this.moneyDeposit = 0;
			this.moneyDepositAvailable = parseFloat(this.balance_detail_data.available_balance.toFixed(2));
			this.deposit_memberships = this.memberships_data.map(m => {
				const suscription = this.balance_detail_data.suscriptions.find(s => s.membershipId === m.id);
				return {
					id: m.id,
					name: m.name,
					months: m.months,
					money_a: m.money_a,
					money_b: m.money_b,
					min_money: suscription?.id ? 100 : m.money_a,
					interest: (m.interest * 100).toFixed(1),
					suscriptionId: suscription?.id || '',
					investment: suscription?.investment || 0,
					description: this.$i18n.locale === 'en' ? m.description_en : m.description_es,
				};
			});
			console.log(this.deposit_memberships);
			this.has_button_payment = false;
			await this.sleep(250);
		});
	}

	private async get_memberships() {
		this.load_form_api(await this.store.api.memberships(), (memberships_data: IMembership[]) => {
			this.memberships_data = memberships_data;
			this.tabMembershipActive = Math.floor(this.memberships_data.length / 2);
			if (this.memberships_data[this.tabMembershipActive]) {
				this.moneyMembershipActive = this.memberships_data[this.tabMembershipActive].money_a;
				this.moneyMembershipMin = this.memberships_data[this.tabMembershipActive].money_a;
			}
		});
	}

	private get_name_membership(id: string) {
		const membership = this.deposit_memberships.find(s => s.id === id);
		return membership ? membership.name + ' ' + membership.interest + '%' : '---';
	}
}
</script>

<style lang="scss">
@import '../../styles/initial_variables.scss';

.buy-more {
	height: calc(100vh - 6rem);
	overflow-y: scroll;
	padding-right: 1rem;

	@include mobile {
		padding-right: 0.5rem !important;
	}

	.body {
		padding-top: 0.5rem;
		position: relative;

		.box {
			background-color: $box;
			width: 90%;
			border-radius: 24px;
			margin: auto;

			@include mobile {
				width: 100%;
				border-radius: 0;
			}

			.title {
				font-size: 28px;
				padding-bottom: 2rem;
				color: white !important;
			}

			.title.title-thanks {
				font-size: 24px;
				padding-bottom: 2rem;
				color: white !important;
			}

			.image-thank {
				img {
					height: 40vh;

					@include mobile {
						height: 100%;
					}
				}
			}

			.subtitle {
				font-size: 18px;
				padding-bottom: 1rem;
				margin-bottom: 0;
				color: white !important;
			}

			.step-title {
				font-size: 20px;
				padding-top: 0.5rem;
				padding-bottom: 1rem;
				margin-bottom: 0;
				color: white !important;
			}

			.step-marker {
				background: $border !important;
				&:not(.is-active),
				&.is-previous {
					border-color: #458ff6 !important;
					color: #458ff6 !important;
				}
			}

			.b-radio.radio input[type='radio'] + .check {
				border-color: white !important;
			}

			.b-radio.radio input[type='radio']:checked + .check {
				&:before {
					background-color: white !important;
				}
			}

			.prices {
				.box-membership {
					cursor: auto;
					display: inline-block;
					height: 100%;
					border: none !important;
					background-image: linear-gradient(150deg, #611bf7, #8b61e4) !important;
					color: white !important;
					padding: 3rem 2rem;
					margin: 2rem;
					border-radius: 10%;

					&.box-suscription {
						background-image: linear-gradient(150deg, #0712e0, #6466f9) !important;
					}

					.title {
						font-size: 1.5rem;
						color: white !important;
					}

					.button-add {
						background: transparent;
						color: white;

						&:hover {
							background-color: rgba(0, 0, 0, 0.05);
						}

						&:focus {
							background-color: rgba(0, 0, 0, 0.25);
							box-shadow: none;
							border-color: white;
						}
					}
				}
			}

			.deposit-box {
				&:first-child {
					margin-top: 3rem;
				}

				&:last-child {
					margin-bottom: 3rem;
				}

				.columns-deposit {
					width: 60%;
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

			.message-deposit,
			.container-pay {
				padding: 4rem 0;
				margin: auto;

				@include tablet {
					width: 60%;
				}

				.button-money {
					padding: 1rem 2rem;
				}

				.card-blockchain {
					height: 100%;
					width: 80%;

					&.blockchain-selected {
						background-color: $selected;
					}

					.b-image-wrapper img {
						margin: auto;
						height: 60%;
						width: 60%;
					}
				}
			}
		}
	}
}
</style>
