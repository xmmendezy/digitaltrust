<template>
	<div class="donations">
		<div class="body has-text-centered">
			<div class="box is-inline-block">
				<p class="title has-text-left">
					{{ L('donations.title') }}
				</p>
				<p class="subtitle has-text-left">
					{{ L('donations.subtitle') }}
				</p>
				<b-steps v-model="DepositStep">
					<b-step-item step="1" :label="L('donations.step_1')" :clickable="false">
						<div v-for="deposit_method in deposit_methods" :key="deposit_method" class="deposit-box">
							<div class="columns columns-deposit">
								<div
									class="column title has-text-left"
									@click="deposit_method_selected = deposit_method"
								>
									{{ L(`payment_method.${deposit_method}`) }}
								</div>
								<div class="column is-1">
									<b-radio v-model="deposit_method_selected" :native-value="deposit_method"></b-radio>
								</div>
							</div>
						</div>
					</b-step-item>

					<b-step-item
						step="2"
						:label="L(!has_button_payment ? 'donations.step_2' : 'donations.to_pay')"
						:clickable="false"
					>
						<div
							v-if="!has_button_payment && deposit_method_selected !== 'blockchain'"
							class="message-deposit"
						>
							<div class="column title has-text-left">
								{{ L('donations.description') }}
							</div>
							<div class="buttons">
								<button
									v-for="money_option in [10, 25, 50, 100, 150, 225, 250, 300, 350, 400, 500]"
									:key="money_option"
									@click="moneyDonation = money_option"
									class="button button-money"
									:class="{
										'is-primary': moneyDonation === money_option,
									}"
								>
									<h3>${{ money_option }}</h3>
								</button>
							</div>
						</div>
						<div
							v-if="!has_button_payment && deposit_method_selected === 'blockchain'"
							class="message-deposit"
						>
							<div class="column title has-text-left">
								{{ L('donations.description_dollar') }}
							</div>
							<div class="buttons">
								<button
									v-for="money_option in [100, 150, 225, 250, 300, 350, 400, 500]"
									:key="money_option"
									@click="moneyDonation = money_option"
									class="button button-money"
									:class="{
										'is-primary': moneyDonation === money_option,
									}"
								>
									<h3>${{ money_option }}</h3>
								</button>
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
											'blockchain-selected': deposit_blockchain_currency === deposit_blockchain,
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
						<div
							v-if="has_button_payment && deposit_method_selected === 'paypal'"
							ref="paypal-button-container"
							id="paypal-button-container"
							class="container-pay"
						></div>
						<div v-if="has_button_payment && deposit_method_selected === 'stripe'" class="container-pay">
							<b-loading active></b-loading>
						</div>
						<div
							v-if="has_button_payment && deposit_method_selected === 'blockchain'"
							class="container-pay"
						>
							<b-loading active></b-loading>
						</div>
					</b-step-item>

					<b-step-item step="3" :label="L('donations.step_3')" :clickable="false">
						<div class="message-deposit">
							<div class="columns">
								<div class="column">
									<b-image
										class="image-thank"
										:src="require('../assets/images/image6.png')"
									></b-image>
								</div>
								<div class="column">
									<div v-for="i in [0, 1, 2]" :key="i" class="title title-thanks has-text-center">
										{{ L(`donations.completed_description.${i}`) }}
									</div>
								</div>
							</div>
						</div>
					</b-step-item>

					<template #navigation="{ previous, next }">
						<b-button
							v-if="DepositStep === 1 && !has_button_payment"
							outlined
							type="is-primary"
							icon-pack="fas"
							icon-left="chevron-left"
							@click.prevent="previous.action"
						>
							{{ L('helper.prev') }}
						</b-button>
						<b-button
							v-if="DepositStep === 0"
							outlined
							type="is-primary"
							icon-pack="fas"
							icon-right="chevron-right"
							@click.prevent="next.action"
						>
							{{ L('helper.next') }}
						</b-button>
						<b-button
							v-if="DepositStep === 1 && !has_button_payment"
							outlined
							type="is-primary"
							icon-pack="fas"
							icon-right="dollar-sign"
							@click.prevent="to_pay()"
						>
							{{ L('donations.to_pay') }}
						</b-button>
						<b-button
							v-if="DepositStep === 2"
							tag="a"
							outlined
							type="is-primary"
							icon-pack="fas"
							icon-right="check"
							href="/"
						>
							{{ L('helper.finish') }}
						</b-button>
					</template>
				</b-steps>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import PageChildBase from '../utils/page_child_base.utils';
