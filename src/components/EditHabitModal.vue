<script setup lang="ts">
import { HABIT_COLORS } from '@/constants/colors';
import { HABIT_ICONS } from '@/constants/icons';
import { useHabitsStore } from '@/stores/habits';
import {
	Dialog,
	DialogPanel,
	DialogTitle,
	TransitionChild,
	TransitionRoot,
} from '@headlessui/vue';
import { Pencil } from '@lucide/vue';
import { computed, reactive, ref } from 'vue';
import { useToast } from 'vue-toastification';

const props = defineProps<{ habitId: string }>();

const store = useHabitsStore();
const toast = useToast();

const isModalOpen = ref(false);
const inputRef = ref<HTMLInputElement | null>(null);

const selectedHabit = computed(() =>
	store.habits.find(habit => habit.id === props.habitId),
);

const editedHabit = reactive({
	name: selectedHabit.value!.name,
	description: selectedHabit.value!.description,
	icon: selectedHabit.value!.icon,
	color: selectedHabit.value!.color,
});

const selectedColor = computed(() =>
	HABIT_COLORS.find(color => color.value === editedHabit.color),
);

function handleSubmit() {
	if (editedHabit.name.length < 1) {
		toast.error('Habit name should be longer than 1 symbol.');
		inputRef.value?.focus();
	} else {
		store.editHabit(selectedHabit.value?.id!, editedHabit);

		isModalOpen.value = false;

		toast.info('Habit edited.');
	}
}

function handleCancel() {
	isModalOpen.value = false;
	toast.warning('Canceled.');
}
</script>

<template>
	<button
		@click="isModalOpen = true"
		class="flex items-center justify-center gap-2 cursor-pointer text-slate-500 border border-slate-300 rounded-lg w-1/3"
	>
		<Pencil class="size-5" />
		Edit
	</button>

	<Teleport to="body">
		<TransitionRoot :show="isModalOpen" as="template">
			<Dialog @close="isModalOpen = false" class="fixed inset-0 z-50">
				<TransitionChild
					as="template"
					enter="duration-300 ease-out"
					enter-from="opacity-0"
					enter-to="opacity-100"
					leave="duration-200 ease-in"
					leave-from="opacity-100"
					leave-to="opacity-0"
				>
					<div class="fixed inset-0 bg-black/25" aria-hidden="true" />
				</TransitionChild>
				<div class="fixed inset-0 flex w-screen items-center justify-center">
					<TransitionChild
						as="template"
						enter="duration-300 ease-out"
						enter-from="opacity-0 scale-95"
						enter-to="opacity-100 scale-100"
						leave="duration-200 ease-in"
						leave-from="opacity-100 scale-100"
						leave-to="opacity-0 scale-95"
					>
						<DialogPanel class="bg-slate-50 w-1/2 rounded-lg p-6">
							<div class="flex items-center gap-4 mb-4">
								<div
									class="size-16 rounded-full bg-main/10 flex items-center justify-center"
								>
									<Pencil class="text-main size-8" />
								</div>
								<DialogTitle class="font-bold">Edit Habit</DialogTitle>
							</div>
							<form @submit.prevent="handleSubmit" class="flex flex-col">
								<label>
									<p class="font-medium">Habit Name (required)</p>
									<input
										ref="inputRef"
										type="text"
										name="habit-name"
										v-model="editedHabit.name"
										placeholder="e.g. Drink Water"
									/>
								</label>
								<label>
									<p class="font-medium">Description (optional)</p>
									<textarea
										name="habit-description"
										v-model="editedHabit.description"
										placeholder="Add a short description..."
									></textarea>
								</label>
								<div class="flex flex-col gap-4 mb-6">
									<p class="font-medium">Icon & Color</p>
									<div class="flex gap-2 flex-wrap">
										<button
											v-for="icon in HABIT_ICONS"
											:key="icon.value"
											@click.prevent="editedHabit.icon = icon.value"
											:class="`${editedHabit.icon === icon.value ? `bg-main/10 ${selectedColor?.textClass}` : 'text-slate-400'} cursor-pointer size-12 border border-slate-200 rounded-xl transition-colors duration-300`"
										>
											<component
												:is="icon.icon"
												class="size-6 m-auto"
											></component>
										</button>
									</div>
									<div class="flex gap-2">
										<button
											v-for="color in HABIT_COLORS"
											:key="color.value"
											@click.prevent="editedHabit.color = color.value"
											:class="`${editedHabit.color === color.value ? 'bg-main/10' : ''} cursor-pointer w-10 h-8 rounded-2xl`"
										>
											<div
												:class="`${color.bgClass} ${editedHabit.color === color.value ? 'size-4' : 'size-5'} rounded-full m-auto transition-all duration-200`"
											></div>
										</button>
									</div>
								</div>
								<div class="flex gap-4 justify-end">
									<button
										class="cursor-pointer border border-slate-300 rounded-lg px-10"
										@click.prevent="handleCancel"
									>
										Cancel
									</button>
									<button
										type="submit"
										class="cursor-pointer bg-main text-slate-50 rounded-lg px-10 h-12"
									>
										Save
									</button>
								</div>
							</form>
						</DialogPanel>
					</TransitionChild>
				</div>
			</Dialog>
		</TransitionRoot>
	</Teleport>
</template>
