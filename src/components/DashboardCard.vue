<script setup lang="ts">
import { type Component } from 'vue';

defineProps<{
	item: {
		counter: string;
		text: string;
		icon: Component;
		textColor: string;
	};
}>();
</script>

<template>
	<div
		class="flex items-center gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
	>
		<div
			class="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-slate-100"
		>
			<component :is="item.icon" :class="`${item.textColor} size-7`" />
		</div>

		<div class="min-w-0">
			<p class="truncate text-2xl font-bold">
				{{ item.counter }}
			</p>
			<p class="text-sm text-slate-500">
				{{ item.text }}
			</p>
		</div>
	</div>
</template>
