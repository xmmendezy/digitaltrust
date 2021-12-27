<template>
	<div class="admin-notice">
		<div class="columns-content">
			<div class="column-content">
				<template v-if="notices.length">
					<article class="card" v-for="notice in notices" :key="notice.id">
						<div class="card-content media">
							<div class="media-content">
								<div class="content">
									<nav class="level is-mobile">
										<div class="level-left">
											<strong>{{ notice.title }}</strong>
										</div>
										<div class="level-right">
											<nav class="level is-mobile">
												<div class="level-item">{{ parseDate(notice.created) }}</div>
												<div class="level-item">
													<o-button
														variant="primary"
														icon-right="pencil-alt"
														@click="editNotice(notice)"
													></o-button>
												</div>
												<div class="level-item">
													<o-button
														variant="danger"
														icon-right="times"
														@click="deleteNotice(notice.id)"
													></o-button>
												</div>
											</nav>
										</div>
									</nav>
									<p>Cursos: {{ parseCourses(notice.courses) }}</p>
									<p><strong>Descripción</strong></p>
									<div class="notice-description ql-editor" v-html="notice.description"></div>
									<p v-if="notice.url">
										<a :href="notice.url" target="_blank"> Enlace</a>
									</p>
								</div>
							</div>
						</div>
					</article>
				</template>
				<p v-else class="title has-text-centered mt-6">Sin comunicados</p>
			</div>
		</div>

		<o-modal v-model:active="isDeleteNoticeActive" scroll="clip">
			<div class="modal-card alert">
				<header class="modal-card-head">
					<p class="modal-card-title">Eliminar comunicado</p>
				</header>
				<section class="modal-card-body">
					<p>Esta acción no se puede revertir.</p>
				</section>
				<footer class="modal-card-foot">
					<o-button variant="primary" @click="toDeleteNotice">Eliminar</o-button>
					<o-button @click="isDeleteNoticeActive = false">Cancelar</o-button>
				</footer>
			</div>
		</o-modal>
	</div>
</template>

<script setup lang="ts">
import { ref, inject, watch, Ref } from 'vue';
import { useDataStore, INotice, ICourse } from '~/store';
import { fromUnixTime, format } from 'date-fns';

const store = useDataStore();

const emit = defineEmits(['loading']);

const reload_notice = inject<Ref<number>>('reload_notice', { value: 0 } as Ref<number>);

const isDeleteNoticeActive = ref(false);
const notice_delete = ref<string>('');

const courses = ref<Array<ICourse>>([]);

store.courses().then(cs => {
	courses.value = cs;
});

const notices = ref<Array<INotice>>([]);

emit('loading');
store.notices().then(ns => {
	notices.value = ns;
	emit('loading');
});

watch(reload_notice, () => {
	store.notices().then(ns => {
		notices.value = ns;
	});
});

watch(isDeleteNoticeActive, () => {
	if (!isDeleteNoticeActive.value) {
		notice_delete.value = '';
	}
});

const parseDate = (date: number) => {
	return format(fromUnixTime(date), 'dd/MM/yyyy');
};

const parseCourses = (cs: string[]) => {
	if (courses.value.length) {
		return courses.value
			.filter(c => cs.includes(c.id))
			.map(c => c.name)
			.join(', ');
	} else {
		return '---';
	}
};

const deleteNotice = (id: string) => {
	notice_delete.value = id;
	isDeleteNoticeActive.value = true;
};

const toDeleteNotice = () => {
	emit('loading');
	store
		.delete_notice(notice_delete.value)
		.then(error => {
			if (!error) {
				store.notification('Se ha eliminado el comunicado', 'link');
				store.notices().then(ns => {
					notices.value = ns;
				});
			}
		})
		.finally(() => {
			isDeleteNoticeActive.value = false;
			emit('loading');
		});
};

const editNotice = (notice: INotice) => {
	store.notice_edit = notice;
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
