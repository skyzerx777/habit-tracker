<script setup lang="ts">
import { useHabitsStore } from '@/stores/habits';
import type { ICalendarDay } from '@/types';
import { computed, ref } from 'vue';
import { useToast } from 'vue-toastification';

const props = defineProps<{ completedDates: string[]; id: string }>();

const store = useHabitsStore();
const currentDate = ref(new Date());
const toast = useToast();

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function formatDate(date: Date): string {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');

	return `${year}-${month}-${day}`;
}

function generateCalendarDays(
	year: number,
	month: number,
	completedDates: string[],
): ICalendarDay[] {
	const days: ICalendarDay[] = [];

	const today = formatDate(new Date());

	const firstDay = new Date(year, month, 1);

	const startWeekDay = (firstDay.getDay() + 6) % 7;

	const startDate = new Date(year, month, 1 - startWeekDay);

	let i = 0;

	while (true) {
		const date = new Date(startDate);

		date.setDate(startDate.getDate() + i);

		const iso = formatDate(date);

		days.push({
			date: iso,
			dayNumber: date.getDate(),
			currentMonth: date.getMonth() === month,
			today: iso === today,
			completed: completedDates.includes(iso),
		});

		i++;

		if (i >= 35 && date.getMonth() !== month && date.getDay() === 0) {
			break;
		}
	}

	return days;
}

const calendarDays = computed(() => {
	return generateCalendarDays(
		currentDate.value.getFullYear(),
		currentDate.value.getMonth(),
		props.completedDates,
	);
});

function nextMonth() {
	currentDate.value = new Date(
		currentDate.value.getFullYear(),
		currentDate.value.getMonth() + 1,
	);
}

function previousMonth() {
	currentDate.value = new Date(
		currentDate.value.getFullYear(),
		currentDate.value.getMonth() - 1,
	);
}

function handleToggleDate(id: string, date: string) {
	const error = store.toggleCompletion(id, date);

	if (error) {
		toast.error(error);

		return;
	}

	toast.success('Date updated.');
}
</script>

<template>
	<div
		class="w-full rounded-3xl border border-slate-200 bg-white p-4 shadow-sm md:p-6"
	>
		<div class="mb-6 flex items-center justify-between">
			<button
				@click="previousMonth"
				class="flex size-10 items-center justify-center rounded-2xl transition-all duration-200 hover:bg-slate-100"
			>
				←
			</button>

			<h2 class="text-lg font-bold text-slate-900">
				{{
					currentDate.toLocaleString('en-US', {
						month: 'long',
						year: 'numeric',
					})
				}}
			</h2>

			<button
				@click="nextMonth"
				class="flex size-10 items-center justify-center rounded-2xl transition-all duration-200 hover:bg-slate-100"
			>
				→
			</button>
		</div>

		<div
			class="mb-4 grid grid-cols-7 text-center text-xs font-medium uppercase tracking-wide text-slate-400"
		>
			<div v-for="day in weekDays" :key="day">
				{{ day }}
			</div>
		</div>

		<div class="grid grid-cols-7 gap-2">
			<div
				v-for="day in calendarDays"
				:key="day.date"
				@click="handleToggleDate(id, day.date)"
				class="flex aspect-square cursor-pointer items-center justify-center rounded-2xl text-sm font-medium transition-all duration-200"
				:class="[
					day.completed
						? 'bg-main text-white shadow-sm'
						: 'border border-slate-200 bg-white hover:border-main hover:bg-main/5',

					!day.currentMonth ? 'opacity-40' : '',

					day.today && !day.completed ? 'ring-2 ring-main ring-offset-2' : '',
				]"
			>
				{{ day.dayNumber }}
			</div>
		</div>
	</div>
</template>
