<template>
  <div v-if="config">
    <v-row>
      <v-col
        v-for="(boardConfig, index) in config.boards"
        :key="index"
        cols="12"
      >
        <departure-board :api-key="config.apiKey" :board-config="boardConfig" />
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { Config } from "@/config/types";
const config = ref<Config | null>(null);

fetch("/config.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data: Config) => {
    config.value = data;
  })
  .catch((error) => {
    console.error("Error fetching config:", error);
  });
</script>
