<script setup lang="ts">
import DashboardChartsSection from '@/components/DashboardChartsSection.vue';
import HabitList from '@/components/HabitList.vue';
import { useHabitsStore } from '@/stores/habits';
import { computed } from 'vue';

const currentTime = new Date(Date.now()).getHours();

const periodOfTheDay = computed(() => {
	if (currentTime < 12) return 'morning';
	if (currentTime < 18) return 'afternoon';
	return 'evening';
});

const store = useHabitsStore();
</script>

<template>
	<section>
		<h2 class="font-semibold">Good {{ periodOfTheDay }}! &#128075;</h2>
		<p class="text-slate-800">Let's build some great habits today.</p>
		<button
			class="cursor-pointer"
			@click.prevent="store.addHabit('Name', 'Icon', 'Color', 'Description')"
		>
			Add habit
		</button>
		<div class="flex gap-8 mt-8">
			<HabitList />
			<DashboardChartsSection />
		</div>
	</section>
</template>
