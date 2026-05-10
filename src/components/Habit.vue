<script setup lang="ts">
import { HABIT_COLORS } from '@/constants/colors';
import { HABIT_ICONS } from '@/constants/icons';
import { useHabitsStore } from '@/stores/habits';
import type { IHabit } from '@/types';
import { FireIcon } from '@heroicons/vue/24/solid';
import { computed, onBeforeMount, ref, watchEffect } from 'vue';
const { habit } = defineProps<{ habit: IHabit }>();
const store = useHabitsStore();

const icon = computed(() => {
	return HABIT_ICONS.find(item => item.value === habit.icon);
});
const color = computed(() => {
	return HABIT_COLORS.find(item => item.value === habit.color);
});

const completedToday = ref(false);

onBeforeMount(() => {
	const today = new Date(Date.now()).toISOString().slice(0, 10);
	if (habit.completedDates.includes(today)) {
		completedToday.value = true;
	}
});

watchEffect(() => {
	if (completedToday.value === true) {
		store.markTodayCompletition(habit.id);
	}
	if (completedToday.value === false) {
		store.removeTodayCompletition(habit.id);
	}
});

console.log(
	new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString().slice(0, 10),
);
</script>

<template>
	<div class="flex justify-between px-2">
		<div class="flex items-center gap-6">
			<component :is="icon?.icon" :class="`size-6 ${color?.textClass}`" />
			<div>
				<h3 class="font-semibold">{{ habit.name }}</h3>
				<p class="flex items-center gap-1">
					<FireIcon class="size-4 text-orange-500" />
					<span
						>{{ store.getHabitStreak(habit.id) }} day{{
							store.getHabitStreak(habit.id) > 1 ? 's' : ''
						}}
						streak</span
					>
				</p>
			</div>
		</div>
		<input type="checkbox" name="habit-completition" v-model="completedToday" />
	</div>
</template>
