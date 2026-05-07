import type { IHabit } from '@/types';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useHabitsStore = defineStore('habits', () => {
	const habits = ref<IHabit[]>([]);

	function addHabit(
		name: string,
		icon: string,
		color: string,
		description?: string,
	): void {
		habits.value.push({
			id: crypto.randomUUID(),
			name,
			description,
			icon,
			color,
			createdAt: new Date(Date.now()).toISOString().slice(0, 10),
			completedDates: [],
		});
	}

	return { habits, addHabit };
});
