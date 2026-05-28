import type { IHabit } from '@/types';
import { useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';

export const useHabitsStore = defineStore('habits', () => {
	const habits = useLocalStorage<IHabit[]>('habits', []);

	function getTodayDate(): string {
		return new Date().toISOString().slice(0, 10);
	}

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
			createdAt: new Date().toISOString().slice(0, 10),
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

	function toggleCompletion(id: string, date: string) {
		const habit = habits.value.find(item => item.id === id);

		if (!habit) return;

		const createdAtDate = new Date(habit.createdAt);
		const toggledDate = new Date(date);

		if (toggledDate.getTime() < createdAtDate.getTime()) {
			return 'The habit did not exist on this date.';
		}

		if (toggledDate.getTime() > new Date(getTodayDate()).getTime()) {
			return 'Are you from the future?';
		}

		if (habit.completedDates.includes(date)) {
			habit.completedDates = habit.completedDates.filter(item => item !== date);
		} else {
			habit.completedDates.push(date);
		}

		return null;
	}

	function calculateCurrentStreak(completedDays: string[]): number {
		const sortedDays = [...completedDays].sort();

		if (!sortedDays.length) return 0;

		const yesterdayDate = new Date(Date.now() - 1000 * 60 * 60 * 24)
			.toISOString()
			.slice(0, 10);

		if (
			!sortedDays.includes(getTodayDate()) &&
			!sortedDays.includes(yesterdayDate)
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

	function calculateBestStreak(completedDays: string[]): number {
		const sortedDays = [...completedDays].sort();

		if (!sortedDays.length) return 0;

		let currentStreak = 1;
		let bestStreak = 1;

		for (let i = 1; i < sortedDays.length; i++) {
			const [cy, cm, cd] = sortedDays[i]!.split('-').map(Number);
			const [py, pm, pd] = sortedDays[i - 1]!.split('-').map(Number);

			const currentDay = new Date(cy!, cm! - 1, cd!);
			const previousDay = new Date(py!, pm! - 1, pd!);

			const diff = Math.round(
				(currentDay.getTime() - previousDay.getTime()) / (1000 * 60 * 60 * 24),
			);

			if (diff === 1) {
				currentStreak++;

				if (currentStreak > bestStreak) {
					bestStreak = currentStreak;
				}
			} else {
				currentStreak = 1;
			}
		}

		return bestStreak;
	}

	function getHabitStreak(id: string): number {
		const habit = habits.value.find(item => item.id === id);

		if (!habit) return 0;

		return calculateCurrentStreak(habit.completedDates);
	}

	function getBestStreak(): number {
		if (!habits.value.length) return 0;

		return Math.max(
			...habits.value.map(habit => calculateBestStreak(habit.completedDates)),
		);
	}

	function getHabitsCompletedToday(): number {
		let habitsCompletedToday = habits.value.reduce((accumulator, curr) => {
			return curr.completedDates.includes(getTodayDate())
				? ++accumulator
				: accumulator;
		}, 0);

		return habitsCompletedToday;
	}

	function getCompletedHabitsNumber(): number {
		return habits.value.reduce((total, habit) => {
			return total + habit.completedDates.length;
		}, 0);
	}

	function getHabitCompletionRate(id: string): number {
		const habit = habits.value.find(item => item.id === id);

		if (!habit) return 0;

		const todayDate = getTodayDate();

		const [cy, cm, cd] = todayDate.split('-').map(Number);
		const [sy, sm, sd] = habit.createdAt.split('-').map(Number);

		const currentDay = new Date(cy!, cm! - 1, cd!);
		const startDay = new Date(sy!, sm! - 1, sd!);

		const totalTrackableDays =
			Math.floor(
				(currentDay.getTime() - startDay.getTime()) / (1000 * 60 * 60 * 24),
			) + 1;

		const completedDays = new Set(habit.completedDates).size;

		return Math.round((completedDays / totalTrackableDays) * 100);
	}

	function getAverageCompletionRate(): number {
		if (!habits.value.length) return 0;

		return Math.round(
			habits.value.reduce((total, habit) => {
				return total + getHabitCompletionRate(habit.id);
			}, 0) / habits.value.length,
		);
	}

	function getTotalHabits() {
		return habits.value.length;
	}

	function formatDate(date: Date): string {
		return date.toISOString().slice(0, 10);
	}

	function getCompletionRatesBetweenDates(
		startDate: string,
		endDate: string,
	): number[] {
		const rates: number[] = [];

		const current = new Date(startDate);
		const end = new Date(endDate);

		while (current <= end) {
			const formattedDate = formatDate(current);

			const completedHabits = habits.value.filter(habit =>
				habit.completedDates.includes(formattedDate),
			).length;

			const rate = habits.value.length
				? Math.round((completedHabits / habits.value.length) * 100)
				: 0;

			rates.push(rate);

			current.setDate(current.getDate() + 1);
		}

		return rates;
	}

	function getDatesBetween(startDate: string, endDate: string): string[] {
		const dates: string[] = [];

		const current = new Date(startDate);
		const end = new Date(endDate);

		while (current <= end) {
			dates.push(
				current.toLocaleDateString('en-US', {
					month: 'short',
					day: 'numeric',
				}),
			);

			current.setDate(current.getDate() + 1);
		}

		return dates;
	}

	function getTopHabits(limit = 3) {
		return [...habits.value]
			.sort(
				(a, b) => getHabitCompletionRate(b.id) - getHabitCompletionRate(a.id),
			)
			.slice(0, limit)
			.map(habit => ({
				...habit,
				rate: getHabitCompletionRate(habit.id),
			}));
	}

	function getLongestStreakHabits(limit = 3) {
		return [...habits.value]
			.sort(
				(a, b) =>
					calculateBestStreak(b.completedDates) -
					calculateBestStreak(a.completedDates),
			)
			.slice(0, limit)
			.map(habit => ({
				...habit,
				streak: calculateBestStreak(habit.completedDates),
			}));
	}

	return {
		habits,
		addHabit,
		removeHabit,
		editHabit,
		toggleCompletion,
		getHabitStreak,
		getBestStreak,
		getHabitsCompletedToday,
		getCompletedHabitsNumber,
		getHabitCompletionRate,
		getAverageCompletionRate,
		getTotalHabits,
		getCompletionRatesBetweenDates,
		getDatesBetween,
		getTopHabits,
		getLongestStreakHabits,
	};
});
