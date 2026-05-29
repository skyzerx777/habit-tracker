<script setup lang="ts">
import Calendar from '@/components/Calendar.vue';
import EditHabitModal from '@/components/EditHabitModal.vue';
import RemoveHabitModal from '@/components/RemoveHabitModal.vue';
import { HABIT_COLORS } from '@/constants/colors';
import { HABIT_ICONS } from '@/constants/icons';
import { useHabitsStore } from '@/stores/habits';
import { ArrowLeft, Flame, TrendingUp, Trophy } from '@lucide/vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const store = useHabitsStore();

const routeHabitId = computed(() => route.params.id);

const selectedHabit = computed(() =>
	store.habits.find(item => item.id === routeHabitId.value),
);

const icon = computed(() => {
	return HABIT_ICONS.find(item => item.value === selectedHabit.value?.icon);
});

const color = computed(() => {
	return HABIT_COLORS.find(item => item.value === selectedHabit.value?.color);
});
</script>

<template>
	<section class="flex w-full flex-col gap-6">
		<RouterLink
			to="/"
			class="flex w-fit items-center gap-2 rounded-xl px-3 py-2 text-slate-500 transition-all duration-200 hover:bg-white hover:text-main"
		>
			<ArrowLeft class="size-4" />
			Back
		</RouterLink>

		<div class="flex flex-col gap-6 xl:flex-row">
			<div class="flex flex-1 flex-col gap-6">
				<div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
					<div
						class="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between"
					>
						<div class="flex gap-4">
							<div
								:class="`${color?.bgClass} flex size-18 shrink-0 items-center justify-center rounded-3xl`"
							>
								<component :is="icon?.icon" class="size-9 text-white" />
							</div>

							<div>
								<h1 class="text-2xl font-bold text-slate-900">
									{{ selectedHabit?.name }}
								</h1>

								<div
									class="mt-2 flex items-center gap-2 text-sm text-slate-500"
								>
									<Flame class="size-4 text-orange-500" />
									{{ store.getHabitStreak(selectedHabit?.id!) }}
									day streak
								</div>

								<p class="mt-4 max-w-2xl leading-relaxed text-slate-600">
									{{ selectedHabit?.description || 'No description provided.' }}
								</p>
							</div>
						</div>

						<div class="flex gap-3">
							<EditHabitModal :habitId="selectedHabit?.id!" />
							<RemoveHabitModal :habitId="selectedHabit?.id!" />
						</div>
					</div>
				</div>

				<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
					<div
						class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
					>
						<div class="flex items-center gap-4">
							<div
								class="flex size-14 items-center justify-center rounded-2xl bg-main/10"
							>
								<TrendingUp class="text-main" />
							</div>

							<div>
								<h3 class="text-2xl font-bold text-slate-900">
									{{ store.getHabitCompletionRate(selectedHabit?.id!) }}%
								</h3>

								<p class="text-sm text-slate-500">Completion Rate</p>
							</div>
						</div>
					</div>

					<div
						class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
					>
						<div class="flex items-center gap-4">
							<div
								class="flex size-14 items-center justify-center rounded-2xl bg-orange-100"
							>
								<Trophy class="text-orange-500" />
							</div>

							<div>
								<h3 class="text-2xl font-bold text-slate-900">
									{{ store.getHabitStreak(selectedHabit?.id!) }}
									days
								</h3>

								<p class="text-sm text-slate-500">Best Streak</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="xl:w-105">
				<Calendar
					:completedDates="selectedHabit?.completedDates!"
					:id="selectedHabit?.id!"
				/>
			</div>
		</div>
	</section>
</template>
