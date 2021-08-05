<template>
	<float-label
		class="c-tel-input"
		:class="{
			'is-active': !!content,
		}"
	>
		<vue-tel-input
			ref="input"
			onkeypress="return /[0-9]/i.test(event.key)"
			v-model="content"
			v-bind="$attrs"
			type="tel"
			@input="updateInput"
			@focus="onfocus"
			@blur="onblur"
			@country-changed="changeCountry"
			@validate="validate"
			:inputOptions="inputOptions"
			:allCountries="allCountries"
		></vue-tel-input>
	</float-label>
</template>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator';
import ComponentBase from '../component_base.utils';

@Component
export default class extends ComponentBase {
	@Prop({ type: String, default: '' }) value!: string;
	@Prop({ type: String, default: '' }) placeholder!: string;

	public allCountries: {
		areaCodes: null;
		dialCode: string;
		iso2: string;
		name: string;
		priority: number;
	}[] = [];

	private content: string = this.value;

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

	get inputOptions() {
		if (this.placeholder) {
			return {
				placeholder: this.placeholder,
			};
		} else {
			return null;
		}
	}

	public async created() {
		this.allCountries = (await this.store.util.getCountries()).map(c => {
			return {
				areaCodes: null,
				dialCode: c.telephone_code?.slice(1) || '',
				iso2: c.code || '',
				name: c.name || '',
				priority: 0,
			};
		});
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
	private changeCountry(event?: any) {
		this.$emit('country-changed', event);
	}

	private validate(event?: any) {
		this.$emit('validate', event);
	}

	public getInputElement() {
		return (this.$refs.input as any).getInputElement();
	}
}
</script>

<style lang="scss">
@import '../../styles/initial_variables.scss';

.c-tel-input {
	.vue-tel-input {
		width: 100%;
		padding: 0.55rem 0;

		.vti__input {
			font-family: $font-family !important;
			font-size: 18px !important;
		}

		&:focus-within {
			-webkit-box-shadow: none;
			box-shadow: none;
			border-color: none;
		}
	}

	&.is-active {
		.vfl-label {
			top: -1.3em;
			pointer-events: all;
			opacity: 1;
		}
	}

	.vfl-label {
		font-family: $font-family !important;
		font-size: 18px !important;
		text-align: left;
	}

	.vfl-label-on-focus {
		color: $primary;
	}

	.vfl-label + .vue-tel-input {
		padding-left: 0;
		font-size: 100%;
		border: 0;
		border-bottom: 1.5px solid $border;
		transition: border 0.2s;
	}

	.vfl-label-on-focus + .vue-tel-input {
		border-bottom: 1.5px solid $primary;
	}
}
</style>
