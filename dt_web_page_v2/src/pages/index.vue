<template>
	<section id="info" class="section">
		<div class="content has-text-centered">
			<div class="columns">
				<div class="column">
					<Image
						img="index_1.png"
						class="index-1"
						data-aos="zoom-in"
					/>
					<Image
						img="index_2.png"
						class="index-2"
						data-aos="slide-right"
					/>
					<Image
						img="index_3.png"
						class="index-3"
						data-aos="slide-up"
					/>
					<Image
						img="index_4.png"
						class="index-4"
						data-aos="slide-down"
					/>
				</div>
				<div class="column is-6">
					<h1 class="title title-info">
						{{ t("info.a") }}
					</h1>
					<p class="subtitle-info">
						{{ t("info.b") }}
					</p>
					<a href="#invest_now" class="button is-primary is-rounded">
						<p>
							{{ t("info.e") }}
						</p>
					</a>
				</div>
			</div>
		</div>

		<div class="points_1 is-hidden-mobile">
			<PointSVG />
		</div>

		<div class="points_2">
			<PointSVG />
		</div>

		<div class="points_3 is-hidden-mobile">
			<PointSVG />
		</div>
	</section>

	<section class="hero">
		<div class="hero-body">
			<div class="container">
				<section id="invest_now" class="section">
					<div class="columns">
						<div class="column">
							<div class="content">
								<h1 class="title-underline has-text-left">
									{{ t("invest_now.a") }}
								</h1>
								<p class="subtitle-invest-now">
									{{ t("invest_now.b") }}
								</p>
								<ul class="has-text-left has-text-gray">
									<li v-for="i in 3" :key="i">
										{{
											t(
												"invest_now.c." +
													(i - 1).toString()
											)
										}}
									</li>
								</ul>
								<a
									:href="'/dt_app/preregister?i18n=' + locale"
									class="button is-primary is-rounded is-outlined"
								>
									{{ t("invest_now.d") }}
								</a>
								<router-link
									to="help"
									class="button is-primary is-rounded is-outlined help-button"
									>{{ t("navbar.url.a8") }}</router-link
								>
							</div>
						</div>
						<div class="column is-7">
							<Image img="image3.png" class="image3" />
						</div>
					</div>

					<div class="points_8">
						<PointSVG />
					</div>
				</section>
			</div>
		</div>
	</section>

	<section id="benefits" class="section">
		<div class="columns">
			<div class="column">
				<div class="content has-text-left">
					<h1 class="title-underline has-text-white">
						{{ t("benefits.a") }}
					</h1>
					<p v-for="i in 6" :key="'benefits.list' + i">
						<i
							:class="
								t(
									'benefits.list.' + (i - 1).toString() + '.a'
								) + 'icon-margin'
							"
						></i>
						{{ t("benefits.list." + (i - 1).toString() + ".b") }}
					</p>

					<h2 class="has-text-white">{{ t("benefits.help") }}</h2>
					<div class="columns" style="width: 100% !important">
						<div class="column is-8">
							<div class="field">
								<div class="control has-floating-label">
									<input
										class="input is-medium with-floating-label"
										id="suscribe"
										placeholder=" "
										type="text"
										required
										autocomplete="off"
									/>
									<label
										class="label is-floating-label"
										for="suscribe"
										>e-mail</label
									>
								</div>
							</div>
						</div>
						<div class="column btn-content">
							<button
								class="button is-white is-outlined btn-send"
								onclick="suscribeForm()"
							>
								{{ t("benefits.send") }}
							</button>
						</div>
					</div>
				</div>
			</div>
			<div class="column is-6 column-trading">
				<Tradingview />
			</div>
		</div>
	</section>

	<section class="hero">
		<div class="hero-body secundary">
			<div class="container">
				<section id="service_info" class="section">
					<div class="columns reverse-columns">
						<div class="column is-5">
							<Image img="image2.png" class="image2" />
						</div>
						<div class="column">
							<div class="content">
								<h1 class="title-underline has-text-left">
									{{ t("service_info.a") }}
								</h1>
								<ul class="has-text-left has-text-gray">
									<li
										v-for="i in 3"
										:key="'service_info.b' + i"
									>
										{{
											t(
												"service_info.b." +
													(i - 1).toString()
											)
										}}
									</li>
								</ul>
							</div>
						</div>
					</div>

					<div class="points_6">
						<PointSVG />
					</div>

					<div class="points_7 is-hidden-mobile">
						<PointSVG />
					</div>
				</section>
			</div>
		</div>
	</section>

	<section class="hero">
		<div class="hero-body secundary">
			<div class="container">
				<section id="friendly" class="section">
					<div class="columns">
						<div class="column">
							<div class="content">
								<h1 class="title-underline has-text-left">
									{{ t("friendly.a") }}
								</h1>
								<p class="subtitle">
									{{ t("friendly.c") }}
								</p>
								<p class="has-text-left has-text-gray">
									{{ t("friendly.b.0.b.1") }}
								</p>
								<p class="has-text-left">
									<router-link
										to="friendly"
										class="has-text-white"
										>{{ t("helper.more") }}</router-link
									>
								</p>
								<a
									target="_blank"
									:href="'/dt_app/donations?i18n=' + locale"
									class="button is-primary is-rounded is-outlined"
								>
									{{ t("friendly.d") }}
								</a>
							</div>
						</div>
						<div class="column is-7">
							<Image img="image5.png" class="image5" />
						</div>
					</div>

					<div class="points_4">
						<PointSVG />
					</div>
				</section>
			</div>
		</div>
	</section>

	<section id="fqa" class="section">
		<div class="columns">
			<div class="column is-8 is-offset-2">
				<div class="content is-medium">
					<h1 class="title-underline">{{ t("fqa.a") }}</h1>
					<section class="accordions">
						<article
							v-for="i in 11"
							:key="'fqa.b' + i"
							class="accordion"
							data-aos="zoom-in"
						>
							<div class="accordion-header toggle has-text-white">
								<p>
									{{ t("fqa." + (i - 1).toString() + ".a") }}
								</p>
							</div>
							<div class="accordion-body is-white">
								<div class="accordion-content has-text-white">
									{{ t("fqa." + (i - 1).toString() + ".b") }}
								</div>
							</div>
						</article>
					</section>
				</div>
			</div>
		</div>
	</section>

	<section class="hero">
		<div class="hero-body secundary">
			<div class="container">
				<section id="contact" class="section">
					<div class="columns">
						<div class="column is-8 is-offset-2">
							<div class="content is-medium">
								<h1 class="title-underline">
									{{ t("contact.a") }}
								</h1>
							</div>
						</div>
					</div>
					<div class="columns content">
						<div class="column is-2"></div>
						<div class="column">
							<div class="field">
								<div class="control has-floating-label">
									<input
										class="input is-medium is-white with-floating-label"
										id="name"
										placeholder=" "
										type="text"
										required
										autocomplete="off"
									/>
									<label
										class="label is-floating-label has-text-gray"
										for="name"
									>
										{{ t("contact.b") }}
									</label>
								</div>
							</div>
							<div class="field">
								<div class="control has-floating-label">
									<input
										class="input is-medium is-white with-floating-label"
										id="email"
										placeholder=" "
										type="text"
										required
										autocomplete="off"
									/>
									<label
										class="label is-floating-label has-text-gray"
										for="email"
									>
										{{ t("contact.c") }}
									</label>
								</div>
							</div>

							<div class="field">
								<div class="control has-floating-label">
									<input
										class="input is-medium is-white with-floating-label"
										id="phone"
										placeholder=" "
										type="text"
										required
										autocomplete="off"
									/>
									<label
										class="label is-floating-label has-text-gray"
										for="phone"
									>
										{{ t("contact.d") }}
									</label>
								</div>
							</div>

							<div class="field">
								<div class="control has-floating-label">
									<textarea
										class="textarea is-medium is-white with-floating-label"
										id="message"
										placeholder=" "
										required
										autocomplete="off"
									></textarea>
									<label
										class="label is-floating-label has-text-gray"
										for="message"
									>
										{{ t("contact.e") }}
									</label>
								</div>
							</div>
							<button
								class="button is-primary"
								onclick="contactForm()"
							>
								{{ t("contact.f") }}
							</button>
						</div>
						<div class="column">
							<ul
								class="contacts fa-ul has-text-left has-text-black"
							>
								<li class="address">
									<span class="fa-li"
										><i class="fas fa-map-marker-alt"></i
									></span>
									<p>Digital Trust Company LLC</p>
									<p>1317 Edgewater Dr #1741</p>
									<p>Orlando, FL 32804</p>
									<p>+1 (786) 410-9615</p>
								</li>
								<li class="address">
									<span class="fa-li"
										><i class="fas fa-map-marker-alt"></i
									></span>
									<p>111 Town Square Place, Suite 1203</p>
									<p>Jersey City, NJ, US 07310</p>
									<p>+1 (646) 980-3324</p>
								</li>
								<li class="email">
									<span class="fa-li"
										><i class="fas fa-envelope"></i
									></span>
									<a
										href="mailto: support@digitaltrustonline.net"
										target="_blank"
									>
										support@digitaltrustonline.net
									</a>
								</li>
								<li class="email">
									<span class="fa-li"
										><i class="fab fa-whatsapp"></i
									></span>
									<a
										href="https://wa.me/16469803342?text=Hola, soy un cliente, quiero más información."
										target="_blank"
									>
										Whatsapp +1 (646) 980-3342
									</a>
								</li>
							</ul>
							<br />
						</div>
						<div class="column is-2"></div>
					</div>

					<div class="points_11 is-hidden-mobile">
						<PointSVG />
					</div>

					<div class="points_12">
						<PointSVG />
					</div>
				</section>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import PointSVG from "../components/PointSVG.vue";
import Tradingview from "../components/Tradingview.vue";

const { t, locale } = useI18n();
</script>

<style lang="scss" scoped>
@import "~/styles/variables.scss";

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
		background-image: url("/images/index_3.jpg");
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
