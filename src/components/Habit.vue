<script setup lang="ts">
import { AcademicCapIcon } from '@heroicons/vue/16/solid';
</script>

<template>
	<div class="flex justify-between px-2">
		<div class="flex items-center gap-6">
			<AcademicCapIcon class="size-6" />
			<div>
				<h3 class="font-semibold">habit</h3>
				<p>1 day streak</p>
			</div>
		</div>
		<input type="checkbox" name="habit-completition" />
	</div>
</template>
