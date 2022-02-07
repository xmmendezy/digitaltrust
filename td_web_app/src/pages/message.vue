<template>
	<div class="message">
		<div class="messages">
			<div
				v-for="message in messages"
				:key="message.id"
				class="card"
				:class="[message.own ? 'card-right' : 'card-left']"
			>
				<header class="card-header">
					<p class="card-header-title">{{ message.own ? 'Yo' : 'Profesor' }}</p>
				</header>
				<div class="card-content">
					<div class="content">
						{{ message.content }}
					</div>
				</div>
				<footer class="card-footer">
					<span class="card-footer-item">{{ parseDateTime(message.created) }}</span>
				</footer>
			</div>
		</div>
		<div class="send-box buttons">
			<o-input
				v-model="message"
				class="message-input"
				maxlength="500"
				type="textarea"
				placeholder="Escribir mensaje..."
			></o-input>
			<o-button class="message-button" variant="primary" icon-left="chevron-right" @click="send">
				Enviar
			</o-button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useDataStore, IMessage } from '~/store';
import { fromUnixTime, format } from 'date-fns';

const message = ref('');
const messages = ref<Array<IMessage>>([]);

const emit = defineEmits(['loading']);

const store = useDataStore();

const load_messages = () => {
	store
		.messages()
		.then(ms => {
			messages.value = ms;
		})
		.finally(() => {
			emit('loading');
			const obj = document.querySelector('.messages');
			if (obj) {
				obj.scrollTo(0, obj.scrollHeight);
			}
		});
};

emit('loading');
load_messages();

const send = () => {
	emit('loading');
	store.message({ content: message.value }).then(error => {
		if (error) {
			store.notification('Error al enviar mensaje', 'danger');
			emit('loading');
		} else {
			message.value = '';
			load_messages();
		}
	});
};

const parseDateTime = (date: number) => {
	return format(fromUnixTime(date), 'dd/MM/yyyy HH:mm');
};
</script>
