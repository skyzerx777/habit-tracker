<script setup lang="ts">
import DashboardChartsSection from '@/components/DashboardChartsSection.vue';
import HabitList from '@/components/HabitList.vue';
import { computed } from 'vue';

const currentTime = new Date().getHours();

const periodOfTheDay = computed(() => {
	if (currentTime < 12) return 'morning';
	if (currentTime < 18) return 'afternoon';
	return 'evening';
});
</script>

<template>
	<section class="flex w-full flex-col pb-24 md:pb-0">
		<div class="mb-6">
			<h2 class="text-3xl font-bold tracking-tight">
				Good {{ periodOfTheDay }}! &#128075;
			</h2>
			<p class="mt-1 text-slate-500">Let's build some great habits today.</p>
		</div>
		<div class="grid grid-cols-1 gap-6 xl:grid-cols-[380px_1fr]">
			<HabitList />
			<DashboardChartsSection />
		</div>
	</section>
</template>
