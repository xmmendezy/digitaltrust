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
	return false;
}

(window as any).contactForm = contactForm;

function suscribeForm() {
	const suscribe = <HTMLInputElement>document.getElementById('suscribe');
	console.log(suscribe.value);
	if (suscribe.value) {
		fetch('http://127.0.0.1:9001/dt/api/suscribe_mail/' + suscribe.value)
			.then(res => {
				res.json().then(data => {
					if (!data.error) {
						swal("Good job!", "You clicked the button!", "success");
					}
				});
				//suscribe.value = '';
			})
			.catch(() => {
				//suscribe.value = '';
			});
	} else {
		//suscribe.value = '';
	}
	return false;
}

(window as any).suscribeForm = suscribeForm;
