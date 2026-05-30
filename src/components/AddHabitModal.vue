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
import { Plus, Sparkles } from '@lucide/vue';
import { computed, ref } from 'vue';
import { useToast } from 'vue-toastification';

const store = useHabitsStore();

const isModalOpen = ref(false);

const habitName = ref('');
const habitDescription = ref<string | undefined>();

const inputRef = ref<HTMLInputElement | null>(null);

const selectedColorValue = ref(HABIT_COLORS[0]!.value);
const selectedIconValue = ref(HABIT_ICONS[0]!.value);

const toast = useToast();

const selectedColor = computed(() => {
	return HABIT_COLORS.find(item => item.value === selectedColorValue.value);
});

function resetForm() {
	habitName.value = '';
	habitDescription.value = '';

	selectedColorValue.value = HABIT_COLORS[0]!.value;
	selectedIconValue.value = HABIT_ICONS[0]!.value;
}

function handleSubmit() {
	if (habitName.value.trim().length < 1) {
		toast.error('Habit name should be longer than 1 symbol.');
		inputRef.value?.focus();

		return;
	}

	store.addHabit(
		habitName.value,
		selectedIconValue.value,
		selectedColorValue.value,
		habitDescription.value,
	);

	isModalOpen.value = false;

	toast.success('Habit added.');

	setTimeout(resetForm, 200);
}

function handleCancel() {
	isModalOpen.value = false;

	setTimeout(resetForm, 200);
}
</script>

<template>
	<button
		@click="isModalOpen = true"
		class="hidden md:flex items-center gap-2 rounded-2xl bg-main px-5 py-3 text-sm font-medium text-white shadow-lg shadow-main/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-main/30 cursor-pointer"
	>
		<Plus class="size-5" />
		Add habit
	</button>
	<button
		@click="isModalOpen = true"
		class="mx-auto flex size-16 -translate-y-6 items-center justify-center rounded-full bg-main text-white shadow-xl shadow-main/30 md:hidden"
	>
		<Plus class="size-8" />
	</button>
	<Teleport to="body">
		<TransitionRoot :show="isModalOpen" as="template">
			<Dialog @close="handleCancel" class="relative z-50">
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
					<div class="flex min-h-full items-center justify-center p-4 md:p-6">
						<TransitionChild
							as="template"
							enter="duration-300 ease-out"
							enter-from="opacity-0 scale-95 translate-y-4"
							enter-to="opacity-100 scale-100 translate-y-0"
							leave="duration-200 ease-in"
							leave-from="opacity-100 scale-100 translate-y-0"
							leave-to="opacity-0 scale-95 translate-y-4"
						>
							<DialogPanel
								class="w-full max-w-2xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl"
							>
								<div
									class="border-b border-slate-100 bg-linear-to-br from-main/5 to-purple-100/40 px-6 py-6 md:px-8"
								>
									<div class="flex items-start gap-4">
										<div
											class="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-main text-white shadow-lg shadow-main/20"
										>
											<Sparkles class="size-8" />
										</div>

										<div class="min-w-0">
											<DialogTitle
												class="text-xl font-bold text-slate-900 md:text-2xl"
											>
												Create New Habit
											</DialogTitle>

											<DialogDescription
												class="mt-1 text-sm leading-relaxed text-slate-500"
											>
												Track your progress, build consistency and improve your
												daily routine.
											</DialogDescription>
										</div>
									</div>
								</div>
								<form
									@submit.prevent="handleSubmit"
									class="flex flex-col gap-6 px-6 py-6 md:px-8"
								>
									<div class="flex flex-col gap-2">
										<label
											for="habit-name"
											class="text-sm font-semibold text-slate-700"
										>
											Habit Name
										</label>
										<input
											id="habit-name"
											ref="inputRef"
											v-model="habitName"
											type="text"
											placeholder="e.g. Drink 2L of water"
											class="h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-800 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-main focus:bg-white focus:ring-4 focus:ring-main/10"
										/>
									</div>
									<div class="flex flex-col gap-2">
										<label
											for="habit-description"
											class="text-sm font-semibold text-slate-700"
										>
											Description
										</label>
										<textarea
											id="habit-description"
											v-model="habitDescription"
											rows="4"
											placeholder="Add a short description..."
											class="resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-main focus:bg-white focus:ring-4 focus:ring-main/10"
										/>
									</div>
									<div class="flex flex-col gap-4">
										<p class="text-sm font-semibold text-slate-700">
											Choose Icon
										</p>
										<div
											class="grid grid-cols-5 gap-3 sm:grid-cols-6 md:grid-cols-7"
										>
											<button
												v-for="icon in HABIT_ICONS"
												:key="icon.value"
												@click.prevent="selectedIconValue = icon.value"
												type="button"
												class="flex size-12 items-center justify-center rounded-2xl border transition-all duration-200 cursor-pointer"
												:class="
													selectedIconValue === icon.value
														? `${selectedColor?.bgClass} border-transparent text-white shadow-lg scale-105`
														: 'border-slate-200 bg-slate-50 text-slate-400 hover:border-main/20 hover:bg-main/5 hover:text-main'
												"
											>
												<component :is="icon.icon" class="size-5" />
											</button>
										</div>
									</div>
									<div class="flex flex-col gap-4">
										<p class="text-sm font-semibold text-slate-700">
											Choose Color
										</p>
										<div class="flex flex-wrap gap-3">
											<button
												v-for="color in HABIT_COLORS"
												:key="color.value"
												@click.prevent="selectedColorValue = color.value"
												type="button"
												class="flex size-11 items-center justify-center rounded-full border-2 transition-all duration-200 cursor-pointer"
												:class="
													selectedColorValue === color.value
														? 'scale-110 border-slate-900/10 bg-slate-100'
														: 'border-transparent hover:scale-105'
												"
											>
												<div :class="`${color.bgClass} size-6 rounded-full`" />
											</button>
										</div>
									</div>
									<div
										class="mt-2 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end"
									>
										<button
											type="button"
											@click="handleCancel"
											class="h-12 rounded-2xl border border-slate-200 px-6 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-slate-100 cursor-pointer"
										>
											Cancel
										</button>
										<button
											type="submit"
											class="h-12 rounded-2xl bg-main px-6 text-sm font-medium text-white shadow-lg shadow-main/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-main/30 cursor-pointer"
										>
											Add Habit
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
