<template>
  <div class="d-flex align-center">
    <div class="d-flex me-auto align-center">
      <div
        class="bg-red-darken-3 text-white py-1 px-1 rounded me-2"
        style="width: 2.5rem"
      >
        {{ departure.line }}
      </div>
      <div>
        {{ departure.direction }}
      </div>
    </div>
    <div style="width: 5rem">{{ departure.time }}</div>
    <div style="width: 5rem">{{ departure.timeRemaining }}</div>
  </div>
</template>
<script setup lang="ts">
import { type Departure } from "@/stores/useDeparturesBoardsStore";
defineProps<{
  departure: Departure;
}>();
</script>
