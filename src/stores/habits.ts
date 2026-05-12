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

	function toggleTodayCompletion(id: string): void {
		const todayDate = new Date(Date.now()).toISOString().slice(0, 10);

		const habit = habits.value.find(item => item.id === id);

		if (!habit) return;

		if (habit.completedDates.includes(todayDate)) {
			habit.completedDates = habit.completedDates.filter(
				date => date !== todayDate,
			);
		} else {
			habit.completedDates.push(todayDate);
		}
	}

	function calculateStreak(completedDays: string[]): number {
		const sortedDays = [...completedDays].sort();

		if (!sortedDays.length) return 0;

		const yesterdayDate = new Date(Date.now() - 1000 * 60 * 60 * 24)
			.toISOString()
			.slice(0, 10);

		const todayDate = new Date().toISOString().slice(0, 10);

		if (
			!sortedDays.includes(yesterdayDate) &&
			!sortedDays.includes(todayDate)
		) {
			return 0;
		}

		let streak = 1;

		for (let i = sortedDays.length - 1; i > 0; i--) {
			const [cy, cm, cd] = sortedDays[i]!.split('-').map(Number);
			const [py, pm, pd] = sortedDays[i - 1]!.split('-').map(Number);

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

	function getHabitStreak(id: string): number {
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

	function getCompletedHabitsNumber(): string {
		return habits.value
			.reduce((total, habit) => {
				return total + habit.completedDates.length;
			}, 0)
			.toString();
	}

	return {
		habits,
		addHabit,
		toggleTodayCompletion,
		getHabitStreak,
		countHabitsCompletedToday,
		getCompletedHabitsNumber,
	};
});
