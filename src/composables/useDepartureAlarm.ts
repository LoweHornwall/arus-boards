import type { Departure } from "@/config/types";
import { useSound } from "@vueuse/sound";
import alarmSFX from "../assets/sounds/alarm-clock.mp3";

const departure = ref<Departure | null>(null);
const alarmOn = ref(false);

export function useDepartureAlarm() {
  const { play: playAlarmSound, stop: stopAlarmSound } = useSound(alarmSFX, {
    volume: 1,
    loop: true,
  });

  function setAlarm(newDeparture: Departure) {
    departure.value = newDeparture;
  }

  function clearAlarm() {
    departure.value = null;
    alarmOn.value = false;
    stopAlarmSound();
  }

  function turnOnAlarm() {
    alarmOn.value = true;
    playAlarmSound();
  }

  function turnOffAlarm() {
    alarmOn.value = false;
    stopAlarmSound();
  }

  function turnOnWatcher() {
    watch(
      () => departure.value?.timeRemainingWalk,
      () => {
        if (departure.value?.timeRemainingWalk === "Now") {
          turnOnAlarm();
        } else {
          turnOffAlarm();
        }
      }
    );
  }

  return {
    departure,
    alarmOn,
    setAlarm,
    clearAlarm,
    turnOffAlarm,
    turnOnWatcher,
  };
}
