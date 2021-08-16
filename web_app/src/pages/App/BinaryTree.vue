<template>
	<div class="binary-tree">
		<div class="body">
			<div class="box">
				<div class="card-content">
					<p class="title has-text-left">
						{{ $t('binary_tree.title') }}
					</p>
					<p class="subtitle has-text-left">
						{{ $t('binary_tree.subtitle') }}
					</p>
					<div class="url-refer">
						<a target="_blank" :href="url_refer">{{ url_refer }}</a>
					</div>
					<TreeChart :json="treeData" />
				</div>

				<b-loading is-full-page v-model="isLoading"></b-loading>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import PageChildBase from '../../utils/page_child_base.utils';
import { Component } from 'vue-property-decorator';
import TreeChart from '../../components/TreeChart.vue';

@Component({
	components: { TreeChart },
})
export default class BinaryTree extends PageChildBase {
	private url_refer: string = '';
	private treeData: any = {};
	private isLoading: boolean = false;

	public async created() {
		await super.created();
		if (this.auth_data && this.auth_data.user) {
			this.url_refer = `https://digitaltrustonline.net/app/register?ref=${this.auth_data.user.id}`;
			this.isLoading = true;
			this.load_form_api(await this.store.api.binary_tree(), async (data: any) => {
				this.treeData = {
					name: this.$t('helper.you'),
					children: data,
				};
				this.isLoading = false;
			});
		}
	}
}
</script>

<style lang="scss">
@import '../../styles/initial_variables.scss';

.binary-tree {
	height: calc(100vh - 6rem);
	overflow-y: scroll;
	padding-right: 1rem;

	@include mobile {
		padding-right: 0.5rem !important;
	}

	.body {
		padding-top: 0.5rem;
		position: relative;

		.box {
			background-color: $box;
			width: 90%;
			border-radius: 24px;
			margin: auto;
			overflow-x: scroll;

			@include mobile {
				width: 100%;
				border-radius: 0;
			}

			.title {
				font-size: 28px;
				padding-bottom: 2rem;
				color: white !important;
			}

			.subtitle {
				font-size: 18px;
				padding-bottom: 1rem;
				margin-bottom: 0;
				color: white !important;
			}

			.url-refer {
				margin-left: auto;
				margin-right: auto;
				margin-top: 1.5rem;
				margin-bottom: 2.5rem;
				font-size: 13px;
				overflow-wrap: break-word;
				border-bottom: 1px solid $border;
				width: 50%;

				@include touch {
					font-size: 10px;
				}

				a {
					color: $white;

					&:hover {
						font-weight: bold;
					}
				}
			}
		}
	}
}
</style>
