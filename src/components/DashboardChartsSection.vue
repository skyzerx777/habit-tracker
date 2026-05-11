<script setup lang="ts">
import { CircleCheck, Flame, TrendingUp } from '@lucide/vue';
import DashboardCard from './DashboardCard.vue';

const cardsInfo = [
	{
		counter: '23',
		text: 'Habits Completed',
		icon: CircleCheck,
		textColor: 'text-main',
	},
	{
		counter: '7',
		text: 'Best Streak',
		icon: Flame,
		textColor: 'text-orange-400',
	},
	{
		counter: '85%',
		text: 'Avg. Completition Rate',
		icon: TrendingUp,
		textColor: 'text-green-400',
	},
];
</script>

<template>
	<section class="flex gap-8 grow">
		<div class="flex flex-col gap-4">
			<div class="flex justify-between gap-4">
				<DashboardCard v-for="item in cardsInfo" :item />
			</div>
			<div class="h-36 w-full py-6 px-4 border border-slate-200 rounded-sm">
				Completition Rate Chart
			</div>
		</div>
		<div class="w-1/3 py-6 px-4 border border-slate-200 rounded-sm">
			Habits overview chart
		</div>
	</section>
</template>
