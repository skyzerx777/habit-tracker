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
	if (editedHabit.name.trim().length < 1) {
		toast.error('Habit name should be longer than 1 symbol.');

		inputRef.value?.focus();

		return;
	}

	store.editHabit(selectedHabit.value?.id!, editedHabit);

	isModalOpen.value = false;

	toast.success('Habit updated.');
}

function handleCancel() {
	isModalOpen.value = false;

	toast.info('Editing canceled.');
}
</script>

<template>
	<button
		@click="isModalOpen = true"
		class="flex h-11 flex-1 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 font-medium text-slate-600 transition-all duration-200 hover:-translate-y-0.5 hover:border-main/30 hover:bg-slate-50 hover:shadow-sm cursor-pointer"
	>
		<Pencil class="size-4" />
		Edit
	</button>
	<Teleport to="body">
		<TransitionRoot :show="isModalOpen" as="template">
			<Dialog @close="isModalOpen = false" class="relative z-50">
				<TransitionChild
					as="template"
					enter="duration-300 ease-out"
					enter-from="opacity-0"
					enter-to="opacity-100"
					leave="duration-200 ease-in"
					leave-from="opacity-100"
					leave-to="opacity-0"
				>
					<div class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" />
				</TransitionChild>
				<div class="fixed inset-0 overflow-y-auto">
					<div class="flex min-h-full items-center justify-center p-4">
						<TransitionChild
							as="template"
							enter="duration-300 ease-out"
							enter-from="opacity-0 scale-95"
							enter-to="opacity-100 scale-100"
							leave="duration-200 ease-in"
							leave-from="opacity-100 scale-100"
							leave-to="opacity-0 scale-95"
						>
							<DialogPanel
								class="w-[95%] max-w-2xl rounded-3xl border border-slate-200 bg-white p-6 shadow-xl"
							>
								<div class="mb-6 flex items-center gap-4">
									<div
										class="flex size-16 items-center justify-center rounded-3xl bg-main/10"
									>
										<Pencil class="size-7 text-main" />
									</div>
									<div>
										<DialogTitle class="text-2xl font-bold text-slate-900">
											Edit Habit
										</DialogTitle>

										<p class="mt-1 text-sm text-slate-500">
											Update your habit details.
										</p>
									</div>
								</div>
								<form
									@submit.prevent="handleSubmit"
									class="flex flex-col gap-5"
								>
									<label class="flex flex-col">
										<span class="mb-2 text-sm font-medium text-slate-700">
											Habit Name
										</span>
										<input
											ref="inputRef"
											v-model="editedHabit.name"
											type="text"
											placeholder="Drink water"
											class="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition-all duration-200 focus:border-main focus:ring-4 focus:ring-main/10"
										/>
									</label>
									<label class="flex flex-col">
										<span class="mb-2 text-sm font-medium text-slate-700">
											Description
										</span>
										<textarea
											v-model="editedHabit.description"
											placeholder="Describe your habit..."
											class="min-h-28 resize-none rounded-2xl border border-slate-200 px-4 py-3 outline-none transition-all duration-200 focus:border-main focus:ring-4 focus:ring-main/10"
										/>
									</label>
									<div class="flex flex-col gap-4">
										<p class="text-sm font-medium text-slate-700">
											Choose Icon
										</p>
										<div
											class="grid grid-cols-5 gap-3 sm:grid-cols-6 md:grid-cols-7"
										>
											<button
												v-for="icon in HABIT_ICONS"
												:key="icon.value"
												@click.prevent="editedHabit.icon = icon.value"
												:class="[
													'flex size-12 items-center justify-center rounded-2xl border transition-all duration-200 cursor-pointer',
													editedHabit.icon === icon.value
														? `border-main bg-main/10 ${selectedColor?.textClass}`
														: 'border-slate-200 text-slate-400 hover:border-main/30 hover:bg-slate-50',
												]"
											>
												<component :is="icon.icon" class="size-5" />
											</button>
										</div>
									</div>
									<div class="flex flex-col gap-4">
										<p class="text-sm font-medium text-slate-700">
											Choose Color
										</p>
										<div class="flex flex-wrap gap-3">
											<button
												v-for="color in HABIT_COLORS"
												:key="color.value"
												@click.prevent="editedHabit.color = color.value"
												:class="[
													'flex size-11 items-center justify-center rounded-2xl transition-all duration-200 cursor-pointer',
													editedHabit.color === color.value
														? 'scale-110 bg-slate-100'
														: 'hover:bg-slate-100',
												]"
											>
												<div
													:class="`${color.bgClass} size-6 rounded-full shadow-sm`"
												/>
											</button>
										</div>
									</div>
									<div
										class="mt-2 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end"
									>
										<button
											type="button"
											@click="handleCancel"
											class="h-12 rounded-2xl border border-slate-200 px-6 font-medium text-slate-600 transition-all duration-200 hover:bg-slate-50 cursor-pointer"
										>
											Cancel
										</button>

										<button
											type="submit"
											class="h-12 rounded-2xl bg-main px-6 font-medium text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md cursor-pointer"
										>
											Save Changes
										</button>
									</div>
								</form>
							</DialogPanel>
						</TransitionChild>
					</div>
				</div>
			</Dialog>
		</TransitionRoot>
	</Teleport>
</template>
