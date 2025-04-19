<template>
  <v-card v-if="departureBoard" color="primary" variant="outlined">
    <v-card-title class="text-center">{{ departureBoard.name }}</v-card-title>
    <v-card-text class="text-center">
      <v-container class="pa-0 ma-0" fluid>
        <v-row no-gutters>
          <v-col cols="6" align-self="center">
            <div class="me-5">
              <div class="text-center">
                <v-icon icon="mdi-arrow-left" />
              </div>
              <div style="height: 11rem" class="overflow-auto">
                <departure-board-timetable
                  :departures="departureBoard.departuresDir1"
                />
              </div>
            </div>
          </v-col>
          <v-spacer />
          <v-col cols="6">
            <div class="ms-5">
              <div class="text-center" align-self="center">
                <v-icon icon="mdi-arrow-right" />
              </div>
              <div style="height: 11rem" class="overflow-auto">
                <departure-board-timetable
                  :departures="departureBoard.departuresDir2"
                />
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>
<script setup lang="ts">
import type { BoardConfig } from "@/config/types";
import { useDepartureBoard } from "@/composables/useDepartureBoard";

const props = defineProps<{
  apiKey: string;
  boardConfig: BoardConfig;
}>();

const { departureBoard, start } = useDepartureBoard(
  props.apiKey,
  props.boardConfig
);

start();
</script>
