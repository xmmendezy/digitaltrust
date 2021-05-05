<template>
	<b-menu class="has-text-left">
		<ul class="menu-list menu-user">
			<li>
				<a class="icon-text data-user" @click="open()">
					<b-image v-if="has_image_user" :src="require('../assets/images/avatar.png')"></b-image>
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

	public async created() {
		await super.created();
		this.has_image_user = true;
	}

	private async open() {
		this.$emit('open');
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
		}

		a {
			padding-left: 1.75rem;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			margin-bottom: 2rem;

			&.icon-text.is-active {
				background-color: rgba(255, 255, 255, 0);
				color: $gray;
			}
		}

		.router-link-exact-active {
			i {
				color: $primary;
			}
		}

		i {
			color: $border;
		}

		.data-user {
			display: inline-flex;
			width: 100%;
			padding: 0.5em 0.75em;

			.image {
				max-width: 5rem;

				img {
					display: inline;
					height: auto;
				}
			}

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
					font-size: 14px;
					color: $gray;
				}
			}
		}
	}

	.menu-list:not(.menu-user) {
		a {
			color: $gray;
		}
	}
}
</style>
