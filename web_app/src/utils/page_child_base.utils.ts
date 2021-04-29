import ComponentBase from './component_base.utils';

export default abstract class PageChildBase extends ComponentBase {
	public async created() {
		super.created();
		if (await this.store.api.isLogged()) {
			this.auth_data = this.store.api.auth_data;
		}
	}

	public reload(): void {
		return;
	}
}
