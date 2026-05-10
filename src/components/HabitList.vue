<script setup lang="ts">
import { useHabitsStore } from '@/stores/habits';
import Habit from './Habit.vue';

const store = useHabitsStore();
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
			<p>3/5 completed</p>
			<div>-------------------------------- (progress slider)</div>
		</div>
		<Habit v-for="habit in store.habits" :key="habit.id" :habit />
	</div>
</template>
