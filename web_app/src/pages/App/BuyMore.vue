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
						<b-step-item step="1" :label="$t('deposit.step_1')" id="driver-guide-a-2" :clickable="false">
							<div class="buttons">
								<div v-for="d in deposit_suscription" :key="d.id" class="button box-membership">
									<div class="columns has-text-left">
										<div class="column">Hola</div>
										<div class="column is-7">Hola</div>
									</div>
								</div>
							</div>
							<!-- <div v-if="deposit_suscription.length" class="prices">
								<div class="columns">
									<div class="column">
										<div
											class="card"
											:class="{
												'price-selected':
													deposit_membership_selected === deposit_suscription[0].membershipId,
											}"
											@click="
												() => {
													deposit_membership_selected = deposit_suscription[0].membershipId;
													moveNext();
												}
											"
										>
											<p class="price-title title-1">
												{{ deposit_suscription[0].name }}
											</p>
											<div v-if="!deposit_suscription[0].suscriptionId">
												<i class="fas fa-plus-circle"></i>
											</div>
											<ul class="has-text-left has-text-gray">
												<li v-if="deposit_suscription[0].suscriptionId">
													{{
														$tc(
															'deposit.investment_count',
															formatMoney(deposit_suscription[0].investment),
														)
													}}
												</li>
											</ul>
										</div>
									</div>
									<div class="column">
										<div
											class="card"
											:class="{
												'price-selected':
													deposit_membership_selected === deposit_suscription[1].membershipId,
											}"
											@click="
												() => {
													deposit_membership_selected = deposit_suscription[1].membershipId;
													moveNext();
												}
											"
										>
											<p class="price-title title-2">
												{{ deposit_suscription[1].name }}
											</p>
											<div v-if="!deposit_suscription[1].suscriptionId">
												<i class="fas fa-plus-circle"></i>
											</div>
											<ul class="has-text-left has-text-gray">
												<li v-if="deposit_suscription[1].suscriptionId">
													{{
														$tc(
															'deposit.investment_count',
															formatMoney(deposit_suscription[1].investment),
														)
													}}
												</li>
											</ul>
										</div>
									</div>
									<div class="column">
										<div
											class="card"
											:class="{
												'price-selected':
													deposit_membership_selected === deposit_suscription[2].membershipId,
											}"
											@click="
												() => {
													deposit_membership_selected = deposit_suscription[2].membershipId;
													moveNext();
												}
											"
										>
											<p class="price-title title-3">
												{{ deposit_suscription[2].name }}
											</p>
											<div v-if="!deposit_suscription[2].suscriptionId">
												<i class="fas fa-plus-circle"></i>
											</div>
											<ul class="has-text-left has-text-gray">
												<li v-if="deposit_suscription[2].suscriptionId">
													{{
														$tc(
															'deposit.investment_count',
															formatMoney(deposit_suscription[2].investment),
														)
													}}
												</li>
											</ul>
										</div>
									</div>
								</div>
								<div class="columns">
									<div class="column is-2"></div>
									<div class="column">
										<div
											class="card"
											:class="{
												'price-selected':
													deposit_membership_selected === deposit_suscription[3].membershipId,
											}"
											@click="
												() => {
													deposit_membership_selected = deposit_suscription[3].membershipId;
													moveNext();
												}
											"
										>
											<p class="price-title title-4">
												{{ deposit_suscription[3].name }}
											</p>
											<div v-if="!deposit_suscription[3].suscriptionId">
												<i class="fas fa-plus-circle"></i>
											</div>
											<ul class="has-text-left has-text-gray">
												<li v-if="deposit_suscription[3].suscriptionId">
													{{
														$tc(
															'deposit.investment_count',
															formatMoney(deposit_suscription[3].investment),
														)
													}}
												</li>
											</ul>
										</div>
									</div>
									<div class="column">
										<div
											class="card"
											:class="{
												'price-selected':
													deposit_membership_selected === deposit_suscription[4].membershipId,
											}"
											@click="
												() => {
													deposit_membership_selected = deposit_suscription[4].membershipId;
													moveNext();
												}
											"
										>
											<p class="price-title title-4">
												{{ deposit_suscription[4].name }}
											</p>
											<div v-if="!deposit_suscription[4].suscriptionId">
												<i class="fas fa-plus-circle"></i>
											</div>
											<ul class="has-text-left has-text-gray">
												<li v-if="deposit_suscription[4].suscriptionId">
													{{
														$tc(
															'deposit.investment_count',
															formatMoney(deposit_suscription[4].investment),
														)
													}}
												</li>
											</ul>
										</div>
									</div>
									<div class="column is-2"></div>
								</div>
							</div> -->
						</b-step-item>

						<b-step-item step="2" :label="$t('deposit.step_2')" id="driver-guide-a-4" :clickable="false">
							<div v-for="deposit_method in deposit_methods" :key="deposit_method" class="deposit-box">
								<div class="columns columns-deposit">
									<div
										class="column title has-text-left"
										@click="
											() => {
												deposit_method_selected = deposit_method;
												moveNext();
											}
										"
									>
										{{ $t(`payment_method.${deposit_method}`) }}
									</div>
									<div class="column is-1">
										<b-radio
											v-model="deposit_method_selected"
											:native-value="deposit_method"
											@input="moveNext()"
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
									id="driver-guide-a-6"
									v-model="moneyDeposit"
									:placeholder="$t('deposit.money')"
									type="number"
									:max="moneyDepositMax"
									:min="moneyDepositMin"
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
										:max="moneyDepositMax"
										:min="moneyDepositMin"
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
								id="driver-guide-a-3"
								type="is-primary"
								icon-pack="fas"
								icon-right="chevron-right"
								@click.prevent="
									() => {
										next.action();
										moveNext();
									}
								"
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
	private deposit_suscription: {
		name: string;
		description: string;
		months: number;
		min_money: number;
		interest: string;
		membershipId: string;
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
	private moneyDepositMin: number = 200;
	private moneyDepositMax: number = 100000000;

	public async created() {
		await super.created();
		await this.get_memberships();
		this.load_form_api(await this.store.api.balance_detail({ id: '' }), async (data: IBalanceDetail) => {
			this.balance_detail_data = data;
			this.deposit_suscription = this.memberships_data.map(m => {
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
					description: this.$i18n.locale === 'en' ? m.description_en : m.description_es,
				};
			});
			console.log(this.deposit_suscription);
			this.deposit_membership_selected = this.deposit_suscription[1].membershipId;
			if (this.balance_detail_data.available_balance) {
				this.deposit_methods = ['balance', 'paypal', 'stripe', 'blockchain'];
				this.deposit_method_selected = 'balance';
			} else {
				this.deposit_methods = ['paypal', 'stripe', 'blockchain'];
				this.deposit_method_selected = 'paypal';
			}
			this.DepositStep = 0;
			this.moneyDeposit = 0;
			this.moneyDepositMax = parseFloat(this.balance_detail_data.available_balance.toFixed(2));
			this.moneyDepositMin = this.balance_detail_data.suscriptions.find(
				s => s.membershipId === this.deposit_membership_selected,
			)
				? 200
				: this.deposit_suscription[1].min_money;
			if (this.moneyDepositMin > this.moneyDepositMax) {
				this.moneyDepositMax = 100000000;
			}
			this.has_button_payment = false;
			if (this.moveNext) {
				await this.sleep(250);
				this.moveNext();
			}
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

	private moveNext: () => void = () => {
		0;
	};
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
		padding-top: 4.5rem;
		position: relative;

		.box {
			background-color: $box;
			width: 90%;
			border-radius: 24px;
			margin: 0;
			position: absolute;
			top: 50%;
			left: 50%;
			-ms-transform: translate(-50%, -50%);
			transform: translate(-50%, -50%);
			transition: width 150ms ease-out;

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

			.box-membership {
				border: none !important;
				background-image: linear-gradient(150deg, #611bf7, #8b61e4) !important;
				color: white !important;
				padding: 3rem 2rem;
				margin: 2rem;

				.title {
					color: white !important;
				}
			}

			.prices {
				padding-top: 1rem;

				.columns {
					padding-bottom: 1.5rem;
				}

				.card {
					border-radius: 20px;

					&.price-selected {
						background-color: $selected;
					}

					.price-title {
						font-size: 30px;
						font-weight: bold;
						padding-top: 2rem;
						padding-bottom: 2rem;

						&.title-1 {
							color: #cd602e;
						}

						&.title-2 {
							color: #c8c4c1;
						}

						&.title-3 {
							color: #f3e74b;
						}

						&.title-4 {
							color: #74d5e3;
						}
					}

					.fa-plus-circle {
						color: $border;
						font-size: 25px;
					}

					ul {
						list-style: disc outside;
						margin-left: 3rem;
						margin-top: 1rem;
						padding-bottom: 1rem;

						li {
							padding-bottom: 1rem;
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
