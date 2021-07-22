<template>
	<b-menu class="has-text-left">
		<ul class="menu-list menu-user">
			<li>
				<a class="icon-text data-user" @click="open()">
					<span class="icon is-small">
						<i class="fas fa-user-circle"></i>
					</span>
					<span class="info-user">
						<font class="name">{{ store.api.name }} </font>
						<font class="email">{{ store.api.email }}</font>
					</span>
				</a>
			</li>
		</ul>
		<b-menu-list>
			<b-menu-item
				icon="dashboard"
				tag="router-link"
				:to="{ name: is_admin ? 'AdminHome' : 'Home' }"
				:label="L('helper.home')"
			></b-menu-item>
			<b-menu-item
				icon="shopping-cart"
				tag="router-link"
				:to="{ name: is_admin ? 'AdminHome' : 'Home' }"
				:label="L('helper.shopping')"
			></b-menu-item>
			<b-menu-item
				v-if="!is_admin"
				icon="hands-helping"
				tag="router-link"
				:to="{ name: 'AppDonations' }"
				:label="L('helper.donations')"
			></b-menu-item>
			<b-menu-item
				id="driver-guide-c-2"
				icon="ellipsis-h"
				tag="router-link"
				:to="{ name: is_admin ? 'AdminSetting' : 'Setting' }"
				:label="L('helper.setting')"
			></b-menu-item>
			<b-menu-item icon="sign-out-alt" @click="logout()" :label="L('helper.logout')"></b-menu-item>
		</b-menu-list>
		<ul v-if="auth_data && auth_data.user && auth_data.user.role === 'user'" class="menu-list contact">
			<li>
				<a href="mailto:support@digitaltrustonline.net" target="_blank" class="icon-text">
					<span class="icon is-small"><i class="fas fa-envelope"></i></span>
					<span> support@digitaltrustonline.net </span>
				</a>
			</li>
			<li>
				<a :href="whatsapp_href" target="_blank" class="icon-text">
					<span class="icon is-small"><i class="fab fa-whatsapp"></i></span>
					<span> Whatsapp </span>
				</a>
			</li>
		</ul>
	</b-menu>
</template>

<script lang="ts">
import ComponentBase from '../utils/component_base.utils';
import { Component } from 'vue-property-decorator';

@Component
export default class Menu extends ComponentBase {
	private has_image_user: boolean = false;
	private is_active: boolean = false;
	private telephone: string = '+16469803342';

	public async created() {
		await super.created();
		this.has_image_user = true;
	}

	private async open() {
		this.$emit('open');
	}

	private get whatsapp_href(): string {
		return `https://wa.me/${this.telephone}?text=Hi, I'm ${this.store.api.name}, I need help.`;
	}
}
</script>

<style lang="scss">
@import '../styles/initial_variables.scss';

.menu {
	.menu-list {
		&.contact {
			position: absolute;
			bottom: 0;
			width: calc(20vw - 1.5rem);

			@include mobile {
				width: 80vw;
			}

			span:not(.icon) {
				white-space: pre-wrap;
				word-wrap: break-word;
			}
		}

		a {
			color: white;
			padding-left: 1.75rem;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			margin-bottom: 2rem;

			&.icon-text.is-active {
				background-color: rgba(255, 255, 255, 0);
				color: white;
				font-weight: bold;
			}

			&:hover {
				background-color: rgba(0, 0, 0, 0.05);
				color: white;
				i {
					color: white;
				}
			}
		}

		.router-link-exact-active {
			i {
				color: $white;
				font-weight: bold;
			}
		}

		i {
			color: $white;
		}

		.data-user {
			.info-user {
				width: 50%;
				padding-top: 1rem;
				padding-left: 1rem;
				padding-right: 1rem;
				white-space: pre-wrap;
				overflow-wrap: break-word;

				.name {
					font-size: 16px;
					font-weight: bold;
				}

				.email {
					padding-left: 2.5rem;
					font-size: 14px;
				}
			}
		}
	}
}
</style>
