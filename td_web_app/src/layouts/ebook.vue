<template>
	<div class="ebook-layout">
		<div class="card card-main">
			<header class="card-header">
				<figure class="image is-64x64 logo">
					<img alt="TradingDigital" src="../assets/logo.png" />
				</figure>
				<p class="card-header-title">TradingDigital</p>
				<MainHeader class="is-hidden-mobile" />
			</header>
			<div class="card-content">
				<MainHeader class="is-hidden-tablet" />
				<div style="position: relative">
					<router-view v-slot="{ Component, route }">
						<transition :name="route.meta.transitionName">
							<component :is="Component" @loading="changeLoading" />
						</transition>
					</router-view>
					<o-loading v-model:active="isLoading"></o-loading>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useDataStore } from '~/store';

const store = useDataStore();

const isLoading = ref(false);

const changeLoading = () => {
	isLoading.value = !isLoading.value;
};

store.myCourse().then(c => {
	store.course = c.id;
	store.course_data = c;
});
</script>
