<template>
  <div v-if="loading" class="d-flex fill-height align-center justify-center">
    <v-progress-circular
      color="primary"
      indeterminate
      size="128"
    ></v-progress-circular>
  </div>
  <div v-else>
    <v-app-bar color="black">
      <v-container fluid>
        <v-row>
          <v-col cols="3">
            <digital-clock />
          </v-col>
          <v-col cols="2">
            <WeatherDisplay />
          </v-col>
          <v-col cols="7">
            <departure-alarm />
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
    <v-container fluid>
      <v-row>
        <v-col>
          <departure-boards />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts" setup>
import { useConfigStore } from "@/stores/useConfigStore";

const configStore = useConfigStore();
const { loading } = storeToRefs(configStore);
const { fetchConfig } = configStore;

fetchConfig();
</script>
