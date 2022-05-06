<template>
	<nav-bar />

	<div class="columns main is-flex-direction-row-reverse">
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
</template>

<script setup lang="ts">
import { templateRef } from '@vueuse/core';
import { useMotion } from '@vueuse/motion';

const coin1 = templateRef<HTMLElement>('coin1');
const coin2 = templateRef<HTMLElement>('coin2');
const coin3 = templateRef<HTMLElement>('coin3');

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
</script>

<style lang="scss" scoped>
@import '~/styles/variables.scss';

.main {
	width: 80vw;
	margin: auto;
	margin-top: 20vh;

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
.coin-3 {
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
</style>
