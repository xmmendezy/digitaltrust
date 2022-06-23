<template>
	<div class="buy-more">
		<div class="body">
			<div class="box">
				<div class="card-content">
					<p class="title has-text-left">
						{{ $t('deposit.title') }}
					</p>
					<p class="subtitle has-text-left" id="driver-guide-a-2">
						{{ $t('deposit.subtitle') }}
					</p>
					<div v-if="directDeposit">
						<p class="deposit-direct-text">{{ deposit_direct_text }}</p>
						<div v-if="paypal_payment">
							<div ref="paypal-button-container" id="paypal-button-container" class="container-pay"></div>
						</div>
						<div v-if="deposit_method_selected === 'blockchain'" class="blockchain-direct-container">
							<div class="columns blockchain-direct">
								<div class="column" style="margin: auto">
									<p style="margin: auto; color: white">Blockchain coin</p>
								</div>
								<div class="column">
									<b-dropdown v-model="deposit_blockchain_currency" class="dropdown-buy">
										<template #trigger>
											<b-button
												:label="deposit_blockchain_currency.name"
												type="is-gosht"
												icon-pack="fab"
												icon-left="btc"
												icon-right="chevron-down"
												style="margin: auto"
											/>
										</template>

										<b-dropdown-item
											v-for="deposit_blockchain in deposit_blockchains"
											:key="deposit_blockchain.currency"
											:value="deposit_blockchain"
										>
											<h3>{{ deposit_blockchain.name }}</h3>
										</b-dropdown-item>
									</b-dropdown>
								</div>
							</div>

							<b-button
								outlined
								type="is-white"
								icon-pack="fas"
								icon-right="shopping-cart"
								@click="to_pay()"
							>
								{{ $t('helper.to_pay') }}
							</b-button>
						</div>
					</div>
					<div v-else>
						<div v-if="paypal_payment">
							<div ref="paypal-button-container" id="paypal-button-container" class="container-pay"></div>
						</div>

						<div v-else class="buttons is-centered prices">
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
										{{ membership.suscriptionId ? ' &#9733; ' : '' }}
										{{ get_name_membership(membership.id) }}
									</p>
								</b-tooltip>

								<div>
									<b-button
										v-if="deposit_membership_selected !== membership.id"
										class="is-circular button-add"
										icon-right="plus"
										@click="change_membership(membership)"
									/>
								</div>

								<div v-if="deposit_membership_selected === membership.id">
									<b-numberinput
										type="is-white"
										v-model="moneyDeposit"
										controls-alignment="right"
										controls-position="compact"
										expanded
										:step="100"
										:min="minMoneyDeposit"
										:max="maxMoneyDeposit"
										:key="inputKey"
										:exponential="false"
									></b-numberinput>

									<div class="columns">
										<div class="column" style="margin: auto">
											<p style="margin: auto">
												{{ $t('deposit.step_2') }}
											</p>
										</div>
										<div class="column">
											<b-dropdown
												v-model="deposit_method_selected"
												@change="v => change_payment_method(v, membership)"
												class="dropdown-buy"
											>
												<template #trigger>
													<b-button
														:label="$t(`payment_method.${deposit_method_selected}`)"
														type="is-gosht"
														:icon-pack="
															$t(`payment_method_icon.${deposit_method_selected}.0`)
														"
														:icon-left="
															$t(`payment_method_icon.${deposit_method_selected}.1`)
														"
														icon-right="chevron-down"
														style="margin: auto"
													/>
												</template>

												<b-dropdown-item
													v-for="deposit_method in deposit_methods"
													:key="deposit_method"
													:value="deposit_method"
												>
													<div class="media">
														<b-icon
															class="media-left"
															:pack="$t(`payment_method_icon.${deposit_method}.0`)"
															:icon="$t(`payment_method_icon.${deposit_method}.1`)"
														></b-icon>
														<div class="media-content">
															<h3>{{ $t(`payment_method.${deposit_method}`) }}</h3>
														</div>
													</div>
												</b-dropdown-item>
											</b-dropdown>
										</div>
									</div>

									<div v-if="deposit_method_selected === 'blockchain'" class="columns">
										<div class="column" style="margin: auto">
											<p style="margin: auto">Blockchain coin</p>
										</div>
										<div class="column">
											<b-dropdown v-model="deposit_blockchain_currency" class="dropdown-buy">
												<template #trigger>
													<b-button
														:label="deposit_blockchain_currency.name"
														type="is-gosht"
														icon-pack="fab"
														icon-left="btc"
														icon-right="chevron-down"
														style="margin: auto"
													/>
												</template>

												<b-dropdown-item
													v-for="deposit_blockchain in deposit_blockchains"
													:key="deposit_blockchain.currency"
													:value="deposit_blockchain"
												>
													<h3>{{ deposit_blockchain.name }}</h3>
												</b-dropdown-item>
											</b-dropdown>
										</div>
									</div>

									<b-button
										v-if="moneyDeposit >= minMoneyDeposit && moneyDeposit <= maxMoneyDeposit"
										outlined
										type="is-white"
										icon-pack="fas"
										icon-right="shopping-cart"
										@click="to_pay()"
									>
										{{ $t('helper.to_pay') }}
									</b-button>
								</div>
							</div>
						</div>
					</div>
				</div>

				<b-loading is-full-page v-model="isLoading"></b-loading>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import PageChildBase from '../../utils/page_child_base.utils';
