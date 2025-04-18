<template>
  <div class="mb-1" />
  <div v-for="(departure, index) in departures" :key="index">
    <departures-board-timetable-departure :departure="departure" />
    <v-divider v-if="index < departures.length - 1" class="my-2" />
  </div>
</template>
<script setup lang="ts">
import { type Departure } from "@/stores/useDeparturesBoardsStore";

defineProps<{
  departures: Departure[];
}>();
</script>
