<template>
	<div class="columns partial" :class="[active ? 'mrg-1' : 'mrg-2']">
		<div class="column text">
			<h1 class="title is-size-3 is-size-5-mobile has-text-black">
				We build lasting alliances, giving mind and heart, with each of the services we provide.
			</h1>
			<template v-if="!active">
				<p class="subtitle is-size-4 is-size-6-mobile has-text-black mt-6">
					Complete the following form, and we will contact you to help you with your loan.
				</p>
				<button class="button is-primary is-rounded mt-6 is-medium" @click="active = true">
					Start the form
				</button>
			</template>
		</div>
	</div>
	<div v-if="active" class="form">
		<div v-if="activeView === 1" ref="form1">
			<Input v-model="data.data_1" label="Lead Source" />
			<div class="columns">
				<div class="column"><Input v-model="data.data_2" label="Date" /></div>
				<div class="column"><Input v-model="data.data_3" label="Fronter" /></div>
			</div>
			<Input v-model="data.data_4" label="Prospect's Name" />
			<div class="columns">
				<div class="column"><Input v-model="data.data_5" label="Age" /></div>
				<div class="column"><Switch v-model="data.data_6" label="Married/Single" /></div>
			</div>
			<Input v-model="data.data_7" label="Address" />
			<div class="columns">
				<div class="column"><Input v-model="data.data_8" label="City" /></div>
				<div class="column"><Input v-model="data.data_9" label="State" /></div>
				<div class="column"><Input v-model="data.data_10" label="Zip" /></div>
			</div>
		</div>
		<div v-if="activeView === 2" ref="form2">
			<div class="columns">
				<div class="column"><Input v-model="data.data_11" label="Prospect's Occupation" /></div>
				<div class="column"><Input v-model="data.data_12" label="Spouse's Occupation" /></div>
			</div>
			<div class="columns">
				<div class="column"><Input v-model="data.data_13" label="Spouse's Name" /></div>
				<div class="column"><Input v-model="data.data_14" label="Amount Qualified" /></div>
			</div>
			<div class="columns">
				<div class="column"><Input v-model="data.data_15" label="Home #" /></div>
				<div class="column"><Input v-model="data.data_16" label="Cellular #" /></div>
			</div>
			<div class="columns">
				<div class="column"><Input v-model="data.data_17" label="Business #" /></div>
				<div class="column"><Input v-model="data.data_18" label="Fax #" /></div>
			</div>
			<div class="columns">
				<div class="column"><Input v-model="data.data_19" label="Email" /></div>
				<div class="column"><Input v-model="data.data_20" label="Other #" /></div>
			</div>
		</div>
		<div v-if="activeView === 3" ref="form3">
			<Input v-model="data.data_21" label="Prospects/Spouse's Combined Annual Income" />
			<div class="columns">
				<div class="column"><Input v-model="data.data_22" label="Cash liquid" /></div>
				<div class="column"><Input v-model="data.data_23" label="Stocks or Mutual Funds" /></div>
			</div>
			<div class="columns">
				<div class="column"><Input v-model="data.data_24" label="Equity Line of Credit (2nd Mortgage)" /></div>
				<div class="column"><Input v-model="data.data_25" label="C.D. (Certificate of Deposit)" /></div>
			</div>
			<div class="columns">
				<div class="column"><Switch v-model="data.data_26" label="MC" /></div>
				<div class="column"><Switch v-model="data.data_27" label="VISA" /></div>
				<div class="column"><Switch v-model="data.data_28" label="AX" /></div>
			</div>
			<Input v-model="data.data_29" label="Notes" />
		</div>
		<div v-if="activeView === 4" ref="form4">
			<p class="subtitle is-size-4 is-size-6-mobile has-text-black mt-6">Follow Up Appointment</p>
			<div class="columns">
				<div class="column"><Input v-model="data.data_30" label="Date" /></div>
				<div class="column"><Input v-model="data.data_31" label="Costa Rica Time" /></div>
				<div class="column"><Input v-model="data.data_32" label="Prospect Time" /></div>
			</div>
			<Input v-model="data.data_33" label="Notes" />
			<p class="subtitle is-size-4 is-size-6-mobile has-text-black mt-6">1ST CALL BACK</p>
			<div class="columns">
				<div class="column"><Input v-model="data.data_34" label="Date" /></div>
				<div class="column"><Input v-model="data.data_35" label="Costa Rica Time" /></div>
				<div class="column"><Input v-model="data.data_36" label="Prospect Time" /></div>
			</div>
			<div class="columns">
				<div class="column"><Input v-model="data.data_37" label="Trk #" /></div>
				<div class="column"><Input v-model="data.data_38" label="Rtn #" /></div>
			</div>
			<Input v-model="data.data_39" label="Notes" />
		</div>
		<div class="navigation columns mt-4">
			<div class="column has-text-left">
				<button v-if="activeStep > 1" class="button is-primary" @click="activeStep--">
					<fas-chevron-left />
				</button>
				<router-link v-if="activeStep === 1" to="/" class="button is-primary"> Back to home </router-link>
			</div>
			<div class="column has-text-right">
				<button v-if="activeStep < 4" class="button is-primary" @click="activeStep++">
					<fas-chevron-right />
				</button>
				<router-link v-if="activeStep === 4" to="/" class="button is-primary">
					<fas-envelope class="mr-2" /> Send
				</router-link>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { watch, ref, Ref } from 'vue';