import { Component } from 'vue-property-decorator';
import { IMembership, IBalanceDetail } from '../../store';
import { loadScript, PayPalNamespace } from '@paypal/paypal-js';
import { loadStripe } from '@stripe/stripe-js';

interface MembershipOption {
	id: string;
	name: string;
	description: string;
	months: number;
	min_money: number;
	max_money: number;
	interest: string;
	suscriptionId: string;
	investment: number;
}

@Component
export default class BuyMore extends PageChildBase {
	public memberships_data: IMembership[] = [];
	public balance_detail_data: IBalanceDetail = null as any;

	public deposit_memberships: MembershipOption[] = [];
	public deposit_membership_selected: string = '';
	public deposit_methods: string[] = ['balance', 'paypal', 'stripe', 'blockchain', 'coinbase'];
	public deposit_method_selected: string = 'balance';
	public deposit_blockchains: { name: string; currency: string; coingecko: string; image: string }[] =
		this.store.util.deposit_blockchains;
	public deposit_blockchain_currency: { name: string; currency: string; image: string } = this.deposit_blockchains[0];
	public minMoneyDeposit: number = 0;
	public maxMoneyDeposit: number = 0;
	public moneyDeposit: number = 0;
	public moneyDepositAvailable: number = 0;

	public inputKey: number = 0;
	public paypal_payment: boolean = false;
	public isLoading: boolean = false;

	public directDeposit: boolean = false;
	public deposit_direct_text: string = '';

