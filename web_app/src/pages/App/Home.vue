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
						<b-button type="is-warning" @click="show_withdrawal()">
							{{ L('home.balance_now.f') }}
						</b-button>
						<b-button class="is-right" type="is-success" size="is-large" @click="show_deposit()">
							{{ L('home.balance_now.g') }}
						</b-button>
					</div>
					<div class="buttons is-hidden-mobile is-hidden-desktop is-centered">
						<b-button type="is-primary" size="is-small" @click="balance_now()">
							{{ L('home.balance_now.e') }}
						</b-button>
						<b-button type="is-warning" size="is-small" @click="show_withdrawal()">
							{{ L('home.balance_now.f') }}
						</b-button>
						<b-button type="is-success" size="is-small" @click="show_deposit()">
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
						header-class="header header-date has-text-right"
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

		<b-modal v-model="isOpenBalanceDetailModal" :can-cancel="['x', 'escape']" class="model-balance_detail">
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
								<div class="has-text-left">{{ props.row.payment_method }}</div>
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
								<div class="has-text-left">{{ props.row.withdrawal_method }}</div>
							</b-table-column>
						</b-table>
					</div>
				</div>
			</div>
		</b-modal>
	</div>
</template>

<script lang="ts">
import PageChildBase from '../../utils/page_child_base.utils';
import { Component } from 'vue-property-decorator';
import { IRefer, IMembership, ISuscription, IRecord, IBalance, IBalanceDetail } from '../../store';

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
	}

	public reload() {
		this.get_balance();
		this.get_refers();
	}

	public async get_balance() {
		this.load_form_api(await this.store.api.balance(), (data: IBalance) => {
			this.balance_data = data;
		});
	}

	public async get_records() {
		this.load_form_api(await this.store.api.records(), (data: IRecord[]) => {
			this.records_data = data;
		});
	}

	public async get_refers() {
		if (this.auth_data && this.auth_data.user) {
			this.url_refer = `https://digitaltrustonline.net/app/register?ref=${this.auth_data.user.id}`;
		}
		this.load_form_api(await this.store.api.is_refer(), (data: IRefer[]) => {
			this.refers_data = data;
		});
	}

	public async get_memberships() {
		this.load_form_api(await this.store.api.memberships(), (memberships_data: IMembership[]) => {
			this.memberships_data = memberships_data;
			this.tabMembershipActive = Math.floor(this.memberships_data.length / 2);
			if (this.memberships_data[this.tabMembershipActive]) {
				this.moneyMembershipActive = this.memberships_data[this.tabMembershipActive].money;
				this.moneyMembershipMin = this.memberships_data[this.tabMembershipActive].money;
			}
		});
	}

	public async get_suscriptions() {
		this.load_form_api(await this.store.api.suscriptions(), (data: ISuscription[]) => {
			this.suscriptions_data = data;
		});
	}

	public async balance_now() {
		this.balance_detail(this.store.api.DateTime.now().startOf('month').toSeconds());
	}

	public async show_withdrawal() {
		// console.log('Hola');
	}

	public async show_deposit() {
		// console.log('Hola');
	}

	public async balance_detail(date: number) {
		if (typeof date === 'string') {
			date = this.store.api.DateTime.fromFormat(date, 'yyyy-LL').toSeconds();
		}
		this.load_form_api(await this.store.api.balance_detail({ id: '', date }), (data: IBalanceDetail) => {
			this.balance_detail_data = data;
			this.isOpenBalanceDetailModal = true;
		});
	}

	public selectTabMembership(i: number) {
		this.tabMembershipActive = i;
		this.moneyMembershipActive = this.memberships_data[i].money;
	}

	public get_name_suscription(id: string) {
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

			&.header-date .th-wrap span {
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

	.model-balance_detail {
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
				}
			}
		}
	}
}
</style>
