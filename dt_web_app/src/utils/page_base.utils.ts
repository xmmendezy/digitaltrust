import PageChildBase from './page_child_base.utils';

export default abstract class PageBase extends PageChildBase {
	public async created() {
		super.created();
		await this.loadPage();
	}

	private async loadPage() {
		if (await this.store.api.isLogged()) {
			this.auth_data = this.store.api.auth_data;
			if (!this.$route.meta?.permanent_page) {
				if (this.$route.meta?.free_page) {
					this.$router.push({ name: this.is_admin ? 'AdminHome' : 'Home' });
				} else if (this.is_admin && !this.$route.meta?.is_admin) {
					this.$router.push({ name: 'AdminHome' });
				} else if (!this.is_admin && this.$route.meta?.is_admin) {
					this.$router.push({ name: 'Home' });
				}
			}
		} else {
			if (!this.$route.meta?.permanent_page) {
				if (!this.$route.meta?.free_page) {
					await this.logout();
				}
			}
		}
	}

	public reload() {
		const time_reload_mobile = 4000000;
		const time_reload_desktop = 400000;
		setInterval(
			() => {
				if (this.$refs.child_page) {
					(this.$refs.child_page as any).reload();
				}
			},
			this.$isMobile() ? time_reload_mobile : time_reload_desktop,
		);
	}
}
