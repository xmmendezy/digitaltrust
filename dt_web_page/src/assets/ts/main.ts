document.addEventListener('DOMContentLoaded', () => {
	const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
	if ($navbarBurgers.length > 0) {
		$navbarBurgers.forEach(el => {
			el.addEventListener('click', () => {
				const target = el.dataset.target;
				const $target = document.getElementById(target);
				el.classList.toggle('is-active');
				$target.classList.toggle('is-active');
			});
		});
	}

	(window as any).bulmaAccordion.attach();

	const glide = new Glide('.glide', {
		autoplay: 7000,
		hoverpause: false,
	});
	glide.mount();

	d3_our_industries();
});

function contactForm() {
	const input_name = <HTMLInputElement>document.getElementById('name');
	const name = input_name.value;
	const input_email = <HTMLInputElement>document.getElementById('email');
	const email = input_email.value;
	const input_phone = <HTMLInputElement>document.getElementById('phone');
	const phone = input_phone.value;
	const input_message = <HTMLInputElement>document.getElementById('message');
	const message = input_message.value;
	window.open(
		`https://wa.me/16469803342?text=Hi, my name is ${name}, my email is ${email} and my phone number is ${phone}. ${message}.`,
		'_blank',
	);
	input_name.value = '';
	input_email.value = '';
	input_phone.value = '';
	input_message.value = '';
}

(window as any).contactForm = contactForm;

function d3_our_industries() {
	const data: { id: number; name: string }[] = [
		{
			id: 1,
			name: 'DigitalTrust',
		},
		{
			id: 2,
			name: 'Financial Markets',
		},
		{
			id: 3,
			name: 'Plantation Found',
		},
		{
			id: 4,
			name: 'Health and Wellness',
		},
		{
			id: 5,
			name: 'Trading Academy',
		},
		{
			id: 6,
			name: 'Cripto Mining',
		},
		{
			id: 7,
			name: 'Digital Future',
		},
		{
			id: 8,
			name: 'Cripto Apps',
		},
	];

	let svg, pack, bubble, simulation;

	const width = document.body.clientWidth;
	const height = document.body.clientHeight;
	const centerX = width * 0.5;
	const centerY = height * 0.5;
	const scaleColor = d3.scaleOrdinal(d3.schemeCategory10);
	const forceCollide = d3.forceCollide(d => (d as any).r + 1);

	const init = (data: { id: number; name: string }[]) => {
		svg = d3.select('#d3_our_industries').append('svg').attr('xmlns', 'http://www.w3.org/2000/svg');
		pack = d3.pack().size([width, height]).padding(1.5);
		const forceStrength = 0.05;
		simulation = d3
			.forceSimulation()
			// .velocityDecay(0.3)
			.force('x', d3.forceX(centerX).strength(forceStrength))
			.force('y', d3.forceY(centerY).strength(forceStrength))
			.force('charge', d3.forceManyBody()) //-Math.pow(d.radius, 2.0) * forceStrength)
			.force('collide', forceCollide);

		draw(data);
	};

	const createNodes = (source: { id: number; name: string }[]) => {
		const root = d3.hierarchy({ children: source }).sum(d => (d as any).id);

		const rootData = pack(root)
			.leaves()
			.map((d, i) => {
				const data = d.data;
				const color = scaleColor(data.name);
				return {
					x: centerX + (d.x - centerX) * 3,
					y: centerY + (d.y - centerY) * 3,
					id: 'bubble' + i,
					r: 0,
					radius: d.r,
					value: data.value,
					name: data.name,
					color: color,
				};
			});

		// sort them to prevent occlusion of smaller nodes.
		rootData.sort((a, b) => b.value - a.value);
		return rootData;
	};

	const draw = (data: { id: number; name: string }[]) => {
		const nodes = createNodes(data);

		// @v4 Once we set the nodes, the simulation will start running automatically!
		simulation.nodes(nodes).on('tick', ticked);

		bubble = svg
			.selectAll('.bubble')
			.data(nodes)
			.enter()
			.append('g')
			.attr('class', 'bubble')
			.call(
				d3
					.drag()
					.on('start', d => {
						if (!(d3 as any).event.active) {
							simulation.alphaTarget(0.2).restart();
						}
						d.fx = d.x;
						d.fy = d.y;
					})
					.on('drag', d => {
						d.fx = (d3 as any).event.x;
						d.fy = (d3 as any).event.y;
					})
					.on('end', d => {
						if (!(d3 as any).event.active) {
							simulation.alphaTarget(0);
						}
						d.fx = null;
						d.fy = null;
					}),
			);
		// .on("mouseover", d => {
		//  d3.select("#"+d.id).attr("fill", d3.color(d.color).brighter());
		// }).on("mouseout", d => {
		//  d3.select("#"+d.id).attr("fill", d.color);
		// });

		const href = bubble
			.append('a')
			.attr('href', d => 'http://me.chjiyun.com/#' + d.name)
			.attr('target', '_blank');

		href.append('circle')
			.attr('id', d => d.id)
			.attr('r', 1e-6)
			.attr('fill', d => d.color)
			.transition()
			.duration(2000)
			.ease(d3.easeElasticOut)
			.tween('circleIn', d => {
				const i = d3.interpolateNumber(0, d.radius);
				return t => {
					d.r = i(t);
					simulation.force('collide', forceCollide);
				};
			});

		href.append('text')
			.attr('dy', d => '0.35em')
			.text(d => d.name);
	};

	const ticked = () => {
		bubble
			.attr('transform', d => `translate(${d.x},${d.y})`)
			.select('circle')
			.attr('r', d => d.r);
	};

	init(data);
}
