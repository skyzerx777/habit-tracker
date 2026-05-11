<script setup lang="ts">
import type { Component } from 'vue';

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
	<div class="flex gap-1 py-6 px-4 border border-slate-200 rounded-sm">
		<component :is="item.icon" :class="`${item.textColor} size-10`" />
		<div>
			<p class="font-medium">{{ item.counter }}</p>
			<p class="text-slate-500">{{ item.text }}</p>
		</div>
	</div>
</template>
