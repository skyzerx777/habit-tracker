<script setup lang="ts">
import Navbar from './components/Navbar.vue';
import '/src/App.css';
</script>

<template>
	<div class="min-h-screen bg-slate-100">
		<Navbar />
		<main class="mx-auto flex w-full max-w-7xl px-4 py-6 md:px-8 xl:px-12">
			<RouterView />
		</main>
	</div>
</template>
