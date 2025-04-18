<template>
  <v-row>
    <v-col
      v-for="departuresBoard in departuresBoards"
      :key="departuresBoard.name"
      cols="12"
    >
      <departures-board :departures-board="departuresBoard" />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { useDeparturesBoardsStore } from "@/stores/useDeparturesBoardsStore";
import { storeToRefs } from "pinia";

const store = useDeparturesBoardsStore();
const { departuresBoards } = storeToRefs(store);
</script>
