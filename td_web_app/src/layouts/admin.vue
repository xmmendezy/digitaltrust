<template>
	<div class="admin">
		<div class="card card-main">
			<header class="card-header">
				<figure class="image is-64x64 logo">
					<img alt="TradingDigital" src="../assets/logo.png" />
				</figure>
				<p class="card-header-title">TradingDigital - Admin</p>
				<AdminHeader class="is-hidden-mobile" />
			</header>
			<div class="card-content">
				<AdminHeader class="is-hidden-tablet" />
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
	<a class="button is-floating is-hidden-mobile" @click="newNotice">
		<i class="fas fa-plus"></i>
	</a>

	<o-modal v-model:active="isNewNoticeActive" scroll="clip">
		<div class="modal-card">
			<header class="modal-card-head">
				<p class="modal-card-title">{{ notice.id ? 'Editar comunicado' : 'Nuevo comunicado' }}</p>
			</header>
			<section class="modal-card-body">
				<o-field label="Título">
					<o-input v-model="notice.title" maxlength="70"></o-input>
				</o-field>
				<o-field label="Curso">
					<Multiselect
						v-model="notice.courses"
						:options="courses"
						mode="tags"
						placeholder="Seleccionar..."
						noOptionsText="No hay opciones aún"
						noResultsText="No hay opciones aún"
						searchable
					/>
				</o-field>
				<o-field label="Enlace (Opcional)">
					<o-input v-model="notice.url" maxlength="70"></o-input>
				</o-field>
				<o-field label="Descripción" class="editor">
					<QuillEditor ref="editor" theme="snow" toolbar="full" />
				</o-field>
			</section>
			<footer class="modal-card-foot">
				<o-button variant="primary" @click="toSave">{{ notice.id ? 'Guardar' : 'Publicar' }}</o-button>
				<o-button v-if="notice.id" @click="toDuplicate">Duplicar</o-button>
				<o-button @click="isNewNoticeActive = false">Cancelar</o-button>
			</footer>
		</div>
	</o-modal>
</template>

<script setup lang="ts">
import { ref, reactive, watch, provide } from 'vue';
import { useDataStore, NoticeDto, ComponentQuillEditor } from '~/store';

const store = useDataStore();

const isLoading = ref(false);

const isNewNoticeActive = ref(false);

const reload_notice = ref(0);

provide('reload_notice', reload_notice);

const editor = ref<ComponentQuillEditor>(null as any);

const notice = reactive<NoticeDto>(new NoticeDto(editor as any));

const changeLoading = () => {
	isLoading.value = !isLoading.value;
};

const courses = ref<Array<{ value: string; label: string }>>([]);

store.courses().then(cs => {
	courses.value = cs.map(c => ({ value: c.id, label: c.name }));
});

const newNotice = () => {
	isNewNoticeActive.value = true;
};

const toDuplicate = () => {
	notice.id = '';
	notice.title = notice.title + ' - Duplicado';
};

watch(isNewNoticeActive, () => {
	if (!isNewNoticeActive.value) {
		notice.clean();
		store.notice_edit = undefined;
	}
});

store.$subscribe(() => {
	if (store.notice_edit !== undefined) {
		isNewNoticeActive.value = true;
		notice.id = store.notice_edit.id;
		notice.title = store.notice_edit.title;
		notice.courses = store.notice_edit.courses;
		const interval = () => {
			if (notice.editor && store.notice_edit !== undefined) {
				notice.setHTML(store.notice_edit.description);
			} else {
				setTimeout(interval, 100);
			}
		};
		interval();
	}
});

const toSave = () => {
	notice.all_courses = courses.value.map(c => c.value);
	isLoading.value = true;
	store
		.notice(notice as NoticeDto)
		.then(error => {
			if (!error) {
				isNewNoticeActive.value = false;
				store.notification('Se ha guardado el comunicado', 'link');
				reload_notice.value = Math.random();
			}
		})
		.finally(() => {
			isLoading.value = false;
		});
};
</script>
