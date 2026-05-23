<script setup lang="ts">
import { House, TriangleAlert } from '@lucide/vue';
import { useRouter } from 'vue-router';

const router = useRouter();

function goHome() {
	router.push('/');
}
</script>

<template>
	<section class="flex h-full flex-col items-center justify-center px-6">
		<div
			class="flex size-20 items-center justify-center rounded-full bg-red-100 mb-6"
		>
			<TriangleAlert class="size-10 text-red-500" />
		</div>
		<h1 class="text-6xl font-bold text-slate-900 mb-2">404</h1>
		<h2 class="text-2xl font-semibold text-slate-800 mb-3">Page not found</h2>
		<p class="max-w-md text-center text-slate-500 mb-8">
			The page you are looking for does not exist or may have been moved.
		</p>
		<button
			@click="goHome"
			class="flex items-center gap-2 cursor-pointer rounded-xl bg-main px-6 py-3 text-white transition-opacity hover:opacity-90"
		>
			<House class="size-5" />
			Go Home
		</button>
	</section>
</template>
