<template>
	<div class="app">
		<div class="body">
			<b-navbar>
				<template #brand>
					<b-navbar-item tag="router-link" :to="{ name: is_admin ? 'AdminHome' : 'Home' }">
						<p class="title has-text-white">{{ $t('title') }}</p>
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
						id="driver-guide-menu"
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
						<p class="title has-text-white">{{ $t('title') }}</p>
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
					<p class="modal-card-title">{{ $t('help-center.title') }}</p>
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
									{{ $t('help-center.' + option + '.title') }}
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
										{{ $t('help-center.' + option + '.guide-me') }}
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
import { pdf } from '../../utils/base.utils';
import { Component, Ref, Vue } from 'vue-property-decorator';
import Menu from '../../components/Menu.vue';
import Driver from 'driver.js';

@Component({
	components: { Menu, pdf },
})
export default class AppBase extends PageBase {
	public error: boolean = false;
	public isOpenSidebar: boolean = true;
	public isReduceSidebar: boolean = true;
	public isOpenModal: boolean = false;
	public isOpenInfoModal: boolean = false;
	public isOpenHelpModal: boolean = false;

	public isOpenCollapse = -1;

	public numPages: number = 0;
	public pdf_src: any = '';

	@Ref('child_page') child_page!: Vue & {
		moveNext: () => void;
		open_withdrawal: () => Promise<void>;
		WithdrawalStep: number;
	};

	public moveNext: () => void = () => {
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
				/* eslint-disable no-console */
				console.clear();
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
		if (this.moveNext) {
			await this.sleep(100);
			this.moveNext();
		}
	}

	public get_helper_texts_i18n(option: string) {
		return [...Array(parseInt(this.$t('help-center.' + option + '.text_count') as string))].map((_, i) =>
			this.$t('help-center.' + option + '.texts.' + i),
		);
	}

	public async driver_gruide(option: string) {
		this.isOpenHelpModal = false;
		await this.sleep(100);
		switch (option) {
			case 'a':
				return this.drive_guide_a();
			case 'b':
				return this.drive_guide_b();
			case 'c':
				return this.drive_guide_c();
			default:
				break;
		}
	}

	public async drive_guide_a() {
		try {
			await this.$router.push({ name: 'Home' });
		} catch (_) {
			_;
		}
		const options = {
			opacity: 0,
			stageBackground: 'transparent',
			doneBtnText: this.$t('helper.done') as string,
			closeBtnText: this.$t('helper.close') as string,
			nextBtnText: this.$t('helper.next') as string,
			prevBtnText: this.$t('helper.prev') as string,
		};
		const driver = new Driver(options);
		const L = (step: number, key: number): string =>
			this.$t(`driver-guide.a.${step}.${key === 1 ? 'title' : 'subtitle'}`) as string;
		this.moveNext = driver.moveNext;
		driver.defineSteps([
			{
				element: '#driver-guide-a-1',
				popover: {
					title: L(1, 1),
					description: L(1, 2),
					position: 'right',
				},
				onNext: async () => {
					driver.preventMove();
					await this.$router
						.push({ name: 'BuyMore' })
						.then(async () => {
							await this.sleep(500);
							driver.highlight({
								element: '#driver-guide-a-2',
								popover: {
									title: L(2, 1),
									description: L(2, 2),
									position: 'top',
								},
							});
						})
						.catch(() => {
							driver.moveNext();
						});
				},
			},
			{
				element: '#driver-guide-a-2',
				popover: {
					title: L(2, 1),
					description: L(2, 2),
					position: 'top',
				},
			},
		]);
		driver.start();
	}

