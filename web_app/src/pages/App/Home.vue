<template>
	<div class="home tile is-ancestor">
		<div class="tile is-vertical is-parent is-7">
			<article class="box box-1">
				<div class="box-balance">
					<div class="columns has-text-left">
						<div class="column balance-text">{{ L('home.balance_now.a') }}</div>
						<div class="column balance-money is-4">{{ formatMoney(balance_data.balance) }}</div>
					</div>
					<div class="columns has-text-left">
						<div class="column">{{ L('home.balance_now.b') }}</div>
						<div class="column info-money is-4">{{ formatMoney(balance_data.earning) }}</div>
					</div>
					<div class="columns has-text-left">
						<div class="column">{{ L('home.balance_now.c') }}</div>
						<div class="column info-money is-4">{{ formatMoney(balance_data.investment) }}</div>
					</div>
					<div class="columns has-text-left">
						<div class="column">{{ L('home.balance_now.d') }}</div>
						<div class="column info-money is-4">{{ formatMoney(balance_data.withdrawal) }}</div>
					</div>
					<div class="buttons is-hidden-tablet-only is-fullwidth">
						<b-button type="is-primary" @click="balance_now()">
							{{ L('home.balance_now.e') }}
						</b-button>
						<b-button id="driver-guide-b-1" type="is-warning" @click="open_withdrawal()">
							{{ L('home.balance_now.f') }}
						</b-button>
						<b-button
							id="driver-guide-a-1"
							class="is-right"
							type="is-success"
							size="is-large"
							@click="open_deposit()"
						>
							{{ L('home.balance_now.g') }}
						</b-button>
					</div>
					<div class="buttons is-hidden-mobile is-hidden-desktop is-centered">
						<b-button type="is-primary" size="is-small" @click="balance_now()">
							{{ L('home.balance_now.e') }}
						</b-button>
						<b-button id="driver-guide-b-1" type="is-warning" size="is-small" @click="open_withdrawal()">
							{{ L('home.balance_now.f') }}
						</b-button>
						<b-button id="driver-guide-a-1" type="is-success" size="is-small" @click="open_deposit()">
							{{ L('home.balance_now.g') }}
						</b-button>
					</div>
				</div>
			</article>
			<article class="box box-2">
				<b-table
					:data="records_data"
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
						<div class="has-text-left">{{ formatMoney(props.row.earning_extra) }}</div>
					</b-table-column>

					<b-table-column
						field="earning"
						:label="L('home.table_balance.e')"
						header-class="header"
						v-slot="props"
					>
						<div class="has-text-left">{{ formatMoney(props.row.investment) }}</div>
					</b-table-column>

					<b-table-column
						field="month"
						:label="L('home.table_balance.f')"
						header-class="header header-center has-text-right"
						v-slot="props"
					>
						<div class="has-text-right has-text-gray">
							{{ store.api.DateTime.fromFormat(props.row.date, 'yyyy-LL').toFormat('LLL yyyy') }}
						</div>
					</b-table-column>
				</b-table>
			</article>
		</div>
		<div class="tile is-vertical is-parent">
			<article class="box box-3">
				<div class="box-refer">
					<div class="has-text-left">
						<h3 class="title">{{ L('home.refer.a') }}</h3>
						<p>{{ L('home.refer.b') }}</p>
					</div>
					<div class="url-refer">
						<a target="_blank" :href="url_refer">{{ url_refer }}</a>
					</div>
					<div class="has-text-left">
						<h3 class="title-refers">{{ L('home.refer.c') }}</h3>
						<ul class="refer-list">
							<li v-for="refer in refers_data" :key="refer.id">
								<a class="icon-text data-refer">
									<b-image :src="require('../../assets/images/avatar.png')"></b-image>
									<span class="info-refer">
										{{ refer.name }}
									</span>
								</a>
							</li>
						</ul>
					</div>
				</div>
			</article>
			<article class="box box-4">
				<div class="box-membership">
					<div class="has-text-left">
						<h3 class="title">{{ L('home.membership.a') }}</h3>
						<p>{{ L('home.membership.b') }}</p>
					</div>
					<div class="buttons">
						<b-button
							v-for="(membership, i) in memberships_data"
							:key="membership.id"
							:type="tabMembershipActive === i ? 'is-primary' : 'is-text'"
							:outlined="tabMembershipActive === i"
							@click="selectTabMembership(i)"
							>{{ membership.name }}
						</b-button>
					</div>
					<section class="memberships-content has-text-right">
						<c-input
							v-model="moneyMembershipActive"
							:placeholder="L('home.membership.c')"
							type="number"
							:min="moneyMembershipMin"
							icon="fa-dollar-sign"
						>
						</c-input>
						<p class="money-membership is-hidden-touch is-hidden-desktop-only">
							{{ moneyMembership }}
						</p>

						<p class="money-membership is-hidden-widescreen">
							{{ moneyMembership }}
						</p>
						<p class="info-membership">
							{{ L('home.membership.d') }}
						</p>
					</section>
				</div>
			</article>
		</div>

		<b-modal v-model="isOpenSupportPaymentModal" class="model-support-payment" :can-cancel="[]">
			<div class="card">
				<div class="card-content">
					<b-steps v-model="supportPaymentStep">
						<b-step-item step="1" label="Account" :clickable="false">
							<b-image class="image-main" :src="require('../../assets/images/image4.jpg')"></b-image>
							<h1 class="title has-text-centered">{{ L('support_payment.text1.title') }}</h1>
							<p v-for="l in ['a', 'b', 'c']" :key="1 + l" class="subtitle">
								{{ L(`support_payment.text1.${l}`) }}
							</p>
						</b-step-item>

						<b-step-item step="2" label="Profile" :clickable="false">
							<b-image class="image-main" :src="require('../../assets/images/image3.jpg')"></b-image>
							<h1 class="title has-text-centered">{{ L('support_payment.text2.title') }}</h1>
							<div v-if="!has_button_support_payment">
								<p v-for="l in ['a', 'b']" :key="2 + l" class="subtitle">
									{{ L(`support_payment.text2.${l}`) }}
								</p>
								<div
									v-for="support_payment_method in support_payment_methods"
									:key="support_payment_method"
									class="deposit-box"
								>
									<div class="columns columns-deposit">
										<div
											class="column title has-text-left"
											@click="support_payment_method_selected = support_payment_method"
										>
											{{ L(`payment_method.${support_payment_method}`) }}
										</div>
										<div class="column is-1">
											<b-radio
												v-model="support_payment_method_selected"
												:native-value="support_payment_method"
											></b-radio>
										</div>
									</div>
								</div>
							</div>
							<div
								v-if="!has_button_support_payment && support_payment_method_selected === 'blockchain'"
								class="message-deposit"
							>
								<div class="columns">
									<div
										v-for="support_payment_blockchain in support_payment_blockchains"
										:key="support_payment_blockchain.currency"
										class="column"
										@click="support_payment_blockchain_currency = support_payment_blockchain"
									>
										<div
											class="card card-blockchain"
											:class="{
												'blockchain-selected':
													support_payment_blockchain_currency === support_payment_blockchain,
											}"
										>
											<div class="media">
												<div class="media-content">
													<b-image
														:src="support_payment_blockchain.image"
														ratio="1by1"
													></b-image>
													<h3>{{ support_payment_blockchain.name }}</h3>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div
								v-if="has_button_support_payment && support_payment_method_selected === 'paypal'"
								ref="paypal-button-container-support"
								id="paypal-button-container-support"
								class="container-pay"
							></div>
							<div
								v-if="has_button_support_payment && support_payment_method_selected === 'stripe'"
								class="container-pay"
							>
								<b-loading active></b-loading>
							</div>
							<div
								v-if="has_button_support_payment && support_payment_method_selected === 'blockchain'"
								class="container-pay"
							>
								<b-loading active></b-loading>
							</div>
						</b-step-item>

						<template #navigation>
							<b-button
								v-if="supportPaymentStep === 0 && supportPayment"
								type="is-primary"
								icon-pack="fas"
								icon-right="chevron-right"
								@click.prevent="supportPaymentStep = 1"
							>
								{{ L('helper.next') }}
							</b-button>
							<b-button
								v-if="supportPaymentStep === 0 && !supportPayment"
								type="is-primary"
								icon-pack="fas"
								icon-right="check"
								@click.prevent="to_save_see_welcome()"
							>
								{{ L('helper.next') }}
							</b-button>
							<b-button
								v-if="supportPaymentStep === 1"
								type="is-primary"
								icon-pack="fas"
								icon-right="dollar-sign"
								@click.prevent="to_pay_support_payment()"
							>
								{{ L('helper.to_pay') }}
							</b-button>
						</template>
					</b-steps>
				</div>
			</div>
		</b-modal>

		<b-modal v-model="isOpenBalanceDetailModal" :can-cancel="['x', 'escape']" class="model-balance-detail">
			<div class="card">
				<div v-if="balance_detail_data" class="card-content">
					<p class="title has-text-left">
						{{ L('balance.title') }} -
						{{ store.api.DateTime.fromUnix(balance_detail_data.date).toFormat('LLLL yyyy') }}
					</p>
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
											store.api.DateTime.fromUnix(suscription.date_begin).toFormat('dd LLL yyyy')
										}}
									</div>
								</div>
								<div class="columns has-text-left">
									<div class="column">
										{{ L('balance.suscription.c') }}:
										{{ store.api.DateTime.fromUnix(suscription.date_end).toFormat('dd LLL yyyy') }}
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
									{{ store.api.DateTime.fromUnix(props.row.date).toFormat('dd LLL yyyy') }}
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

							<b-table-column
								field="reference"
								:label="L('balance.deposits.e')"
								header-class="header"
								v-slot="props"
							>
								<div class="has-text-left">{{ props.row.reference }}</div>
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
									{{ store.api.DateTime.fromUnix(props.row.date).toFormat('dd LLL yyyy') }}
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

		<b-modal v-model="isOpenWithdrawalModal" :can-cancel="['x', 'escape']" class="model-withdrawal">
			<div class="card">
				<div class="card-content">
					<p class="title has-text-left">
						{{ L('withdrawal.title') }}
					</p>
					<p class="subtitle has-text-left">
						{{ L('withdrawal.subtitle') }}
					</p>
					<b-steps v-model="WithdrawalStep">
						<b-step-item step="1" :label="L('withdrawal.step_1')" id="driver-guide-b-2">
							<div
								v-for="withdrawal_method in withdrawal_methods"
								:key="withdrawal_method"
								class="withdrawal-box"
							>
								<div class="columns columns-withdrawal">
									<div
										class="column title has-text-left"
										@click="
											() => {
												withdrawal_method_selected = withdrawal_method;
												moveNext();
											}
										"
									>
										{{ L(`payment_method.${withdrawal_method}`) }}
									</div>
									<div class="column is-1">
										<b-radio
											v-model="withdrawal_method_selected"
											:native-value="withdrawal_method"
											@input="moveNext()"
										></b-radio>
									</div>
								</div>
							</div>
						</b-step-item>

						<b-step-item step="2" :label="L('withdrawal.step_2')">
							<div class="message-withdrawal">
								<div class="column title has-text-left">
									{{ L('withdrawal.description') }} {{ formatMoney(moneyWithdrawalMax) }}
								</div>
								<c-input
									v-model="moneyWithdrawal"
									:placeholder="L('withdrawal.money')"
									type="number"
									:max="moneyWithdrawalMax"
									icon="fa-dollar-sign"
								>
								</c-input>
							</div>
						</b-step-item>

						<b-step-item step="3" :label="L('withdrawal.step_3')">
							<div class="message-withdrawal">
								<div class="column title has-text-left">
									{{ L('withdrawal.completed_description') }}
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
								{{ L('helper.prev') }}
							</b-button>
							<b-button
								v-if="WithdrawalStep === 0"
								outlined
								id="driver-guide-b-3"
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
								{{ L('helper.next') }}
							</b-button>
							<b-button
								v-if="WithdrawalStep === 1"
								id="driver-guide-b-4"
								outlined
								type="is-primary"
								icon-pack="fas"
								icon-right="chevron-right"
								:disabled="moneyWithdrawal < 100 || moneyWithdrawal > moneyWithdrawalMax"
								@click.prevent="next.action"
							>
								{{ L('helper.confirm') }}
							</b-button>
							<b-button
								v-if="WithdrawalStep === 2"
								outlined
								type="is-primary"
								icon-pack="fas"
								icon-right="check"
								@click.prevent="finish_withdrawal()"
							>
								{{ L('helper.finish') }}
							</b-button>
						</template>
					</b-steps>
				</div>
			</div>
		</b-modal>

		<b-modal v-model="isOpenDepositModal" :can-cancel="['x', 'escape']" class="model-deposit">
			<div class="card">
				<div class="card-content">
					<p class="title has-text-left">
						{{ L('deposit.title') }}
					</p>
					<p class="subtitle has-text-left">
						{{ L('deposit.subtitle') }}
					</p>
					<b-steps v-model="DepositStep">
						<b-step-item step="1" :label="L('deposit.step_1')" id="driver-guide-a-2" :clickable="false">
							<div v-if="deposit_suscription.length" class="prices">
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
														LC(
															'deposit.investment_count',
															formatMoney(deposit_suscription[0].investment),
														)
													}}
												</li>
												<li>
													{{
														LC(
															'deposit.money_count_a',
															formatMoney(deposit_suscription[0].money_a),
														)
													}}
													{{
														LC(
															'deposit.money_count_b',
															formatMoney(deposit_suscription[0].money_b),
														)
													}}
												</li>
												<li>{{ LC('deposit.period_count', deposit_suscription[0].months) }}</li>
												<li>
													{{ LC('deposit.interest_count', deposit_suscription[0].interest) }}
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
														LC(
															'deposit.investment_count',
															formatMoney(deposit_suscription[1].investment),
														)
													}}
												</li>
												<li>
													{{
														LC(
															'deposit.money_count_a',
															formatMoney(deposit_suscription[1].money_a),
														)
													}}
													{{
														LC(
															'deposit.money_count_b',
															formatMoney(deposit_suscription[1].money_b),
														)
													}}
												</li>
												<li>{{ LC('deposit.period_count', deposit_suscription[1].months) }}</li>
												<li>
													{{ LC('deposit.interest_count', deposit_suscription[1].interest) }}
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
														LC(
															'deposit.investment_count',
															formatMoney(deposit_suscription[2].investment),
														)
													}}
												</li>
												<li>
													{{
														LC(
															'deposit.money_count_a',
															formatMoney(deposit_suscription[2].money_a),
														)
													}}
													{{
														LC(
															'deposit.money_count_b',
															formatMoney(deposit_suscription[2].money_b),
														)
													}}
												</li>
												<li>{{ LC('deposit.period_count', deposit_suscription[2].months) }}</li>
												<li>
													{{ LC('deposit.interest_count', deposit_suscription[2].interest) }}
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
														LC(
															'deposit.investment_count',
															formatMoney(deposit_suscription[3].investment),
														)
													}}
												</li>
												<li>
													{{
														LC(
															'deposit.money_count_a',
															formatMoney(deposit_suscription[3].money_a),
														)
													}}
													{{
														LC(
															'deposit.money_count_b',
															formatMoney(deposit_suscription[3].money_b),
														)
													}}
												</li>
												<li>{{ LC('deposit.period_count', deposit_suscription[3].months) }}</li>
												<li>
													{{ LC('deposit.interest_count', deposit_suscription[3].interest) }}
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
														LC(
															'deposit.investment_count',
															formatMoney(deposit_suscription[4].investment),
														)
													}}
												</li>
												<li>
													{{
														LC(
															'deposit.money_count_a',
															formatMoney(deposit_suscription[4].money_a),
														)
													}}
													{{
														LC(
															'deposit.money_count_b',
															formatMoney(deposit_suscription[4].money_b),
														)
													}}
												</li>
												<li>{{ LC('deposit.period_count', deposit_suscription[4].months) }}</li>
												<li>
													{{ LC('deposit.interest_count', deposit_suscription[4].interest) }}
												</li>
											</ul>
										</div>
									</div>
									<div class="column is-2"></div>
								</div>
							</div>
						</b-step-item>

						<b-step-item step="2" :label="L('deposit.step_2')" id="driver-guide-a-4" :clickable="false">
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
										{{ L(`payment_method.${deposit_method}`) }}
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
							:label="L(!has_button_payment ? 'deposit.step_3' : 'deposit.to_pay')"
							:clickable="false"
						>
							<div
								v-if="!has_button_payment && deposit_method_selected !== 'blockchain'"
								class="message-deposit"
							>
								<div class="column title has-text-left">
									{{ L('deposit.description') }}
								</div>
								<c-input
									id="driver-guide-a-6"
									v-model="moneyDeposit"
									:placeholder="L('deposit.money')"
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
										{{ L('deposit.description_dollar') }}
									</div>
									<c-input
										v-model="moneyDeposit"
										:placeholder="L('deposit.money')"
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

						<b-step-item step="4" :label="L('deposit.step_4')" :clickable="false">
							<div class="message-deposit">
								<div class="column title has-text-left">
									{{ L('deposit.completed_description') }}
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
								{{ L('helper.prev') }}
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
								{{ L('helper.next') }}
							</b-button>
							<b-button
								v-if="DepositStep === 2 && !has_button_payment"
								outlined
								type="is-primary"
								icon-pack="fas"
								icon-right="dollar-sign"
								@click.prevent="to_pay()"
							>
								{{ L('helper.to_pay') }}
							</b-button>
							<b-button
								v-if="DepositStep === 3"
								outlined
								type="is-primary"
								icon-pack="fas"
								icon-right="check"
								@click.prevent="isOpenDepositModal = false"
							>
								{{ L('helper.finish') }}
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
import { IRefer, IMembership, ISuscription, IRecord, IBalance, IBalanceDetail } from '../../store';
import { loadScript, PayPalNamespace } from '@paypal/paypal-js';
import { loadStripe } from '@stripe/stripe-js';

