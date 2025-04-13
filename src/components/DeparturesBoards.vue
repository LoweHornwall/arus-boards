<template>
  <v-row style="height: 16.5rem">
    <v-col
      v-for="departuresBoard in departuresBoards"
      :key="departuresBoard.name"
      cols="12"
      md="3"
    >
      <DeparturesBoard :departures-board="departuresBoard" />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { useDeparturesBoardsStore } from "@/stores/useDeparturesBoardsStore";
import { storeToRefs } from "pinia";

const store = useDeparturesBoardsStore();
const { departuresBoards } = storeToRefs(store);
store.fetchDeparturesBoards();
</script>