import { Component } from 'vue-property-decorator';
import { loadScript, PayPalNamespace } from '@paypal/paypal-js';
import { loadStripe } from '@stripe/stripe-js';

@Component
export default class Donations extends PageChildBase {
	private DepositStep: number = 0;
	private has_button_payment: boolean = false;
	private stripe_button_disabled: boolean = false;
	private stripe_client_secret: string = '';
	private deposit_suscription: {
		name: string;
		months: number;
		min_money: number;
		interest: string;
		membershipId: string;
		suscriptionId: string;
		investment: number;
	}[] = [];
	private deposit_membership_selected: string = '';
	private deposit_methods: string[] = ['paypal', 'stripe', 'blockchain'];
	private deposit_method_selected: string = 'paypal';
	private deposit_blockchains: { name: string; currency: string; image: string }[] =
		this.store.util.deposit_blockchains;
	private deposit_blockchain_currency: { name: string; currency: string; image: string } =
		this.deposit_blockchains[0];
	private moneyDonation: number = 100;

	public async created() {
		await super.created();
		if ('step' in this.$route.query) {
			this.DepositStep = parseInt(this.$route.query.step as string);
		}
	}

	private async to_pay() {
		if (this.deposit_method_selected === 'paypal') {
			loadScript({ 'client-id': this.store.util.PayPal.client_id || '' })
				.then((paypal: PayPalNamespace | null) => {
					this.has_button_payment = true;
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
														value: this.moneyDonation.toString(),
													},
												},
											],
										});
									},
									onApprove: async (data, _) => {
										_;
										this.DepositStep = 3;
									},
								})
								.render('#paypal-button-container');
						} else {
							this.toastError(this.L('error.e000'));
						}
					});
				})
				.catch(() => {
					this.toastError(this.L('error.e000'));
				});
		} else if (this.deposit_method_selected === 'stripe') {
			this.has_button_payment = true;
			this.load_form_api(
				await this.store.api.get_stripe_donation({
					money: this.moneyDonation,
				}),
				session => {
					loadStripe(this.store.util.Stripe.public_key)
						.then(stripe => {
							if (stripe) {
								stripe
									.redirectToCheckout({
										sessionId: session.id,
									})
									.then(result => {
										if (result.error) {
											this.toastError(this.L('error.e000'));
										}
									});
							}
						})
						.catch(() => {
							this.toastError(this.L('error.e000'));
						});
				},
			);
		} else if (this.deposit_method_selected === 'blockchain') {
			if (this.moneyDonation < 100) {
				this.moneyDonation = 100;
			}
			this.has_button_payment = true;
			this.load_form_api(
				await this.store.api.get_coinpayments_donation({
					money: this.moneyDonation,
					currency: this.deposit_blockchain_currency.currency,
				}),
				data => {
					this.has_button_payment = false;
					window.open(data.checkout_url, '_blank');
					this.DepositStep = 3;
				},
			);
		}
	}
}
</script>

<style lang="scss">
@import '../styles/initial_variables.scss';

.donations {
	.body {
		padding-top: 4.5rem;
		height: 100vh;
		position: relative;

		.box {
			width: 80%;
			border-radius: 24px;
			margin: 0;
			position: absolute;
			top: 50%;
			left: 50%;
			-ms-transform: translate(-50%, -50%);
			transform: translate(-50%, -50%);
			transition: width 150ms ease-out;

			@include until-widescreen {
				width: 60%;
			}

			@include mobile {
				width: 100%;
				border-radius: 0;
				padding-top: 20rem;
			}

			.title {
				font-size: 28px;
				padding-bottom: 2rem;
			}

			.title.title-thanks {
				font-size: 24px;
				padding-bottom: 2rem;
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
			}

			.step-title {
				font-size: 20px;
				padding-top: 0.5rem;
				padding-bottom: 1rem;
				margin-bottom: 0;
				color: $black;
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
				border-top: 1px solid $border;

				&:first-child {
					margin-top: 3rem;
				}

				&:last-child {
					margin-bottom: 3rem;
					border-bottom: 1px solid $border;
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
