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
import { Trash2 } from '@lucide/vue';
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
		toast('Habit Deleted.');
		router.push('/');
	}, 200);
}
</script>

<template>
	<button
		@click="isModalOpen = true"
		class="flex items-center justify-center gap-2 cursor-pointer text-red-500 border border-slate-300 rounded-lg w-1/3"
	>
		<Trash2 class="size-5" />
		Remove
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
						<DialogPanel class="bg-slate-50 w-1/3 rounded-lg p-6">
							<div class="flex flex-col justify-center items-center gap-2 mb-4">
								<DialogTitle class="font-bold text-xl"
									>Remove habit?</DialogTitle
								>
								<DialogDescription
									class="underline underline-offset-4 text-slate-700"
								>
									This operation is irreversible.
								</DialogDescription>
							</div>
							<div class="flex justify-around">
								<button
									@click="handleRemove(habitId)"
									class="flex items-center justify-center gap-2 cursor-pointer text-red-500 border border-slate-300 rounded-lg w-1/3 leading-12"
								>
									<Trash2 class="size-5" />
									Remove
								</button>
								<button
									@click.prevent="isModalOpen = false"
									class="flex items-center justify-center gap-2 cursor-pointer text-slate-500 border border-slate-300 rounded-lg w-1/3 leading-12"
								>
									Cancel
								</button>
							</div>
						</DialogPanel>
					</TransitionChild>
				</div>
			</Dialog>
		</TransitionRoot>
	</Teleport>
</template>
