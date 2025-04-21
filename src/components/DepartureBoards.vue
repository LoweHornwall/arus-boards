<template>
  <div v-if="config">
    <v-row>
      <v-col
        v-for="(boardConfig, index) in config.departureBoards.boards"
        :key="index"
        cols="12"
      >
        <departure-board
          :api-key="config.departureBoards.apiKey"
          :board-config="boardConfig"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { useConfigStore } from "@/stores/useConfigStore";

const configStore = useConfigStore();
const { config } = storeToRefs(configStore);
</script>
