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
		text: 'Avg. Completion',
		icon: TrendingUp,
		textColor: 'text-green-500',
	},
	{
		counter: `${store.getBestStreak()}`,
		text: 'Best Streak',
		icon: Flame,
		textColor: 'text-orange-500',
	},
	{
		counter: `${store.getTotalHabits()}`,
		text: 'Total Habits',
		icon: ListCheck,
		textColor: 'text-blue-500',
	},
]);

const topHabits = computed(() => store.getTopHabits());

const longestStreaks = computed(() => store.getLongestStreakHabits());
</script>

<template>
	<section class="flex flex-1 flex-col gap-6">
		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-4">
			<DashboardCard v-for="item in cardsInfo" :key="item.text" :item />
		</div>

		<div class="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
			<div class="mb-5">
				<h2 class="text-lg font-bold text-slate-900">Completion Overview</h2>

				<p class="text-sm text-slate-500">Last 7 days performance</p>
			</div>

			<div class="h-[320px]">
				<CompletionRateChart />
			</div>
		</div>

		<div class="grid grid-cols-1 gap-6 xl:grid-cols-2">
			<div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
				<h2 class="mb-6 text-lg font-bold">Top Habits</h2>

				<div class="flex flex-col gap-5">
					<div
						v-for="(habit, index) in topHabits"
						:key="habit.id"
						class="flex items-center gap-4"
					>
						<div
							class="flex size-7 items-center justify-center rounded-full bg-slate-100 text-sm font-medium"
						>
							{{ index + 1 }}
						</div>

						<div class="min-w-0 flex-1">
							<div class="mb-2 flex justify-between gap-4">
								<p class="truncate text-sm font-medium">
									{{ habit.name }}
								</p>

								<p class="text-sm font-semibold text-main">{{ habit.rate }}%</p>
							</div>

							<div class="h-2 overflow-hidden rounded-full bg-slate-100">
								<div
									class="h-full rounded-full bg-main"
									:style="{ width: `${habit.rate}%` }"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
				<h2 class="mb-6 text-lg font-bold">Longest Streaks</h2>

				<div class="flex flex-col gap-5">
					<div
						v-for="(habit, index) in longestStreaks"
						:key="habit.id"
						class="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3"
					>
						<div class="flex items-center gap-4">
							<div
								class="flex size-7 items-center justify-center rounded-full bg-white text-sm font-medium"
							>
								{{ index + 1 }}
							</div>

							<p class="font-medium text-slate-800">
								{{ habit.name }}
							</p>
						</div>

						<div
							class="rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-600"
						>
							{{ habit.streak }} days
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
