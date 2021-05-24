/* eslint-disable no-shadow, no-unused-vars, eslint-comments/disable-enable-pair */
// this file is based on types provided by blue ribbon here:
//   https://sdk.bluerbn.com/br-sdk-types-1.3.2.ts
// but contains some changes (ie. Window.BlueRibbon.constants.* are using
// `typeof Enum` instead of `Enum`). I'm not sure what might be the reason for
// those differences, maybe BR is using older typescript version.
// I only updated those types that are used currently, anything "new" you use
// can be broken.

declare global {
  interface Window {
    BlueRibbon: {
      constants: {
        events: typeof Events;
        gamesMode: typeof GameMode;
        winningStrategies: typeof WinningStrategies;
      };
      SdkCoreManager: SdkCoreManagerConstructor;
    };
  }
}

export enum Events {
  WIN_EVENT = "WIN_EVENT",
  POT_STATE_CHANGED_EVENT = "POT_STATE_CHANGED_EVENT",
  GAME_DETAILS_CHANGED_EVENT = "GAME_DETAILS_CHANGED_EVENT",
  OPT_IN_EVENT = "OPT_IN_EVENT",
  OPT_OUT_EVENT = "OPT_OUT_EVENT",
  GAME_CODE_MATCHING_STATE_CHANGED_EVENT = "GAME_CODE_MATCHING_STATE_CHANGED_EVENT",
  GAME_STATUS_CHANGED_EVENT = "GAME_STATUS_CHANGED_EVENT",
  CONNECTION_ACTIVITY_CHANGED = "CONNECTION_ACTIVITY_CHANGED",
}

interface EventMap {
  [Events.WIN_EVENT]: WinEvent;
  [Events.POT_STATE_CHANGED_EVENT]: PotStateChangedEvent;
  [Events.GAME_DETAILS_CHANGED_EVENT]: GameDetailsChangedEvent;
  [Events.GAME_STATUS_CHANGED_EVENT]: GameStatusChangedEvent;
  [Events.GAME_CODE_MATCHING_STATE_CHANGED_EVENT]: GameCodeMatchingStateChangedEvent;
  [Events.OPT_IN_EVENT]: OptEvent;
  [Events.OPT_OUT_EVENT]: OptEvent;
  [Events.CONNECTION_ACTIVITY_CHANGED]: FBConnectivityStatus;
}

export enum GameMode {
  LOBBY = "LOBBY",
  IN_GAME = "IN_GAME",
}

export enum WinningStrategies {
  SINGLE_WIN = "SINGLE_WIN",
  COMMUNITY_WIN = "COMMUNITY_WIN",
}

interface SdkCoreManagerConstructor {
  new (config: BlueRibbonConfig): SDKInterface;
}

export interface SDKInterface {
  connect: (connectConfiguration: ConnectConfiguration) => Promise<void>;
  startGamesFeed?: (
    gamesConfiguration: StartFeedConfiguration
  ) => Promise<StartFeedResponse>;
  startGamesFeedWithOverlays?: (
    gamesConfigurationWithOverlays: StartFeedWithOverlaysConfiguration
  ) => Promise<StartFeedResponse>;
  stopGamesFeed: (
    stoppedGamesConfiguration: StopFeedConfiguration
  ) => StopFeedResponse;
  stopAllGamesFeed: () => StopFeedResponse;
  reset: () => Promise<void>;
  events: {
    on: <K extends keyof EventMap>(
      eventName: K,
      handler: (eventDetails: EventMap[K]) => void
    ) => void;
  };
  player: {
    optInPlayerToJackpotGame: (
      game: GameObject
    ) => Promise<PlayerOptResponse | void>;
    optOutPlayerToJackpotGame: (game: GameObject) => Promise<PlayerOptResponse>;
    isPlayerOptInToJackpotGame: (
      game: GameObject
    ) => Promise<PlayerOptResponse>;
  };
  ticker: {
    getJackpotsPotState: (games: GameObject[]) => Promise<PotStates>;
    getGameDetailsByGameIds: (
      games: GameObject[]
    ) => Promise<{ gamesDetails: FullGameDetails[] }>;
  };
  operatorGames: {
    getOperatorGamesMatchDetails: (
      options?: GetOperatorGamesMatchOptions
    ) => GetOperatorGamesMatchDetailsResponse;
    getOperatorGamesMatchDetailsByGameIds: (
      games: GameObject[]
    ) => GetOperatorGamesMatchDetailsResponse;
    getOperatorGamesMatchByComplexSegment: (
      complexSegments: ComplexSegment[]
    ) => ComplexMatchDetails[];
  };
}

interface EventDetails {
  eventType: Events;
  gameId: string;
}

export interface OnEventTriggeredFunc {
  (eventDetails: EventDetails, callback: VoidFunction): void;
}

export interface LoginFuncResponse {
  meta?: Record<string, string>;
  data: {
    fbJWT: string;
    userJWT: string;
  };
}

export interface LoginFunc {
  (): Promise<LoginFuncResponse>;
}

export enum LogLevel {
  debug = "debug",
  info = "info",
  warn = "warn",
  error = "error",
}

export interface OverlayConfig {
  containerId: string;
}
export interface BlueRibbonConfig {
  operatorId: string;
  loginAnonymousPlayer: LoginFunc;
  loginAuthenticatedPlayer: LoginFunc;
  baseServiceUrl: string;
  logLevel: LogLevel;
  withOverlays: boolean;
  overlaysDetails?: OverlayConfig;
  onEventTriggered?: OnEventTriggeredFunc;
  overrideFBVersion?: string;
  loadFBAnalytics?: boolean;
  emitWinsInLobby?: boolean;
}