@Component
export default class Home extends PageChildBase {
	private balance_data: IBalance = {
		balance: 0,
		earning: 0,
		investment: 0,
	};

	private records_data: IRecord[] = [];

	private url_refer: string = '';
	private refers_data: IRefer[] = [];

	private memberships_data: IMembership[] = [];
	private tabMembershipActive: number = 0;
	private moneyMembershipActive: number = 0;
	private moneyMembershipMin: number = 0;

	private suscriptions_data: ISuscription[] = [];
	private isOpenBalanceDetailModal: boolean = false;
	private balance_detail_data: IBalanceDetail = null as any;

	private isOpenWithdrawalModal: boolean = false;
	private WithdrawalStep: number = 0;
	private withdrawal_methods: string[] = ['bankcheck', 'wire_transfer', 'paypal', 'stripe', 'blockchain'];
	private withdrawal_method_selected: string = 'bankcheck';
	private moneyWithdrawal: number = 0;
	private moneyWithdrawalMax: number = 0;

	private isOpenDepositModal: boolean = false;
	public DepositStep: number = 0;
	private has_button_payment: boolean = false;
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
	private deposit_methods: string[] = ['balance', 'paypal', 'stripe', 'blockchain'];
	private deposit_method_selected: string = 'balance';
	private deposit_blockchains: { name: string; currency: string; image: string }[] = this.store.util
		.deposit_blockchains;
	private deposit_blockchain_currency: { name: string; currency: string; image: string } = this
		.deposit_blockchains[0];
	private moneyDeposit: number = 0;
	private moneyDepositMin: number = 200;
	private moneyDepositMax: number = 100000000;

