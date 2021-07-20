<template>
	<div class="app">
		<div class="body">
			<b-navbar>
				<template #brand>
					<b-navbar-item tag="router-link" :to="{ name: 'Home' }">
						<p class="title has-text-white">{{ L('title') }}</p>
					</b-navbar-item>
				</template>

				<template #end>
					<b-navbar-item tag="div">
						<b-dropdown :triggers="['hover']" aria-role="list">
							<template #trigger>
								<b-button
									type="is-ghost"
									class="has-text-white"
									icon-left="globe-americas"
									:label="$i18n.locale"
								/>
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
							type="is-ghost"
							class="has-text-white"
							icon-left="info-circle"
							@click="isOpenInfoModal = true"
						>
						</b-button>
					</b-navbar-item>
					<b-navbar-item v-if="!$isAdmin" tag="div">
						<b-button
							type="is-ghost"
							class="has-text-white"
							icon-left="question"
							@click="isOpenHelpModal = true"
						>
						</b-button>
					</b-navbar-item>
					<b-navbar-item
						id="driver-guide-c-1"
						tag="div"
						class="navbar-burger has-text-white"
						@click="triggerSidebar()"
					>
						<span aria-hidden="true"></span>
						<span aria-hidden="true"></span>
						<span aria-hidden="true"></span>
					</b-navbar-item>
				</template>

				<template #burger>
					<a role="button" class="navbar-burger has-text-white" aria-label="menu" @click="triggerSidebar()">
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
						<p class="title has-text-white">{{ L('title') }}</p>
					</b-navbar-item>
					<a role="button" class="navbar-burger has-text-white" aria-label="menu" @click="triggerSidebar()">
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

		<b-modal v-model="isOpenHelpModal" has-modal-card class="modal-help">
			<div class="modal-card">
				<header class="modal-card-head">
					<p class="modal-card-title">{{ L('help-center.title') }}</p>
				</header>
				<section class="modal-card-body">
					<b-collapse
						class="card"
						animation="slide"
						v-for="(option, index) of ['a', 'b', 'c']"
						:key="'help-' + option"
						:open="isOpenCollapse == index"
						@open="isOpenCollapse = index"
					>
						<template #trigger="props">
							<div class="card-header" role="button">
								<p class="card-header-title">
									{{ L('help-center.' + option + '.title') }}
								</p>
								<a class="card-header-icon">
									<b-icon :icon="props.open ? 'chevron-up' : 'chevron-down'"> </b-icon>
								</a>
							</div>
						</template>
						<div class="card-content">
							<div class="content">
								<p
									v-for="(text, i) of get_helper_texts_i18n(option)"
									:key="'help-' + option + '-' + i"
									class="has-text-left"
								>
									{{ text }}
								</p>
								<p class="has-text-right">
									<b-button type="is-primary" outlined @click="driver_gruide(option)">
										{{ L('help-center.' + option + '.guide-me') }}
									</b-button>
								</p>
							</div>
						</div>
					</b-collapse>
				</section>
			</div>
		</b-modal>
	</div>
</template>

<script lang="ts">
import PageBase from '../../utils/page_base.utils';
import { Component, Ref, Vue } from 'vue-property-decorator';
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

	private isOpenCollapse = -1;

	private numPages: number = 0;
	private pdf_src: any = '';

	@Ref('child_page') child_page!: Vue & {
		moveNext: () => void;
		open_deposit: () => Promise<void>;
		open_withdrawal: () => Promise<void>;
		DepositStep: number;
		WithdrawalStep: number;
	};

	private moveNext: () => void = () => {
		0;
	};

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

	private statusSidebar() {
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

	private async triggerSidebar() {
		const w = window.innerWidth;
		if (w <= 768) {
			this.isOpenModal = !this.isOpenModal;
		} else if (w >= 769) {
			this.isReduceSidebar = !this.isReduceSidebar;
		}
		if (this.moveNext) {
			await this.sleep(100);
			this.moveNext();
		}
	}

	private get_helper_texts_i18n(option: string) {
		return [...Array(parseInt(this.L('help-center.' + option + '.text_count')))].map((_, i) =>
			this.L('help-center.' + option + '.texts.' + i),
		);
	}
}
</script>

<style lang="scss">
@import '../../styles/initial_variables.scss';

.app {
	background-image: linear-gradient(135deg, $primary, #45bff6) !important;

	.body {
		height: 100%;
		position: relative;

		.navbar {
			background-color: $box;

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

					&:hover {
						background-color: $box-hover;
					}
				}

				.navbar-item.navbar-burger {
					height: 100%;
				}
			}
		}

		.section-main {
			height: calc(100vh - 2.75rem);

			.b-sidebar {
				padding-bottom: 0;

				@include mobile {
					display: none;
				}

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
					background-color: $box;
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
				padding-right: 2rem;
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
					padding-top: 0 !important;
					margin-top: 1rem !important;
					padding-right: 0.5rem !important;
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

	.dropdown-content {
		background-color: $box;

		.dropdown-item {
			color: white;

			&:hover {
				background-color: $box-hover;
			}
		}
	}

	.modal-menu {
		.modal-background {
			background-image: linear-gradient(135deg, $primary, #45bff6) !important;
		}

		.animation-content,
		.modal-card {
			background-color: transparent !important;
		}

		.modal-card-head {
			background-color: $box;
			padding: 0 0 0 1.65rem;
			border-bottom: 1px solid $box;

			.title {
				font-size: 24px !important;
				margin: 0 !important;
				font-weight: bold !important;
			}
		}

		.modal-card-body {
			background-color: $box;
		}
	}

	.modal-info {
		.animation-content {
			max-width: 70vw !important;
		}

		.modal-card {
			height: 90vh;
			width: 70vw;
		}
	}

	.modal-help {
		.modal-card {
			height: 100%;
		}
	}
}
</style>
