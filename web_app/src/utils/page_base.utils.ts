import PageChildBase from './page_child_base.utils';

export default abstract class PageBase extends PageChildBase {
	public async created() {
		super.created();
		await this.loadPage();
	}

	private async loadPage() {
		if (await this.store.auth.isLogged()) {
			this.auth_data = this.store.auth.auth_data;
			if (this.$route.meta.free_page) {
				this.$router.push('/');
			}
		} else {
			if (!this.$route.meta.free_page) {
				await this.logout();
			}
		}
	}
}
