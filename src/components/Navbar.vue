<script setup lang="ts">
import { BadgeCheck } from '@lucide/vue';
import AddHabitModal from './AddHabitModal.vue';
</script>

<template>
	<!-- desktop -->
	<header
		class="sticky top-0 z-40 hidden border-b border-slate-200 bg-white/80 backdrop-blur-md md:block"
	>
		<nav
			class="mx-auto flex h-18 max-w-7xl items-center justify-between px-6 lg:px-8"
		>
			<div class="flex items-center gap-3">
				<div
					class="flex size-11 items-center justify-center rounded-2xl bg-main/10"
				>
					<BadgeCheck class="size-6 text-main" />
				</div>

				<div>
					<h1 class="text-xl font-bold tracking-tight">Habit Tracker</h1>
					<p class="text-xs text-slate-500">Build consistency every day</p>
				</div>
			</div>
			<ul class="flex items-center gap-8 text-sm font-medium">
				<li>
					<RouterLink
						to="/"
						class="transition-colors hover:text-main"
						active-class="text-main"
					>
						Dashboard
					</RouterLink>
				</li>
				<li>
					<RouterLink
						to="/stats"
						class="transition-colors hover:text-main"
						active-class="text-main"
					>
						Stats
					</RouterLink>
				</li>
			</ul>
			<AddHabitModal />
		</nav>
	</header>

	<!-- mobile -->
	<div
		class="fixed bottom-0 left-0 z-50 w-full border-t border-slate-200 bg-white/90 backdrop-blur-md md:hidden"
	>
		<nav class="px-2 py-2">
			<ul class="flex items-center justify-around">
				<li>
					<RouterLink
						to="/"
						class="rounded-xl px-4 py-2 text-sm"
						active-class="bg-main/10 text-main"
					>
						Dashboard
					</RouterLink>
				</li>

				<li>
					<AddHabitModal />
				</li>
				<li>
					<RouterLink
						to="/stats"
						class="rounded-xl px-4 py-2 text-sm"
						active-class="bg-main/10 text-main"
					>
						Stats
					</RouterLink>
				</li>
			</ul>
		</nav>
	</div>
</template>
