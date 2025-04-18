<template>
  <v-card color="primary" variant="outlined">
    <v-card-title class="text-center">{{ departuresBoard.name }}</v-card-title>
    <v-card-text class="text-center">
      <v-container class="pa-0 ma-0" fluid>
        <v-row no-gutters>
          <v-col cols="5" align-self="center">
            <div class="text-center">
              <v-icon icon="mdi-arrow-left" />
            </div>
            <div style="height: 11rem" class="overflow-auto">
              <departures-board-timetable
                :departures="departuresBoard.departuresDir1"
              />
            </div>
          </v-col>
          <v-spacer />
          <v-col cols="5">
            <div class="text-center" align-self="center">
              <v-icon icon="mdi-arrow-right" />
            </div>
            <div style="height: 11rem" class="overflow-auto">
              <departures-board-timetable
                :departures="departuresBoard.departuresDir2"
              />
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>
<script setup lang="ts">
import { type DeparturesBoard } from "@/stores/useDeparturesBoardsStore";

defineProps<{
  departuresBoard: DeparturesBoard;
}>();
</script>
