<script setup lang="ts">
import { HABIT_COLORS } from '@/constants/colors';
import { HABIT_ICONS } from '@/constants/icons';
import { useHabitsStore } from '@/stores/habits';
import type { IHabit } from '@/types';
import { Check, Flame } from '@lucide/vue';
import { computed, onBeforeMount, ref } from 'vue';
import { useToast } from 'vue-toastification';

const { habit } = defineProps<{ habit: IHabit }>();

const store = useHabitsStore();

const completedToday = ref(false);

const icon = computed(() => {
	return HABIT_ICONS.find(item => item.value === habit.icon);
});
const color = computed(() => {
	return HABIT_COLORS.find(item => item.value === habit.color);
});

onBeforeMount(() => {
	const today = new Date(Date.now()).toISOString().slice(0, 10);
	if (habit.completedDates.includes(today)) {
		completedToday.value = true;
	}
});

function handleInputChange() {
	store.toggleTodayCompletion(habit.id);
	const toast = useToast();
	if (completedToday.value) {
		toast.success('Habit completed!');
	} else {
		toast.info('Habit marked as uncompleted.');
	}
}
</script>

<template>
	<div class="flex justify-between px-2">
		<RouterLink
			:to="`/details/${habit.id}`"
			class="w-full flex items-center gap-6"
		>
			<component :is="icon?.icon" :class="`size-6 ${color?.textClass}`" />
			<div>
				<h3 class="font-semibold">{{ habit.name }}</h3>
				<p class="flex items-center gap-1">
					<Flame class="size-4 text-orange-500" />
					<span>
						{{ store.getHabitStreak(habit.id) }} day{{
							store.getHabitStreak(habit.id) > 1 ? 's' : ''
						}}
						streak
					</span>
				</p>
			</div>
		</RouterLink>
		<label class="flex items-center gap-3 cursor-pointer">
			<input
				v-model="completedToday"
				type="checkbox"
				class="hidden"
				name="habit-Completion"
				@change="handleInputChange"
			/>

			<div
				:class="[
					'size-6 rounded-md border flex items-center justify-center transition-all',
					completedToday ? 'bg-main border-main' : 'border-slate-300 bg-white',
				]"
			>
				<Check v-if="completedToday" class="size-4 text-slate-50" />
			</div>
		</label>
	</div>
</template>