	public async created() {
		await super.created();
		await this.get_memberships();
		await this.prepareView();
		this.$watch(
			'moneyDeposit',
			() => {
				if (!this.directDeposit) {
					if (this.moneyDeposit > this.maxMoneyDeposit) {
						this.moneyDeposit = this.maxMoneyDeposit;
						this.inputKey++;
					} else if (this.moneyDeposit < this.minMoneyDeposit) {
						this.moneyDeposit = this.minMoneyDeposit;
						this.inputKey++;
					}
				}
			},
			{ immediate: true },
		);
		const reference_coinpayments = localStorage.getItem('reference_coinpayments');
		if ('success_stripe' in this.$route.query || reference_coinpayments) {
			if ('success_stripe' in this.$route.query) {
				const reference_stripe = localStorage.getItem('reference_stripe');
				if (this.$route.query.success_stripe === 'true' && reference_stripe) {
					localStorage.removeItem('reference_stripe');
					this.load_form_api(
						await this.store.api.process_deposit({
							type: this.$route.query.type as string,
							membershipId: this.$route.query.membershipId as string,
							suscriptionId: this.$route.query.suscriptionId as string,
							money: parseFloat(this.$route.query.money as string),
							reference: reference_stripe,
						}),
						d => {
							if (d.valid) {
								this.prepareView();
								this.toastSuccess(this.$t('deposit.success'));
							} else {
								this.toastError(this.$t('deposit.error'));
							}
						},
					);
				} else {
					this.toastError(this.$t('deposit.error'));
				}
			}
			if (reference_coinpayments) {
				const query_coinpayments = async (callback: () => void, c: number = 0) => {
					await this.sleep(5000);
					if (c < 1000) {
						const result = await this.store.api.status_coinpayments({ txid: reference_coinpayments });
						if (result.status_text === 'Complete') {
							callback();
						} else {
							query_coinpayments(callback, c + 1);
						}
					}
				};
				query_coinpayments(async () => {
					const data_coinpayments = JSON.parse(localStorage.getItem('data_coinpayments') || '{}');
					this.load_form_api(await this.store.api.process_deposit(data_coinpayments), d => {
						if (d.valid) {
							localStorage.removeItem('reference_coinpayments');
							localStorage.removeItem('data_coinpayments');
							this.prepareView();
							this.toastSuccess(this.$t('deposit.success'));
						} else {
							this.toastError(this.$t('deposit.error'));
						}
					});
				});
			}
		}

		if ('directDeposit' in this.$route.query) {
			this.directDeposit = true;
			this.moneyDeposit = parseFloat(this.$route.query.money as string);
			this.deposit_method_selected = this.$route.query.method as string;
			this.deposit_membership_selected = this.$route.query.membership as string;
			this.load_form_api(await this.store.api.balance_detail({ id: '' }), (data: IBalanceDetail) => {
				this.balance_detail_data = data;
				this.paypal_payment = false;
				this.deposit_memberships = this.memberships_data.map(m => {
					const suscription = this.balance_detail_data.suscriptions.find(s => s.membershipId === m.id);
					return {
						id: m.id,
						name: m.name,
						months: m.months,
						min_money: suscription?.id ? 100 : m.money_a,
						max_money: m.money_b,
						interest: (m.interest * 100).toFixed(1),
						suscriptionId: suscription?.id || '',
						investment: suscription?.investment || 0,
						description: this.$i18n.locale === 'en' ? m.description_en : m.description_es,
					};
				});
				this.deposit_direct_text = `${this.$tc(
					'deposit.deposit_direct_text.a',
					this.formatMoney(this.moneyDeposit) as any,
				)} ${this.$tc(
					'deposit.deposit_direct_text.b',
					this.get_name_membership(this.deposit_membership_selected) as any,
				)}`;
				if (this.deposit_method_selected !== 'blockchain') {
					this.to_pay();
				}
			});
		}
	}

	public async prepareView() {
		this.load_form_api(await this.store.api.balance_detail({ id: '' }), async (data: IBalanceDetail) => {
			this.balance_detail_data = data;
			this.paypal_payment = false;
			this.minMoneyDeposit = 0;
			this.maxMoneyDeposit = 0;
			this.moneyDeposit = 0;
			this.deposit_membership_selected = '';
			this.moneyDepositAvailable = parseFloat(this.balance_detail_data.available_balance.toFixed(2));
			if (this.moneyDepositAvailable) {
				if (this.auth_data.user?.trading) {
					this.deposit_methods = ['balance', 'coinbase'];
				} else {
					this.deposit_methods = ['balance', 'paypal', 'stripe', 'blockchain'];
				}
				this.deposit_method_selected = 'balance';
			} else {
				if (this.auth_data.user?.trading) {
					this.deposit_methods = ['coinbase'];
					this.deposit_method_selected = 'coinbase';
				} else {
					this.deposit_methods = ['paypal', 'stripe', 'blockchain'];
					this.deposit_method_selected = 'paypal';
				}
			}
			this.deposit_memberships = this.memberships_data.map(m => {
				const suscription = this.balance_detail_data.suscriptions.find(s => s.membershipId === m.id);
				return {
					id: m.id,
					name: m.name,
					months: m.months,
					min_money: suscription?.id ? 100 : m.money_a,
					max_money: m.money_b,
					interest: (m.interest * 100).toFixed(2),
					suscriptionId: suscription?.id || '',
					investment: suscription?.investment || 0,
					description: this.$i18n.locale === 'en' ? m.description_en : m.description_es,
				};
			});
			await this.sleep(250);
		});
	}

	public async get_memberships() {
		this.load_form_api(await this.store.api.memberships(), (memberships_data: IMembership[]) => {
			this.memberships_data = memberships_data;
		});
	}

	public get_name_membership(id: string) {
		const membership = this.deposit_memberships.find(s => s.id === id);
		return membership ? membership.name + ' (' + membership.interest + '%)' : '---';
	}

