<script>
import { Line } from 'vue-chartjs';

export default {
	extends: Line,
	props: ['chartdata', 'options'],
	mounted() {
		this.renderChart(
			{
				labels: ['January', 'February'],
				datasets: [
					{
						label: 'Data One',
						backgroundColor: '#f87979',
						data: [40, 20],
					},
				],
			},
			this.options,
		);
	},
};
</script>

<style></style>
