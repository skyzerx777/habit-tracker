import HabitDetails from '@/pages/HabitDetails.vue';
import Home from '@/pages/Home.vue';
import NotFound from '@/pages/NotFound.vue';
import Stats from '@/pages/Stats.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{ path: '/', component: Home },
		{ path: '/stats', component: Stats },
		{ path: '/details/:id', component: HabitDetails },
		{
			path: '/:pathMatch(.*)*',
			component: NotFound,
		},
	],
});

export default router;
