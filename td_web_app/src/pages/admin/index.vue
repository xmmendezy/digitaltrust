<template>
	<div class="admin has-text-centered">
		<o-tabs>
			<o-tab-item value="0" label="Usuarios registrados">
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
			</o-tab-item>
			<o-tab-item value="1" label="Subscritos a la lista de mails">
				<o-button
					icon-right="copy"
					@click="copyClipboard(list_mails, 'Se ha copiado  la lista de correos al portapapeles')"
					>Copiar lista de correos</o-button
				>

				<o-table :data="subscribe_mails">
					<o-table-column field="email" label="Correo" width="300" v-slot="props">
						{{ props.row.email }}
					</o-table-column>
					<o-table-column field="copy" label="Copiar" width="300" v-slot="props">
						<o-button icon-right="copy" @click="copyClipboard(props.row.email)"></o-button>
					</o-table-column>
				</o-table>
			</o-tab-item>
		</o-tabs>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useDataStore, IClient, ISubscribeMail } from '~/store';
import { fromUnixTime, format } from 'date-fns';
import { useClipboard } from '@vueuse/core';

const store = useDataStore();

const emit = defineEmits(['loading']);

const { copy } = useClipboard();

const clients = ref<Array<IClient>>([]);

const subscribe_mails = ref<Array<ISubscribeMail>>([]);

const list_mails = ref('');

emit('loading');
store
	.clients()
	.then(cs => {
		clients.value = cs;
	})
	.finally(() => {
		emit('loading');
	});

store.subscribe_mails().then(sm => {
	subscribe_mails.value = sm;
	list_mails.value = sm.map(m => m.email).join(', ');
});

const parseDate = (date: number) => {
	return format(fromUnixTime(date), 'dd/MM/yyyy HH:mm');
};

const copyClipboard = (value: string | number, message?: string) => {
	copy(value.toString());
	store.notification(message ? message : `Se ha copiado al portapapeles: ${value}`, 'link');
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