	private isOpenSupportPaymentModal: boolean = false;
	private has_button_support_payment: boolean = false;
	private supportPaymentStep: number = 0;
	private support_payment_methods: string[] = ['paypal', 'stripe', 'blockchain'];
	private support_payment_method_selected: string = 'paypal';
	private support_payment_blockchains: { name: string; currency: string; image: string }[] = this.store.util
		.deposit_blockchains;
	private support_payment_blockchain_currency: { name: string; currency: string; image: string } = this
		.deposit_blockchains[0];
	private moneySupportPayment: number = 100;

	private supportPayment: boolean = false;

	private directDeposit: boolean = false;
	private deposit_direct_text: string = '';

	private moveNext: () => void = () => {
		0;
	};

	get moneyMembership() {
		return this.formatMoney(
			this.calcMembershipMoney({
				...this.memberships_data[this.tabMembershipActive],
				money: this.moneyMembershipActive,
			}),
		);
	}

	public async created() {
		await super.created();
		this.get_memberships();
		this.get_suscriptions();
		this.get_refers();
		await this.get_records();
		await this.get_balance();
		const reference_coinpayments_support_payment = localStorage.getItem('reference_coinpayments_support_payment');
		if ('success_stripe_support' in this.$route.query || reference_coinpayments_support_payment) {
			if ('success_stripe_support' in this.$route.query) {
				const reference_stripe_support_payment = localStorage.getItem('reference_stripe_support_payment');
				if (this.$route.query.success_stripe_support === 'true' && reference_stripe_support_payment) {
					localStorage.removeItem('reference_stripe_support_payment');
					this.load_form_api(
						await this.store.api.proccess_support_payment({
							type: 'stripe',
							money: this.moneySupportPayment,
							reference: reference_stripe_support_payment,
						}),
						d => {
							if (d.valid) {
								this.toastSuccess(this.L('support_payment.success'));
							} else {
								this.toastError(this.L('support_payment.error'));
							}
						},
					);
				} else {
					this.toastError(this.L('support_payment.error'));
				}
			}
			if (reference_coinpayments_support_payment) {
				const query_coinpayments = async (callback: () => void, c: number = 0) => {
					await this.sleep(5000);
					if (c < 1000) {
						const result = await this.store.api.status_coinpayments({
							txid: reference_coinpayments_support_payment,
						});
						if (result.status_text === 'Complete') {
							callback();
						} else {
							query_coinpayments(callback, c + 1);
						}
					}
				};
				query_coinpayments(async () => {
					const data_coinpayments_support_payment = JSON.parse(
						localStorage.getItem('data_coinpayments_support_payment') || '{}',
					);
					this.load_form_api(
						await this.store.api.proccess_support_payment(data_coinpayments_support_payment),
						d => {
							if (d.valid) {
								localStorage.removeItem('reference_coinpayments_support_payment');
								localStorage.removeItem('data_coinpayments_support_payment');
								this.toastSuccess(this.L('support_payment.success'));
							} else {
								this.toastError(this.L('support_payment.error'));
							}
						},
					);
				});
			}
		} else {
			if (this.auth_data.user && this.auth_data.user.seeWelcome) {
				this.supportPayment =
					this.store.api.DateTime.now().toSeconds() > this.auth_data.user.nextSupportPayment;
				this.isOpenSupportPaymentModal = true;
			}
		}
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
								this.toastSuccess(this.L('deposit.success'));
								this.get_balance();
								this.get_records();
							} else {
								this.toastError(this.L('deposit.error'));
							}
						},
					);
				} else {
					this.toastError(this.L('deposit.error'));
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
							this.toastSuccess(this.L('deposit.success'));
							this.get_balance();
							this.get_records();
						} else {
							this.toastError(this.L('deposit.error'));
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
				this.deposit_suscription = this.memberships_data.map(m => {
					const suscription = this.balance_detail_data.suscriptions.find(s => s.membershipId === m.id);
					return {
						name: m.name,
						months: m.months,
						min_money: m.money_a,
						money_a: m.money_a,
						money_b: m.money_b,
						interest: (m.interest * 100).toFixed(0),
						membershipId: m.id,
						suscriptionId: suscription?.id || '',
						investment: suscription?.investment || 0,
					};
				});
				this.DepositStep = 2;
				this.moneyDepositMax = this.moneyDeposit;
				this.moneyDepositMin = this.moneyDeposit;
				if (this.deposit_method_selected === 'paypal') {
					this.has_button_payment = true;
					this.isOpenDepositModal = true;
					this.deposit_direct_text = `${this.LC(
						'deposit.deposit_direct_text.a',
						this.formatMoney(this.moneyDeposit),
					)} ${this.LC(
						'deposit.deposit_direct_text.b',
						this.deposit_suscription.find(m => m.membershipId === this.deposit_membership_selected)?.name ||
							'',
					)}`;
					this.to_pay();
				} else if (this.deposit_method_selected === 'stripe') {
					this.has_button_payment = true;
					this.isOpenDepositModal = true;
					this.to_pay();
				} else if (this.deposit_method_selected === 'blockchain') {
					this.deposit_direct_text = `${this.LC(
						'deposit.deposit_direct_text.a',
						this.formatMoney(this.moneyDeposit),
					)} ${this.LC(
						'deposit.deposit_direct_text.b',
						this.deposit_suscription.find(m => m.membershipId === this.deposit_membership_selected)?.name ||
							'',
					)}`;
					this.isOpenDepositModal = true;
				}
			});
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
		this.$watch(
			'deposit_membership_selected',
			() => {
				if (this.balance_detail_data) {
					// prettier-ignore
					this.moneyDepositMin = this.balance_detail_data.suscriptions.find(
						s => s.membershipId === this.deposit_membership_selected,
					)
						? 200
						: this.deposit_suscription.find(s => s.membershipId === this.deposit_membership_selected)
							?.min_money || 200;
					if (this.moneyDepositMin > this.moneyDepositMax) {
						this.moneyDepositMax = 100000000;
					}
					this.moneyDeposit = this.moneyDepositMin;
					if (this.balance_detail_data.available_balance >= this.moneyDepositMin) {
						this.deposit_methods = ['balance', 'paypal', 'stripe', 'blockchain'];
						this.deposit_method_selected = 'balance';
					} else {
						this.deposit_methods = ['paypal', 'stripe', 'blockchain'];
						this.deposit_method_selected = 'paypal';
					}
				}
			},
			{ immediate: true },
		);
		this.$watch(
			'deposit_method_selected',
			() => {
				if (
					this.balance_detail_data &&
					this.balance_detail_data.suscriptions.find(s => s.membershipId === this.deposit_membership_selected)
				) {
					if (this.deposit_method_selected === 'balance') {
						this.moneyDepositMin = 200;
						this.moneyDeposit = this.moneyDepositMin;
						this.moneyDepositMax = parseFloat(this.balance_detail_data.available_balance.toFixed(2));
						if (this.moneyDepositMax < this.moneyDepositMin) {
							this.moneyDepositMax = 100000000;
						}
					} else {
						this.moneyDepositMin = 500;
						this.moneyDeposit = this.moneyDepositMin;
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
		this.get_balance();
		this.get_refers();
		this.get_records();
	}

	private async get_balance() {
		this.load_form_api(await this.store.api.balance(), (data: IBalance) => {
			this.balance_data = data;
		});
	}

	private async get_records() {
		this.load_form_api(await this.store.api.records(), (data: IRecord[]) => {
			this.records_data = data;
		});
	}

	private async get_refers() {
		if (this.auth_data && this.auth_data.user) {
			this.url_refer = `https://digitaltrustonline.net/app/register?ref=${this.auth_data.user.id}`;
		}
		this.load_form_api(await this.store.api.is_refer(), (data: IRefer[]) => {
			this.refers_data = data;
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

	private async get_suscriptions() {
		this.load_form_api(await this.store.api.suscriptions(), (data: ISuscription[]) => {
			this.suscriptions_data = data;
		});
	}

	private async balance_now() {
		this.balance_detail(this.store.api.DateTime.now().startOf('month').toSeconds());
	}

	public async open_withdrawal() {
		this.load_form_api(await this.store.api.balance_detail({ id: '' }), async (data: IBalanceDetail) => {
			this.balance_detail_data = data;
			this.withdrawal_method_selected = 'bankcheck';
			this.WithdrawalStep = 0;
			this.moneyWithdrawalMax = parseFloat(this.balance_detail_data.available_balance.toFixed(2));
			this.moneyWithdrawal = 0;
			this.isOpenWithdrawalModal = true;
			if (this.moveNext) {
				await this.sleep(250);
				this.moveNext();
			}
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
					this.toastSuccess(this.L('withdrawal.success'));
					this.get_balance();
					this.get_records();
				} else {
					this.toastError(this.L('withdrawal.error'));
				}
				this.isOpenWithdrawalModal = false;
			},
		);
	}

	public async open_deposit() {
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
					interest: (m.interest * 100).toFixed(0),
					membershipId: m.id,
					suscriptionId: suscription?.id || '',
					investment: suscription?.investment || 0,
				};
			});
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
			this.isOpenDepositModal = true;
			if (this.moveNext) {
				await this.sleep(250);
				this.moveNext();
			}
		});
	}

	public async proccess_deposit(reference: string = 'default') {
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
				if (d.valid) {
					this.toastSuccess(this.L('deposit.success'));
					this.get_balance();
					this.get_records();
					this.DepositStep = 3;
				} else {
					this.toastError(this.L('deposit.error'));
				}
			},
		);
	}

	private async to_pay() {
		if (this.deposit_method_selected === 'balance') {
			await this.proccess_deposit();
		} else if (this.deposit_method_selected === 'paypal') {
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
			this.has_button_payment = true;
			const reference_coinpayments = localStorage.getItem('reference_coinpayments');
			if (reference_coinpayments) {
				this.$buefy.dialog.confirm({
					message: this.L('deposit.has_blockchain'),
					onConfirm: this.process_blockchain,
					onCancel: () => {
						this.isOpenDepositModal = false;
						this.has_button_payment = false;
					},
				});
			} else {
				this.process_blockchain();
			}
		}
		this.directDeposit = false;
	}

	private async process_blockchain() {
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
				this.isOpenDepositModal = false;
				this.has_button_payment = false;
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
							this.toastSuccess(this.L('deposit.success'));
							this.get_balance();
							this.get_records();
						} else {
							this.toastError(this.L('deposit.error'));
						}
					});
				});
			},
		);
	}

	private async to_pay_support_payment() {
		if (this.support_payment_method_selected === 'paypal') {
			loadScript({ 'client-id': this.store.util.PayPal.client_id || '' })
				.then((paypal: PayPalNamespace | null) => {
					this.has_button_support_payment = true;
					this.exec_is_render('paypal-button-container-support', () => {
						if (paypal && paypal.Buttons) {
							paypal
								.Buttons({
									createOrder: (_, actions) => {
										_;
										return actions.order.create({
											purchase_units: [
												{
													amount: {
														value: this.moneySupportPayment.toString(),
													},
												},
											],
										});
									},
									onApprove: async (data, _) => {
										_;
										await this.proccess_support_payment(data.orderID);
									},
								})
								.render('#paypal-button-container-support');
						} else {
							this.toastError(this.L('error.e000'));
						}
					});
				})
				.catch(() => {
					this.toastError(this.L('error.e000'));
				});
		} else if (this.support_payment_method_selected === 'stripe') {
			this.has_button_support_payment = true;
			this.load_form_api(
				await this.store.api.get_stripe_support_payment({
					money: this.moneySupportPayment,
				}),
				session => {
					localStorage.setItem('reference_stripe_support_payment', session.reference);
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
		} else if (this.support_payment_method_selected === 'blockchain') {
			this.has_button_support_payment = true;
			this.load_form_api(
				await this.store.api.get_coinpayments_support_payment({
					money: this.moneySupportPayment,
					currency: this.deposit_blockchain_currency.currency,
				}),
				data => {
					const data_coinpayments = {
						type: 'blockchain',
						money: this.moneySupportPayment,
						reference: data.txn_id,
					};
					localStorage.setItem('reference_coinpayments_support_payment', data.txn_id);
					localStorage.setItem('data_coinpayments_support_payment', JSON.stringify(data_coinpayments));
					this.isOpenSupportPaymentModal = false;
					this.has_button_support_payment = false;
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
						this.load_form_api(await this.store.api.proccess_support_payment(data_coinpayments), d => {
							if (d.valid) {
								localStorage.removeItem('reference_coinpayments_support_payment');
								localStorage.removeItem('data_coinpayments_support_payment');
								this.toastSuccess(this.L('support_payment.success'));
							} else {
								this.toastError(this.L('support_payment.error'));
							}
						});
					});
				},
			);
		}
	}

	public async proccess_support_payment(reference: string = 'default') {
		this.load_form_api(
			await this.store.api.proccess_support_payment({
				type: this.support_payment_method_selected,
				money: this.moneySupportPayment,
				reference,
			}),
			d => {
				if (d.valid) {
					this.isOpenSupportPaymentModal = false;
					this.toastSuccess(this.L('support_payment.success'));
				} else {
					this.toastError(this.L('support_payment.error'));
				}
			},
		);
	}

	private async to_save_see_welcome() {
		this.load_form_api(await this.store.api.see_welcome(), () => {
			this.isOpenSupportPaymentModal = false;
		});
	}

	private async balance_detail(date: number) {
		if (typeof date === 'string') {
			date = this.store.api.DateTime.fromFormat(date, 'yyyy-LL').toSeconds();
		}
		this.load_form_api(await this.store.api.balance_detail({ id: '', date }), (data: IBalanceDetail) => {
			this.balance_detail_data = data;
			this.isOpenBalanceDetailModal = true;
		});
	}

	private selectTabMembership(i: number) {
		this.tabMembershipActive = i;
		this.moneyMembershipActive = this.memberships_data[i].money_a;
	}

	private get_name_suscription(id: string) {
		return this.memberships_data.find(m => m.id === this.suscriptions_data.find(s => s.id === id)?.membershipId)
			?.name;
	}
}
</script>

