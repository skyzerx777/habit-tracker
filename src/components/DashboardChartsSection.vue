<script setup lang="ts">
import { ArrowTrendingUpIcon, CheckCircleIcon } from '@heroicons/vue/16/solid';
import { FireIcon } from '@heroicons/vue/20/solid';
</script>

<template>
	<section class="flex gap-8 grow bg-red-300">
		<div class="flex justify-between w-2/3">
			<div class="flex gap-2 py-6 px-4 border border-slate-200 rounded-sm">
				<CheckCircleIcon class="text-main size-6" />
				<div>
					<p class="font-medium">23</p>
					<p>Habits Completed</p>
				</div>
			</div>
			<div class="flex gap-2 py-6 px-4 border border-slate-200 rounded-sm">
				<FireIcon class="text-main size-6" />
				<div>
					<p class="font-medium">7</p>
					<p>Best Streak</p>
				</div>
			</div>
			<div class="flex gap-2 py-6 px-4 border border-slate-200 rounded-sm">
				<ArrowTrendingUpIcon class="text-main size-6" />
				<div>
					<p class="font-medium">85%</p>
					<p>Avg. Completition Rate</p>
				</div>
			</div>
			<div class="h-36 w-48 bg-blue-500 self-`"></div>
		</div>
		<div class="w-1/3 py-6 px-4 border border-slate-200 rounded-sm"></div>
	</section>
</template>
