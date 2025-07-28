import { fetchWeatherApi } from "openmeteo";
import { useConfigStore } from "@/stores/useConfigStore";

const mappings: Record<string, string> = {
  "0": "clear-day",
  "1": "clear-day",
  "2": "cloudy",
  "3": "overcast",
  "45": "fog",
  "48": "fog",
  "51": "drizzle",
  "53": "drizzle",
  "55": "drizzle",
  "56": "drizzle",
  "57": "drizzle",
  "61": "rain",
  "63": "rain",
  "65": "rain",
  "66": "rain",
  "67": "rain",
  "71": "snow",
  "73": "snow",
  "75": "snow",
  "77": "snow",
  "80": "rain",
  "81": "rain",
  "82": "rain",
  "85": "snow",
  "86": "snow",
  "95": "thunderstorm",
  "96": "thunderstorm",
  "99": "thunderstorm",
};

export function useWeather() {
  const configStore = useConfigStore();
  const { config } = storeToRefs(configStore);

  const temperature = ref<string | null>(null);
  const weatherCode = ref<string | null>(null);
  const loading = ref(false);

  const params = {
    latitude: config.value?.weather.latitude,
    longitude: config.value?.weather.longitude,
    current: ["temperature_2m", "weather_code"],
  };
  const url = "https://api.open-meteo.com/v1/forecast";

  function fetchWeather() {
    loading.value = true;
    fetchWeatherApi(url, params)
      .then((responses) => {
        const response = responses[0];
        const current = response.current()!;
        temperature.value = current.variables(0)!.value().toFixed(1);
        weatherCode.value = current.variables(1)!.value().toString();
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      })
      .finally(() => {
        loading.value = true;
      });
  }

  const weatherIconUrl = computed(() => {
    if (!weatherCode.value) {
      return null;
    }

    return "/weather-icons/" + mappings[weatherCode.value] + ".svg";
  });

  fetchWeather();

  const intervalId = setInterval(() => {
    fetchWeather();
  }, (config.value?.weather.fetchInterval || 600) * 1000);

  onUnmounted(() => {
    clearInterval(intervalId);
  });

  return {
    temperature,
    weatherCode,
    weatherIconUrl,
    loading,
  };
}
