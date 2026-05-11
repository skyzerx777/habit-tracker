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

	function markTodayCompletition(id: string): void {
		const currentHabit = habits.value.find((item: IHabit) => item.id === id);
		currentHabit?.completedDates.push(
			new Date(Date.now()).toISOString().slice(0, 10),
		);
	}

	function removeTodayCompletition(id: string): void {
		const currentHabit = habits.value.find((item: IHabit) => item.id === id);
		currentHabit?.completedDates.splice(-1, 1);
	}

	function calculateStreak(completedDays: string[]): number {
		if (!completedDays.length) return 0;

		const yesterdayDate = new Date(Date.now() - 1000 * 60 * 60 * 24)
			.toISOString()
			.slice(0, 10);

		const todayDate = new Date().toISOString().slice(0, 10);

		if (
			!completedDays.includes(yesterdayDate) &&
			!completedDays.includes(todayDate)
		) {
			return 0;
		}

		let streak = 1;

		for (let i = completedDays.length - 1; i > 0; i--) {
			const [cy, cm, cd] = completedDays[i]!.split('-').map(Number);
			const [py, pm, pd] = completedDays[i - 1]!.split('-').map(Number);

			const currentDay = new Date(cy!, cm! - 1, cd!);
			const previousDay = new Date(py!, pm! - 1, pd!);

			const diff = Math.round(
				(currentDay.getTime() - previousDay.getTime()) / (1000 * 60 * 60 * 24),
			);

			if (diff === 1) {
				streak++;
			} else {
				break;
			}
		}

		return streak;
	}

	function getHabitStreak(id: string) {
		const currentHabit = habits.value.find((item: IHabit) => item.id === id);
		if (!currentHabit) return 0;

		return calculateStreak(currentHabit?.completedDates);
	}

	function countHabitsCompletedToday() {
		const todayDate = new Date().toISOString().slice(0, 10);

		let habitsCompletedToday = habits.value.reduce((accumulator, curr) => {
			return curr.completedDates.includes(todayDate)
				? ++accumulator
				: accumulator;
		}, 0);

		return habitsCompletedToday;
	}

	return {
		habits,
		addHabit,
		markTodayCompletition,
		removeTodayCompletition,
		getHabitStreak,
		countHabitsCompletedToday,
	};
});
