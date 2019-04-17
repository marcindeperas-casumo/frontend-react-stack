// @flow

export type AdventurerDetailsRaw = {
  casumoName: string,
  currentBelt: number,
  playerId: string,
};

export type AdventurerDetails = {
  name: string,
  belt: string,
};

export type AdventureResponse<T> = {
  response: T,
};

export type AcheivementRaw = {
  badgeRuleName: string,
  count: string,
  lastCreatedTime: number,
};

type LimboGemSummary = {
  type: number,
  count: number,
};

export type AdventurerProgressionRaw = {
  destinationPlanet: number,
  destinationPlanetName: string,
  earnedAchievementSummary: Array<AcheivementRaw>,
  earnedItems: Array<any>,
  inLimbo: boolean,
  inTravelMode: boolean,
  level: number,
  limboGemSummary: Array<LimboGemSummary>,
  place: number,
  planet: number,
  planetName: string,
  playerId: string,
  points: number,
  pointsRequiredForNextLimboGem: number,
  pointsRequiredForNextSpaceCrystal: number,
  pointsVersion: number,
  spaceCrystals: Array<number>,
  world: number,
};

export type AdventurerProgression = {
  inTravelMode: boolean,
  level: number,
  points: number,
  pointsRequiredForNextLevel: number,
  progression: number,
};

export type BeltType =
  | "rope"
  | "white"
  | "yellow"
  | "red"
  | "blue"
  | "purple"
  | "black"
  | "sensei";

export type Adventurer = {
  belt: BeltType,
  inTravelMode: boolean,
  level: number,
  name: string,
  points: number,
  pointsRequiredForNextLevel: number,
};
