<script setup lang="ts">
import { HABIT_COLORS } from '@/constants/colors';
import { HABIT_ICONS } from '@/constants/icons';
import { useHabitsStore } from '@/stores/habits';
import {
	Dialog,
	DialogDescription,
	DialogPanel,
	DialogTitle,
	TransitionChild,
	TransitionRoot,
} from '@headlessui/vue';
import { Plus } from '@lucide/vue';
import { computed, ref } from 'vue';

const isModalOpen = ref(false);

const store = useHabitsStore();

const habitName = ref('');
const habitDescription = ref<string | undefined>();

const selectedColorValue = ref(HABIT_COLORS[0]!.value);
const selectedIconValue = ref(HABIT_ICONS[0]!.value);

const selectedColor = computed(() => {
	return HABIT_COLORS.find(item => item.value === selectedColorValue.value);
});

const resetForm = () => {
	habitName.value = '';
	selectedIconValue.value = HABIT_ICONS[0]!.value;
	selectedColorValue.value = HABIT_COLORS[0]!.value;
	habitDescription.value = '';
};

function handleSubmit() {
	store.addHabit(
		habitName.value,
		selectedIconValue.value,
		selectedColorValue.value,
		habitDescription.value,
	);
	isModalOpen.value = false;
	setTimeout(resetForm, 300);
}

function handleCancel() {
	isModalOpen.value = false;
	setTimeout(resetForm, 300);
}
</script>

<template>
	<button
		@click="isModalOpen = true"
		class="cursor-pointer bg-main leading-10 px-6 text-white rounded-md"
	>
		+ Add habit
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
									<Plus class="text-main size-12" />
								</div>
								<div>
									<DialogTitle class="font-bold">Add New Habit</DialogTitle>
									<DialogDescription class="text-slate-500 text-sm">
										Create a new habit to track your progress.
									</DialogDescription>
								</div>
							</div>
							<form @submit.prevent="handleSubmit" class="flex flex-col">
								<label>
									<p class="font-medium">Habit Name</p>
									<input
										type="text"
										name="habit-name"
										h
										v-model="habitName"
										placeholder="e.g. Drink Water"
										required
									/>
								</label>
								<label>
									<p class="font-medium">Description (optional)</p>
									<textarea
										name="habit-description"
										v-model="habitDescription"
										placeholder="Add a short description..."
									></textarea>
								</label>
								<div class="flex flex-col gap-4 mb-6">
									<p class="font-medium">Icon & Color</p>
									<div class="flex gap-2 flex-wrap">
										<button
											v-for="icon in HABIT_ICONS"
											:key="icon.value"
											@click.prevent="selectedIconValue = icon.value"
											:class="`${selectedIconValue === icon.value ? `bg-main/10 ${selectedColor?.textClass}` : 'text-slate-400'} cursor-pointer size-12 border border-slate-200 rounded-xl transition-colors duration-300`"
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
											@click.prevent="selectedColorValue = color.value"
											:class="`${selectedColorValue === color.value ? 'bg-main/10' : ''} cursor-pointer w-10 h-8 rounded-2xl`"
										>
											<div
												:class="`${color.bgClass} ${selectedColorValue === color.value ? 'size-4' : 'size-5'} rounded-full m-auto transition-all duration-200`"
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
										Add habit
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
