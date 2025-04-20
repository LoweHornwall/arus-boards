import { ref } from "vue";
import type {
  DeparturesBoard,
  Departure,
  BoardConfig,
  RestrobotDepartureBoardResponse,
  ResrobotDeparture,
} from "@/config/types";
import { onUnmounted } from "vue";

export function useDepartureBoard(apiKey: string, boardConfig: BoardConfig) {
  const departureBoard = ref<DeparturesBoard>({
    name: boardConfig.displayName,
    departuresDir1: [],
    departuresDir2: [],
  });
  const loading = ref(false);

  const url = `https://api.resrobot.se/v2.1/departureBoard?id=${boardConfig.stopId}&products=${boardConfig.products}&duration=${boardConfig.fetchDuration}&accessId=${apiKey}&format=json`;
  let fetchIntervalId: number | null = null;
  let timeUpdateIntervalId: number | null = null;

  function fetchDepartureBoard() {
    loading.value = true;
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        return response.json();
      })
      .then(
        (resrobotDepartureBoardResponse: RestrobotDepartureBoardResponse) => {
          updateDepartureBoard(resrobotDepartureBoardResponse);
        }
      )
      .catch((error) => {
        console.error("Error fetching departure board:", error);
      })
      .finally(() => {
        loading.value = false;
      });
  }

  function updateDepartureBoard(
    resrobotDepartureBoardResponse: RestrobotDepartureBoardResponse
  ) {
    const now = new Date();
    resrobotDepartureBoardResponse.Departure.forEach(
      (departure: ResrobotDeparture) => {
        const newDeparture = buildDeparture(now, departure);
        if (departure.directionFlag === "1") {
          insertDeparture(departureBoard.value.departuresDir1, newDeparture);
        }
        if (departure.directionFlag === "2") {
          insertDeparture(departureBoard.value.departuresDir2, newDeparture);
        }
      }
    );
  }

  function buildDeparture(
    startDate: Date,
    resrobotDeparture: ResrobotDeparture
  ): Departure {
    const departureDate = new Date(
      `${resrobotDeparture.date} ${resrobotDeparture.time}`
    );
    const walkTimeStart = new Date(startDate.getTime() + boardConfig.walkTime);

    const departure = {
      line: resrobotDeparture.Product[0].line,
      direction: formatDirection(resrobotDeparture.direction),
      time: resrobotDeparture.time,
      date: resrobotDeparture.date,
      timeRemaining: calculateTimeRemaining(startDate, departureDate),
      timeRemainingWalk: calculateTimeRemaining(walkTimeStart, departureDate),
      journeyDetailRef: resrobotDeparture.JourneyDetailRef.ref,
    };

    return departure;
  }

  function insertDeparture(
    departures: Departure[],
    departure: Departure
  ): Departure[] {
    const index = departures.findIndex(
      (dep) => dep.journeyDetailRef === departure.journeyDetailRef
    );

    if (index !== -1) {
      departures[index] = Object.assign(departures[index], departure);
    } else {
      departures.push(departure);
    }

    return departures;
  }

  function calculateTimeRemaining(startDate: Date, endDate: Date): string {
    const distance = endDate.getTime() - startDate.getTime();

    if (distance < 0 && distance > -1000 * 60) {
      return "Now";
    } else if (distance < 0) {
      return "-";
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

  function formatDirection(direction: string): string {
    const index = direction.indexOf("(");
    if (index !== -1) {
      return direction.substring(0, index).trim();
    }
    return direction;
  }

  function handleTimeChange() {
    if (!departureBoard.value) return;

    const now = new Date();

    departureBoard.value.departuresDir1 = buildTimeUpdatedDepartures(
      now,
      departureBoard.value.departuresDir1
    );
    departureBoard.value.departuresDir2 = buildTimeUpdatedDepartures(
      now,
      departureBoard.value.departuresDir2
    );
  }

  function buildTimeUpdatedDepartures(date: Date, departures: Departure[]) {
    const cutoffTime = new Date(date);
    cutoffTime.setMinutes(cutoffTime.getMinutes() - 1);
    const walkTimeStart = new Date(date.getTime() + boardConfig.walkTime);

    const newDepartures = departures.filter(
      (departure) =>
        new Date(`${departure.date} ${departure.time}`) > cutoffTime
    );

    newDepartures.forEach((departure) => {
      departure.timeRemaining = calculateTimeRemaining(
        date,
        new Date(`${departure.date} ${departure.time}`)
      );
      departure.timeRemainingWalk = calculateTimeRemaining(
        walkTimeStart,
        new Date(`${departure.date} ${departure.time}`)
      );
    });

    return newDepartures;
  }

  function startFetchInterval() {
    fetchIntervalId = setInterval(() => {
      fetchDepartureBoard();
    }, boardConfig.fetchInterval);
  }

  function stopFetchInterval() {
    if (fetchIntervalId) {
      clearInterval(fetchIntervalId);
      fetchIntervalId = null;
    }
  }

  function startTimeUpdateInterval() {
    timeUpdateIntervalId = setInterval(() => {
      handleTimeChange();
    }, 1000);
  }

  function stopTimeUpdateInterval() {
    if (timeUpdateIntervalId) {
      clearInterval(timeUpdateIntervalId);
      timeUpdateIntervalId = null;
    }
  }

  function start() {
    fetchDepartureBoard();
    startFetchInterval();
    startTimeUpdateInterval();
  }
  function stop() {
    stopFetchInterval();
    stopTimeUpdateInterval();
  }

  onUnmounted(() => {
    stop();
  });

  return {
    departureBoard,
    loading,
    fetchDepartureBoard,
    startFetchInterval,
    stopFetchInterval,
    startTimeUpdateInterval,
    stopTimeUpdateInterval,
    start,
    stop,
  };
}
