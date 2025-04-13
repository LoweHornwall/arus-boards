import { defineStore } from "pinia";
import { ref } from "vue";

interface SLDepartureResult {
  departures: Departure[];
}

export interface Departure {
  destination: string;
  display: string;
  scheduled: string;
  expected: string;
  line: Line;
}

interface Line {
  designation: string;
}

export interface DeparturesBoard {
  name: string;
  departures: Departure[];
}

interface ConfigEntry {
  name: string;
  site: string;
  transport: string;
  direction: number;
}

export const useDeparturesBoardsStore = defineStore("departuresBoards", () => {
  const departuresBoards = ref<DeparturesBoard[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchDeparturesBoards() {
    const config: ConfigEntry[] = [
      {
        name: "Ottsjövägen buss 1",
        site: "1505",
        transport: "BUS",
        direction: 1,
      },
      {
        name: "Ottsjövägen buss 2",
        site: "1505",
        transport: "BUS",
        direction: 2,
      },
      {
        name: "Årstafältet tvärbanan 1",
        site: "1521",
        transport: "TRAM",
        direction: 1,
      },
      {
        name: "Årstafältet tvärbanan 2",
        site: "1521",
        transport: "TRAM",
        direction: 2,
      },
      {
        name: "Årstaberg pendel 1",
        site: "9531",
        transport: "TRAIN",
        direction: 1,
      },
      {
        name: "Årstaberg pendel 2",
        site: "9531",
        transport: "TRAIN",
        direction: 2,
      },
    ];

    departuresBoards.value = await Promise.all(
      config.map(
        async (configEntry: ConfigEntry) =>
          await getdeparturesBoard(configEntry)
      )
    );
  }

  async function getdeparturesBoard(
    configEntry: ConfigEntry
  ): Promise<DeparturesBoard> {
    try {
      const url = `https://transport.integration.sl.se/v1/sites/${configEntry.site}/departures?&forecast=60&transport=${configEntry.transport}&direction=${configEntry.direction}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const slDepartureResult = (await response.json()) as SLDepartureResult;

      return createdeparturesBoard(configEntry, slDepartureResult);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Network error:", error.message);
      } else {
        console.error("Unexpected error:", error);
      }
      throw error; // Re-throw the error to ensure proper error handling
    }
  }

  function createdeparturesBoard(
    configEntry: ConfigEntry,
    slDepartureResult: SLDepartureResult
  ): DeparturesBoard {
    return {
      name: configEntry.name,
      departures: slDepartureResult.departures,
    };
  }

  return { departuresBoards, loading, error, fetchDeparturesBoards };
});
