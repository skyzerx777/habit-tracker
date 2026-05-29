<script setup lang="ts">
import { House, TriangleAlert } from '@lucide/vue';
import { useRouter } from 'vue-router';

const router = useRouter();

function goHome() {
	router.push('/');
}
</script>

<template>
	<section
		class="flex min-h-[calc(100vh-73px)] w-full flex-col items-center justify-center px-6 text-center"
	>
		<div
			class="mb-6 flex size-24 items-center justify-center rounded-3xl bg-red-100 shadow-sm"
		>
			<TriangleAlert class="size-11 text-red-500" />
		</div>

		<h1 class="mb-2 text-7xl font-black tracking-tight text-slate-900">404</h1>

		<h2 class="mb-3 text-3xl font-bold text-slate-800">Page not found</h2>

		<p class="mb-8 max-w-md text-slate-500">
			The page you are looking for does not exist, was moved, or may have been
			deleted.
		</p>

		<button
			@click="goHome"
			class="flex items-center gap-2 rounded-2xl bg-main px-6 py-3 font-medium text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
		>
			<House class="size-5" />
			Go Home
		</button>
	</section>
</template>
