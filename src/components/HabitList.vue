<script setup lang="ts">
import { useHabitsStore } from '@/stores/habits';
import { computed } from 'vue';
import Habit from './Habit.vue';

const store = useHabitsStore();

const progressBarWidth = computed(() => {
	if (!store.habits.length) return '0%';

	return `${(store.getHabitsCompletedToday() / store.habits.length) * 100}%`;
});
</script>

<template>
	<div
		class="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-6"
	>
		<div class="mb-6">
			<div class="flex items-center justify-between">
				<h3 class="text-lg font-semibold">Today's Progress</h3>

				<p class="text-sm text-slate-500">
					{{ store.habits.length }} habit{{
						store.habits.length !== 1 ? 's' : ''
					}}
				</p>
			</div>

			<div class="mt-4 flex items-center justify-between">
				<p class="text-sm font-medium text-slate-600">
					{{ store.getHabitsCompletedToday() }}/{{ store.habits.length }}
					completed
				</p>

				<p class="text-sm font-semibold text-main">
					{{ Math.round(parseFloat(progressBarWidth)) }}%
				</p>
			</div>

			<div class="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
				<div
					class="h-full rounded-full bg-main transition-all duration-500"
					:style="{ width: progressBarWidth }"
				></div>
			</div>
		</div>

		<div class="flex flex-col gap-4">
			<Habit v-for="habit in store.habits" :key="habit.id" :habit />
		</div>
	</div>
</template>
