import PageChildBase from './page_child_base.utils';

export default abstract class PageBase extends PageChildBase {
	public async created() {
		super.created();
		await this.loadPage();
	}

	private async loadPage() {
		if (await this.store.api.isLogged()) {
			this.auth_data = this.store.api.auth_data;
			if (this.$route.meta.free_page) {
				this.$router.push({ name: this.is_admin ? 'AdminHome' : 'Home' });
			} else if (this.is_admin && !this.$route.meta.is_admin) {
				this.$router.push({ name: 'AdminHome' });
			}
		} else {
			if (!this.$route.meta.free_page) {
				await this.logout();
			}
		}
	}
}
