<template>
	<div class="ebook">
		<VuePdf v-for="page in numOfPages" :key="page" :src="pdfSrc" :page="page" />
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { VuePdf, createLoadingTask } from 'vue3-pdfjs';

const pdfSrc = new URL('/ebook_1.pdf', import.meta.url).href;
const numOfPages = ref(0);

onMounted(() => {
	const loadingTask = createLoadingTask(pdfSrc);
	loadingTask.promise.then(pdf => {
		numOfPages.value = pdf.numPages;
	});
});
</script>

<route>
{
  meta: {
	  layout: "ebook",
  }
}
</route>
