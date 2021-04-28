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
					<div class="columns">
						<div class="column center has-text-left is-6">
							<b-button type="is-primary">
								{{ L('home.balance_now.d') }}
							</b-button>
						</div>
						<div class="column center has-text-left">
							<b-button type="is-warning" size="is-small">
								{{ L('home.balance_now.d') }}
							</b-button>
						</div>
						<div class="column center has-text-left">
							<b-button type="is-success" size="is-large">
								{{ L('home.balance_now.d') }}
							</b-button>
						</div>
					</div>
				</div>
			</article>
			<article class="box box-2">
				<b-table :data="history_data" sticky-header :mobile-cards="false">
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
							{{ props.row.month }}
						</div>
					</b-table-column>
				</b-table>
			</article>
		</div>
		<div class="tile is-vertical is-parent">
			<article class="box box-3">
				<!-- Put any content you want -->
			</article>
			<article class="box box-4">
				<!-- Put any content you want -->
			</article>
		</div>
	</div>
</template>

<script lang="ts">
import PageChildBase from '../../utils/page_child_base.utils';
import { Component } from 'vue-property-decorator';

@Component
export default class Home extends PageChildBase {
	public history_data: any[] = [];
	public balance_data: any = {};

	public async created() {
		await super.created();
	}

	public async mounted() {
		this.get_balance();
		this.get_history();
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
			return { balance: 12500, withdrawal: 13045.3, earning: 2150, month: 'Mayo' };
		});
	}

	public formatMoney(n: number) {
		const x = n.toFixed(2).toString().split('.');
		let x1 = x[0];
		const rgx = /(\d+)(\d{3})/;
		while (rgx.test(x1)) {
			x1 = x1.replace(rgx, '$1' + ' ' + '$2');
		}
		return `$${x1}${x.length > 1 ? '.' + x[1] : ''}`;
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
		height: 40%;
	}

	.box-4 {
		height: 60%;
	}
}
</style>
