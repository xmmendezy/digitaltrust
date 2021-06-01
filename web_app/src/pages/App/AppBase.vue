<template>
	<div class="app">
		<div class="body">
			<b-navbar>
				<template #brand>
					<b-navbar-item tag="router-link" :to="{ name: 'Home' }">
						<p class="title has-text-primary">{{ L('title') }}</p>
					</b-navbar-item>
				</template>

				<template #end>
					<b-navbar-item tag="div">
						<b-dropdown :triggers="['hover']" aria-role="list">
							<template #trigger>
								<b-button type="is-ghost" icon-left="globe-americas" :label="$i18n.locale" />
							</template>
							<b-dropdown-item
								v-for="(lang, i) in ['en', 'es']"
								:key="`Lang${i}`"
								@click="$i18n.locale = lang"
							>
								{{ lang }}
							</b-dropdown-item>
						</b-dropdown>
					</b-navbar-item>
					<b-navbar-item v-if="!$isAdmin" tag="div">
						<b-button
							type="is-text"
							class="has-text-primary"
							icon-left="info-circle"
							@click="isOpenInfoModal = true"
						>
						</b-button>
					</b-navbar-item>
					<b-navbar-item v-if="!$isAdmin" tag="div">
						<b-button
							type="is-text"
							class="has-text-primary"
							icon-left="question"
							@click="isOpenHelpModal = true"
						>
						</b-button>
					</b-navbar-item>
					<b-navbar-item tag="div" class="navbar-burger" @click="triggerSidebar()">
						<span aria-hidden="true"></span>
						<span aria-hidden="true"></span>
						<span aria-hidden="true"></span>
					</b-navbar-item>
				</template>

				<template #burger>
					<a role="button" class="navbar-burger" aria-label="menu" @click="triggerSidebar()">
						<span aria-hidden="true"></span>
						<span aria-hidden="true"></span>
						<span aria-hidden="true"></span>
					</a>
				</template>
			</b-navbar>
			<section class="section-main" :class="{ columns: isOpenSidebar }">
				<b-sidebar
					position="static"
					fullheight
					v-model="isOpenSidebar"
					:reduce="isReduceSidebar"
					class="column"
					:class="[isReduceSidebar ? 'column-reduce' : 'column-expand']"
				>
					<Menu @open="triggerSidebar()" />
				</b-sidebar>
				<div class="column content-main" :class="[isReduceSidebar ? 'column-expand' : 'column-reduce']">
					<transition name="fade" mode="out-in">
						<router-view ref="child_page" @emit-error="error = true"></router-view>
					</transition>
				</div>
			</section>
		</div>

		<b-modal v-model="isOpenModal" full-screen has-modal-card :can-cancel="[]" class="modal-menu">
			<div class="modal-card" style="width: auto">
				<header class="modal-card-head">
					<b-navbar-item tag="router-link" :to="{ name: 'Home' }">
						<p class="title has-text-primary">{{ L('title') }}</p>
					</b-navbar-item>
					<a role="button" class="navbar-burger" aria-label="menu" @click="triggerSidebar()">
						<span aria-hidden="true"></span>
						<span aria-hidden="true"></span>
						<span aria-hidden="true"></span>
					</a>
				</header>
				<section class="modal-card-body">
					<Menu @open="triggerSidebar()" />
				</section>
			</div>
		</b-modal>

		<b-modal v-model="isOpenInfoModal" has-modal-card class="modal-info">
			<div class="modal-card">
				<section class="modal-card-body">
					<div v-for="i in numPages" :key="i" class="pdf-page">
						<pdf :src="pdf_src" :page="i"></pdf>
					</div>
				</section>
			</div>
		</b-modal>

		<b-modal v-model="isOpenHelpModal" has-modal-card class="modal-info">
			<div class="modal-card">
				<section class="modal-card-body">Hola</section>
			</div>
		</b-modal>
	</div>
</template>

<script lang="ts">
import PageBase from '../../utils/page_base.utils';
import { Component } from 'vue-property-decorator';
import Menu from '../../components/Menu.vue';
import pdf from 'vue-pdf';

@Component({
	components: { Menu, pdf },
})
export default class AppBase extends PageBase {
	private error: boolean = false;
	private isOpenSidebar: boolean = true;
	private isReduceSidebar: boolean = true;
	private isOpenModal: boolean = false;
	private isOpenInfoModal: boolean = false;
	private isOpenHelpModal: boolean = false;

	public numPages: number = 0;
	public pdf_src: any = '';

