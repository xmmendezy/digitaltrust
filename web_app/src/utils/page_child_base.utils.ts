import ComponentBase from './component_base.utils';

export default abstract class PageChildBase extends ComponentBase {
	public async created() {
		super.created();
		if (await this.store.auth.isLogged()) {
			this.auth_data = this.store.auth.auth_data;
		}
	}

	public reload(): void {
		return;
	}
}
