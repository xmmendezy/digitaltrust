<script lang="ts">
import PageChildBase from '../utils/page_child_base.utils';
import { Component, Watch } from 'vue-property-decorator';
import { Line } from 'vue-chartjs';
import { Decimal } from 'decimal.js';

@Component({
	extends: Line,
})
export default class Chart extends PageChildBase {
	public renderChart!: (chartData: Chart.ChartData, options?: Chart.ChartOptions) => void;

	@Watch('$i18n.locale', { immediate: true })
	public changeLocale() {
		this.renderComponent();
	}

	public mounted() {
		this.renderComponent();
	}

	public async renderComponent() {
		const data = await this.store.api.balance_graphic({});
		if (data.labels.length) {
			this.$emit('valid', true);
			this.renderChart(
				{
					labels: data.labels.map(d =>
						this.store.api.DateTime.fromUnix(d).setLocale(this.$i18n.locale).toFormat('LLLL-yyyy'),
					),
					datasets: [
						{
							label: this.$t('home.graphic_balance.a') as string,
							borderColor: '#fff',
							fill: false,
							data: data.data.map(d => parseFloat(new Decimal(d).toFixed(2))),
						},
					],
				},
				{
					responsive: true,
					maintainAspectRatio: false,
					legend: {
						display: false,
					},
					title: {
						display: true,
						fontColor: '#fff',
						fontSize: 20,
						text: this.$t('home.graphic_balance.title') as string,
					},
					scales: {
						yAxes: [
							{
								ticks: {
									fontColor: '#fff',
								},
							},
						],
						xAxes: [
							{
								ticks: {
									fontColor: '#fff',
									fontSize: 15,
								},
							},
						],
					},
				},
			);
		} else {
			this.$emit('valid', false);
		}
	}
}
</script>

<style></style>
