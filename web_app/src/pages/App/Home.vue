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
					<div class="columns is-hidden-tablet-only">
						<div class="column center has-text-left is-6">
							<b-button type="is-primary" @click="show_earnings()">
								{{ L('home.balance_now.d') }}
							</b-button>
						</div>
						<div class="column center has-text-left">
							<b-button type="is-warning" size="is-small" @click="show_withdrawal()">
								{{ L('home.balance_now.e') }}
							</b-button>
						</div>
						<div class="column center has-text-left">
							<b-button type="is-success" size="is-large" @click="show_deposit()">
								{{ L('home.balance_now.f') }}
							</b-button>
						</div>
					</div>
					<div class="columns is-hidden-mobile is-hidden-desktop">
						<div class="column">
							<b-button type="is-primary" size="is-small" @click="show_earnings()">
								{{ L('home.balance_now.d') }}
							</b-button>
						</div>
						<div class="column">
							<b-button type="is-warning" size="is-small" @click="show_withdrawal()">
								{{ L('home.balance_now.e') }}
							</b-button>
						</div>
						<div class="column">
							<b-button type="is-success" size="is-small" @click="show_deposit()">
								{{ L('home.balance_now.f') }}
							</b-button>
						</div>
					</div>
				</div>
			</article>
			<article class="box box-2">
				<b-table
					:data="history_data"
					sticky-header
					:mobile-cards="false"
					@click="row => balance_nomth(row.date)"
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
						field="month"
						:label="L('home.table_balance.d')"
						header-class="header header-date has-text-right"
						v-slot="props"
					>
						<div class="has-text-right has-text-gray">
							{{
								store.api.DateTime.fromFormat(props.row.date, 'yyyy-LL')
									.setLocale($i18n.locale)
									.toFormat('LLL yyyy')
							}}
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
					<div class="b-tabs" :class="{ 'is-vertical': isTabMembershipVertical }">
						<nav class="tabs">
							<ul>
								<li v-for="(membership, i) in memberships_data" :key="membership.id">
									<b-button
										:type="tabMembershipActive === i ? 'is-primary' : 'is-text'"
										:outlined="tabMembershipActive === i"
										@click="selectTabMembership(i)"
										>{{ membership.name }}
									</b-button>
								</li>
							</ul>
						</nav>
						<section class="tab-content">
							<div class="tab-item has-text-right">
								<c-input
									v-model="moneyMembershipActive"
									:placeholder="L('home.membership.c')"
									type="number"
									:min="moneyMembershipMin"
									icon="fa-dollar-sign"
								>
								</c-input>
								<p class="money-membership">
									{{ moneyMembership }}
								</p>
								<p class="info-membership">
									{{ L('home.membership.d') }}
								</p>
							</div>
						</section>
					</div>
				</div>
			</article>
		</div>
	</div>
</template>

<script lang="ts">
import PageChildBase from '../../utils/page_child_base.utils';
import { Component } from 'vue-property-decorator';
import { IRefer, IMembership } from '../../store';

@Component
export default class Home extends PageChildBase {
	public balance_data: any = {};

	public history_data: any[] = [];

	public url_refer: string = '';
	public refers_data: IRefer[] = [];

	public memberships_data: IMembership[] = [];
	public tabMembershipActive: number = 0;
	public isTabMembershipVertical: boolean = false;
	public moneyMembershipActive: number = 0;
	public moneyMembershipMin: number = 0;

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
		this.get_balance();
		this.get_history();
		this.get_refers();
		this.get_memberships();
		this.statusTabMembership();
		window.addEventListener('resize', this.statusTabMembership);
	}

	public async get_balance() {
		this.balance_data = {
			balance: 213000,
			earning: 120000,
			investment: 120333,
		};
	}

	public async get_history() {
		this.history_data = [...Array(10)].map(() => {
			return { date: '2021-04', balance: 12500, withdrawal: 13045.3, earning: 2150, month: 'Mayo' };
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

	public statusTabMembership() {
		const w = window.innerWidth;
		if (w <= 768) {
			this.isTabMembershipVertical = false;
		} else {
			this.isTabMembershipVertical = true;
		}
	}

	public async show_earnings() {
		console.log('Hola');
	}

	public async show_withdrawal() {
		console.log('Hola');
	}

	public async show_deposit() {
		console.log('Hola');
	}

	public async balance_nomth(date: string) {
		console.log('Hola', date);
	}

	public selectTabMembership(i: number) {
		this.tabMembershipActive = i;
		this.moneyMembershipActive = this.memberships_data[i].money;
	}
}
</script>

<style lang="scss">
@import '../../styles/initial_variables.scss';

.home {
	height: 100%;

	.box-1 {
		height: 35%;
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
		}
	}

	.box-2 {
		height: 65%;
		width: 100%;
		padding: 0.5rem 0 1rem 0;

		.table-wrapper {
			overflow-x: hidden;
			height: 33rem;
		}

		.header {
			padding-top: 0.9rem;
			padding-bottom: 0.9rem;

			color: $border;

			&.header-date span {
				width: 100%;
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
				max-height: 15rem;
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

			.b-tabs {
				padding: 1em 0.75em;
				vertical-align: middle;

				li {
					padding: 0.25em;

					.button {
						&.is-text {
							text-decoration: none;
							color: $main-light-two;
						}

						&.is-primary {
							font-size: 20px;
						}
					}
				}

				.tab-content {
					margin-top: 2rem;

					@include tablet {
						width: calc(14vw);
					}

					@include widescreen {
						width: 70%;
					}

					.c-input {
						margin: auto;
						margin-left: 50%;
						width: 60%;
					}

					.money-membership {
						margin-top: 2rem;
						font-size: 3rem;
						font-weight: bold;
						color: $success;
					}

					.info-membership {
						color: $gray;
					}
				}
			}
		}
	}
}
</style>
