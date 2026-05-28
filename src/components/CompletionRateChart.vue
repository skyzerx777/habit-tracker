<script setup lang="ts">
import { useHabitsStore } from '@/stores/habits';
import type { BarSeriesOption } from 'echarts/charts';
import { BarChart } from 'echarts/charts';
import type { GridComponentOption } from 'echarts/components';
import { GridComponent, TitleComponent } from 'echarts/components';
import type { ComposeOption } from 'echarts/core';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { computed, ref } from 'vue';
import VChart from 'vue-echarts';

use([GridComponent, BarChart, CanvasRenderer, TitleComponent]);

type EChartsOption = ComposeOption<GridComponentOption | BarSeriesOption>;

const store = useHabitsStore();
const dateSelect = ref<'week' | 'month' | 'year' | 'custom'>('week');

const startDate = ref(
	new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString().slice(0, 10),
);
const endDate = ref(new Date().toISOString().slice(0, 10));

//! connect select and refs

const option = computed(() => ({
	title: {
		text: 'Completion Rate Chart',
		show: true,
	},
	xAxis: {
		type: 'category',
		data: store.getDatesBetween(startDate.value, endDate.value),
	},
	yAxis: {
		type: 'value',
		max: 100,
	},
	color: '#6d5df6',
	series: [
		{
			data: store.getCompletionRatesBetweenDates(
				startDate.value,
				endDate.value,
			),
			type: 'bar',
		},
	],
}));
</script>

<template>
	<div class="w-full h-full">
		<select v-model="dateSelect">
			<option value="week">Last week</option>
			<option value="month">Last month</option>
			<option value="year">Last year</option>
			<option value="custom">Custom</option>
		</select>
		<div v-show="dateSelect === 'custom'">
			<label>From: <input type="date" v-model="startDate" /></label>
			<label>To: <input type="date" v-model="endDate" /></label>
		</div>
		<VChart class="size-full" :option="option" />
	</div>
</template>