export interface ConnectConfiguration {
  currency: string;
  playerId?: string;
}

export interface StartFeedConfiguration {
  games: (GameObject | ComplexSegment)[];
  gamesMode: GameMode;
}

export interface GameObject {
  gameId: string;
  segments?: string[];
}

export interface ComplexSegment {
  gameId?: string;
  complexSegment: Segment[];
}

export interface Segment {
  segmentKey: string;
  segmentCode: string;
}

export interface StartFeedResponse {
  startedGames: {
    games: GameObject[];
  };
}

export interface StartFeedWithOverlaysConfiguration {
  games: (OverlayGameObject | OverlayGameObjectWithComplexSegment)[];
  gamesMode: GameMode;
}

export interface OverlayGameObject {
  gameId: string;
  segments?: string[];
  overlayContainerId: string;
}

export interface OverlayGameObjectWithComplexSegment {
  gameId: string;
  complexSegment: Segment[];
  overlayContainerId: string;
}

export interface StopFeedConfiguration {
  games: (GameObject | ComplexSegment)[];
}

export interface StopFeedResponse {
  stoppedGames: {
    games: GameObject[];
  };
}

export interface CommunityWinner {
  playerId: string;
  winAmount: number;
  isMainWinner: boolean;
}

export interface WinEvent {
  winningDetails: {
    playerId?: string; // only for games with SINGLE_WIN strategy
    gameId: string;
    segments?: string[]; // optional
    potId: string;
    currency: string;
    amount?: number; // only for games with SINGLE_WIN strategy
    seedPotAmount: number;
    updateTimestamp: number;
    communityWinners?: CommunityWinner[]; // only for games with COMMUNITY_WIN strategy
  };
}

export interface JackpotState {
  gameId: string;
  segments?: string[];
  potId: string;
  progressive: number;
  currency: string;
  potStatus: string;
  updateTimestamp: number;
  lastWinTs: number | null;
}

export interface PotStateChangedEvent {
  jackpotPotState: JackpotState;
}

export interface GameDetailsChangedEvent {
  gameDetails: FullGameDetails;
}

export interface FullGameDetails extends GameDetails, GameObject {
  pots: PotDetails[];
}

export interface GameDetails {
  description: string;
  jackpotGameId: string;
  name: string;
  type: JackpotGameTypes;
  version: string;
  termsAndConditions: string;
  startDate: string;
  isAutoOptIn: boolean;
  customJackpotParams: Record<string, unknown>;
  supportedCurrencies: string;
  winningDetails: WinningDetails;
}

export enum JackpotGameTypes {
  PUBLIC = "PUBLIC",
  PRIVATE = "PRIVATE",
}

export interface WinningDetails {
  [key: string /* potId */]: PotWinningDetails;
}

export interface PotWinningDetails {
  winningStrategy: WinningStrategies;
  communityRatio?: number;
  communityCondition?: {
    type: "WAGER" | "BETS";
    activePlayers?: {
      condition: "ALL" | "BY_NUMBER" | "BY_PERCENT";
      amount?: number;
    };
    period?: {
      units: "HOURS" | "DAYS";
      amount: number;
    };
    condition?: {
      type: "GREATER_THAN" | "GREATEST_AMOUNT";
      amount?: number;
    };
  };
}

export interface PotDetails {
  potId: string;
  name: string;
  seedPotAmount: number;
}

export interface GameStatusChangedEvent {
  gameStatus: GameStatus;
}

export interface GameStatus {
  gameId: string;
  segments?: string[];
  status: GameStates;
  remainingIterations?: number;
}

export enum GameStates {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export interface GameCodeMatchingStateChangedEvent {
  operatorGameMatchingState: {
    gameId?: string;
    segments?: string[];
    conditionDetails?: ConditionDetails;
    jackpotGameId: string;
    state: OperatorGameMatchingState;
    unmatchConditions?: {
      afterWin: boolean;
      unmatchDate: Date;
    };
  };
}

interface ConditionDetails {
  id: string;
  condition: ComplexCondition;
}

export enum OperatorGameMatchingState {
  MATCHED = "MATCHED",
  UNMATCH_PENDING = "UNMATCH_PENDING",
  UNMATCHED = "UNMATCHED",
}

interface Operand {
  type: "operand";
  segmentKey: string;
  segmentCodes: string[];
}

interface Operator {
  type: "operator";
  value: "OR" | "AND";
}

export type ComplexCondition = (Operand | Operator)[];

export interface OptEvent {
  playerOptState: {
    playerId: string;
    gameId: string;
    segments?: string[];
    gameName: string;
  };
}

export interface FBConnectivityStatus {
  connectionDetails: {
    isActive: boolean;
  };
}

export interface PlayerOptResponse {
  playerOptState: {
    playerId: string;
    gameId: string;
    segments?: string[];
    gameName: string;
    isOptIn: boolean;
  };
}

export interface PotStates {
  jackpotsPotStates: JackpotState[];
}

export interface GetOperatorGamesMatchOptions {
  filter: "WITH_SEGMENTS" | "WITH_COMPLEX_SEGMENTS";
}

export interface GetOperatorGamesMatchDetailsResponse {
  matchedOperatorGames: (MatchDetails | ComplexMatchDetails)[];
}

export interface MatchDetails extends GameObject {
  jackpotGameId: string;
}

export interface ComplexMatchDetails {
  jackpotGameId: string;
  gameId?: string;
  conditionDetails: ConditionDetails;
}