<style lang="scss">
@import '../../styles/initial_variables.scss';

.home {
	height: 100%;

	.box-1 {
		height: 40%;
		width: 100%;
		padding: 2.5rem;

		.box-balance {
			margin: 0 2rem;

			.column {
				padding-top: 0.5rem;
				padding-bottom: 0.5rem;

				&.center {
					margin: auto;
				}
			}

			.balance-text {
				font-size: 24px;
				font-weight: bold;
			}

			.balance-money {
				font-size: 30px;
				font-weight: bold;
			}

			.info-money {
				padding-left: 1.5rem;
			}

			@include until-widescreen {
				.balance-text {
					font-size: 20px;
				}

				.balance-money {
					font-size: 25px;
				}
			}
		}
	}

	.box-2 {
		height: 60%;
		padding: 0.5rem 0 1rem 0;

		.table-wrapper {
			height: 29rem;

			@include mobile {
				height: 40rem;
			}
		}

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

		tbody tr td {
			padding-top: 0.9rem;
			padding-bottom: 0.9rem;
		}
	}

	.box-3 {
		height: 50%;

		.box-refer {
			margin: 1rem;

			.title,
			.title-refers {
				font-size: 18px;
				font-weight: bold !important;
				margin-bottom: 1rem;
			}

			.title-refers {
				margin-top: 1rem;
			}

			.url-refer {
				margin-top: 1.5rem;
				font-size: 13px;
				overflow-wrap: break-word;
				border-bottom: 1px solid $border;

				@include touch {
					font-size: 10px;
				}

				a {
					color: $black;

					&:hover {
						color: $primary;
					}
				}
			}

			.refer-list {
				max-height: 40rem;
				overflow: scroll;

				@include tablet-only {
					max-height: calc(100vw / 12 - 0.4rem);
				}

				@include desktop {
					max-height: calc(100vw / 12 - 0.7rem);
				}
			}

			.data-refer {
				display: inline-flex;
				width: 100%;
				padding: 0.5em 0.75em;

				.image {
					max-width: 2rem;

					img {
						display: inline;
						height: auto;
					}
				}

				.info-refer {
					width: 50%;
					padding-top: 0.25rem;
					padding-left: 0.25rem;
					padding-right: 0.25rem;
					white-space: pre-wrap;
					overflow-wrap: break-word;
					font-size: 16px;
					font-weight: bold;
				}
			}
		}
	}

	.box-4 {
		height: 50%;

		.box-membership {
			margin: 1rem;
			height: 100%;

			.title {
				font-size: 18px;
				font-weight: bold !important;
				margin-bottom: 1rem;
			}

			.buttons {
				padding: 1em 0.75em;
				justify-content: space-around;

				.button {
					padding: 0.25em;
					&.is-text {
						text-decoration: none;
						color: $main-light-two;
					}

					&.is-primary {
						font-size: 20px;
					}
				}
			}

			.memberships-content {
				margin-top: 2rem;
				width: 80%;

				.c-input {
					margin: auto;
					margin-left: 40%;
					width: 60%;
				}

				.money-membership {
					margin-top: 2rem;
					white-space: pre-wrap;
					overflow-wrap: break-word;
					font-weight: bold;
					color: $success;

					&.is-hidden-widescreen {
						font-size: 1.5rem;
					}

					&.is-hidden-touch {
						font-size: 3rem;
					}
				}

				.info-membership {
					color: $gray;
				}
			}
		}
	}

	.buttons.is-fullwidth {
		width: 100%;
		justify-content: space-around;
	}

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

			.table-wrapper {
				overflow-x: hidden;
			}

			.table {
				padding: 0 1.5rem;

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
			border-top: 1px solid $border;

			&:first-child {
				margin-top: 3rem;
			}

			&:last-child {
				margin-bottom: 3rem;
				border-bottom: 1px solid $border;
			}

			.columns-withdrawal {
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

		.message-withdrawal {
			width: 60%;
			padding: 4rem 0;
			margin: auto;
		}
	}

	.model-deposit {
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
					padding-top: 1rem;
					padding-bottom: 1rem;

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

		.deposit-direct-text {
			padding: 3rem 0;
		}

		.message-deposit,
		.container-pay {
			padding: 4rem 0;
			margin: auto;

			@include tablet {
				width: 60%;
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

	.model-support-payment {
		.modal-content {
			width: 60vw;
		}

		nav {
			display: none;
		}

		.image-main {
			width: 40vw;
			margin: auto;
			margin-bottom: 3rem;
		}

		.title {
			font-size: 28px;
			padding-bottom: 3rem;
		}

		.subtitle {
			font-size: 18px;
			padding-bottom: 1rem;
			margin-bottom: 2rem;
		}

		.step-title {
			font-size: 20px;
			padding-top: 0.5rem;
			padding-bottom: 1rem;
			margin-bottom: 0;
			color: $black;
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
</style>
