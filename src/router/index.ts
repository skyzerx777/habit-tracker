import Home from '@/pages/Home.vue';
import Stats from '@/pages/Stats.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{ path: '/', component: Home },
		{ path: '/stats', component: Stats },
	],
});

export default router;
