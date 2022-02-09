<template>
	<div class="blog">
		<template v-if="blogs.length">
			<div class="columns-content">
				<div class="column-content">
					<article class="card" v-for="blog in blogs" :key="blog.id" @click="selectBlog(blog)">
						<div class="card-content media">
							<div class="media-content">
								<div class="content">
									<p class="has-text-left">
										<strong>{{ blog.title }}</strong>
									</p>
									<nav class="level is-mobile">
										<div class="level-left">{{ parseDate(blog.created) }}</div>
									</nav>
								</div>
							</div>
						</div>
					</article>
				</div>
				<div class="column-content main">
					<article v-if="blog" class="blog-main content">
						<nav class="level is-mobile">
							<div class="level-left">
								<p class="has-text-left">
									<strong>{{ blog.title }}</strong>
								</p>
							</div>
							<div class="level-right">
								{{ parseDate(blog.created) }}
							</div>
						</nav>
						<div class="ql-container">
							<div class="blog-description ql-editor" v-html="blog.content"></div>
						</div>
					</article>
				</div>
			</div>
		</template>
		<p v-else class="title has-text-centered mt-6">Sin artículos</p>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useDataStore, IBlog } from '~/store';
import { fromUnixTime, format } from 'date-fns';
import { useRoute } from 'vue-router';

const store = useDataStore();
const route = useRoute();

const emit = defineEmits(['loading']);

const blog = ref<IBlog | undefined>();
const blogs = ref<Array<IBlog>>([]);

emit('loading');
store.blogs().then(bs => {
	blogs.value = bs;
	if (bs.length) {
		if (route.query.id) {
			blog.value = bs.find(b => b.id === route.query.id);
		} else {
			blog.value = bs[0];
		}
	}
	emit('loading');
});

const parseDate = (date: number) => {
	return format(fromUnixTime(date), 'dd/MM/yyyy');
};

const selectBlog = (b: IBlog) => {
	blog.value = b;
};
</script>
