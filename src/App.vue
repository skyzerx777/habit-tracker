<script setup lang="ts">
import Navbar from './components/Navbar.vue';
import '/src/App.css';
</script>

<template>
	<div class="min-h-screen bg-slate-100 text-slate-900">
		<Navbar />
		<main
			class="mx-auto flex w-full max-w-7xl flex-1 px-4 py-4 md:px-6 lg:px-8"
		>
			<RouterView />
		</main>
	</div>
</template>