	public change_membership(membership: MembershipOption) {
		this.moneyDeposit = membership.min_money;
		this.minMoneyDeposit = membership.min_money;
		this.maxMoneyDeposit = membership.max_money;
		this.deposit_membership_selected = membership.id;
		if (this.moneyDepositAvailable > this.minMoneyDeposit) {
			if (this.moneyDepositAvailable > this.maxMoneyDeposit) {
				this.maxMoneyDeposit = membership.max_money;
			} else {
				this.maxMoneyDeposit = this.moneyDepositAvailable;
			}
			if (this.auth_data.user?.trading) {
				this.deposit_methods = ['balance', 'coinbase'];
			} else {
				this.deposit_methods = ['balance', 'paypal', 'stripe', 'blockchain'];
			}
			this.deposit_method_selected = 'balance';
		} else {
			if (this.auth_data.user?.trading) {
				this.deposit_methods = ['coinbase'];
				this.deposit_method_selected = 'coinbase';
			} else {
				this.deposit_methods = ['paypal', 'stripe', 'blockchain'];
				this.deposit_method_selected = 'paypal';
			}
		}
	}

	public change_payment_method(payment_method: string, membership: MembershipOption) {
		if (payment_method === 'balance') {
			if (this.moneyDepositAvailable > this.maxMoneyDeposit) {
				this.maxMoneyDeposit = membership.max_money;
			} else {
				this.maxMoneyDeposit = this.moneyDepositAvailable;
			}
			if (this.moneyDeposit > this.maxMoneyDeposit) {
				this.moneyDeposit = this.maxMoneyDeposit;
			}
		} else {
			this.maxMoneyDeposit = membership.max_money;
		}
	}

	public async to_pay() {
		if (this.deposit_method_selected === 'balance') {
			await this.proccess_deposit();
		} else if (this.deposit_method_selected === 'paypal') {
			loadScript({ 'client-id': this.store.util.PayPal.client_id || '' })
				.then((paypal: PayPalNamespace | null) => {
					this.paypal_payment = true;
					this.exec_is_render('paypal-button-container', () => {
						if (paypal && paypal.Buttons) {
							paypal
								.Buttons({
									createOrder: (_, actions) => {
										_;
										return actions.order.create({
											purchase_units: [
												{
													amount: {
														value: this.moneyDeposit.toString(),
													},
												},
											],
										});
									},
									onApprove: async (data, _) => {
										_;
										await this.proccess_deposit(data.orderID);
									},
								})
								.render('#paypal-button-container');
						} else {
							this.toastError(this.$t('error.e000'));
						}
					});
				})
				.catch(() => {
					this.toastError(this.$t('error.e000'));
				});
		} else if (this.deposit_method_selected === 'stripe') {
			this.load_form_api(
				await this.store.api.get_stripe({
					type: this.deposit_method_selected,
					membershipId: this.deposit_membership_selected,
					suscriptionId: this.balance_detail_data.suscriptions.find(
						s => s.membershipId === this.deposit_membership_selected,
					)?.id,
					money: this.moneyDeposit,
				}),
				session => {
					localStorage.setItem('reference_stripe', session.reference);
					loadStripe(this.store.util.Stripe.public_key)
						.then(stripe => {
							if (stripe) {
								stripe
									.redirectToCheckout({
										sessionId: session.id,
									})
									.then(result => {
										if (result.error) {
											this.toastError(this.$t('error.e000'));
										}
									});
							}
						})
						.catch(() => {
							this.toastError(this.$t('error.e000'));
						});
				},
			);
		} else if (this.deposit_method_selected === 'blockchain') {
			const reference_coinpayments = localStorage.getItem('reference_coinpayments');
			if (reference_coinpayments) {
				this.$buefy.dialog.confirm({
					message: this.$t('deposit.has_blockchain') as string,
					onConfirm: this.process_blockchain,
					onCancel: () => {
						this.prepareView();
					},
				});
			} else {
				this.process_blockchain();
			}
		} else if (this.deposit_method_selected === 'coinbase') {
			this.process_coinbase();
		}
	}

