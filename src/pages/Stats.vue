<script setup lang="ts">
import CompletionRateChart from '@/components/CompletionRateChart.vue';
import DashboardCard from '@/components/DashboardCard.vue';
import { useHabitsStore } from '@/stores/habits';
import { CircleCheck, Flame, ListCheck, TrendingUp } from '@lucide/vue';
import { computed } from 'vue';

const store = useHabitsStore();

const cardsInfo = computed(() => [
	{
		counter: `${store.getCompletedHabitsNumber()}`,
		text: 'Habits Completed',
		icon: CircleCheck,
		textColor: 'text-main',
	},
	{
		counter: `${store.getAverageCompletionRate()}%`,
		text: 'Avg. Completion Rate',
		icon: TrendingUp,
		textColor: 'text-green-400',
	},
	{
		counter: `${store.getBestStreak()}`,
		text: 'Best Streak',
		icon: Flame,
		textColor: 'text-orange-400',
	},
	{
		counter: `${store.getTotalHabits()}`,
		text: 'Total Habits',
		icon: ListCheck,
		textColor: 'text-blue-400',
	},
]);
</script>

<template>
	<section class="flex flex-1 flex-col">
		<div class="flex gap-12 justify-between px-4">
			<DashboardCard
				v-for="item in cardsInfo"
				:item
				class="grow max-w-1/4 justify-center gap-3"
			/>
		</div>
		<div class="w-full h-2/3">
			<CompletionRateChart />
		</div>
	</section>
</template>
