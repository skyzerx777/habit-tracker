<script setup lang="ts">
import { useHabitsStore } from '@/stores/habits';
import { CircleCheck, Flame, TrendingUp } from '@lucide/vue';
import { computed } from 'vue';
import CompletionRateChart from './CompletionRateChart.vue';
import DashboardCard from './DashboardCard.vue';

const store = useHabitsStore();

const cardsInfo = computed(() => [
	{
		counter: `${store.getCompletedHabitsNumber()}`,
		text: 'Habits Completed',
		icon: CircleCheck,
		textColor: 'text-main',
	},
	{
		counter: `${store.getBestStreak()}`,
		text: 'Best Streak',
		icon: Flame,
		textColor: 'text-orange-400',
	},
	{
		counter: `${store.getAverageCompletionRate()}%`,
		text: 'Avg. Completion Rate',
		icon: TrendingUp,
		textColor: 'text-green-400',
	},
]);
</script>

<template>
	<section>
		<div class="flex flex-col gap-4">
			<div class="flex justify-between gap-4">
				<DashboardCard v-for="item in cardsInfo" :item />
			</div>
			<div class="h-64 w-full border border-slate-200 rounded-sm">
				<CompletionRateChart />
			</div>
		</div>
	</section>
</template>
