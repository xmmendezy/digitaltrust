<script>
import { Line } from 'vue-chartjs';

export default {
	extends: Line,
	props: ['chartdata', 'options'],
	mounted() {
		this.renderChart(
			{
				labels: [
					'Enero',
					'Febrero',
					'Marzo',
					'Abril',
					'Mayo',
					'Junio',
					'Julio',
					'Agosto',
					'Septiembre',
					'Octubre',
				],

				datasets: [
					{
						label: 'Ganancia',
						borderColor: '#fff',
						fill: false,
						data: [40, 20, 25, 30, 35, 35, 35, 40, 25, 30],
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
					text: 'Ganancias en el tiempo',
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
	},
};
</script>

<style></style>
