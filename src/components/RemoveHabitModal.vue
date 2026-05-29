<script setup lang="ts">
import router from '@/router';
import { useHabitsStore } from '@/stores/habits';
import {
	Dialog,
	DialogDescription,
	DialogPanel,
	DialogTitle,
	TransitionChild,
	TransitionRoot,
} from '@headlessui/vue';
import { AlertTriangle, Trash2 } from '@lucide/vue';
import { ref } from 'vue';
import { useToast } from 'vue-toastification';

defineProps<{ habitId: string }>();

const isModalOpen = ref(false);

const toast = useToast();
const store = useHabitsStore();

function handleRemove(id: string): void {
	isModalOpen.value = false;

	setTimeout(() => {
		store.removeHabit(id);

		toast.success('Habit deleted.');

		router.push('/');
	}, 200);
}
</script>

<template>
	<button
		@click="isModalOpen = true"
		class="flex h-11 flex-1 items-center justify-center gap-2 rounded-2xl border border-red-200 bg-white px-4 font-medium text-red-500 transition-all duration-200 hover:-translate-y-0.5 hover:bg-red-50 hover:shadow-sm cursor-pointer"
	>
		<Trash2 class="size-4" />
		Remove
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
					<div class="fixed inset-0 bg-black/40 backdrop-blur-sm" />
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
								class="w-[95%] max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-xl"
							>
								<div class="mb-6 flex flex-col items-center text-center">
									<div
										class="mb-4 flex size-18 items-center justify-center rounded-3xl bg-red-100"
									>
										<AlertTriangle class="size-9 text-red-500" />
									</div>

									<DialogTitle class="text-2xl font-bold text-slate-900">
										Delete Habit?
									</DialogTitle>

									<DialogDescription
										class="mt-2 text-sm leading-relaxed text-slate-500"
									>
										This action cannot be undone. All habit progress and
										statistics will be permanently removed.
									</DialogDescription>
								</div>

								<div class="flex flex-col-reverse gap-3 sm:flex-row">
									<button
										@click="isModalOpen = false"
										class="h-12 flex-1 rounded-2xl border border-slate-200 font-medium text-slate-600 transition-all duration-200 hover:bg-slate-50 cursor-pointer"
									>
										Cancel
									</button>

									<button
										@click="handleRemove(habitId)"
										class="flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl bg-red-500 font-medium text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-red-600 hover:shadow-md cursor-pointer"
									>
										<Trash2 class="size-4" />
										Delete
									</button>
								</div>
							</DialogPanel>
						</TransitionChild>
					</div>
				</div>
			</Dialog>
		</TransitionRoot>
	</Teleport>
</template>
