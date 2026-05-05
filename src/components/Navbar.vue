<script setup lang="ts">
import { CheckBadgeIcon } from '@heroicons/vue/24/outline';
</script>

<template>
	<header class="text-slate-900 bg-slate-50">
		<nav class="flex justify-between items-center p-4">
			<div class="flex gap-2 w-1/4">
				<CheckBadgeIcon class="size-8 text-main" />
				<h1 class="font-semibold text-2xl">Habit Tracker</h1>
			</div>
			<ul class="flex justify-center grow gap-4">
				<li><a href="/">Dashboard</a></li>
				<li><a href="/stats">Stats</a></li>
			</ul>
			<div class="text-end w-1/4">
				<button
					class="cursor-pointer bg-main leading-10 px-6 text-white rounded-md"
				>
					+ Add habit
				</button>
			</div>
		</nav>
		<hr class="text-slate-300" />
	</header>
</template>
