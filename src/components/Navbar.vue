<script setup lang="ts">
import { BadgeCheck } from '@lucide/vue';
import AddHabitModal from './AddHabitModal.vue';
</script>

<template>
	<!-- desktop -->
	<header class="text-slate-900 bg-slate-50 max-md:hidden">
		<nav class="flex justify-between items-center p-4">
			<div class="flex gap-2 w-1/4">
				<BadgeCheck class="size-8 text-main" />
				<h1 class="font-semibold text-2xl">Habit Tracker</h1>
			</div>
			<ul class="flex justify-center grow gap-4">
				<li>
					<RouterLink to="/" active-class="text-main border-b-2 border-main"
						>Dashboard</RouterLink
					>
				</li>
				<li>
					<RouterLink
						to="/stats"
						active-class="text-main border-b-2 border-main"
						>Stats</RouterLink
					>
				</li>
			</ul>
			<div class="text-end w-1/4">
				<AddHabitModal />
			</div>
		</nav>
		<hr class="text-slate-300" />
	</header>

	<!-- mobile -->
	<div class="fixed w-full bottom-0 border-t border-slate-300 md:hidden">
		<nav>
			<ul class="flex justify-around items-center leading-10 text-center">
				<li class="w-1/3">
					<RouterLink to="/">Dashboard</RouterLink>
				</li>
				<li class="w-1/3 shrink-0">
					<AddHabitModal />
				</li>
				<li class="w-1/3"><RouterLink to="/stats">Stats</RouterLink></li>
			</ul>
		</nav>
	</div>
</template>
