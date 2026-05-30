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
	<section class="flex flex-col gap-6 justify-between">
		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
			<DashboardCard v-for="item in cardsInfo" :key="item.text" :item="item" />
		</div>
		<div
			class="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-6"
		>
			<div
				class="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
			>
				<div>
					<h3 class="text-lg font-semibold">Completion Analytics</h3>
					<p class="text-sm text-slate-500">Track your consistency over time</p>
				</div>
			</div>
			<div class="h-80 w-full md:h-105">
				<CompletionRateChart :show-controls="false" default-range="week" />
			</div>
		</div>
	</section>
</template>
