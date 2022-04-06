<template>
	<div class="admin-index has-text-centered">
		<o-tabs>
			<o-tab-item value="0" label="Usuarios registrados">
				<div class="has-text-right mb-3">
					<o-button icon-right="plus" @click="modalAddClient">Agregar cliente</o-button>
				</div>

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

					<o-table-column field="created" label="Próximo pago" width="300" v-slot="props">
						{{ props.row.next_payment ? parseDate(props.row.next_payment) : '---' }}
					</o-table-column>

					<o-table-column field="payed" label="Pagado" width="300" position="centered" v-slot="props">
						<fas-check v-if="props.row.payed" class="has-text-success" />
						<fas-times v-else />
					</o-table-column>

					<o-table-column field="message" label="Mensajes" width="300" position="centered" v-slot="props">
						<router-link :to="'/admin/message/' + props.row.id"><fas-envelope-open-text /></router-link>
					</o-table-column>

					<o-table-column field="profile" label="Ver" width="300" position="centered" v-slot="props">
						<fas-user @click="getClient(props.row.id)" />
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
					<o-table-column field="email" label="Correo" v-slot="props">
						{{ props.row.email }}
					</o-table-column>
					<o-table-column field="copy" label="Copiar" width="30" v-slot="props">
						<o-button icon-right="copy" @click="copyClipboard(props.row.email)"></o-button>
					</o-table-column>
				</o-table>
			</o-tab-item>
			<o-tab-item value="2" label="Cursos">
				<div class="has-text-right mb-3">
					<o-button icon-right="save" @click="updateCourses">Guardar</o-button>
					<p class="has-text-danger mt-2">
						Los valores y tiempos actualizados serán validos para cada estudiante una vez que acaben su
						período actual
					</p>
				</div>
				<o-table :data="courses_data">
					<o-table-column field="name" label="Curso" v-slot="props">
						<o-input v-model="props.row.name"> </o-input>
					</o-table-column>
					<o-table-column field="price" label="Precio" width="300" position="centered" v-slot="props">
						<o-input v-model="props.row.price"> </o-input>
					</o-table-column>
					<o-table-column
						field="months"
						label="Meses de clase"
						width="150"
						position="centered"
						v-slot="props"
					>
						<o-input v-model="props.row.months"> </o-input>
					</o-table-column>
					<o-table-column field="is_active" label="Activo" width="150" position="centered" v-slot="props">
						<o-switch v-model="props.row.is_active"> </o-switch>
					</o-table-column>
				</o-table>
			</o-tab-item>
		</o-tabs>

		<o-modal v-model:active="isClientActive" scroll="clip">
			<div class="modal-card">
				<header class="modal-card-head">
					<p class="modal-card-title">Editar cliente</p>
				</header>
				<section class="modal-card-body">
					<div class="columns-content">
						<div class="column-content">
							<p>Datos del Perfil</p>
							<form class="form mb-4">
								<o-field label="Nombre">
									<o-input v-model="client.firstname" maxlength="30"></o-input>
								</o-field>

								<o-field label="Apellido">
									<o-input v-model="client.lastname" maxlength="30"></o-input>
								</o-field>

								<o-field label="País">
									<Multiselect
										v-model="client.country"
										:options="countries"
										placeholder="Seleccionar..."
										noOptionsText="No hay opciones aún"
										noResultsText="No hay opciones aún"
										searchable
									/>
								</o-field>
							</form>

							<p>Datos del curso</p>
							<form class="form">
								<o-field label="Curso">
									<Multiselect
										v-model="client.course"
										:options="courses"
										placeholder="Seleccionar..."
										noOptionsText="No hay opciones aún"
										noResultsText="No hay opciones aún"
										searchable
									/>
								</o-field>

								<o-field v-if="client.course" label="Precio personalizado">
									<o-input
										v-model="client.course_price"
										maxlength="30"
										placeholder="Vacío: precio por defecto"
									></o-input>
								</o-field>

								<o-field v-if="client.course" label="Curso pagado">
									<o-switch v-model="client.payed"> </o-switch>
								</o-field>
							</form>
						</div>
						<div class="column-content">
							<p>Datos del Usuario</p>
							<form class="form mb-4">
								<o-field label="Nombre de usuario">
									<o-input v-model="client.username" maxlength="10"></o-input>
								</o-field>

								<o-field label="Correo">
									<o-input v-model="client.email" maxlength="40"></o-input>
								</o-field>

								<o-field label="Contraseña">
									<o-input v-model="client.password" type="password" maxlength="20" password-reveal>
									</o-input>
								</o-field>

								<o-field label="Confirmar contraseña">
									<o-input
										v-model="client.password_confirm"
										type="password"
										maxlength="20"
										password-reveal
									>
									</o-input>
								</o-field>
							</form>

							<p>Servicios extra</p>
							<form class="form">
								<o-field label="DigitalTrust">
									<fas-check v-if="client.digital_trust" class="has-text-success" />
									<fas-times v-else />
								</o-field>
							</form>
						</div>
					</div>
				</section>
				<footer class="modal-card-foot">
					<o-button icon-right="save" @click="updateClient">Guardar</o-button>
				</footer>
			</div>
		</o-modal>

		<o-modal v-model:active="isAddClientActive" scroll="clip">
			<div class="modal-card">
				<header class="modal-card-head">
					<p class="modal-card-title">Nuevo cliente</p>
				</header>
				<section class="modal-card-body">
					<div class="columns-content">
						<div class="column-content">
							<p>Datos del Perfil</p>
							<form class="form mb-4">
								<o-field label="Nombre">
									<o-input v-model="client.firstname" maxlength="30"></o-input>
								</o-field>

								<o-field label="Apellido">
									<o-input v-model="client.lastname" maxlength="30"></o-input>
								</o-field>

								<o-field label="País">
									<Multiselect
										v-model="client.country"
										:options="countries"
										placeholder="Seleccionar..."
										noOptionsText="No hay opciones aún"
										noResultsText="No hay opciones aún"
										searchable
									/>
								</o-field>
							</form>

							<p>Datos del curso</p>
							<form class="form">
								<o-field label="Curso">
									<Multiselect
										v-model="client.course"
										:options="courses"
										placeholder="Seleccionar..."
										noOptionsText="No hay opciones aún"
										noResultsText="No hay opciones aún"
										searchable
									/>
								</o-field>

								<o-field v-if="client.course" label="Precio personalizado">
									<o-input
										v-model="client.course_price"
										maxlength="30"
										placeholder="Vacío: precio por defecto"
									></o-input>
								</o-field>

								<o-field v-if="client.course" label="Curso pagado">
									<o-switch v-model="client.payed"> </o-switch>
								</o-field>
							</form>
						</div>
						<div class="column-content">
							<p>Datos del Usuario</p>
							<form class="form">
								<o-field label="Nombre de usuario">
									<o-input v-model="client.username" maxlength="10"></o-input>
								</o-field>

								<o-field label="Correo">
									<o-input v-model="client.email" maxlength="40"></o-input>
								</o-field>

								<o-field label="Contraseña">
									<o-input v-model="client.password" type="password" maxlength="20" password-reveal>
									</o-input>
								</o-field>

								<o-field label="Confirmar contraseña">
									<o-input
										v-model="client.password_confirm"
										type="password"
										maxlength="20"
										password-reveal
									>
									</o-input>
								</o-field>
							</form>
						</div>
					</div>
				</section>
				<footer class="modal-card-foot">
					<o-button icon-right="save" @click="addClient">Agregar cliente</o-button>
				</footer>
			</div>
		</o-modal>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useDataStore, IClient, ISubscribeMail, ClientDto, ICourse } from '~/store';