	public async proccess_deposit(reference: string = 'default') {
		this.isLoading = true;
		this.load_form_api(
			await this.store.api.process_deposit({
				type: this.deposit_method_selected,
				membershipId: this.deposit_membership_selected,
				suscriptionId: this.balance_detail_data.suscriptions.find(
					s => s.membershipId === this.deposit_membership_selected,
				)?.id,
				money: this.moneyDeposit,
				reference,
			}),
			d => {
				this.isLoading = false;
				if (d.valid) {
					this.paypal_payment = false;
					this.directDeposit = false;
					this.prepareView();
					this.toastSuccess(this.$t('deposit.success'));
				} else {
					this.toastError(this.$t('deposit.error'));
				}
			},
		);
	}

	public async process_blockchain() {
		this.load_form_api(
			await this.store.api.get_coinpayments({
				type: this.deposit_method_selected,
				membershipId: this.deposit_membership_selected,
				suscriptionId: this.balance_detail_data.suscriptions.find(
					s => s.membershipId === this.deposit_membership_selected,
				)?.id,
				money: this.moneyDeposit,
				currency: this.deposit_blockchain_currency.currency,
			}),
			data => {
				const data_coinpayments = {
					type: this.deposit_method_selected,
					membershipId: this.deposit_membership_selected,
					suscriptionId: this.balance_detail_data.suscriptions.find(
						s => s.membershipId === this.deposit_membership_selected,
					)?.id,
					money: this.moneyDeposit,
					reference: data.txn_id,
				};
				localStorage.setItem('reference_coinpayments', data.txn_id);
				localStorage.setItem('data_coinpayments', JSON.stringify(data_coinpayments));
				window.open(data.checkout_url, '_blank');
				const query_coinpayments = async (callback: () => void, c: number = 0) => {
					await this.sleep(5000);
					if (c < 1000) {
						const result = await this.store.api.status_coinpayments({ txid: data.txn_id });
						if (result.status_text === 'Complete') {
							callback();
						} else {
							query_coinpayments(callback, c + 1);
						}
					}
				};
				query_coinpayments(async () => {
					this.load_form_api(await this.store.api.process_deposit(data_coinpayments), d => {
						if (d.valid) {
							localStorage.removeItem('reference_coinpayments');
							localStorage.removeItem('data_coinpayments');
							this.prepareView();
							this.toastSuccess(this.$t('deposit.success'));
						} else {
							this.toastError(this.$t('deposit.error'));
						}
					});
				});
			},
		);
	}

	public async process_coinbase() {
		this.load_form_api(
			await this.store.api.get_coinbase({
				type: this.deposit_method_selected,
				membershipId: this.deposit_membership_selected,
				suscriptionId: this.balance_detail_data.suscriptions.find(
					s => s.membershipId === this.deposit_membership_selected,
				)?.id,
				money: this.moneyDeposit,
				currency: this.deposit_blockchain_currency.currency,
			}),
			data => {
				if (data.url) {
					this.$buefy.dialog.confirm({
						message: this.$t('deposit.has_coinbase') as string,
						onConfirm: () => {
							window.open(data.url, '_blank');
						},
					});
				} else {
					this.$buefy.dialog.confirm({
						message: this.$t('deposit.error_coinbase') as string,
					});
				}
			},
		);
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

			.subtitle {
				font-size: 18px;
				padding-bottom: 1rem;
				margin-bottom: 0;
				color: white !important;
			}

			.prices {
				.box-membership {
					cursor: auto;
					display: inline-block;
					height: 100%;
					min-width: 18rem;
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

					.b-numberinput {
						.button {
							margin-left: 0;
							margin-right: 0;
						}
					}

					.has-numberinput {
						.help.is-danger {
							color: white;
						}
					}
				}
			}

			.dropdown-buy {
				.dropdown-content {
					background-color: white;

					.dropdown-item {
						color: $dark;

						&.is-active {
							background-color: $primary;
							color: white;
						}
					}
				}
			}

			.deposit-direct-text {
				padding: 3rem 0;
				color: white;
			}

			.blockchain-direct-container {
				.blockchain-direct {
					padding: 3rem 0;
					margin: auto;
					width: 50%;

					@include mobile {
						width: 100%;
					}
				}
			}

			.container-pay {
				padding: 4rem 0;
				margin: auto;

				@include tablet {
					width: 60%;
				}
			}
		}
	}
}
</style>
