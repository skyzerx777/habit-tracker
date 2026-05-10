<script setup lang="ts">
import { ArrowTrendingUpIcon, CheckCircleIcon } from '@heroicons/vue/16/solid';
import { FireIcon } from '@heroicons/vue/20/solid';
</script>

<template>
	<section class="flex gap-8 grow">
		<div class="flex flex-col gap-4">
			<div class="flex justify-between gap-4">
				<div class="flex py-6 px-4 border border-slate-200 rounded-sm">
					<CheckCircleIcon class="text-main size-6" />
					<div>
						<p class="font-medium">23</p>
						<p class="text-slate-500">Habits Completed</p>
					</div>
				</div>
				<div class="flex py-6 px-4 border border-slate-200 rounded-sm">
					<FireIcon class="text-orange-400 size-6" />
					<div>
						<p class="font-medium">7</p>
						<p class="text-slate-500">Best Streak</p>
					</div>
				</div>
				<div class="flex py-6 px-4 border border-slate-200 rounded-sm">
					<ArrowTrendingUpIcon class="text-green-600 size-6" />
					<div>
						<p class="font-medium">85%</p>
						<p class="text-slate-500">Avg. Completition Rate</p>
					</div>
				</div>
			</div>
			<div class="h-36 w-full py-6 px-4 border border-slate-200 rounded-sm">
				Completition Rate Chart
			</div>
		</div>
		<div class="w-1/3 py-6 px-4 border border-slate-200 rounded-sm">
			Habits overview chart
		</div>
	</section>
</template>
