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

const topHabits = computed(() => store.getTopHabits());

const longestStreaks = computed(() => store.getLongestStreakHabits());
</script>

<template>
	<section class="flex flex-1 flex-col gap-6">
		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
			<DashboardCard v-for="item in cardsInfo" :key="item.text" :item="item" />
		</div>
		<div
			class="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm md:p-6"
		>
			<div class="mb-5">
				<h2 class="text-lg font-semibold text-slate-900">
					Weekly Completion Rate
				</h2>
				<p class="text-sm text-slate-500">
					Track your habit consistency for the last 7 days
				</p>
			</div>
			<div class="h-80 md:h-105">
				<CompletionRateChart :show-controls="false" default-range="week" />
			</div>
		</div>
		<div class="grid grid-cols-1 gap-6 xl:grid-cols-2">
			<div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
				<div class="mb-6">
					<h2 class="text-lg font-semibold text-slate-900">Top Habits</h2>
					<p class="text-sm text-slate-500">Highest completion rate habits</p>
				</div>
				<div class="flex flex-col gap-5">
					<div
						v-for="(habit, index) in topHabits"
						:key="habit.id"
						class="flex items-center gap-4"
					>
						<div
							class="flex size-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-medium text-slate-500"
						>
							{{ index + 1 }}
						</div>
						<div class="min-w-0 flex-1">
							<div class="mb-2 flex items-center justify-between gap-3">
								<p class="truncate text-sm font-medium text-slate-800">
									{{ habit.name }}
								</p>

								<p class="text-sm font-semibold text-main">{{ habit.rate }}%</p>
							</div>
							<div class="h-2 overflow-hidden rounded-full bg-slate-100">
								<div
									class="h-full rounded-full bg-main transition-all duration-500"
									:style="{ width: `${habit.rate}%` }"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
				<div class="mb-6">
					<h2 class="text-lg font-semibold text-slate-900">Longest Streaks</h2>
					<p class="text-sm text-slate-500">Your most consistent habits</p>
				</div>
				<div class="flex flex-col gap-4">
					<div
						v-for="(habit, index) in longestStreaks"
						:key="habit.id"
						class="flex items-center justify-between rounded-2xl border border-slate-100 px-4 py-3 transition-colors hover:bg-slate-50"
					>
						<div class="flex min-w-0 items-center gap-4">
							<div
								class="flex size-7 shrink-0 items-center justify-center rounded-full bg-orange-100 text-xs font-medium text-orange-500"
							>
								{{ index + 1 }}
							</div>

							<p class="truncate text-sm font-medium text-slate-800">
								{{ habit.name }}
							</p>
						</div>
						<div
							class="rounded-full bg-orange-50 px-3 py-1 text-sm font-medium text-orange-500"
						>
							{{ habit.streak }} days
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
