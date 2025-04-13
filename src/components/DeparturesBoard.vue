<template>
  <v-card color="primary" variant="outlined" class="mx-auto">
    <v-card-title>{{ departuresBoard.name }}</v-card-title>
    <v-card-text style="height: 13.5rem" class="overflow-auto">
      <div class="mb-1" />
      <div
        v-for="(departure, index) in departuresBoard.departures"
        :key="index"
      >
        <DeparturesBoardDeparture :departure="departure" />
        <v-divider
          v-if="index < departuresBoard.departures.length - 1"
          class="my-2"
        />
      </div>
    </v-card-text>
  </v-card>
</template>
<script setup lang="ts">
import { type DeparturesBoard } from "@/stores/useDeparturesBoardsStore";

defineProps<{
  departuresBoard: DeparturesBoard;
}>();
</script>
