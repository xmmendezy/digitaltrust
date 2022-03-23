import { createRouter, createWebHistory } from 'vue-router';
import { setupLayouts } from 'virtual:generated-layouts';
import routes from 'virtual:generated-pages';
import { useDataStore, UserRole } from './store';
import { DateTime } from 'luxon';

const router = createRouter({
	routes: setupLayouts(routes),
	history: createWebHistory('/td_app/'),
});

router.beforeEach(async (to, from, next) => {
	const store = useDataStore();
	if (store.authenticated) {
		if (store.user?.role === UserRole.ADMIN) {
			if (to.meta.isAdmin) {
				next();
			} else {
				next('/admin');
			}
		} else {
			if (to.path === '/logout') {
				next();
			}
			if (store.payed === undefined) {
				await store.status().then(v => {
					store.payed = v.payed;
				});
			}
			if (store.payed) {
				if (to.meta.isFree || to.meta.isAdmin) {
					next('/');
				} else {
					next();
				}
			} else {
				await store.myCourse().then(() => {
					if (to.path === '/signup') {
						next();
					} else {
						if (store.course_data && DateTime.now().minus({ days: 5 }).toSeconds() > store.course_data.nextPayment) {
							next('/signup');
						} else {
							next();
						}
					}
				});
			}
		}
	} else {
		if (to.meta.isFree) {
			next();
		} else {
			next('/login');
		}
	}
});

router.afterEach((to, from) => {
	const toDepth = to.path.split('/').length;
	const fromDepth = from.path.split('/').length;
	to.meta.transitionName = toDepth === fromDepth ? 'fade' : toDepth < fromDepth ? 'slide-right' : 'slide-left';
});

export { router };
