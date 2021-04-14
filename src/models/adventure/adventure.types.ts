export type BeltType =
  | "rope"
  | "white"
  | "yellow"
  | "red"
  | "blue"
  | "purple"
  | "black"
  | "sensei";

type AcheivementRaw = {
  badgeRuleName: string;
  count: string;
  lastCreatedTime: number;
};

type LimboGemSummary = {
  type: number;
  count: number;
};

export type AdventurerProgressionRaw = {
  destinationPlanet: number;
  destinationPlanetName: string;
  earnedAchievementSummary: Array<AcheivementRaw>;
  earnedItems: Array<any>;
  inLimbo: boolean;
  inTravelMode: boolean;
  level: number;
  limboGemSummary: Array<LimboGemSummary>;
  place: number;
  planet: number;
  planetName: string;
  playerId: string;
  points: number;
  pointsRequiredForNextLimboGem: number;
  pointsRequiredForNextSpaceCrystal: number;
  pointsVersion: number;
  spaceCrystals: Array<number>;
  world: number;
};

export type AdventurerDetailsRaw = {
  casumoName: string;
  currentBelt: number;
  playerId: string;
};

export type AdventurerRaw = {
  belt: string;
  inTravelMode: boolean;
  level: number;
  levels: Array<number>;
  name: string;
  points: number;
  pointsRequiredForNextSpaceCrystal: number;
  pointsVersion: number;
  progression: number;
  spaceCrystals: Array<number>;
  recentValuable: string;
};

export type AdventurerLevelProgress = {
  points: number;
  pointsRequiredForNextLevel: number;
};

export type AdventureContent = {
  bonus_mode_label: string;
  level_label: string;
  max_level_label: string;
  progression_label_standard: string;
  progression_label_bonus: string;
};

export type Adventurer = {
  belt: BeltType;
  inBonusMode: boolean;
  level: number;
  name: string;
  points: number;
  pointsRequiredForNextLevel: number;
};
