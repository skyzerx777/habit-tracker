import type { IHabit } from '@/types';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useHabitsStore = defineStore('habits', () => {
	const habits = ref<IHabit[]>([]);
	const todayDate = new Date().toISOString().slice(0, 10);

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

	function removeHabit(id: string): void {
		const index = habits.value.findIndex(habit => habit.id === id);

		habits.value.splice(index, 1);
	}

	function editHabit(id: string, updates: Partial<IHabit>): void {
		const selectedHabit = habits.value.find(habit => habit.id === id);

		if (!selectedHabit) return;

		Object.assign(selectedHabit, updates);
	}

	function toggleTodayCompletion(id: string): void {
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

	function getBestStreak(): string {
		if (!habits.value.length) return '0';

		return Math.max(
			...habits.value.map(habit => getHabitStreak(habit.id)),
		).toString();
	}

	function countHabitsCompletedToday(): number {
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

	function calculateHabitCompletitionRate(habit: IHabit): number {
		const [cy, cm, cd] = todayDate.split('-').map(Number);
		const [sy, sm, sd] = habit.createdAt.split('-').map(Number);

		const currentDay = new Date(cy!, cm! - 1, cd!);
		const startDay = new Date(sy!, sm! - 1, sd!);

		const totalTrackableDays =
			Math.round(
				(currentDay.getTime() - startDay.getTime()) / (1000 * 60 * 60 * 24),
			) + 1;

		return (habit.completedDates.length / totalTrackableDays) * 100;
	}

	function getAverageCompletitionRate(): number {
		if (!habits.value.length) return 0;

		return Math.round(
			habits.value.reduce((total, habit) => {
				return total + calculateHabitCompletitionRate(habit);
			}, 0) / habits.value.length,
		);
	}

	return {
		habits,
		addHabit,
		removeHabit,
		editHabit,
		toggleTodayCompletion,
		getHabitStreak,
		getBestStreak,
		countHabitsCompletedToday,
		getCompletedHabitsNumber,
		getAverageCompletitionRate,
	};
});
