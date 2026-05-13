<script setup lang="ts">
import { useHabitsStore } from '@/stores/habits';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const store = useHabitsStore();

const routeHabitId = computed(() => route.params.id);

const selectedHabit = computed(() =>
	store.habits.find(item => item.id === routeHabitId.value),
);
</script>

<template>
	<h2>details page {{ selectedHabit?.name }}</h2>
</template>
