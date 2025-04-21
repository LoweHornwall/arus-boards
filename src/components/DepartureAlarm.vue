<template>
  <v-card
    color="primary"
    variant="outlined"
    :class="alarmColor"
    style="height: 3rem"
    @click="turnOffAlarm"
  >
    <v-card-text class="d-flex fill-height align-center justify-center">
      <v-container v-if="departure" class="pa-0 ma-0" fluid>
        <v-row no-gutters class="cursor-pointer">
          <v-col cols="2" align-self="center">
            <div class="d-flex me-auto align-center">
              {{ departure.boardName }}
            </div>
          </v-col>
          <v-col cols="4" align-self="center">
            <div class="d-flex me-auto align-center">
              <div
                class="bg-red-darken-3 text-white py-1 px-1 rounded me-2 text-center"
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
              <v-icon class="alarm-set" icon="mdi-walk" />
              <div class="alarm-set" style="min-width: 3rem">
                {{ departure.timeRemainingWalk }}
              </div>
            </div>
          </v-col>
          <v-col cols="2" align-self="center">
            <v-btn class="align-center" @click="clearAlarm">Cancel</v-btn>
          </v-col>
        </v-row>
      </v-container>
      <div v-else class="d-flex fill-height align-center justify-center">
        <h2 class="text-center">Click departure to set alarm</h2>
      </div>
    </v-card-text>
  </v-card>
</template>
<script setup lang="ts">
import { useDepartureAlarmGlobal } from "@/composables/useDepartureAlarmGlobal";

const { alarmOn, departure, turnOffAlarm, clearAlarm, turnOnWatcher } =
  useDepartureAlarmGlobal();

turnOnWatcher();

const alarmColor = computed(() => {
  return alarmOn.value ? "alarm-on" : "";
});
</script>
<style scoped lang="scss">
.alarm-on {
  animation: flash-bg 1s infinite;
}

@keyframes flash-bg {
  50% {
    background-color: #ee4646;
  }
}

.alarm-set {
  color: #ff0000;
}
</style>
