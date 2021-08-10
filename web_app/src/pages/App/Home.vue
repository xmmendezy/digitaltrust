<template>
	<div class="home">
		<div class="box">
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
					<div class="box withdrawal">
						<div class="columns has-text-left">
							<div class="column withdrawal-text">{{ $t('home.balance_now.d') }}</div>
							<div class="column withdrawal-money is-7">{{ formatMoney(balance_data.withdrawal) }}</div>
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
							<div class="column investment-money is-7">{{ formatMoney(balance_data.investment) }}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="box">
			<Chart />
		</div>

		<BalanceModal v-model="isOpenBalanceDetailModal" />
	</div>
</template>

<script lang="ts">
import PageChildBase from '../../utils/page_child_base.utils';
import { Component } from 'vue-property-decorator';
import { IBalance } from '../../store';
import Chart from '../../components/Chart.vue';
import BalanceModal from '../../components/BalanceModal.vue';

@Component({
	components: { Chart, BalanceModal },
})
export default class Home extends PageChildBase {
	private balance_data: IBalance = {
		balance: 0,
		earning: 0,
		investment: 0,
	};

	private isOpenBalanceDetailModal: boolean = false;

	public async created() {
		await super.created();
		this.reload();
	}

	public reload() {
		this.get_balance();
	}

	private async get_balance() {
		this.load_form_api(await this.store.api.balance(), (data: IBalance) => {
			this.balance_data = data;
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
		}

		.withdrawal-text {
			font-size: 20px;
			font-weight: bold;
		}

		.withdrawal-money {
			font-size: 26px;
			font-weight: bold;
		}
	}

	.chartjs-render-monitor {
		height: 50vh !important;
		width: 100% !important;
	}
}
</style>
