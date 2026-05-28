<script setup lang="ts">
import { HABIT_COLORS } from '@/constants/colors';
import { HABIT_ICONS } from '@/constants/icons';
import { useHabitsStore } from '@/stores/habits';
import type { IHabit } from '@/types';
import { Check, Flame } from '@lucide/vue';
import { computed } from 'vue';
import { useToast } from 'vue-toastification';

const props = defineProps<{
	habit: IHabit;
}>();

const store = useHabitsStore();
const toast = useToast();

const icon = computed(() => {
	return HABIT_ICONS.find(item => item.value === props.habit.icon);
});

const color = computed(() => {
	return HABIT_COLORS.find(item => item.value === props.habit.color);
});

const today = computed(() => {
	return new Date().toISOString().slice(0, 10);
});

const completedToday = computed({
	get() {
		return props.habit.completedDates.includes(today.value);
	},
	set() {
		store.toggleCompletion(props.habit.id, today.value);

		if (props.habit.completedDates.includes(today.value)) {
			toast.success('Habit completed!');
		} else {
			toast.info('Habit marked as uncompleted.');
		}
	},
});
</script>

<template>
	<div
		class="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:border-main/30 hover:shadow-md"
	>
		<RouterLink
			:to="`/details/${habit.id}`"
			class="flex min-w-0 flex-1 items-center gap-4"
		>
			<div
				:class="[
					'flex size-12 shrink-0 items-center justify-center rounded-2xl',
					color?.bgClass,
				]"
			>
				<component :is="icon?.icon" class="size-6 text-white" />
			</div>

			<div class="min-w-0">
				<h3
					class="truncate text-base font-semibold text-slate-800 transition-colors group-hover:text-main"
				>
					{{ habit.name }}
				</h3>

				<div class="mt-1 flex items-center gap-1 text-sm text-slate-500">
					<Flame class="size-4 text-orange-400" />

					<span>
						{{ store.getHabitStreak(habit.id) }}
						day{{ store.getHabitStreak(habit.id) !== 1 ? 's' : '' }}
						streak
					</span>
				</div>
			</div>
		</RouterLink>

		<label class="ml-4 cursor-pointer">
			<input
				v-model="completedToday"
				type="checkbox"
				class="hidden"
				name="habit-completion"
			/>

			<div
				:class="[
					'flex size-7 items-center justify-center rounded-xl border transition-all duration-200',
					completedToday
						? 'border-main bg-main shadow-md shadow-main/20'
						: 'border-slate-300 bg-white hover:border-main/40',
				]"
			>
				<Check v-if="completedToday" class="size-4 text-white" />
			</div>
		</label>
	</div>
</template>
