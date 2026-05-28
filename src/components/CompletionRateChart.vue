<script setup lang="ts">
import { useHabitsStore } from '@/stores/habits';
import type { BarSeriesOption } from 'echarts/charts';
import { BarChart } from 'echarts/charts';
import type {
	GridComponentOption,
	TitleComponentOption,
	TooltipComponentOption,
} from 'echarts/components';
import {
	GridComponent,
	TitleComponent,
	TooltipComponent,
} from 'echarts/components';
import type { ComposeOption } from 'echarts/core';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { computed, ref, watch } from 'vue';
import VChart from 'vue-echarts';

use([
	GridComponent,
	BarChart,
	CanvasRenderer,
	TitleComponent,
	TooltipComponent,
]);

type EChartsOption = ComposeOption<
	| GridComponentOption
	| BarSeriesOption
	| TitleComponentOption
	| TooltipComponentOption
>;

const props = withDefaults(
	defineProps<{
		showControls?: boolean;
		defaultRange?: 'week' | 'month' | 'year';
	}>(),
	{
		showControls: true,
		defaultRange: 'week',
	},
);

const store = useHabitsStore();

const dateSelect = ref<'week' | 'month' | 'year' | 'custom'>(
	props.defaultRange,
);

const startDate = ref('');
const endDate = ref('');

function updateDates(range: 'week' | 'month' | 'year' | 'custom') {
	const today = new Date();

	endDate.value = today.toISOString().slice(0, 10);

	if (range === 'week') {
		const weekAgo = new Date();

		weekAgo.setDate(today.getDate() - 6);

		startDate.value = weekAgo.toISOString().slice(0, 10);
	}

	if (range === 'month') {
		const monthAgo = new Date();

		monthAgo.setMonth(today.getMonth() - 1);

		startDate.value = monthAgo.toISOString().slice(0, 10);
	}

	if (range === 'year') {
		const yearAgo = new Date();

		yearAgo.setFullYear(today.getFullYear() - 1);

		startDate.value = yearAgo.toISOString().slice(0, 10);
	}
}

watch(
	dateSelect,
	value => {
		if (value !== 'custom') {
			updateDates(value);
		}
	},
	{ immediate: true },
);

const option = computed<EChartsOption>(() => ({
	color: ['#6d5df6'],

	tooltip: {
		trigger: 'axis',
	},

	grid: {
		left: 10,
		right: 10,
		top: 30,
		bottom: 10,
		containLabel: true,
	},

	xAxis: {
		type: 'category',
		data: store.getDatesBetween(startDate.value, endDate.value),

		axisLine: {
			show: false,
		},

		axisTick: {
			show: false,
		},
	},

	yAxis: {
		type: 'value',
		max: 100,

		splitLine: {
			lineStyle: {
				color: '#e2e8f0',
			},
		},
	},

	series: [
		{
			data: store.getCompletionRatesBetweenDates(
				startDate.value,
				endDate.value,
			),

			type: 'bar',

			barWidth: '55%',

			itemStyle: {
				borderRadius: [8, 8, 0, 0],
			},
		},
	],
}));
</script>

<template>
	<div class="flex h-full w-full flex-col">
		<div
			v-if="showControls"
			class="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
		>
			<select
				v-model="dateSelect"
				class="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm outline-none transition focus:border-main"
			>
				<option value="week">Last week</option>
				<option value="month">Last month</option>
				<option value="year">Last year</option>
				<option value="custom">Custom range</option>
			</select>

			<div
				v-if="dateSelect === 'custom'"
				class="flex flex-col gap-2 sm:flex-row"
			>
				<input
					type="date"
					v-model="startDate"
					class="rounded-xl border border-slate-200 px-4 py-2 text-sm outline-none focus:border-main"
				/>

				<input
					type="date"
					v-model="endDate"
					class="rounded-xl border border-slate-200 px-4 py-2 text-sm outline-none focus:border-main"
				/>
			</div>
		</div>

		<div class="min-h-0 flex-1">
			<VChart class="min-h-0 flex-1" autoresize :option="option" />
		</div>
	</div>
</template>
