<script setup lang="ts">
import Habit from './Habit.vue';
</script>

<template>
	<div class="w-2/5 shrink-0 border border-slate-200 rounded-sm py-6 px-4">
		<div class="flex justify-between">
			<p>Today</p>
			<p>5 habits</p>
		</div>
		<div class="flex justify-between">
			<p>3/5 completed</p>
			<div>-------------------------------- (progress slider)</div>
		</div>
		<Habit />
	</div>
</template>
