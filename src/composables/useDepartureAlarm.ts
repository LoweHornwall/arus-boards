import type { Departure } from "@/config/types";
import { useSound } from "@vueuse/sound";
import alarmSFX from "../assets/sounds/alarm-clock.mp3";

export function useDepartureAlarm(departure: Departure) {
  const alarmSet = ref(false);
  const alarmOn = ref(false);
  const { play: playAlarmSound, stop: stopAlarmSound } = useSound(alarmSFX, {
    volume: 1,
    loop: true,
  });

  let unwatch: (() => void) | null = null;

  function turnOnAlarm() {
    alarmSet.value = true;
    unwatch = watch(
      () => departure.timeRemainingWalk,
      () => {
        console.log("Alarm check:", departure.timeRemainingWalk);
        if (departure.timeRemainingWalk === "Now") {
          alarmOn.value = true;
          playAlarmSound();
        } else if (alarmOn.value && unwatch) {
          turnOffAlarm();
        }
      }
    );
  }

  function turnOffAlarm() {
    alarmSet.value = false;
    alarmOn.value = false;
    stopAlarmSound();
    if (unwatch) {
      unwatch();
      unwatch = null;
    }
  }

  function toggleAlarm() {
    if (alarmSet.value) {
      turnOffAlarm();
    } else {
      turnOnAlarm();
    }
  }

  onUnmounted(() => {
    console.log("unmounted");
    turnOffAlarm();
  });

  return {
    alarmSet,
    alarmOn,
    turnOnAlarm,
    turnOffAlarm,
    toggleAlarm,
  };
}
