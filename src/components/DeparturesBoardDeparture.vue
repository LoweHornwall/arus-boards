<template>
  <div class="d-flex align-center justify-space-between">
    <div>
      <span class="bg-red-darken-3 text-white py-1 px-1 rounded me-2">
        {{ departure.line.designation }}
      </span>
      <span>
        {{ departure.destination }}
      </span>
    </div>
    <div>{{ departure.display }}</div>
  </div>
</template>
<script setup lang="ts">
import { type Departure } from "@/stores/useDeparturesBoardsStore";
defineProps<{
  departure: Departure;
}>();
</script>
