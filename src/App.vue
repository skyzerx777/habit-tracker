<script setup lang="ts">
import Navbar from './components/Navbar.vue';
import '/src/App.css';
</script>

<template>
	<div class="flex min-h-screen flex-col">
		<Navbar />
		<main class="flex-1 bg-slate-50 px-20 py-8">
			<RouterView />
		</main>
	</div>
</template>