import { fromUnixTime, format } from 'date-fns';
import { useClipboard } from '@vueuse/core';

const store = useDataStore();

const emit = defineEmits(['loading']);

const { copy } = useClipboard();

const clients = ref<Array<IClient>>([]);

const subscribe_mails = ref<Array<ISubscribeMail>>([]);

const list_mails = ref('');

const isAddClientActive = ref(false);

const isClientActive = ref(false);

const client = reactive<ClientDto>(new ClientDto());

const countries = store.countries.map(c => ({ value: c.id, label: c.name }));

const courses = ref<Array<{ value: string; label: string }>>([]);

const courses_data = ref<Array<ICourse>>([]);

const parsePrice = (course: ICourse) => {
	return '$' + course.price + '/90 días';
};

store.courses_all().then(cs => {
	courses_data.value = cs;
	courses.value = cs.map(c => ({ value: c.id, label: c.name + ' - ' + parsePrice(c) }));
});

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

const modalAddClient = () => {
	isAddClientActive.value = true;
	client.empty();
};

const getClient = async (id: string) => {
	emit('loading');
	await store
		.getClient(id)
		.then(c => {
			client.set(c);
			isClientActive.value = true;
		})
		.finally(() => {
			emit('loading');
		});
};

const addClient = async () => {
	emit('loading');
	await store
		.addClient(client)
		.then(error => {
			emit('loading');
			if (error) {
				store.notification('Error al agregar cliente', 'warning');
			} else {
				isAddClientActive.value = false;
				store.notification('Cliente agregado', 'success');
				client.empty();
				store.clients().then(cs => {
					clients.value = cs;
				});
			}
		})
		.catch(() => {
			store.notification('Error al agregar cliente', 'warning');
			emit('loading');
		});
};

const updateClient = async () => {
	emit('loading');
	await store
		.updateClient(client)
		.then(error => {
			emit('loading');
			if (error) {
				store.notification('Error al editar cliente', 'warning');
			} else {
				isClientActive.value = false;
				store.notification('Cliente editado', 'success');
				client.empty();
				store.clients().then(cs => {
					clients.value = cs;
				});
			}
		})
		.catch(() => {
			store.notification('Error al editar cliente', 'warning');
			emit('loading');
		});
};

const updateCourses = async () => {
	emit('loading');
	for (const c of courses_data.value) {
		if (!parseFloat(c.price as any)) {
			store.notification('Ingrese valores de precio validos', 'warning');
			return;
		}
		if (!parseInt(c.months as any)) {
			store.notification('Ingrese número de meses validos', 'warning');
			return;
		}
	}
	await store
		.updateCourses(courses_data.value)
		.then(cs => {
			courses_data.value = cs;
			courses.value = cs.map(c => ({ value: c.id, label: c.name + ' - ' + parsePrice(c) }));
			store.notification('Cursos actualizados', 'success');
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
