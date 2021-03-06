document.addEventListener('DOMContentLoaded', () => {
	const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
	const $navbarBurgersMain = document.querySelector('.navbar-burger.main');
	if ($navbarBurgers.length > 0) {
		$navbarBurgers.forEach(el => {
			el.addEventListener('click', () => {
				const target = el.dataset.target;
				const $target = document.getElementById(target);
				$navbarBurgersMain.classList.toggle('is-hidden');
				$target.classList.toggle('is-active');
			});
		});
	}

	(window as any).bulmaAccordion.attach();

	if (document.querySelector('.count-down')) {
		const count = new (window as any).Countdown({
			cont: document.querySelector('.count-down'),
			date: 1644901200000,
			outputTranslation: {
				day: 'Días',
				hour: 'Horas',
				minute: 'Minutos',
				second: 'Segundos',
			},
			endCallback: null,
			outputFormat: 'day|hour|minute|second',
		});
		count.start();
	}
});

function suscribeForm() {
	const suscribe = <HTMLInputElement>document.getElementById('suscribe');
	if (suscribe.value) {
		fetch('/td/api/suscribe_mail/' + suscribe.value)
			.then(res => {
				res.json().then(data => {
					if (!data.error) {
						(window as any).Swal.fire({
							title: 'Listo',
							text: 'Se ha suscrito a nuestra lista de correos',
							icon: 'success',
							confirmButtonText: 'Continuar',
							confirmButtonColor: '#16665d',
						});
					}
				});
				suscribe.value = '';
			})
			.catch(() => {
				suscribe.value = '';
			});
	} else {
		suscribe.value = '';
	}
	return false;
}

(window as any).suscribeForm = suscribeForm;

function notReady() {
	(window as any).Swal.fire({
		title: '¡Oh!',
		text: 'Esta sección aún no está lista, estamos trabajando en ello.',
		icon: 'warning',
		confirmButtonText: 'Regresar',
		confirmButtonColor: '#16665d',
	});
}

(window as any).notReady = notReady;
