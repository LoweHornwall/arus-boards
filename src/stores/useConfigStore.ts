import { defineStore } from "pinia";
import { ref } from "vue";
import type { Config } from "@/config/types";

export const useConfigStore = defineStore("config", () => {
  const config = ref<Config | null>(null);
  const loading = ref(false);

  function fetchConfig() {
    loading.value = true;
    fetch("/config.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data: Config) => {
        config.value = data;
      })
      .catch((error) => {
        console.error("Error fetching config:", error);
      })
      .finally(() => {
        loading.value = false;
      });
  }

  return {
    config,
    loading,
    fetchConfig,
  };
});
