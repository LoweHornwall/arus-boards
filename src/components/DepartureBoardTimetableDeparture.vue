<template>
  <v-container class="pa-0 ma-0" fluid>
    <v-row no-gutters class="cursor-pointer" @click="setAlarm(departure)">
      <v-col cols="6" align-self="center">
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
      </v-col>
      <v-spacer />
      <v-col cols="2" align-self="center">
        <div class="d-flex align-center">
          <div style="min-width: 3rem">
            {{ departure.time }}
          </div>
        </div>
      </v-col>
      <v-col cols="2" align-self="center">
        <div class="d-flex align-center">
          <v-icon icon="mdi-bus-clock" />
          <div style="min-width: 3rem">
            {{ departure.timeRemaining }}
          </div>
        </div>
      </v-col>
      <v-col :class="alarmColor" cols="2" align-self="center">
        <div class="d-flex align-center">
          <v-icon icon="mdi-walk" />
          <div style="min-width: 3rem">
            {{ departure.timeRemainingWalk }}
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import type { Departure } from "@/config/types";
import { useDepartureAlarmGlobal } from "@/composables/useDepartureAlarmGlobal";

const props = defineProps<{
  departure: Departure;
}>();

const {
  setAlarm,
  departure: alarmDeparture,
  alarmOn,
} = useDepartureAlarmGlobal();

const alarmColor = computed(() => {
  if (
    props.departure.journeyDetailRef !== alarmDeparture.value?.journeyDetailRef
  ) {
    return "";
  }

  return alarmOn.value ? "alarm-on" : "alarm-set";
});
</script>
<style scoped lang="scss">
.alarm-set {
  color: #ff0000;
}

.alarm-on {
  animation: flash-bg 1s infinite;
}

@keyframes flash-bg {
  50% {
    color: #ff0000;
  }
}
</style>
