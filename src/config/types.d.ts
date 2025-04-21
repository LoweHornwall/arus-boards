export interface RestrobotDepartureBoardResponse {
  Departure: ResrobotDeparture[];
}

export interface ResrobotDeparture {
  direction: string;
  directionFlag: string;
  time: string;
  date: string;
  Product: ResrobotProduct[];
  JourneyDetailRef: ResrobotDepartureJourneyDetailRef;
}

export interface ResrobotDepartureJourneyDetailRef {
  ref: string;
}

export interface ResrobotProduct {
  line: string;
  cls: string;
}

export interface Departure {
  line: string;
  direction: string;
  time: string;
  date: string;
  timeRemaining: string;
  timeRemainingWalk: string;
  journeyDetailRef: string;
  boardName: string;
}

export interface DeparturesBoard {
  name: string;
  departuresDir1: Departure[];
  departuresDir2: Departure[];
}

export interface BoardConfig {
  displayName: string;
  stopId: number;
  products: number;
  fetchInterval: number;
  fetchDuration: number;
  walkTime: number;
}
export interface Config {
  departureBoards: DepartureBoardsConfig;
  weather: WeatherConfig;
}

export interface DepartureBoardsConfig {
  apiKey: string;
  boards: BoardConfig[];
}

export interface WeatherConfig {
  latitude: number;
  longitude: number;
  fetchInterval: number;
}
