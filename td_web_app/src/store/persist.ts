import { PiniaPluginContext } from 'pinia';

const exceptions = ['payed', 'base_url', 'notice_edit', 'couse', 'course_data'];

export function piniaPersist({ store }: PiniaPluginContext) {
	store.$subscribe((mutation, state) => {
		if (mutation.storeId === 'data') {
			for (const key in state) {
				if (!exceptions.includes(key)) {
					localStorage.setItem('data_' + key, JSON.stringify({ data: state[key] }));
				}
			}
		}
	});
	if (store.$id === 'data') {
		for (const key in store.$state) {
			if (!exceptions.includes(key)) {
				const value = localStorage.getItem('data_' + key);
				if (value) {
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					store.$state[key] = (JSON.parse(value) as { data: any }).data;
				}
			}
		}
	}
}
