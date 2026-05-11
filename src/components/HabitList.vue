<script setup lang="ts">
import { useHabitsStore } from '@/stores/habits';
import { computed } from 'vue';
import Habit from './Habit.vue';

const store = useHabitsStore();

const progressBarWidth = computed(() => {
	if (!store.habits.length) return '0%';

	return `${(store.countHabitsCompletedToday() / store.habits.length) * 100}%`;
});
</script>

<template>
	<div class="w-2/5 shrink-0 border border-slate-200 rounded-sm py-6 px-4">
		<div class="flex justify-between">
			<p>Today</p>
			<p>
				{{ store.habits.length }} habit{{ store.habits.length > 1 ? 's' : '' }}
			</p>
		</div>
		<div class="flex justify-between">
			<p>
				{{
					store.countHabitsCompletedToday() +
					(store.habits.length ? `/${store.habits.length}` : '')
				}}
				completed
			</p>
			<div class="w-7/10 bg-slate-200 h-1 rounded-full">
				<div
					class="bg-main h-full rounded-full transition-all duration-300"
					:style="{ width: progressBarWidth }"
				></div>
			</div>
		</div>
		<Habit v-for="habit in store.habits" :key="habit.id" :habit />
	</div>
</template>
