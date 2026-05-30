<script setup lang="ts">
import { BadgeCheck, ChartColumn, House } from '@lucide/vue';
import AddHabitModal from './AddHabitModal.vue';
</script>

<template>
	<!-- Desktop -->
	<header
		class="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur-md max-md:hidden"
	>
		<nav
			class="mx-auto flex h-18.25 max-w-7xl items-center justify-between px-8"
		>
			<div class="flex w-1/4 items-center gap-3">
				<div
					class="flex size-11 items-center justify-center rounded-2xl bg-main/10"
				>
					<BadgeCheck class="size-6 text-main" />
				</div>
				<div>
					<h1 class="text-lg font-bold text-slate-900">Habit Tracker</h1>
					<p class="text-xs text-slate-500">Build consistency daily</p>
				</div>
			</div>
			<ul class="flex items-center gap-2 rounded-2xl bg-slate-100 p-1">
				<li>
					<RouterLink
						to="/"
						class="flex items-center gap-2 rounded-xl px-5 py-2 text-sm font-medium text-slate-600 transition-all duration-200 hover:text-main"
						active-class="bg-white text-main shadow-sm"
					>
						<House class="size-4" />
						Dashboard
					</RouterLink>
				</li>
				<li>
					<RouterLink
						to="/stats"
						class="flex items-center gap-2 rounded-xl px-5 py-2 text-sm font-medium text-slate-600 transition-all duration-200 hover:text-main"
						active-class="bg-white text-main shadow-sm"
					>
						<ChartColumn class="size-4" />
						Stats
					</RouterLink>
				</li>
			</ul>
			<div class="flex w-1/4 justify-end">
				<AddHabitModal />
			</div>
		</nav>
	</header>

	<!-- Mobile -->
	<div
		class="fixed -bottom-1 left-0 z-50 w-full border-t border-slate-200 bg-white/90 backdrop-blur-md md:hidden"
	>
		<nav class="px-2 py-2">
			<ul class="grid grid-cols-3 items-center">
				<li>
					<RouterLink
						to="/"
						class="flex flex-col items-center gap-1 rounded-xl px-4 py-2 text-xs text-slate-500"
						active-class="text-main"
					>
						<House class="size-5" />
						Dashboard
					</RouterLink>
				</li>
				<li>
					<AddHabitModal />
				</li>
				<li>
					<RouterLink
						to="/stats"
						class="flex flex-col items-center gap-1 rounded-xl px-4 py-2 text-xs text-slate-500"
						active-class="text-main"
					>
						<ChartColumn class="size-5" />
						Stats
					</RouterLink>
				</li>
			</ul>
		</nav>
	</div>
</template>
