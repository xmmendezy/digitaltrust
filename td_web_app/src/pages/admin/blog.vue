<template>
	<div class="admin-blog">
		<div class="columns-content">
			<div class="column-content">
				<article class="card" @click="newBlog">
					<div class="card-content media">
						<div class="media-content">
							<div class="content">
								<nav class="level is-mobile">
									<div class="level-left"><strong>Nuevo artículo</strong></div>
									<div class="level-right"><fas-plus /></div>
								</nav>
							</div>
						</div>
					</div>
				</article>
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
				<article class="blog-main">
					<nav class="level is-mobile">
						<div class="level-left">
							<o-field label="Título">
								<o-input v-model="blog.title" maxlength="70"></o-input>
							</o-field>
						</div>
						<div class="level-right">
							<nav class="level is-mobile">
								<div class="level-item">
									<o-button variant="primary" @click="toSave">Guardar</o-button>
								</div>
								<div v-if="blog.id" class="level-item">
									<o-button @click="duplicateBlog">Duplicar</o-button>
								</div>
								<div v-if="blog.id" class="level-item">
									<o-button variant="danger" @click="deleteBlog">Eliminar</o-button>
								</div>
								<div class="level-item">
									<o-button @click="newBlog">Cancelar</o-button>
								</div>
							</nav>
						</div>
					</nav>

					<o-field label="Curso">
						<Multiselect
							v-model="blog.courses"
							:options="courses"
							mode="tags"
							placeholder="Seleccionar..."
							noOptionsText="No hay opciones aún"
							noResultsText="No hay opciones aún"
							searchable
						/>
					</o-field>
					<o-field label="Descripción" class="editor description">
						<QuillEditor ref="editor_description" theme="snow" toolbar="full" />
					</o-field>
					<o-field label="Contenido" class="editor content">
						<QuillEditor ref="editor_content" theme="snow" toolbar="full" />
					</o-field>
				</article>
			</div>
		</div>

		<o-modal v-model:active="isDeleteBlogActive" scroll="clip">
			<div class="modal-card alert">
				<header class="modal-card-head">
					<p class="modal-card-title">Eliminar artículo</p>
				</header>
				<section class="modal-card-body">
					<p>Esta acción no se puede revertir.</p>
				</section>
				<footer class="modal-card-foot">
					<o-button variant="primary" @click="toDeleteBlog">Eliminar</o-button>
					<o-button @click="isDeleteBlogActive = false">Cancelar</o-button>
				</footer>
			</div>
		</o-modal>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useDataStore, IBlog, BlogDto, ComponentQuillEditor } from '~/store';
import { fromUnixTime, format } from 'date-fns';

const store = useDataStore();

const emit = defineEmits(['loading']);

const isDeleteBlogActive = ref(false);

const courses = ref<Array<{ value: string; label: string }>>([]);

store.courses().then(cs => {
	courses.value = cs.filter(c => c.blog).map(c => ({ value: c.id, label: c.name }));
});

const editor_description = ref<ComponentQuillEditor>(null as any);
const editor_content = ref<ComponentQuillEditor>(null as any);

const blog = reactive<BlogDto>(new BlogDto(editor_description as any, editor_content as any));
const blogs = ref<Array<IBlog>>([]);

emit('loading');
store.blogs().then(bs => {
	blogs.value = bs;
	emit('loading');
});

const parseDate = (date: number) => {
	return format(fromUnixTime(date), 'dd/MM/yyyy');
};

const selectBlog = (b: IBlog) => {
	emit('loading');
	blog.id = b.id;
	blog.title = b.title;
	blog.courses = b.courses;
	const interval = () => {
		if (blog.editor_description && blog.editor_content && b !== undefined) {
			blog.setDescriptionHTML(b.description);
			blog.setContentHTML(b.content);
			emit('loading');
		} else {
			setTimeout(interval, 100);
		}
	};
	interval();
};

const newBlog = () => {
	emit('loading');
	blog.clean();
	emit('loading');
};

const duplicateBlog = () => {
	emit('loading');
	blog.id = '';
	blog.title = blog.title + ' - Duplicado';
	emit('loading');
};

const deleteBlog = () => {
	isDeleteBlogActive.value = true;
};

const toDeleteBlog = () => {
	emit('loading');
	store
		.delete_blog(blog.id)
		.then(error => {
			if (!error) {
				store.notification('Se ha eliminado el artículo', 'link');
				store.blogs().then(bs => {
					blogs.value = bs;
					newBlog();
				});
			}
		})
		.finally(() => {
			isDeleteBlogActive.value = false;
			emit('loading');
		});
};

const toSave = () => {
	blog.all_courses = courses.value.map(c => c.value);
	emit('loading');
	store
		.blog(blog as BlogDto)
		.then(error => {
			if (!error) {
				store.notification('Se ha guardado el artículo', 'link');
				store.blogs().then(bs => {
					blogs.value = bs;
				});
			}
		})
		.finally(() => {
			emit('loading');
		});
};
</script>

<route>
{
  meta: {
	  layout: "admin",
	  isAdmin: true,
  }
}
</route>
