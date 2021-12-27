<template>
	<div class="admin has-text-centered">
		<p class="has-text-weight-bold">Usuarios registrados</p>
		<o-table :data="clients">
			<o-table-column field="name" label="Nombre" width="300" v-slot="props">
				{{ props.row.name }}
			</o-table-column>

			<o-table-column field="email" label="Correo" width="300" v-slot="props">
				{{ props.row.email }}
			</o-table-column>

			<o-table-column field="course" label="Curso" width="300" v-slot="props">
				{{ props.row.course }}
			</o-table-column>

			<o-table-column field="created" label="Registro" width="300" v-slot="props">
				{{ parseDate(props.row.created) }}
			</o-table-column>

			<o-table-column field="payed" label="Pagado" width="300" position="centered" v-slot="props">
				<fas-check v-if="props.row.payed" class="has-text-success" />
				<fas-times v-else />
			</o-table-column>
		</o-table>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useDataStore, IClient } from '~/store';
import { fromUnixTime, format } from 'date-fns';

const store = useDataStore();

const emit = defineEmits(['loading']);

const clients = ref<Array<IClient>>([]);

emit('loading');
store
	.clients()
	.then(cs => {
		clients.value = cs;
	})
	.finally(() => {
		emit('loading');
	});

const parseDate = (date: number) => {
	return format(fromUnixTime(date), 'dd/MM/yyyy HH:mm');
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
