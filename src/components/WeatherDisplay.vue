<template>
  <v-card variant="flat" style="height: 3rem">
    <v-card-text class="fill-height">
      <div class="d-flex align-center justify-center fill-height">
        <div v-if="temperature" class="text-h5 me-1">{{ temperature }}°C</div>
        <div v-if="weatherIconUrl">
          <img :src="weatherIconUrl" height="40" width="40" />
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { useWeather } from "@/composables/useWeather";

const { temperature, weatherIconUrl } = useWeather();
</script>

<style scoped></style>
