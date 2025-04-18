import { defineStore } from "pinia";
import { ref } from "vue";

interface RestrobotDepartureBoardResponse {
  Departure: ResrobotDeparture[];
}

interface ResrobotDeparture {
  direction: string;
  directionFlag: string;
  time: string;
  date: string;
  Product: ResrobotProduct[];
}

interface ResrobotProduct {
  line: string;
  cls: string;
}

export interface Departure {
  line: string;
  direction: string;
  time: string;
  date: string;
  timeRemaining: string;
}

export interface DeparturesBoard {
  name: string;
  departuresDir1: Departure[];
  departuresDir2: Departure[];
}

interface Config {
  api: ApiConfig;
  stops: StopConfig[];
}

interface ApiConfig {
  key: string;
  fetchInterval: number;
  fetchDuration: 120;
}

interface StopConfig {
  displayName: string;
  stopId: number;
  products: number;
}

const configResponse = await fetch("/config.json");
const config: Config = await configResponse.json();

export const useDeparturesBoardsStore = defineStore("departuresBoards", () => {
  const departuresBoards = ref<DeparturesBoard[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchDeparturesBoards() {
    departuresBoards.value = await Promise.all(
      config.stops.map(
        async (stopConfig: StopConfig) => await getdeparturesBoard(stopConfig)
      )
    );
  }

  async function getdeparturesBoard(
    stopConfig: StopConfig
  ): Promise<DeparturesBoard> {
    try {
      const url = `https://api.resrobot.se/v2.1/departureBoard?id=${stopConfig.stopId}&products=${stopConfig.products}&duration=${config.api.fetchDuration}&accessId=${config.api.key}&format=json`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const resrobotDepartureBoardResponse =
        (await response.json()) as RestrobotDepartureBoardResponse;

      return createdeparturesBoard(stopConfig, resrobotDepartureBoardResponse);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Network error:", error.message);
      } else {
        console.error("Unexpected error:", error);
      }
      throw error;
    }
  }

  function createdeparturesBoard(
    stopConfig: StopConfig,
    resrobotDepartureBoardResponse: RestrobotDepartureBoardResponse
  ): DeparturesBoard {
    const departuresDir1: Departure[] = [];
    const departuresDir2: Departure[] = [];
    resrobotDepartureBoardResponse.Departure.forEach(
      (departure: ResrobotDeparture) => {
        const newDeparture = {
          line: departure.Product[0].line,
          direction: formatDirection(departure.direction),
          time: departure.time,
          date: departure.date,
          timeRemaining: calculateTimeRemaining(
            new Date(),
            new Date(`${departure.date} ${departure.time}`)
          ),
        };

        if (departure.directionFlag === "1") {
          departuresDir1.push(newDeparture);
        } else if (departure.directionFlag === "2") {
          departuresDir2.push(newDeparture);
        }
      }
    );

    return {
      name: stopConfig.displayName,
      departuresDir1: departuresDir1,
      departuresDir2: departuresDir2,
    };
  }

  function formatDirection(direction: string): string {
    const index = direction.indexOf("(");
    if (index !== -1) {
      return direction.substring(0, index).trim();
    }
    return direction;
  }

  function handleTimeChange() {
    const now = new Date();
    departuresBoards.value.forEach((board) => {
      board.departuresDir1 = buildTimeUpdatedDepartures(
        now,
        board.departuresDir1
      );
      board.departuresDir2 = buildTimeUpdatedDepartures(
        now,
        board.departuresDir2
      );
    });
  }

  function calculateTimeRemaining(startDate: Date, endDate: Date): string {
    const distance = endDate.getTime() - startDate.getTime();

    if (distance < 0) {
      return "Now";
    }

    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    return formatTimeString(hours, minutes, seconds);
  }

  function formatTimeString(hours: number, minutes: number, seconds: number) {
    const hourString = hours > 0 ? `${hours}:` : "";
    const minutesString = minutes.toString().padStart(2, "0");
    const secondsString = seconds.toString().padStart(2, "0");

    return `${hourString}${minutesString}:${secondsString}`;
  }

  function buildTimeUpdatedDepartures(date: Date, departures: Departure[]) {
    const cutoffTime = new Date(date);
    cutoffTime.setMinutes(cutoffTime.getMinutes() - 1);

    const newDepartures = departures.filter(
      (departure) =>
        new Date(`${departure.date} ${departure.time}`) > cutoffTime
    );

    newDepartures.forEach((departure) => {
      departure.timeRemaining = calculateTimeRemaining(
        date,
        new Date(`${departure.date} ${departure.time}`)
      );
    });

    return newDepartures;
  }

  fetchDeparturesBoards();

  window.setInterval(() => {
    fetchDeparturesBoards();
  }, config.api.fetchInterval);

  window.setInterval(() => {
    handleTimeChange();
  }, 1000);

  return { departuresBoards, loading, error, fetchDeparturesBoards };
});
