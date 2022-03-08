<template>
	<div class="admin-membership">
		<div class="has-text-right">
			<b-button @click="add()" type="is-primary">{{ $t('admin_membership.add') }}</b-button>
			<b-button @click="save()" type="is-primary">{{ $t('admin_membership.save') }}</b-button>
		</div>
		<b-field class="has-text-right"> </b-field>
		<article class="box">
			<b-table :data="memberships_data" sticky-header :mobile-cards="false">
				<b-table-column
					field="name"
					:label="$t('admin_membership.table.name')"
					header-class="header"
					v-slot="props"
				>
					<div v-if="props.row.id">
						{{ props.row.name }}
					</div>
					<b-input v-else v-model="props.row.name"></b-input>
				</b-table-column>
				<b-table-column
					field="interest"
					:label="$t('admin_membership.table.interest')"
					header-class="header"
					v-slot="props"
				>
					<div v-if="props.row.id">
						{{ (props.row.interest * 100).toFixed(2) }}
					</div>
					<b-input v-else v-model="props.row.interest" type="number"></b-input>
				</b-table-column>
				<b-table-column
					field="months"
					:label="$t('admin_membership.table.months')"
					header-class="header"
					v-slot="props"
				>
					<div v-if="props.row.id">
						{{ props.row.months }}
					</div>
					<b-input v-else v-model="props.row.months" type="number"></b-input>
				</b-table-column>
				<b-table-column
					field="money_a"
					:label="$t('admin_membership.table.money_a')"
					header-class="header"
					v-slot="props"
				>
					<div v-if="props.row.id">
						{{ formatMoney(props.row.money_a) }}
					</div>
					<b-input v-else v-model="props.row.money_a" type="number"></b-input>
				</b-table-column>

				<b-table-column
					field="money_b"
					:label="$t('admin_membership.table.money_b')"
					header-class="header header-center has-text-center"
					v-slot="props"
				>
					<div v-if="props.row.id">
						{{ formatMoney(props.row.money_b) }}
					</div>
					<b-input v-else v-model="props.row.money_b" type="number"></b-input>
				</b-table-column>

				<b-table-column
					field="description_en"
					:label="$t('admin_membership.table.description_en')"
					header-class="header header-center has-text-center"
					v-slot="props"
				>
					<b-input maxlength="500" type="textarea" v-model="props.row.description_en"></b-input>
				</b-table-column>

				<b-table-column
					field="description_es"
					:label="$t('admin_membership.table.description_es')"
					header-class="header header-center has-text-center"
					v-slot="props"
				>
					<b-input maxlength="500" type="textarea" v-model="props.row.description_es"></b-input>
				</b-table-column>

				<b-table-column
					field="is_active"
					:label="$t('admin_membership.table.active')"
					header-class="header header-center has-text-center"
					v-slot="props"
				>
					<div v-if="props.row.id">
						<b-switch v-model="props.row.is_active" type="is-success"> </b-switch>
					</div>
				</b-table-column>

				<b-table-column
					field="trading"
					label="TradingDigital"
					header-class="header header-center has-text-center"
					v-slot="props"
				>
					<b-switch v-model="props.row.trading" type="is-success"> </b-switch>
				</b-table-column>
			</b-table>
			<b-loading :is-full-page="true" v-model="is_loading"></b-loading>
		</article>
	</div>
</template>

<script lang="ts">
import PageChildBase from '../../utils/page_child_base.utils';
import { Component } from 'vue-property-decorator';
import { IMembership } from '../../store';

@Component
export default class Membership extends PageChildBase {
	private memberships_data_org: IMembership[] = [];
	private memberships_data: IMembership[] = [];
	private is_loading: boolean = false;

	public async created() {
		await super.created();
		this.get_memberships();
	}

	public reload() {
		this.get_memberships();
	}

	private async get_memberships() {
		this.load_form_api(await this.store.api.memberships(), (memberships_data: IMembership[]) => {
			this.memberships_data_org = memberships_data.map(m => ({ ...m }));
			this.memberships_data = memberships_data.map(m => ({ ...m }));
		});
	}

	private async add() {
		if (this.memberships_data.length === this.memberships_data_org.length) {
			this.memberships_data = [
				{
					name: '',
					description_es: '',
					description_en: '',
					money_a: 0,
					money_b: 0,
					months: 0,
					interest: 0,
					is_active: true,
					trading: false,
				} as any,
				...this.memberships_data,
			];
		}
	}

	private async save() {
		if (JSON.stringify(this.memberships_data) !== JSON.stringify(this.memberships_data_org)) {
			this.is_loading = true;
			this.load_form_api(
				await this.store.api.update_memberships(this.memberships_data),
				(memberships_data: IMembership[]) => {
					this.memberships_data_org = memberships_data.map(m => ({ ...m }));
					this.memberships_data = memberships_data.map(m => ({ ...m }));
					this.is_loading = false;
				},
			);
		}
	}
}
</script>

<style lang="scss">
@import '../../styles/initial_variables.scss';

.admin-membership {
	height: calc(100vh - 6rem);
	overflow-y: scroll;
	padding-right: 1rem;

	@include mobile {
		padding-right: 0.5rem !important;
	}

	.button {
		margin-inline: 0.5rem;
	}

	.box {
		background-color: $box;
		color: white !important;

		.table-wrapper {
			height: calc(100vh - 12rem);
		}

		.table {
			background-color: transparent;
			color: white !important;
		}

		.header {
			padding-top: 0.9rem;
			padding-bottom: 0.9rem;

			color: white !important;

			&:first-child {
				background: linear-gradient(135deg, #3f84dc, #4086dc) !important;
				padding-left: 3rem;
			}

			&:nth-child(2) {
				background: linear-gradient(135deg, #4086dc, #4189dc) !important;
			}

			&:nth-child(3) {
				background: linear-gradient(135deg, #4189dc, #418bdc) !important;
			}

			&:nth-child(4) {
				background: linear-gradient(135deg, #418bdc, #428ddc) !important;
			}

			&:nth-child(5) {
				background: linear-gradient(135deg, #428ddc, #428edc) !important;
			}

			&:nth-child(6) {
				background: linear-gradient(135deg, #428edc, #438fdc) !important;
			}

			&:nth-child(7) {
				background: linear-gradient(135deg, #438fdc, #438fdd) !important;
			}

			&:nth-child(8) {
				background: linear-gradient(135deg, #438fdc, #438fdd) !important;
			}

			&:last-child {
				background: linear-gradient(135deg, #438fdd, #4390dc) !important;
				padding-right: 3rem;
			}

			&.header-center .th-wrap span {
				&.is-relative {
					width: 90%;
				}
			}
		}

		tbody tr td {
			padding-top: 0.9rem;
			padding-bottom: 0.9rem;

			&:first-child {
				padding-left: 3rem;
			}

			&:last-child {
				padding-right: 3rem;
			}

			input,
			textarea {
				border: 0;
				border-bottom: 1.5px solid $border;
				border-radius: 0;
				transition: border 0.2s;
				box-shadow: none;
				color: white !important;
				background-color: transparent !important;

				&::placeholder {
					color: white !important;
				}

				&:-ms-input-placeholder {
					color: white !important;
				}

				&::-ms-input-placeholder {
					color: white !important;
				}

				&:focus {
					box-shadow: none;
				}
			}
		}
	}
}
</style>
