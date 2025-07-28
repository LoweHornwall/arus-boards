<template>
  <v-card variant="flat" style="height: 3rem">
    <v-card-text class="fill-height">
      <div class="d-flex align-center justify-center fill-height">
        <div class="text-h5 me-1">{{ time }}</div>
        <div class="text-h6 me-1">{{ date }}</div>
        <div class="text-h6 me-1">{{ weekday }}</div>
      </div>
    </v-card-text>
  </v-card>
</template>
<script setup lang="ts">
const time = ref<string>("");
const date = ref<string>("");
const weekday = ref<string>("");

function updateTime() {
  const now = new Date();

  const days = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  date.value = `${days}/${month}`;

  const weekdayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  weekday.value = weekdayNames[now.getDay()];

  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  time.value = `${hours}:${minutes}:${seconds}`;
}

updateTime();

const intervalId = setInterval(updateTime, 1000);
onBeforeUnmount(() => {
  clearInterval(intervalId);
});
</script>
