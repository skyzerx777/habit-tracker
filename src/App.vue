<script setup lang="ts">
import Navbar from './components/Navbar.vue';
import '/src/App.css';
</script>

<template>
	<Navbar />
	<main class="bg-slate-50 px-20 py-8 min-h-screen">
		<RouterView />
	</main>
</template>
