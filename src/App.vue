<script setup lang="ts">
import Navbar from './components/Navbar.vue';
import Home from './pages/Home.vue';
import '/src/App.css';
</script>

<template>
	<Navbar />
	<main class="bg-slate-50 px-20 py-8 min-h-screen">
		<Home />
	</main>
</template>
