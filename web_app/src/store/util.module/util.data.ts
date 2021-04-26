import { ICountry } from './util.type';

const data_countries: { [key: string]: ICountry } = {
	'c0771aec-6bc6-425d-a98a-e925e486fa01': {
		id: 'c0771aec-6bc6-425d-a98a-e925e486fa01',
		name: 'Colombia',
		code: 'CO',
		locale: 'es',
		telephone_code: '+57',
		time_zones: [
			{
				id: 'fec4754e-f711-4b2e-921a-3b9dc9fc6ad9',
				value: 'America/Bogota',
			},
		],
	},
	'b9d0adc0-0e8c-4d21-a38c-6eb4bc391b0a': {
		id: 'b9d0adc0-0e8c-4d21-a38c-6eb4bc391b0a',
		name: 'México',
		code: 'MX',
		locale: 'es',
		telephone_code: '+52',
		time_zones: [
			{
				id: '16b144e3-4be4-4eb6-98aa-1045d201b876',
				value: 'America/Mexico_City',
			},
			{
				id: '5468008f-05aa-47af-ada7-59635d5673c0',
				value: 'America/Mazatlan',
			},
			{
				id: '791e5e0e-17c5-4e06-8716-4209e61aab4f',
				value: 'America/Mazatlan',
			},
		],
	},
	'7e0539e2-95dd-436f-9318-f360d8fa02ab': {
		id: '7e0539e2-95dd-436f-9318-f360d8fa02ab',
		name: 'Perú',
		code: 'PE',
		locale: 'es',
		telephone_code: '+51',
		time_zones: [
			{
				id: '7d550516-6216-4699-a594-b7980b0fc73a',
				value: 'America/Lima',
			},
		],
	},
	'b7e7a241-8b46-4c46-8912-cdd820c44a89': {
		id: 'b7e7a241-8b46-4c46-8912-cdd820c44a89',
		name: 'Argentina',
		code: 'AR',
		locale: 'es',
		telephone_code: '+54',
		time_zones: [
			{
				id: '5e6955fd-f849-4830-a617-8a871d26a9c7',
				value: 'America/Buenos_Aires',
			},
		],
	},
	'8324c485-c22d-433d-98d8-f92f2403cd96': {
		id: '8324c485-c22d-433d-98d8-f92f2403cd96',
		name: 'Ecuador',
		code: 'EC',
		locale: 'es',
		telephone_code: '+593',
		time_zones: [
			{
				id: 'e49d115b-f5ff-448b-b486-fea10063e8dc',
				value: 'America/Guayaquil',
			},
			{
				id: '5e5bf159-62c2-468e-9525-a39ea2c4c03e',
				value: 'Pacific/Galapagos',
			},
		],
	},
	'6fb9ef6d-44c6-4ee1-8b18-1f97da51c2d8': {
		id: '6fb9ef6d-44c6-4ee1-8b18-1f97da51c2d8',
		name: 'Estados Unidos',
		code: 'US',
		locale: 'en',
		telephone_code: '+1',
		time_zones: [
			{
				id: '07ff0395-c450-4a26-9763-cc2c452e24f0',
				value: 'America/Chicago',
			},
			{
				id: '43ce5639-ab78-4a32-8980-7124825a6a8a',
				value: 'America/Anchorage',
			},
			{
				id: '160d931b-733e-480f-b633-9e96fa9ea191',
				value: 'America/Los_Angeles',
			},
			{
				id: '60b97e35-2401-4204-ac18-1a20ef3a10d7',
				value: 'America/Phoenix',
			},
			{
				id: '4ee06c65-a716-456e-b945-b4b43f5474a8',
				value: 'America/Denver',
			},
			{
				id: '2f8b1d13-d485-4354-9bc6-5a8956415c19',
				value: 'Pacific/Honolulu',
			},
			{
				id: '0de1cc6f-3b14-4519-9338-773b080e3135',
				value: 'America/New_York',
			},
		],
	},
	'8ce4b68a-7e01-4ea2-b98e-40e481a78f09': {
		id: '8ce4b68a-7e01-4ea2-b98e-40e481a78f09',
		name: 'España',
		code: 'ES',
		locale: 'es',
		telephone_code: '+34',
		time_zones: [
			{
				id: '08dd05bf-0faf-4561-b4c9-ae4f886cdf84',
				value: 'Europe/Madrid',
			},
		],
	},
	'5e53915e-f305-4b09-bf81-0f392ca26570': {
		id: '5e53915e-f305-4b09-bf81-0f392ca26570',
		name: 'Canadá',
		code: 'CA',
		locale: 'en',
		telephone_code: '+1',
		time_zones: [
			{
				id: '3d3eb6a4-0aa2-4d8f-a76e-1f57b60de0fa',
				value: 'America/Regina',
			},
			{
				id: '647a24d9-29bb-4916-9a35-0392dca381d4',
				value: 'America/Winnipeg',
			},
			{
				id: 'afd64b3c-b18a-4af1-a113-cd979ecdb878',
				value: 'America/Halifax',
			},
			{
				id: '2a865dfe-9456-4d58-9eda-1d5145296211',
				value: 'America/Toronto',
			},
			{
				id: 'baf7b0ca-6552-43ad-8ed0-77f2e78f44ee',
				value: 'America/St_Johns',
			},
			{
				id: 'bcb0679b-0c45-4c45-9a76-baa9cd0d20f2',
				value: 'America/Vancouver',
			},
		],
	},
	'c5e764d9-ba4f-4052-93e2-83d58109738e': {
		id: 'c5e764d9-ba4f-4052-93e2-83d58109738e',
		name: 'Bolivia',
		code: 'BO',
		locale: 'es',
		telephone_code: '+591',
		time_zones: [
			{
				id: 'dd8fcf90-5afc-4a10-aded-e57fc6dc6c68',
				value: 'America/La_Paz',
			},
		],
	},
	'e0a9fca2-4d35-4912-bccc-fa4192ec81e4': {
		id: 'e0a9fca2-4d35-4912-bccc-fa4192ec81e4',
		name: 'Brasil',
		code: 'BR',
		locale: 'es',
		telephone_code: '+55',
		time_zones: [
			{
				id: '78adc63f-fecb-49f7-8cbc-3ffb92f5b38b',
				value: 'America/Rio_Branco',
			},
			{
				id: '1714c487-0ee9-48e6-8e91-09ea6171d8bc',
				value: 'America/Manaus',
			},
			{
				id: 'b999093a-340b-418b-909b-acb4bbfccff3',
				value: 'America/Noronha',
			},
			{
				id: 'b2bf573f-c6dd-445a-9a2b-d9b8ff8c2840',
				value: 'America/Belem',
			},
			{
				id: 'd3ee4f51-5555-4e1f-95b0-80776b7ad314',
				value: 'America/Sao_Paulo',
			},
		],
	},
	'a455be64-bb49-45cd-ad87-d1db2df1fbb6': {
		id: 'a455be64-bb49-45cd-ad87-d1db2df1fbb6',
		name: 'Chile',
		code: 'CL',
		locale: 'es',
		telephone_code: '+56',
		time_zones: [
			{
				id: '7a75ed3c-2e5c-4e7f-aecd-d18c390097e0',
				value: 'America/Santiago',
			},
			{
				id: 'b44c756f-b6f6-46d5-9501-15a4f2adbbbd',
				value: 'Pacific/Easter',
			},
		],
	},
	'c2db137d-4faa-4f86-b181-810a497736fc': {
		id: 'c2db137d-4faa-4f86-b181-810a497736fc',
		name: 'Venezuela',
		code: 'VE',
		locale: 'es',
		telephone_code: '+58',
		time_zones: [
			{
				id: '8eb8de71-9c3a-4a8f-9185-ad921306ff6a',
				value: 'America/Caracas',
			},
		],
	},
	'e0bf3ed3-90ee-444c-a5e7-433c4c5deefb': {
		id: 'e0bf3ed3-90ee-444c-a5e7-433c4c5deefb',
		name: 'Costa Rica',
		code: 'CR',
		locale: 'es',
		telephone_code: '+506',
		time_zones: [
			{
				id: 'af892391-df95-4e0c-ad69-471b8e8e6fb0',
				value: 'America/Costa_Rica',
			},
		],
	},
	'e784fabe-cc6b-4673-81dc-9d433dcdc31a': {
		id: 'e784fabe-cc6b-4673-81dc-9d433dcdc31a',
		name: 'El Salvador',
		code: 'SV',
		locale: 'es',
		telephone_code: '+503',
		time_zones: [
			{
				id: '2d311348-79b5-4956-8f1e-5f806a0eb28d',
				value: 'America/El_Salvador',
			},
		],
	},
	'74a20402-2d7e-4d60-91c3-3d90f0bbd411': {
		id: '74a20402-2d7e-4d60-91c3-3d90f0bbd411',
		name: 'Guatemala',
		code: 'GT',
		locale: 'es',
		telephone_code: '+502',
		time_zones: [
			{
				id: '458056f4-76b3-4cb0-853b-7b8d8657a698',
				value: 'America/Guatemala',
			},
		],
	},
	'2c940872-fda0-4302-94df-2ffc7948601b': {
		id: '2c940872-fda0-4302-94df-2ffc7948601b',
		name: 'Honduras',
		code: 'HN',
		locale: 'es',
		telephone_code: '+504',
		time_zones: [
			{
				id: 'dcdaa210-c6fb-45e0-acc0-d321ce1c3b18',
				value: 'America/Tegucigalpa',
			},
		],
	},
	'ec79c66f-b68c-40f2-a587-fa7e1092653e': {
		id: 'ec79c66f-b68c-40f2-a587-fa7e1092653e',
		name: 'Nicaragua',
		code: 'NI',
		locale: 'es',
		telephone_code: '+505',
		time_zones: [
			{
				id: 'fe62bb0e-b6a4-45f0-95b7-c63ab0335803',
				value: 'America/Managua',
			},
		],
	},
	'4286534d-98bf-4b79-b125-a453e4a9aad5': {
		id: '4286534d-98bf-4b79-b125-a453e4a9aad5',
		name: 'Panamá',
		code: 'PA',
		locale: 'es',
		telephone_code: '+507',
		time_zones: [
			{
				id: '7a8b074c-ec0b-449e-9e95-2279b28ca9ee',
				value: 'America/Panama',
			},
		],
	},
	'dbe26aab-ad01-48cb-973d-d5c20dcd42b5': {
		id: 'dbe26aab-ad01-48cb-973d-d5c20dcd42b5',
		name: 'Paraguay',
		code: 'PY',
		locale: 'es',
		telephone_code: '+595',
		time_zones: [
			{
				id: 'd9c30acd-a28d-4b30-a06e-20ea6e140fc7',
				value: 'America/Asuncion',
			},
		],
	},
	'7a87a585-2a2f-4748-93bf-5221dbeb7f67': {
		id: '7a87a585-2a2f-4748-93bf-5221dbeb7f67',
		name: 'Uruguay',
		code: 'UY',
		locale: 'es',
		telephone_code: '+598',
		time_zones: [
			{
				id: 'be7a1b7a-8a7d-4252-a17a-2a0c5e042efc',
				value: 'America/Montevideo',
			},
		],
	},
};

export { data_countries };
