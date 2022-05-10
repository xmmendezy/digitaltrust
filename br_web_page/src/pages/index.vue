<template>
	<div class="columns partial is-flex-direction-row-reverse">
		<div class="column">
			<img src="/images/index_1.png" class="index-1" />
			<img src="/images/index_2.png" class="index-2 coin-1" ref="coin1" />
			<img src="/images/index_2.png" class="index-2 coin-2" ref="coin2" />
			<img src="/images/index_2.png" class="index-2 coin-3" ref="coin3" />
		</div>
		<div class="column text">
			<h1 class="title is-size-1 has-text-black">BlackRockLoands</h1>
			<p class="subtitle has-text-black mt-6">
				Tu prestamista virtual para lo que necesites: un auto nuevo, iniciar tu negocio, remodelar tu hogar,
				invertir en educación. Todo desde este lugar.
			</p>
			<a class="button is-primary is-rounded mt-6 is-medium">Contactanos y comencemos con tu prestamo</a>
		</div>
	</div>

	<div class="columns partial partial-2">
		<div class="column text">
			<p class="title is-size-1 has-text-black">Nuestros servicios de prestamos de dinero en linea</p>
			<p class="subtitle has-text-black mt-6">
				En BlackRockLoands somos una financiera de créditos, cuya principal función es la de otorgar prestamos
				de dinero a personas con necesidad de dinero urgente o para inversión, de una forma segura y confiable.
				Ofrecemos créditos para todo tipo de clientes, incluso a personas sin experiencia financiera.
			</p>
			<img src="/images/index_2.png" class="index-2 coin-4" ref="coin4" />
		</div>
	</div>

	<div class="parallax">
		<img src="/images/index_3.jpg" class="index-3" />
	</div>
</template>

<script setup lang="ts">
import { templateRef } from '@vueuse/core';
import { useMotion } from '@vueuse/motion';

const coin1 = templateRef<HTMLElement>('coin1');
const coin2 = templateRef<HTMLElement>('coin2');
const coin3 = templateRef<HTMLElement>('coin3');
const coin4 = templateRef<HTMLElement>('coin4');

const refs = [coin1, coin2, coin3];
const delays = [110, 210, 310];
const durations = [800, 900, 1000];

refs.map((ref, i) => {
	const { variant } = useMotion(ref, {
		initial: {
			y: -500,
			opacity: 0.5,
		},
		enter: {
			y: 0,
			opacity: 1,
			transition: {
				type: 'spring',
				stiffness: 350,
				damping: 20,
				delay: delays[i],
				onComplete: () => {
					variant.value = 'levitate';
				},
			},
		},
		levitate: {
			y: 30,
			transition: {
				duration: durations[i],
				repeat: Infinity,
				ease: 'easeInOut',
				repeatType: 'mirror',
			},
		},
	});
});

const motionCoin4 = () => {
	const { variant } = useMotion(coin4, {
		initial: {
			y: -500,
			opacity: 0.5,
		},
		enter: {
			y: 0,
			opacity: 1,
			transition: {
				type: 'spring',
				stiffness: 350,
				damping: 20,
				delay: 110,
				onComplete: () => {
					variant.value = 'levitate';
				},
			},
		},
		levitate: {
			y: 25,
			transition: {
				duration: 900,
				repeat: Infinity,
				ease: 'easeInOut',
				repeatType: 'mirror',
			},
		},
	});
};

motionCoin4();
</script>

<style lang="scss" scoped>
@import '~/styles/variables.scss';

.partial {
	width: 80vw;
	margin: auto;
	margin-top: 20vh;
	margin-bottom: 20vh !important;

	@include touch {
		width: 95vw;
		margin-top: 8vh;
	}

	.text {
		margin-top: 5vh;
		text-align: center;

		@include touch {
			margin-top: 0;
		}

		.subtitle {
			width: 60%;
			margin: auto;

			@include touch {
				width: 100%;
			}
		}

		.button {
			max-width: 90vw;
			white-space: unset;
			height: fit-content;
		}
	}
}

.partial-2 {
	width: 90vw;
	margin: auto;
	margin-bottom: 10vh !important;

	@include desktop {
		width: 70vw;
		margin-bottom: 5vh !important;
	}

	.title {
		font-size: 2rem !important;
	}
}

.index-1 {
	width: 40vw;

	@include touch {
		width: 95vw;
	}
}

.index-2 {
	width: 5vw;

	@include touch {
		width: 10vw;
	}
}

.coin-1,
.coin-2,
.coin-3,
.coin-4 {
	position: relative;
	height: 80px;
	width: auto;

	@include mobile {
		height: 60px;
	}
}

.coin-1 {
	bottom: calc(40vw / 2 + 5rem);
	left: 5rem;

	@include mobile {
		bottom: 13rem;
		left: 1rem;
	}
}

.coin-2 {
	bottom: calc(40vw / 2 - 2rem);
	left: calc(40vw / 2 + 2rem);

	@include mobile {
		bottom: 8rem;
		left: 12rem;
	}
}

.coin-3 {
	bottom: calc(40vw / 2 - 10rem);
	left: calc(40vw / 2 - 15rem);

	@include mobile {
		bottom: 4rem;
		left: -1rem;
	}
}

.coin-4 {
	bottom: 7rem;
	left: -25rem;

	@include mobile {
		bottom: 0;
		left: calc(50vw - 11rem);
	}
}

.parallax {
	width: 100vw;
	max-height: 50vw;

	.index-3 {
		background-attachment: fixed;
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
	}
}
</style>
