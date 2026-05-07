<script setup lang="ts">
import DashboardChartsSection from '@/components/DashboardChartsSection.vue';
import HabitList from '@/components/HabitList.vue';
</script>

<template>
	<section>
		<!-- period will change and depends on the time -->
		<h2 class="font-semibold">Good [period of the day]*</h2>
		<p class="text-slate-800">Let's build some great habits today.</p>
		<div class="flex gap-8 mt-8">
			<HabitList />
			<DashboardChartsSection />
		</div>
	</section>
</template>