	public async drive_guide_b() {
		try {
			await this.$router.push({ name: 'Home' });
		} catch (_) {
			_;
		}
		const options = {
			opacity: 0,
			stageBackground: 'transparent',
			doneBtnText: this.$t('helper.done') as string,
			closeBtnText: this.$t('helper.close') as string,
			nextBtnText: this.$t('helper.next') as string,
			prevBtnText: this.$t('helper.prev') as string,
			onReset: () => {
				this.child_page.moveNext = () => {
					0;
				};
			},
		};
		const driver = new Driver(options);
		const L = (step: number, key: number): string =>
			this.$t(`driver-guide.b.${step}.${key === 1 ? 'title' : 'subtitle'}`) as string;
		this.moveNext = () => {
			0;
		};
		driver.defineSteps([
			{
				element: '#driver-guide-b-1',
				popover: {
					title: L(1, 1),
					description: L(1, 2),
					position: 'left',
				},
				onNext: async () => {
					driver.preventMove();
					await this.child_page.open_withdrawal();
				},
			},
			{
				element: '#driver-guide-b-1-end',
			},
		]);
		this.child_page.moveNext = () => {
			driver.defineSteps([
				{
					element: '#driver-guide-b-2',
					popover: {
						title: L(2, 1),
						description: L(2, 2),
						position: 'top',
					},
					onNext: () => {
						driver.preventMove();
						(driver as any).overlay.options = {
							...(driver as any).overlay.options,
							onReset: () => {
								0;
							},
						};
						driver.reset();
						this.child_page.moveNext = async () => {
							await this.sleep(100);
							(driver as any).overlay.options = {
								...(driver as any).overlay.options,
								onReset: () => {
									this.child_page.moveNext = () => {
										0;
									};
								},
							};
							driver.defineSteps([
								{
									element: '#driver-guide-b-3',
									popover: {
										title: L(3, 1),
										description: L(3, 2),
										position: 'top',
									},
									onNext: async () => {
										driver.preventMove();
										(driver as any).overlay.options = {
											...(driver as any).overlay.options,
											onReset: () => {
												0;
											},
										};
										driver.reset();
										this.child_page.WithdrawalStep = 1;
										await this.sleep(100);
										this.child_page.moveNext = () => {
											driver.defineSteps([
												{
													element: '#driver-guide-b-4',
													popover: {
														title: L(4, 1),
														description: L(4, 2),
														position: 'top',
													},
												},
											]);
											this.child_page.moveNext = () => {
												0;
											};
											driver.start();
										};
										this.child_page.moveNext();
									},
								},
								{
									element: '#driver-guide-a-3-end',
								},
							]);
							driver.start();
						};
					},
				},
				{
					element: '#driver-guide-a-2-end',
				},
			]);
			driver.start();
		};
		driver.start();
	}

	public async drive_guide_c() {
		try {
			await this.$router.push({ name: 'Home' });
		} catch (_) {
			_;
		}
		const driver = new Driver({
			opacity: 0,
			stageBackground: 'transparent',
			doneBtnText: this.$t('helper.done') as string,
			closeBtnText: this.$t('helper.close') as string,
			nextBtnText: this.$t('helper.next') as string,
			prevBtnText: this.$t('helper.prev') as string,
		});
		const L = (step: number, key: number): string =>
			this.$t(`driver-guide.c.${step}.${key === 1 ? 'title' : 'subtitle'}`) as string;
		this.moveNext = driver.moveNext;
		driver.defineSteps([
			{
				element: '#driver-guide-c-2',
				popover: {
					title: L(2, 1),
					description: L(2, 2),
					position: 'right',
				},
				onNext: async () => {
					driver.preventMove();
					await this.$router
						.push({ name: 'Setting' })
						.then(async () => {
							await this.sleep(250);
							driver.highlight({
								element: '#driver-guide-c-3',
								popover: {
									title: L(3, 1),
									description: L(3, 2),
									position: 'top',
								},
							});
						})
						.catch(() => {
							driver.moveNext();
						});
				},
			},
			{
				element: '#driver-guide-c-3',
				popover: {
					title: L(3, 1),
					description: L(3, 2),
					position: 'top',
				},
			},
		]);
		driver.start();
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
				padding-right: 0;

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
						width: 8%;
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

				@include mobile {
					margin-left: 0;
					padding-top: 0 !important;
					margin-top: 1rem !important;
					padding-right: 0.5rem !important;
				}

				@include tablet {
					flex: none;

					&.column-expand {
						width: 92%;
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
