<template>
	<div>404</div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

router.push('/');
</script>

<route>
{
  meta: {
	  layout: "auth",
	  isFree: true,
  }
}
</route>
