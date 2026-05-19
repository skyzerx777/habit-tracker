<script setup lang="ts">
import EditHabitModal from '@/components/EditHabitModal.vue';
import RemoveHabitModal from '@/components/RemoveHabitModal.vue';
import { HABIT_COLORS } from '@/constants/colors';
import { HABIT_ICONS } from '@/constants/icons';
import { useHabitsStore } from '@/stores/habits';
import { ArrowLeft, Flame } from '@lucide/vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const store = useHabitsStore();

const routeHabitId = computed(() => route.params.id);

const selectedHabit = computed(() =>
	store.habits.find(item => item.id === routeHabitId.value),
);

const icon = computed(() => {
	return HABIT_ICONS.find(item => item.value === selectedHabit.value!.icon);
});
const color = computed(() => {
	return HABIT_COLORS.find(item => item.value === selectedHabit.value!.color);
});
</script>

<template>
	<section>
		<RouterLink to="/">
			<button class="flex gap-1 items-center cursor-pointer">
				<ArrowLeft class="size-4" /> Back
			</button>
		</RouterLink>
		<div class="flex mt-8">
			<div class="w-1/2 border border-slate-200 rounded-sm py-6 px-4">
				<div class="flex gap-4">
					<component
						:is="icon?.icon"
						:class="`${color?.textClass} box-content size-10 p-3 bg-main/5 rounded-full`"
					></component>
					<div class="flex flex-col gap-2">
						<h2 class="font-bold text-xl">{{ selectedHabit?.name }}</h2>
						<p class="flex items-center gap-1">
							<Flame class="size-4 text-orange-500" />
							<span class="text-slate-500 text-sm"
								>{{ store.getHabitStreak(selectedHabit?.id!) }} day streak
							</span>
						</p>
						<p class="text-slate-600 text-sm min-h-20">
							{{ selectedHabit?.description }}
						</p>
					</div>
				</div>
				<div class="flex justify-around h-12">
					<EditHabitModal :habitId="selectedHabit?.id!" />
					<RemoveHabitModal :habitId="selectedHabit?.id!" />
				</div>
			</div>
			<div class="w-1/2"></div>
		</div>
	</section>
</template>
