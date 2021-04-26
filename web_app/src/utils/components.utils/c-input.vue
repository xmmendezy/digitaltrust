<template>
	<float-label class="c-input">
		<input
			ref="input"
			:class="{ password }"
			v-model="content"
			@input="updateInput"
			@focus="onfocus"
			@blur="onblur"
			v-bind="$attrs"
			:placeholder="placeholder"
			:type="reveal_password ? type : 'password'"
		/>
		<i
			class="fas"
			:class="reveal_password ? 'fa-eye-slash' : 'fa-eye'"
			v-if="password"
			@click="toggle_password"
		></i>
	</float-label>
</template>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator';
import ComponentBase from '../component_base.utils';

@Component
export default class extends ComponentBase {
	@Prop({ type: String, default: null }) value!: string;
	@Prop({ type: Boolean, default: false }) password!: boolean;
	@Prop({ type: String, default: '' }) placeholder!: string;

	private content: string = this.value;
	private type: string = 'text';
	private reveal_password: boolean = false;

	public async created() {
		this.type = this.$attrs.type || this.type;
		if (!this.password) {
			this.reveal_password = true;
		}
	}

	@Watch('value', { immediate: true })
	private get_new_value(new_value: string) {
		if (this.content !== new_value) {
			this.content = new_value;
			this.$emit('input', this.content);
		}
	}

	@Watch('placeholder', { immediate: true })
	private get_new_placeholder(new_placeholder: string) {
		if (this.placeholder !== new_placeholder) {
			this.placeholder = new_placeholder;
		}
	}

	private onfocus() {
		this.$emit('focus');
	}

	private onblur() {
		this.$emit('blur');
	}

	private updateInput() {
		this.$emit('input', this.content);
	}

	public getInputElement() {
		return (this.$refs.input as any).getInputElement();
	}

	public focus() {
		(this.$refs.input as any).scrollLeft = (this.$refs.input as any).scrollWidth;
		(this.$refs.input as any).setSelectionRange(this.content.length, this.content.length);
		(this.$refs.input as any).focus();
	}

	public toggle_password() {
		this.reveal_password = !this.reveal_password;
		this.focus();
	}
}
</script>

<style lang="scss">
@import '../../styles/initial_variables.scss';

.c-input {
	margin: 3rem 0;

	input {
		font-family: $font-family !important;
		font-size: 18px !important;
		width: 100%;
		padding: 0.8rem 0;

		&.password {
			padding-right: 50px;
		}
	}

	i {
		font-size: 18px !important;
		margin-left: -50px;
		width: 50px;
		color: $primary;
		border: 0;
		-webkit-appearance: none;
	}

	.vfl-label {
		font-family: $font-family !important;
		font-size: 18px !important;
		text-align: left;
	}

	.vfl-label-on-focus {
		color: $primary;
	}

	.vfl-label + input {
		padding-left: 0;
		font-size: 100%;
		border: 0;
		border-bottom: 1.5px solid $border;
		transition: border 0.2s;
	}

	.vfl-label-on-focus + input {
		border-bottom: 1.5px solid $primary;
	}
}
</style>
