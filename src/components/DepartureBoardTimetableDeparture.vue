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
    <div class="me-4" style="width: 6rem">{{ departure.time }}</div>
    <v-icon icon="mdi-bus-clock" />
    <div class="me-4" style="width: 2.5rem">{{ departure.timeRemaining }}</div>
    <v-icon icon="mdi-walk" />
    <div class="me-4" style="width: 2.5rem">
      {{ departure.timeRemainingWalk }}
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Departure } from "@/config/types";
defineProps<{
  departure: Departure;
}>();
</script>
