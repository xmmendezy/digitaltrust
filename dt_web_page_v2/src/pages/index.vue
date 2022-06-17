<template>
	<div class="columns partial is-flex-direction-row-reverse">
		<div class="column">
			<img src="/images/index_1.png" class="index-1" />
			<img src="/images/index_2.png" class="index-2 coin-1" ref="coin1" />
			<img src="/images/index_2.png" class="index-2 coin-2" ref="coin2" />
			<img src="/images/index_2.png" class="index-2 coin-3" ref="coin3" />
		</div>
		<div class="column text">
			<h1 class="title is-size-1 has-text-black">BlackRockLoans</h1>
			<p class="subtitle has-text-black mt-6">
				Your virtual lender for whatever you need: a new car, start your business, remodel your home, invest in
				education. Everything from this place.
			</p>
			<router-link to="/contact" class="button is-primary is-rounded mt-6 is-medium">
				Contact us and let's start with your loan
			</router-link>
		</div>
	</div>

	<div class="parallax">
		<div class="down"></div>
		<div class="up"></div>
	</div>

	<div class="columns partial partial-2">
		<div class="column text">
			<p class="title is-size-1 has-text-black">About us</p>
			<p class="has-text-black has-text-justified-mobile mt-6">
				We are Blackrockloans.net, a Savings and Credit finance company that believes in work, effort and human
				development, with a balance between the financial and the social. With the support of its associates, it
				has consolidated leader in the financial system, with a presence throughout the country, creating
				employment opportunities, walking steadily towards the future. At 50 years old, he has established
				himself international level, has 50 offices located around the world, which has allowed it to have a
				positive impact on the quality of life of communities.
			</p>
			<router-link to="/contact" class="button is-primary is-rounded mt-6 is-medium">
				Contact us and let's start with your loan
			</router-link>
		</div>
	</div>

	<div class="columns partial partial-3">
		<div class="column">
			<div class="text">
				<p class="title is-size-1">Credits</p>
				<p class="mt-6">
					We help you achieve your goals with our credits obtain greater liquidity and fulfill your dreams. We
					offer financing lines according to your need.
				</p>
			</div>
			<router-link to="/contact" class="button button-1 is-black is-rounded mt-6 is-medium" ref="button1">
				Consumer Credit
			</router-link>
			<router-link to="/contact" class="button button-2 is-black is-rounded mt-6 is-medium" ref="button2">
				Business Credit
			</router-link>
			<router-link to="/contact" class="button button-3 is-black is-rounded mt-6 is-medium" ref="button3">
				Housing Credit
			</router-link>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head';
import { templateRef } from '@vueuse/core';
import { useMotion } from '@vueuse/motion';

useHead({
	title: 'BlackRockLoans',
});

const coin1 = templateRef<HTMLElement>('coin1');
const coin2 = templateRef<HTMLElement>('coin2');
const coin3 = templateRef<HTMLElement>('coin3');

const button1 = templateRef<HTMLElement>('button1');
const button2 = templateRef<HTMLElement>('button2');
const button3 = templateRef<HTMLElement>('button3');

const delays = [110, 210, 310];
const durations = [800, 900, 1000];

[coin1, coin2, coin3].map((coin, i) => {
	const { variant } = useMotion(coin, {
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

[button1, button2, button3].map(button => {
	useMotion(button, {
		initial: {
			y: 25,
		},
		enter: {
			y: 0,
			transition: {
				duration: 900,
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
	margin-bottom: 20vh !important;

	@include desktop {
		width: 70vw;
		margin-bottom: 15vh !important;
	}

	.title {
		font-size: 2rem !important;
	}
}

.partial-3 {
	width: 100vw;
	height: fit-content;
	margin: 0 !important;
	padding-bottom: 10vh !important;
	background: $primary;
	color: $white;

	@include desktop {
		padding-top: 15vh !important;
		padding-bottom: 15vh !important;
	}

	.text {
		width: 90vw;
		margin: auto;
		margin-top: 5vh !important;

		@include desktop {
			width: 70vw;
		}

		.title {
			font-size: 2rem !important;
		}
	}

	.button {
		display: block;
		width: 70vw;
		margin: auto;

		@include desktop {
			width: 30vw;

			&.button-1 {
				margin-left: 12rem;
			}

			&.button-2 {
				margin-left: auto;
				margin-right: 12rem;
			}

			&.button-3 {
				margin-left: 12rem;
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

.parallax {
	width: 100vw;
	height: 40vh;
	overflow: hidden;
	position: relative;

	.down {
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		z-index: 9;
		opacity: 0.5;
		background-image: url('/images/index_3.jpg');
		background-attachment: fixed;
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
	}

	.up {
		height: 100%;
		width: 100%;
		z-index: 10;
		background-color: $white;
	}
}
</style>
