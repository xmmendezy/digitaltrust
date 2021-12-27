const data_errors: { [key: string]: string } = {
	e000: 'Ha ocurrido un error',
	'login.error.u1': 'No se ha podido iniciar sessión, confirme que su usuario y contraseña sean validos',
	'login.error.u2': 'No se ha podido iniciar sessión, su contraseña no es valida',
	'login.error.u3': 'No se ha podido iniciar sessión, no ha proporcinado sus credenciales completas',
	'validator.auth.a': 'No puede haber campos vacíos',
	'validator.auth.b': 'El nombre debe ser solo caracteres alfabéticos',
	'validator.auth.c': 'El apellido debe ser solo caracteres alfabéticos',
	'validator.auth.d': 'Debe ser un correo valido',
	'validator.auth.e':
		'La contraseña debe ser solo caracteres alfanuméricos, comenzar con mayúscula y contener al menos un número.',
	'validator.auth.f': 'La contraseña debe tener entre 8 y 50 caracteres',
	'validator.auth.g': 'Las contraseñas no coinciden',
	'validator.auth.i': 'País no valido',
	'validator.auth.k': 'Correo no disponible, ya registrado',
	'validator.auth.l': 'El usuario debe tener solo caracteres alfanuméricos',
	'validator.auth.m': 'Usuario no disponible, ya registrado',
	'course.a': 'No se ha encontrado el curso',
	'course.b': 'El usuario no puede tener más de un curso',
	'invoice.a': 'No se ha podido procesar su pago, por favor contacte a servicio al cliente',
	'invoice.b': 'No se ha podido procesar su pago, confirme que su tarjeta es valida y los datos correctos',
	'validator.editor.a': 'El Título no puede estar vacío',
	'validator.editor.b': 'El Título debe ser solo caracteres alfanuméricos',
	'validator.editor.c': 'No hay países validos',
	'validator.editor.d': 'No puede haber campos vacíos',
	'validator.editor.e': 'Ha ocurrido un error con el formulario'
};

export { data_errors };