	public async created() {
		await super.created();
		this.$i18n.locale = this.store.api.country.locale || 'en';
		this.statusSidebar();
		window.addEventListener('resize', this.statusSidebar);
		this.reload();
		this.$watch('$route', () => {
			this.statusSidebar();
		});
		this.$watch('isOpenInfoModal', async () => {
			this.pdf_src = await pdf.createLoadingTask(this.publicPath + 'doc5_' + this.$i18n.locale + '.pdf');
			this.pdf_src.promise.then((pdf: { numPages: number }) => {
				this.numPages = pdf.numPages;
			});
		});
	}

	public statusSidebar() {
		const w = window.innerWidth;
		if (w <= 768) {
			this.isOpenModal = false;
			this.isOpenSidebar = false;
			this.isReduceSidebar = true;
		} else if (w >= 769 && w <= 1023) {
			this.isOpenModal = false;
			this.isOpenSidebar = true;
			this.isReduceSidebar = true;
		} else {
			this.isOpenModal = false;
			this.isOpenSidebar = true;
			this.isReduceSidebar = true;
		}
	}

	public async triggerSidebar() {
		const w = window.innerWidth;
		if (w <= 768) {
			this.isOpenModal = !this.isOpenModal;
		} else if (w >= 769) {
			this.isReduceSidebar = !this.isReduceSidebar;
		}
	}
}
</script>

<style lang="scss">
@import '../../styles/initial_variables.scss';

.app {
	.body {
		height: 100%;
		position: relative;

		.navbar {
			border-bottom: 1px solid $border;

			.navbar-brand {
				padding-left: 1.5rem;

				.title {
					font-size: 24px !important;
					margin: 0 !important;
					font-weight: bold !important;
				}
			}

			.navbar-end {
				padding-right: 2.5rem;

				.button {
					text-decoration: none !important;
				}

				.navbar-item.navbar-burger {
					height: 100%;
				}
			}
		}

		.section-main {
			height: 100%;

			@include tablet-only {
				height: calc(100vh - 2.75rem);
			}

			@include desktop {
				height: calc(100vh - 3.5rem);
			}

			.b-sidebar {
				padding-bottom: 0;

				@include tablet {
					flex: none;

					&.column-expand {
						width: 30%;
					}
					&.column-reduce {
						transition: width 150ms ease-out;
						width: 12%;
					}
				}

				@include widescreen-only {
					flex: none;

					&.column-expand {
						width: 20%;
					}
					&.column-reduce {
						transition: width 150ms ease-out;
						width: 8%;
					}
				}

				@include fullhd {
					flex: none;

					&.column-expand {
						width: 20%;
					}
					&.column-reduce {
						transition: width 150ms ease-out;
						width: 6%;
					}
				}

				.sidebar-content {
					background-color: white !important;
					height: 100%;
					padding-top: 1rem;

					&.is-mini {
						.menu-list {
							li {
								a {
									span:nth-child(2) {
										display: none;
									}
								}
								ul {
									padding-left: 0;
									li {
										a {
											display: inline-block;
										}
									}
								}
							}
						}
						.menu-label:not(:last-child) {
							margin-bottom: 0;
						}
					}
				}
			}

			&:not(.columns) {
				.content-main {
					padding-right: 1.5rem;
				}
			}

			.content-main {
				transition: width 150ms ease-out;
				padding-top: 1.5rem;
				padding-right: 3rem;
				margin-left: 1rem;

				.donations {
					height: 100%;

					.body {
						padding-top: 0;
						height: 100%;
					}
				}

				@include mobile {
					margin-left: 0;
					padding-top: 1rem !important;
					padding-right: 1rem !important;
				}

				@include tablet {
					flex: none;

					&.column-expand {
						width: 88%;
					}
					&.column-reduce {
						transition: width 120ms ease-out;
						width: 70%;
					}
				}

				@include widescreen-only {
					flex: none;

					&.column-expand {
						width: 92%;
					}
					&.column-reduce {
						transition: width 120ms ease-out;
						width: 80%;
					}
				}

				@include fullhd {
					flex: none;

					&.column-expand {
						width: 94%;
					}
					&.column-reduce {
						transition: width 120ms ease-out;
						width: 80%;
					}
				}
			}
		}
	}

	.modal-menu {
		.modal-card-head {
			background-color: white;
			padding: 0 0 0 1.75rem;

			.title {
				font-size: 24px !important;
				margin: 0 !important;
				font-weight: 500 !important;
			}
		}
	}

	.modal-info {
		.animation-content {
			max-width: 70vw !important;
		}

		.modal-card {
			height: 90vh;
			width: 70vw;

			.modal-card-body {
				p {
					padding: 1.5rem;
				}
			}
		}
	}
}
</style>
