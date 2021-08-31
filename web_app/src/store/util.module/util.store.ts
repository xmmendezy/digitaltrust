import { createModule, action, mutation } from 'vuex-class-component';
import { ICountry } from './util.type';
import { HttpBase, ConfigStore, DataDict } from '../store.utils';
import { data_countries } from './util.data';

const VuexModule = createModule({
	namespaced: 'util',
	strict: false,
});

export default class UtilStore extends VuexModule {
	static http: HttpBase;
	static config: ConfigStore;

	static setConfig(http: HttpBase, config: ConfigStore) {
		this.http = http;
		this.config = config;
	}

	public PayPal: {
		client_id: string;
	} = {
		client_id: process.env.VUE_APP_PAYPAL_PUBLIC_KEY,
	};

	public Stripe: {
		public_key: string;
	} = {
		public_key: process.env.VUE_APP_STRIPE_PUBLIC_KEY,
	};

	// prettier-ignore
	public deposit_blockchains: { name: string; currency: string; coingecko: string; image: string }[] =
		process.env.NODE_ENV === 'production'
			? [
				{ name: 'Bitcoin', currency: 'BTC', coingecko: 'bitcoin', image: 'https://www.coinpayments.net/images/coins/BTC.png' },
				{ name: 'Ether', currency: 'ETH', coingecko: 'ethereum', image: 'https://www.coinpayments.net/images/coins/ETH.png' },
				{
					name: 'Tether USD',
					currency: 'USDT',
					coingecko: 'tether',
					image: 'https://www.coinpayments.net/images/coins/USDT.png',
				},
			  ]
			: [{ name: 'Litecoin Testnet', currency: 'LTCT', coingecko: 'litecoin',image: 'https://www.coinpayments.net/images/coins/LTCT.png' }];

	private data_obj: { [key: string]: { [id: string]: (newVal: DataDict, oldVal: DataDict) => void } } = {};

	private data_countries: { [key: string]: ICountry } = data_countries;

	get url() {
		return {
			send_message: `${UtilStore.config.Api}/util/send_message`,
		};
	}

	@action
	public async set_data(data: { key: string; data: DataDict }): Promise<DataDict> {
		if (data.data) {
			const util_data = localStorage.getItem(`data_util_${data.key}`);
			let oldVal: DataDict = null;
			if (util_data) {
				oldVal = JSON.parse(util_data).value;
			}
			localStorage.setItem(`data_util_${data.key}`, JSON.stringify({ value: data.data }));
			if (data.key in this.data_obj) {
				for (const id in this.data_obj[data.key]) {
					this.data_obj[data.key][id](data.data, oldVal);
				}
			}
		} else {
			localStorage.removeItem(`data_util_${data.key}`);
		}
		return data.data;
	}

	@action
	public async get_data(key: string): Promise<DataDict> {
		const data = localStorage.getItem(`data_util_${key}`);
		if (data) {
			return JSON.parse(data).value;
		}
		return null;
	}

	@mutation
	public watch_data(data: {
		key: string;
		id: string;
		callback: null | ((newVal: DataDict, oldVal: DataDict) => void);
	}) {
		if (data.callback) {
			if (this.data_obj[data.key]) {
				if (this.data_obj[data.key][data.id]) {
					const old_callback = this.data_obj[data.key][data.id];
					this.data_obj[data.key][data.id] = (newVal: DataDict, oldVal: DataDict) => {
						old_callback(newVal, oldVal);
						if (data.callback) {
							data.callback(newVal, oldVal);
						}
					};
				} else {
					this.data_obj[data.key][data.id] = data.callback;
				}
			} else {
				this.data_obj[data.key] = {};
				this.data_obj[data.key][data.id] = data.callback;
			}
		} else {
			delete this.data_obj[data.key][data.id];
		}
	}

	@mutation
	public set_countries(countries?: ICountry[]) {
		if (countries) {
			for (const country of countries) {
				this.data_countries[country.id] = country;
			}
		}
	}

	@action
	public async clear_data(key?: string): Promise<void> {
		if (key) {
			await this.set_data({ key, data: null });
		} else {
			for (key in this.data_obj) {
				if (Object.prototype.hasOwnProperty.call(this.data_obj, key)) {
					localStorage.removeItem(`data_util_${key}`);
				}
			}
		}
	}

	@action
	public async get_country(id: string): Promise<ICountry> {
		return this.data_countries[id];
	}

	@action
	public async getCountries(): Promise<ICountry[]> {
		return Object.values(this.data_countries);
	}
}