import { useHead } from '@vueuse/head';
import { templateRef } from '@vueuse/core';
import { useMotion } from '@vueuse/motion';

useHead({
	title: 'Contact us - BlackRockLoans',
});

const active = ref(false);
const activeStep = ref(1);
const activeView = ref(1);

const form1 = templateRef<HTMLElement>('form1');
const form2 = templateRef<HTMLElement>('form2');
const form3 = templateRef<HTMLElement>('form3');
const form4 = templateRef<HTMLElement>('form4');

const variants = ref<Array<Ref<'leave_left' | 'leave_right' | 'initial'>>>([]);

[form1, form2, form3, form4].map((form, i) => {
	const { variant } = useMotion(form, {
		initial: {
			x: 0,
			opacity: 1,
		},
		leave_left: {
			x: -1000,
			opacity: 0,
			transition: {
				duration: 400,
				ease: 'easeInOut',
				onComplete: () => {
					variant.value = 'initial';
					activeView.value = activeStep.value;
				},
			},
		},
		leave_right: {
			x: 1000,
			opacity: 0,
			transition: {
				duration: 400,
				ease: 'easeInOut',
				onComplete: () => {
					variant.value = 'initial';
					activeView.value = activeStep.value;
				},
			},
		},
	});
	variants.value.push(variant);
});

watch(activeStep, (nv, ov) => {
	const variant = variants.value[nv - 1];
	const variant_old = variants.value[ov - 1];
	if (nv > ov) {
		variant.value = 'leave_right';
		variant_old.value = 'leave_left';
	} else {
		variant.value = 'leave_left';
		variant_old.value = 'leave_right';
	}
});

const data = ref({
	data_1: '',
	data_2: '',
	data_3: '',
	data_4: '',
	data_5: '',
	data_6: false,
	data_7: '',
	data_8: '',
	data_9: '',
	data_10: '',
	data_11: '',
	data_12: '',
	data_13: '',
	data_14: '',
	data_15: '',
	data_16: '',
	data_17: '',
	data_18: '',
	data_19: '',
	data_20: '',
	data_21: '',
	data_22: '',
	data_23: '',
	data_24: '',
	data_25: '',
	data_26: '',
	data_27: '',
	data_28: '',
	data_29: '',
	data_30: '',
	data_31: '',
	data_32: '',
	data_33: '',
	data_34: '',
	data_35: '',
	data_36: '',
	data_37: '',
	data_38: '',
	data_39: '',
});
</script>

<style lang="scss" scoped>
@import '~/styles/variables.scss';

.partial {
	width: 60vw;
	margin: auto;
	margin-bottom: 6vh !important;
	transition: all 0.5s ease;

	&.mrg-1 {
		margin-top: 1vh;
	}

	&.mrg-2 {
		margin-top: 15vh;
	}

	@include touch {
		width: 95vw;

		&.mrg-2 {
			margin-top: 15vh;
		}
	}

	.text {
		margin-top: 5vh;
		text-align: center;

		@include touch {
			margin-top: 0;
		}

		.subtitle {
			width: 90%;
			margin: auto;

			@include touch {
				width: 100%;
			}
		}
	}
}

.form {
	margin-bottom: 10vh !important;

	& > * {
		width: 60vw;
		margin: auto;
	}

	.navigation {
		transition: all 0.4s ease;
	}
}
</style>
