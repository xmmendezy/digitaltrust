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
});

function suscribeForm() {
	const suscribe = <HTMLInputElement>document.getElementById('suscribe');
	console.log(suscribe.value);
	if (suscribe.value) {
		fetch('/td/api/suscribe_mail/' + suscribe.value)
			.then(res => {
				res.json().then(data => {
					console.log(data);
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
