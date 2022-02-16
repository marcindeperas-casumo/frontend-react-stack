export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Long: number;
  DateTime: any;
  /** The `BigInt` scalar type represents non-fractional signed whole numeric values. BigInt can represent values between -(2^53) + 1 and 2^53 - 1.  */
  BigInt: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
}

export interface GamesPaginated {
  games: Array<Game>;
  offset: Scalars["Int"];
  gamesCount: Scalars["Int"];
}

export interface Query {
  activeModals: Array<Modal>;
  articlesList?: Maybe<ArticlesList>;
  betDetails?: Maybe<BetDetails>;
  blueribbonJackpot?: Maybe<BlueribbonJackpotConfig>;
  blueribbonJackpotByGameSlug?: Maybe<BlueribbonJackpotConfig>;
  blueribbonJackpotBySlug?: Maybe<BlueribbonJackpotConfig>;
  competitions: Array<EventGroup>;
  curatedCard?: Maybe<CuratedCard>;
  dictionaryTerm: Scalars["String"];
  favouriteCompetitions: Array<EventGroup>;
  game?: Maybe<Game>;
  gameSetsList: Array<DetailedGameSet>;
  gameStudio?: Maybe<GameStudio>;
  gameStudios: Array<Maybe<GameStudio>>;
  games: Array<Game>;
  gamesBySlugs: Array<Game>;
  gamesList?: Maybe<GamesList>;
  gamesSearch: GamesPaginated;
  getCMSField?: Maybe<CmsText>;
  /**
   * "getCMSFieldAsJSON" is only needed for the component builder until we add type-definitions for all the
   * component properties that are available to be used for the component builder.
   * Task: https://jira.casumocave.com/browse/PRCA-308
   */
  getCMSFieldAsJSON: Scalars["String"];
  getGamesPaginated: GamesPaginated;
  getText: Scalars["String"];
  glossary: Array<GlossaryEntry>;
  /** Get list of sub-groups from a given group" */
  group: EventGroup;
  groupedLiveCasinoGames: Array<GameGroup>;
  /** Get list of available event groups from the root level */
  groups: Array<EventGroup>;
  hasSelectedFavourites: Scalars["Boolean"];
  isBetslipVisible: Scalars["Boolean"];
  isSearchVisible: Scalars["Boolean"];
  jackpots: Array<Maybe<Jackpot>>;
  kambiClientVisible: Scalars["Boolean"];
  liveCasinoTablesById?: Maybe<LiveCasinoTable>;
  mustDropJackpots: Array<MustDropJackpot>;
  player: Player;
  promoCards?: Maybe<PromoCardsData>;
  promotionsList?: Maybe<PromotionsList>;
  reelRaces: Array<ReelRace>;
  /** Search for events matching a given query, non english lang will search english results too" */
  search: Array<SearchResult>;
  session: Session;
  sportsCmsImage?: Maybe<Scalars["String"]>;
  sportsFirstBet: Scalars["Boolean"];
  sportsNavigation: Array<NavigationItem>;
  sportsPopularBets?: Maybe<SportsPopularBets>;
  /** TopCompetitions returns the most popular subgroups of a group, currently based on number of events */
  topCompetitions: Array<EventGroup>;
  /** Top searches returns the event groups for the groupIds marked as popular */
  topSearches: Array<EventGroup>;
  translations: Translations;
  userHomepage?: Maybe<Scalars["String"]>;
}

export interface QueryArticlesListArgs {
  slugs: Array<Scalars["String"]>;
}

export interface QueryBetDetailsArgs {
  combinationRef?: Maybe<Scalars["BigInt"]>;
}

export interface QueryBlueribbonJackpotArgs {
  slug: Scalars["String"];
}

export interface QueryBlueribbonJackpotByGameSlugArgs {
  gameSlug: Scalars["String"];
}

export interface QueryBlueribbonJackpotBySlugArgs {
  slug: Scalars["String"];
}

export interface QueryCompetitionsArgs {
  lang?: Maybe<Scalars["String"]>;
  market?: Maybe<Scalars["String"]>;
  groupId: Scalars["Int"];
}

export interface QueryCuratedCardArgs {
  slug: Scalars["String"];
}

export interface QueryDictionaryTermArgs {
  key: Scalars["String"];
  lang?: Maybe<CmsLang>;
}

export interface QueryFavouriteCompetitionsArgs {
  groupId: Scalars["Int"];
  lang?: Maybe<Scalars["String"]>;
  market?: Maybe<Scalars["String"]>;
}

export interface QueryGameArgs {
  slug: Scalars["String"];
}

export interface QueryGameSetsListArgs {
  verticalId?: Maybe<Scalars["String"]>;
}

export interface QueryGameStudioArgs {
  slug: Scalars["String"];
}

export interface QueryGamesArgs {
  ids: Array<Scalars["String"]>;
}

export interface QueryGamesBySlugsArgs {
  slugs: Array<Scalars["String"]>;
}

export interface QueryGamesListArgs {
  listId: Scalars["String"];
  page?: Maybe<Scalars["Int"]>;
  pageSize?: Maybe<Scalars["Int"]>;
}

export interface QueryGamesSearchArgs {
  query: Scalars["String"];
  offset: Scalars["Int"];
  limit: Scalars["Int"];
}

export interface QueryGetCmsFieldArgs {
  id: Scalars["String"];
  market?: Maybe<Scalars["String"]>;
  country?: Maybe<Scalars["String"]>;
}

export interface QueryGetCmsFieldAsJsonArgs {
  id: Scalars["String"];
  market?: Maybe<Scalars["String"]>;
  country?: Maybe<Scalars["String"]>;
}

export interface QueryGetGamesPaginatedArgs {
  query: Scalars["String"];
  offset: Scalars["Int"];
  limit: Scalars["Int"];
}

export interface QueryGetTextArgs {
  id: Scalars["String"];
  market?: Maybe<Scalars["String"]>;
  country?: Maybe<Scalars["String"]>;
}

export interface QueryGlossaryArgs {
  lang?: Maybe<CmsLang>;
}

export interface QueryGroupArgs {
  lang?: Maybe<Scalars["String"]>;
  market?: Maybe<Scalars["String"]>;
  groupId: Scalars["Int"];
}

export interface QueryGroupsArgs {
  lang?: Maybe<Scalars["String"]>;
  market?: Maybe<Scalars["String"]>;
}

export interface QueryLiveCasinoTablesByIdArgs {
  id: Scalars["String"];
}

export interface QueryPromoCardsArgs {
  locale?: Maybe<Scalars["String"]>;
}

export interface QueryPromotionsListArgs {
  slug: Scalars["String"];
}

export interface QueryReelRacesArgs {
  limit?: Maybe<Scalars["Int"]>;
  prioritisePromoted?: Maybe<Scalars["Boolean"]>;
  previous?: Maybe<Scalars["Boolean"]>;
}

export interface QuerySearchArgs {
  lang?: Maybe<Scalars["String"]>;
  market?: Maybe<Scalars["String"]>;
  query: Scalars["String"];
}

export interface QuerySportsCmsImageArgs {
  key: Scalars["String"];
  lang?: Maybe<CmsLang>;
}

export interface QuerySportsNavigationArgs {
  live?: Maybe<Scalars["Boolean"]>;
  locale?: Maybe<Scalars["String"]>;
}

export interface QuerySportsPopularBetsArgs {
  market: Scalars["String"];
  numberOfEvents: Scalars["Int"];
  sports: Scalars["String"];
  startingWithinDays: Scalars["Int"];
}

export interface QueryTopCompetitionsArgs {
  lang?: Maybe<Scalars["String"]>;
  market?: Maybe<Scalars["String"]>;
  groupIds: Array<Scalars["Int"]>;
  count: Scalars["Int"];
}

export interface QueryTopSearchesArgs {
  lang?: Maybe<Scalars["String"]>;
  market?: Maybe<Scalars["String"]>;
  count: Scalars["Int"];
}

export interface UpdatePlayerEmailInput {
  email: Scalars["String"];
  plaintextPassword: Scalars["String"];
}

export interface ContactSettingsInput {
  on: Scalars["Boolean"];
}

export interface UpdateRealityCheckIntervalInput {
  intervalSeconds: Scalars["Int"];
}

export interface Mutation {
  addGameToMyList?: Maybe<Game>;
  closeAllModals?: Maybe<Scalars["Boolean"]>;
  closeBetslip?: Maybe<Scalars["Boolean"]>;
  closeModal?: Maybe<Scalars["Boolean"]>;
  hideSearch?: Maybe<Scalars["Boolean"]>;
  launchKambi?: Maybe<KambiSession>;
  minimizeBetslip?: Maybe<Scalars["Boolean"]>;
  navigateClient?: Maybe<Scalars["Boolean"]>;
  openBetslip?: Maybe<Scalars["Boolean"]>;
  openModal?: Maybe<Scalars["Boolean"]>;
  optInForReelRace?: Maybe<ReelRace>;
  removeGameFromMyList?: Maybe<Game>;
  /** Pings the current session to keep it alive, requires the session cookie to be present in the headers */
  sessionTouch?: Maybe<Scalars["Boolean"]>;
  setAdventurerPublicity?: Maybe<Scalars["Boolean"]>;
  setContactByPhone?: Maybe<Scalars["Boolean"]>;
  setContactByPost?: Maybe<Scalars["Boolean"]>;
  setFavouriteCompetitions: Array<EventGroup>;
  setFavouriteGroups: Array<EventGroup>;
  setMarketingCrossSellSubscription?: Maybe<Scalars["Boolean"]>;
  setNewsletterSubscription?: Maybe<Scalars["Boolean"]>;
  setSMSNewsletterSubscription?: Maybe<Scalars["Boolean"]>;
  setWithdrawalNotifications?: Maybe<Scalars["Boolean"]>;
  showSearch?: Maybe<Scalars["Boolean"]>;
  toggleFavouriteGroup: EventGroup;
  updateBetslipState?: Maybe<Scalars["Boolean"]>;
  updateKambiClientState?: Maybe<Scalars["Boolean"]>;
  updatePlayerEmail?: Maybe<Scalars["Boolean"]>;
  updateRealityCheckInterval?: Maybe<Scalars["Int"]>;
  useValuable?: Maybe<Scalars["Boolean"]>;
}

export interface MutationAddGameToMyListArgs {
  id: Scalars["String"];
}

export interface MutationCloseModalArgs {
  modal?: Maybe<Modal>;
}

export interface MutationLaunchKambiArgs {
  playForFun?: Maybe<Scalars["Boolean"]>;
  locale?: Maybe<Scalars["String"]>;
}

export interface MutationNavigateClientArgs {
  path: Scalars["String"];
  trackingLocation: Scalars["String"];
}

export interface MutationOpenModalArgs {
  modal?: Maybe<Modal>;
}

export interface MutationOptInForReelRaceArgs {
  id: Scalars["String"];
}

export interface MutationRemoveGameFromMyListArgs {
  id: Scalars["String"];
}

export interface MutationSetAdventurerPublicityArgs {
  input?: Maybe<ContactSettingsInput>;
}

export interface MutationSetContactByPhoneArgs {
  input?: Maybe<ContactSettingsInput>;
}

export interface MutationSetContactByPostArgs {
  input?: Maybe<ContactSettingsInput>;
}

export interface MutationSetFavouriteCompetitionsArgs {
  groupId: Scalars["Int"];
  ids: Array<Scalars["Int"]>;
}

export interface MutationSetFavouriteGroupsArgs {
  ids: Array<Scalars["Int"]>;
}

export interface MutationSetMarketingCrossSellSubscriptionArgs {
  input?: Maybe<ContactSettingsInput>;
}

export interface MutationSetNewsletterSubscriptionArgs {
  input?: Maybe<ContactSettingsInput>;
}

export interface MutationSetSmsNewsletterSubscriptionArgs {
  input?: Maybe<ContactSettingsInput>;
}

export interface MutationSetWithdrawalNotificationsArgs {
  input?: Maybe<ContactSettingsInput>;
}

export interface MutationToggleFavouriteGroupArgs {
  id: Scalars["Int"];
}

export interface MutationUpdateBetslipStateArgs {
  isVisible: Scalars["Boolean"];
}

export interface MutationUpdateKambiClientStateArgs {
  isVisible: Scalars["Boolean"];
}

export interface MutationUpdatePlayerEmailArgs {
  input?: Maybe<UpdatePlayerEmailInput>;
}

export interface MutationUpdateRealityCheckIntervalArgs {
  input?: Maybe<UpdateRealityCheckIntervalInput>;
}

export interface MutationUseValuableArgs {
  id: Scalars["String"];
  source?: Maybe<Scalars["String"]>;
}

export type Currency =
  | "INR"
  | "EUR"
  | "GBP"
  | "CAD"
  | "DKK"
  | "NZD"
  | "SEK"
  | "USD"
  | "NOK";

export type Platform = "desktop" | "mobile";

export type CmsLang =
  | "en"
  | "sv"
  | "no"
  | "fi"
  | "de"
  | "gb"
  | "dk"
  | "ca"
  | "nz"
  | "in";

export type SearchResultType =
  /** Can be a team, player, and sometimes an event */
  | "PARTICIPANT"
  /** A sport result e.g. Boxing, Football */
  | "SPORT"
  /** Normally a location of where the event is taking place e.g. England, Paris */
  | "REGION"
  /** The league the event is in, e.g. Premier League */
  | "LEAGUE";

export type Vertical =
  /** The player registered as a sports player (selected the sports welcome offer) */
  | "SPORTS"
  /** The player registered as a casino player (selected the casino welcome offer) */
  | "CASINO";

export interface Game {
  id: Scalars["String"];
  slug: Scalars["String"];
  name: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
  logo: Scalars["String"];
  backgroundImage: Scalars["String"];
  playBackground: Scalars["String"];
  jackpot?: Maybe<Jackpot>;
  gameStudio: Scalars["String"];
  isInMaintenance: Scalars["Boolean"];
  liveCasinoId?: Maybe<Scalars["String"]>;
  liveCasinoLobby?: Maybe<LiveCasinoTable>;
  category?: Maybe<Scalars["String"]>;
  media: Array<GameMedia>;
  actualRtpPast6Months?: Maybe<Scalars["String"]>;
  actualRtpPastYear?: Maybe<Scalars["String"]>;
  rtp?: Maybe<Scalars["String"]>;
  realMoneyPlayRequired?: Maybe<Scalars["Boolean"]>;
  /** @deprecated Please use name instead */
  title: Scalars["String"];
  /** @deprecated Please use backgroundImage instead */
  logoBackground: Scalars["String"];
  /** @deprecated Please use liveCasinoLobby instead */
  lobby?: Maybe<LiveCasinoTable>;
  /** @deprecated Please use isInMaintenance instead. */
  inMaintenanceMode: Scalars["Boolean"];
  /** @deprecated Will be removed soon. This will be solved with query parameters. */
  hasPlayForFun: Scalars["Boolean"];
  /** @deprecated Will be removed soon. Disabled games will not be in the response. */
  disabledForLoggedOut: Scalars["Boolean"];
  /** @deprecated Please use the property jackpot instead. */
  jackpotInfo?: Maybe<Jackpot>;
}

export interface GameSet {
  id: Scalars["String"];
  key: Scalars["String"];
  icon: Scalars["String"];
  title: Scalars["String"];
}

export type GamesSortOrder =
  | "A_TO_Z_BY_TITLE"
  | "Z_TO_A_BY_TITLE"
  | "NEWEST_TO_OLDEST_BY_RELEASE_DATE"
  | "OLDEST_TO_NEWEST_BY_RELEASE_DATE"
  | "MOST_TO_LEAST_POPULAR"
  | "CURATED_SLOT_MACHINES"
  | "CURATED_TABLE_GAMES"
  | "CURATED_JACKPOTS"
  | "CURATED_LIVE_CASINO"
  | "HIGHEST_TO_LOWEST_BY_JACKPOT_VALUE"
  | "LOWEST_TO_HIGHEST_BY_JACKPOT_VALUE";

export type GameDisplayMode = "LIVE_CASINO" | "STANDARD";

export interface GameSetFilter {
  key: Scalars["String"];
  title?: Maybe<Scalars["String"]>;
  query: Scalars["String"];
}

export interface GameFilter {
  key: Scalars["String"];
  type: Scalars["String"];
  title: Scalars["String"];
  description: Scalars["String"];
  values: Array<GameSetFilter>;
}

export interface DetailedGameSet {
  id: Scalars["ID"];
  key: Scalars["String"];
  title: Scalars["String"];
  icon: Scalars["String"];
  defaultSort: GamesSortOrder;
  supportedSorts: Array<GamesSortOrder>;
  baseQuery: Scalars["String"];
  additionalFilterGroups: Array<GameFilter>;
  gameDisplayMode: GameDisplayMode;
}

export interface GamesList {
  id?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  /** @deprecated Please use name instead. */
  title?: Maybe<Scalars["String"]>;
  gameIds: Array<Scalars["String"]>;
  games: Array<Game>;
}

export interface GamesListGamesArgs {
  numberOfGames?: Maybe<Scalars["Int"]>;
}

export interface GameStudio {
  id: Scalars["String"];
  background: Scalars["String"];
  logo: Scalars["String"];
  name: Scalars["String"];
  slug: Scalars["String"];
  url: Scalars["String"];
  games: Array<Maybe<Game>>;
  gamesCount: Scalars["Int"];
}

export interface GameStudioGamesArgs {
  page?: Maybe<Scalars["Int"]>;
  pageSize?: Maybe<Scalars["Int"]>;
}

export interface GameGroup {
  title: Scalars["String"];
  games: Array<Game>;
}

export interface GameMedia {
  order: Scalars["Int"];
  path: Scalars["String"];
  type: Scalars["String"];
}

export interface Jackpot {
  id: Scalars["ID"];
  gameProvider?: Maybe<Scalars["String"]>;
  value: Money;
  /** @deprecated Will be removed soon please use the value property instead */
  formattedJackpotAmount?: Maybe<Scalars["String"]>;
}

export interface Money {
  amount: Scalars["Float"];
  currency: Currency;
}

export interface MustDropJackpot {
  label: Scalars["String"];
  image: Scalars["String"];
  id: Scalars["ID"];
  amount: MustDropJackpotAmount;
}

export interface MustDropJackpotAmount {
  value: Scalars["Float"];
  currency: Currency;
  formattedAmount: Scalars["String"];
}

export interface LiveCasinoTable {
  id?: Maybe<Scalars["String"]>;
  tableId?: Maybe<Scalars["String"]>;
  state: TableState;
  image?: Maybe<Scalars["String"]>;
  symbol?: Maybe<Scalars["String"]>;
  numberOfPlayers?: Maybe<Scalars["Int"]>;
  provider?: Maybe<Scalars["String"]>;
  type?: Maybe<Scalars["String"]>;
  results: Array<Scalars["String"]>;
  betBehind?: Maybe<Scalars["Boolean"]>;
  availableSeats?: Maybe<Scalars["Int"]>;
  minBet?: Maybe<Scalars["Int"]>;
  maxBet?: Maybe<Scalars["Int"]>;
  operationHours: OperationHours;
  /** @deprecated Please use the fields from the LiveCasinoTable instead */
  bets?: Maybe<Bets>;
  /** @deprecated Please use numberOfPlayers instead */
  players?: Maybe<Scalars["Int"]>;
  /** @deprecated Please use availableSeats instead */
  seats?: Maybe<Scalars["Int"]>;
}

export type TableState = "OPEN" | "CLOSED" | "UNASSIGNED";

export type OperationHoursType = "FULLTIME" | "BOUNDED";

export interface OperationHours {
  type: OperationHoursType;
  startTime?: Maybe<Scalars["String"]>;
  endTime?: Maybe<Scalars["String"]>;
}

export interface Bets {
  symbol?: Maybe<Scalars["String"]>;
  min?: Maybe<Scalars["Int"]>;
  max?: Maybe<Scalars["Int"]>;
}

export interface ReelRace {
  id: Scalars["ID"];
  spinLimit: Scalars["Int"];
  startTime: Scalars["BigInt"];
  endTime: Scalars["BigInt"];
  minBet?: Maybe<Scalars["String"]>;
  promoted: Scalars["Boolean"];
  optedIn: Scalars["Boolean"];
  status?: Maybe<Scalars["String"]>;
  game: Game;
  formattedPrize: Scalars["String"];
  remainingSpins: Scalars["Int"];
  translations: ReelRaceTranslations;
  leaderboard: Array<ReelRaceLeaderboard>;
  cometdChannels: Array<Scalars["String"]>;
  formattedPrizes: Array<Scalars["String"]>;
}

export interface ReelRaceLeaderboard {
  playerId: Scalars["String"];
  playerName: Scalars["String"];
  position: Scalars["Int"];
  points: Scalars["Int"];
  remainingSpins: Scalars["Int"];
  boosters: ReelRaceBoosters;
}

export interface ReelRaceBoosters {
  winsInARow: Scalars["Int"];
  triples: Scalars["Int"];
  wins: Scalars["Int"];
  bigWins: Scalars["Int"];
  megaWins: Scalars["Int"];
}

export interface ReelRaceTranslations {
  optedInCtaSingleGameShort: Scalars["String"];
  optIn: Scalars["String"];
  optedIn: Scalars["String"];
  endingIn: Scalars["String"];
  startingIn: Scalars["String"];
  competeFor: Scalars["String"];
  spins: Scalars["String"];
  duration: Scalars["String"];
  durationTemplate: Scalars["String"];
  minBet: Scalars["String"];
  caveatShort: Scalars["String"];
  today: Scalars["String"];
  tomorrow: Scalars["String"];
}

export interface Player {
  id: Scalars["ID"];
  valuables: Array<
    | PlayerValuableCash
    | PlayerValuableSpins
    | PlayerValuableDeposit
    | PlayerValuableSport
    | PlayerValuableCashback
    | PlayerValuableWageringLock
    | PlayerValuableBundleLock
    | PlayerValuableFreeBet
  >;
  username: Scalars["String"];
  details: PlayerDetails;
  loginHistory: Array<PlayerLoginHistoryRecord>;
  playOk: PlayerPlayOkSettings;
  vertical: Vertical;
}

export interface PlayerValuablesArgs {
  valuableType?: Maybe<ValuableType>;
  badgeRuleName?: Maybe<Scalars["String"]>;
}

export interface Brand {
  id: Scalars["ID"];
}

export interface PlayerPlayOkSettings {
  realityCheck: PlayerRealityCheckSettings;
}

export interface PlayerRealityCheckSettings {
  canChangeInterval: Scalars["Boolean"];
  isZeroIntervalAllowed: Scalars["Boolean"];
  intervalInMinutes: Scalars["Int"];
}

export interface PlayerDetails {
  jurisdiction: PlayerJurisdiction;
  canChangePassword: Scalars["Boolean"];
  email: Scalars["String"];
  phoneNumber: PhoneNumber;
  name: PlayerName;
  gender: Gender;
  dateOfBirth: Scalars["String"];
  extentOfGambling: PlayerExtentOfGambling;
  address: PlayerAddress;
  contactSettings: PlayerContactSettings;
}

export interface PlayerExtentOfGambling {
  canChange: Scalars["Boolean"];
  from?: Maybe<Scalars["Int"]>;
  to?: Maybe<Scalars["Int"]>;
  label?: Maybe<Scalars["String"]>;
}

export interface PlayerContactSettings {
  adventurerPublic: Scalars["Boolean"];
  subscribedToNewsletters: Scalars["Boolean"];
  subscribedToSMSNewsletters: Scalars["Boolean"];
  contactByPhone: Scalars["Boolean"];
  contactByPost: Scalars["Boolean"];
  withdrawalNotifications: Scalars["Boolean"];
  subscribedToMarketingCrossSell: Scalars["Boolean"];
}

export interface PlayerLoginHistoryRecord {
  loginTime: Scalars["Long"];
  logoutTime?: Maybe<Scalars["Long"]>;
  ipAddress?: Maybe<Scalars["String"]>;
  device?: Maybe<Scalars["String"]>;
}

export interface PhoneNumber {
  prefix: Scalars["String"];
  number: Scalars["String"];
  verified: Scalars["Boolean"];
}

export interface PlayerName {
  first: Scalars["String"];
  last: Scalars["String"];
}

export interface PlayerAddress {
  city: Scalars["String"];
  street: Scalars["String"];
  postCode: Scalars["String"];
  country: Country;
}

export interface Country {
  code: Scalars["String"];
  name: Scalars["String"];
}

export type Gender = "MALE" | "FEMALE";

export type PlayerJurisdiction =
  | "SGA"
  | "DGA"
  | "UKGC"
  | "MGA"
  | "DGOJ"
  | "GGL"
  | "GRA";

export type PlayerValuableState =
  | "Fresh"
  | "Used"
  | "Consumed"
  | "Expired"
  | "Locked";

export type ValuableType =
  | "spins"
  | "deposit"
  | "cash"
  | "sport"
  | "freeBet"
  | "cashback"
  | "wageringLock"
  | "bundleLock";

export type RequirementType = "wager" | "deposit" | "kambiSportsBet";

export type WageringLockAwardType = "spins" | "freeMoney" | "bonusMoney";

export type BundleLockTierType = "silver" | "gold";

export interface PlayerValuable {
  backgroundImage: Scalars["String"];
  caveat?: Maybe<Scalars["String"]>;
  content: Scalars["String"];
  currency: Currency;
  /** @deprecated This is soon deprecated. Please use expiryDate */
  expirationTimeInHours: Scalars["Int"];
  expiryDate: Scalars["BigInt"];
  created: Scalars["BigInt"];
  id: Scalars["ID"];
  leftToWager?: Maybe<Scalars["Float"]>;
  market: Scalars["String"];
  rule: PlayerValuableRule;
  itemImage?: Maybe<Scalars["String"]>;
  title: Scalars["String"];
  termsLink: Scalars["String"];
  specificTerms?: Maybe<Scalars["String"]>;
  valuableState: PlayerValuableState;
  valuableType: ValuableType;
  wageringThreshold?: Maybe<Scalars["Float"]>;
}

export interface PlayerValuableCash extends PlayerValuable {
  backgroundImage: Scalars["String"];
  caveat?: Maybe<Scalars["String"]>;
  content: Scalars["String"];
  currency: Currency;
  /** @deprecated This is soon deprecated. Please use expiryDate */
  expirationTimeInHours: Scalars["Int"];
  expiryDate: Scalars["BigInt"];
  created: Scalars["BigInt"];
  id: Scalars["ID"];
  leftToWager?: Maybe<Scalars["Float"]>;
  magnitude: Scalars["Float"];
  market: Scalars["String"];
  requirementType?: Maybe<RequirementType>;
  rule: PlayerValuableRule;
  itemImage?: Maybe<Scalars["String"]>;
  title: Scalars["String"];
  termsLink: Scalars["String"];
  specificTerms?: Maybe<Scalars["String"]>;
  valuableState: PlayerValuableState;
  valuableType: ValuableType;
  wageredGame?: Maybe<Game>;
  wageringThreshold?: Maybe<Scalars["Float"]>;
}

export interface PlayerValuableSpins extends PlayerValuable {
  backgroundImage: Scalars["String"];
  caveat?: Maybe<Scalars["String"]>;
  coinValue: Scalars["Float"];
  content: Scalars["String"];
  currency: Currency;
  description: Scalars["String"];
  /** @deprecated This is soon deprecated. Please use expiryDate */
  expirationTimeInHours: Scalars["Int"];
  expiryDate: Scalars["BigInt"];
  created: Scalars["BigInt"];
  game?: Maybe<Game>;
  id: Scalars["ID"];
  leftToWager?: Maybe<Scalars["Float"]>;
  magnitude: Scalars["Float"];
  market: Scalars["String"];
  requirementType?: Maybe<RequirementType>;
  rule: PlayerValuableRule;
  itemImage?: Maybe<Scalars["String"]>;
  source?: Maybe<Platform>;
  title: Scalars["String"];
  termsLink: Scalars["String"];
  specificTerms?: Maybe<Scalars["String"]>;
  valuableState: PlayerValuableState;
  valuableType: ValuableType;
  wageredGame?: Maybe<Game>;
  wageringThreshold?: Maybe<Scalars["Float"]>;
}

export interface PlayerValuableDeposit extends PlayerValuable {
  backgroundImage: Scalars["String"];
  caveat?: Maybe<Scalars["String"]>;
  content: Scalars["String"];
  currency: Currency;
  /** @deprecated This is soon deprecated. Please use expiryDate */
  expirationTimeInHours: Scalars["Int"];
  expiryDate: Scalars["BigInt"];
  created: Scalars["BigInt"];
  id: Scalars["ID"];
  leftToWager?: Maybe<Scalars["Float"]>;
  magnitude: Scalars["Float"];
  market: Scalars["String"];
  maxBonusValue: Scalars["Float"];
  minDepositValue: Scalars["Float"];
  minimumContributingOdds?: Maybe<Scalars["Float"]>;
  rule: PlayerValuableRule;
  itemImage?: Maybe<Scalars["String"]>;
  title: Scalars["String"];
  termsLink: Scalars["String"];
  specificTerms?: Maybe<Scalars["String"]>;
  valuableState: PlayerValuableState;
  valuableType: ValuableType;
  wageringFactor?: Maybe<Scalars["Float"]>;
  wageringThreshold?: Maybe<Scalars["Float"]>;
}

export interface PlayerValuableSport extends PlayerValuable {
  backgroundImage: Scalars["String"];
  caveat?: Maybe<Scalars["String"]>;
  content: Scalars["String"];
  currency: Currency;
  /** @deprecated This is soon deprecated. Please use expiryDate */
  expirationTimeInHours: Scalars["Int"];
  expiryDate: Scalars["BigInt"];
  created: Scalars["BigInt"];
  id: Scalars["ID"];
  leftToWager?: Maybe<Scalars["Float"]>;
  magnitude: Scalars["Float"];
  market: Scalars["String"];
  rule: PlayerValuableRule;
  itemImage?: Maybe<Scalars["String"]>;
  title: Scalars["String"];
  termsLink: Scalars["String"];
  specificTerms?: Maybe<Scalars["String"]>;
  valuableState: PlayerValuableState;
  valuableType: ValuableType;
  wageringThreshold?: Maybe<Scalars["Float"]>;
}

export interface PlayerValuableCashback extends PlayerValuable {
  backgroundImage: Scalars["String"];
  caveat?: Maybe<Scalars["String"]>;
  content: Scalars["String"];
  created: Scalars["BigInt"];
  currency: Currency;
  description: Scalars["String"];
  excludedGames: Array<Maybe<Game>>;
  /** @deprecated This is soon deprecated. Please use expiryDate */
  expirationTimeInHours: Scalars["Int"];
  expiryDate: Scalars["BigInt"];
  gameCategories: Array<Maybe<Scalars["String"]>>;
  games: Array<Maybe<Game>>;
  id: Scalars["ID"];
  leftToWager?: Maybe<Scalars["Float"]>;
  magnitude: Scalars["Float"];
  market: Scalars["String"];
  requirementType?: Maybe<RequirementType>;
  rule: PlayerValuableRule;
  itemImage?: Maybe<Scalars["String"]>;
  title: Scalars["String"];
  termsLink: Scalars["String"];
  specificTerms?: Maybe<Scalars["String"]>;
  valuableState: PlayerValuableState;
  valuableType: ValuableType;
  wageringThreshold?: Maybe<Scalars["Float"]>;
}

export interface PlayerValuableWageringLock extends PlayerValuable {
  backgroundImage: Scalars["String"];
  caveat?: Maybe<Scalars["String"]>;
  content: Scalars["String"];
  created: Scalars["BigInt"];
  currency: Currency;
  description: Scalars["String"];
  excludedGames: Array<Maybe<Game>>;
  /** @deprecated This is soon deprecated. Please use expiryDate */
  expirationTimeInHours: Scalars["Int"];
  expiryDate: Scalars["BigInt"];
  gameCategories: Array<Maybe<Scalars["String"]>>;
  games: Array<Maybe<Game>>;
  id: Scalars["ID"];
  leftToWager?: Maybe<Scalars["Float"]>;
  magnitude: Scalars["Float"];
  market: Scalars["String"];
  awardType: WageringLockAwardType;
  rule: PlayerValuableRule;
  itemImage?: Maybe<Scalars["String"]>;
  title: Scalars["String"];
  termsLink: Scalars["String"];
  specificTerms?: Maybe<Scalars["String"]>;
  valuableState: PlayerValuableState;
  valuableType: ValuableType;
  wageringThreshold?: Maybe<Scalars["Float"]>;
}

export interface PlayerValuableBundleLock extends PlayerValuable {
  backgroundImage: Scalars["String"];
  caveat?: Maybe<Scalars["String"]>;
  content: Scalars["String"];
  created: Scalars["BigInt"];
  currency: Currency;
  /** @deprecated This is soon deprecated. Please use expiryDate */
  expirationTimeInHours: Scalars["Int"];
  expiryDate: Scalars["BigInt"];
  gameCategories: Array<Maybe<Scalars["String"]>>;
  id: Scalars["ID"];
  leftToWager?: Maybe<Scalars["Float"]>;
  requirementType?: Maybe<RequirementType>;
  minDepositAmount: Scalars["Float"];
  market: Scalars["String"];
  rule: PlayerValuableRule;
  itemImage?: Maybe<Scalars["String"]>;
  title: Scalars["String"];
  tierType?: Maybe<BundleLockTierType>;
  termsLink: Scalars["String"];
  specificTerms?: Maybe<Scalars["String"]>;
  valuableState: PlayerValuableState;
  valuableType: ValuableType;
  wageringThreshold?: Maybe<Scalars["Float"]>;
}

/** Locked free-bets will have the valuableState="Locked" */
export interface PlayerValuableFreeBet extends PlayerValuable {
  backgroundImage: Scalars["String"];
  caveat?: Maybe<Scalars["String"]>;
  content: Scalars["String"];
  currency: Currency;
  /** @deprecated This is soon deprecated. Please use expiryDate */
  expirationTimeInHours: Scalars["Int"];
  expiryDate: Scalars["BigInt"];
  created: Scalars["BigInt"];
  id: Scalars["ID"];
  leftToWager?: Maybe<Scalars["Float"]>;
  magnitude: Scalars["Float"];
  market: Scalars["String"];
  requirementType?: Maybe<RequirementType>;
  rule: PlayerValuableRule;
  itemImage?: Maybe<Scalars["String"]>;
  title: Scalars["String"];
  termsLink: Scalars["String"];
  specificTerms?: Maybe<Scalars["String"]>;
  unlockMinOdds: Scalars["Float"];
  unlockMinStake: Scalars["Float"];
  unlockBetBuilder?: Maybe<Scalars["Boolean"]>;
  unlockLive?: Maybe<Scalars["Boolean"]>;
  unlockEachWay?: Maybe<Scalars["Boolean"]>;
  unlockChannelId?: Maybe<Scalars["String"]>;
  unlockBetStatus?: Maybe<Scalars["String"]>;
  valuableState: PlayerValuableState;
  valuableType: ValuableType;
  wageringThreshold?: Maybe<Scalars["Float"]>;
}

export interface PlayerValuableRule {
  id?: Maybe<Scalars["ID"]>;
  name: Scalars["String"];
}

export interface Promotion {
  id: Scalars["ID"];
  slug: Scalars["String"];
  title: Scalars["String"];
  subtitle: Scalars["String"];
  image: Scalars["String"];
  teaser: Scalars["String"];
  content: Scalars["String"];
  badge?: Maybe<Scalars["String"]>;
  tag?: Maybe<Scalars["String"]>;
  teaserCaveats?: Maybe<Scalars["String"]>;
  ctaText?: Maybe<Scalars["String"]>;
}

export interface PromotionsList {
  id: Scalars["String"];
  name: Scalars["String"];
  promotions: Array<Promotion>;
}

export interface Translations {
  /** @deprecated This is soon deprecated. Do not repeat this */
  playerValuableTranslations?: Maybe<PlayerValuableTranslations>;
}

export interface PlayerValuableTranslations {
  hoursLabel: Scalars["String"];
  listTitleLabel: Scalars["String"];
  minutesLabel: Scalars["String"];
}

export interface UpdatedFavourite {
  id: Scalars["Int"];
  userFavourite: Scalars["Boolean"];
}

export interface KambiSession {
  sessionId: Scalars["ID"];
  clientBootstrapUrl: Scalars["String"];
  providerPlayerId?: Maybe<Scalars["String"]>;
  ticket?: Maybe<Scalars["String"]>;
  currency?: Maybe<Scalars["String"]>;
}

export interface GlossaryEntry {
  id: Scalars["String"];
  term: Scalars["String"];
  aka?: Maybe<Scalars["String"]>;
  definition: Scalars["String"];
}

export interface NavigationItem {
  sport: EventGroup;
  subNav: Array<SubNavigationItem>;
}

export interface SubNavigationItem {
  competition: EventGroup;
}

export interface SearchResult {
  /** The type of search result, N.B Not overly reliable" */
  type: SearchResultType;
  /** ListView resource context (route key) for displaying search item (e.g. /football/all/all/liverpool)" */
  id: Scalars["String"];
  /** The matched term key for the query. (e.g. liverpool) */
  termKey: Scalars["String"];
  /** Translated name of the search result */
  localizedName: Scalars["String"];
  /** ListView resource context (route key) for present the parent group (e.g.  /football/all/all) */
  parentId: Scalars["String"];
  /**
   * The sport that this search result is associated to is nullable as relies on
   * finding by Kambi controlled data.
   */
  sport?: Maybe<EventGroup>;
  /** The country this search result is associated */
  country?: Maybe<Scalars["String"]>;
}

export interface EventGroup {
  /** Unique identifier of the event group */
  id: Scalars["Int"];
  /** Name of the event group, localized according to the lang parameter */
  name: Scalars["String"];
  /** The number of active bet offers in the event group */
  boCount: Scalars["Int"];
  /** Array of subgroups in this event group */
  groups?: Maybe<Array<EventGroup>>;
  /** The sport of the event group */
  sport: Scalars["String"];
  /** Total events in this event group */
  eventCount: Scalars["Int"];
  /** Proper english name of the group */
  englishName: Scalars["String"];
  /** Normalized name of the group */
  termKey: Scalars["String"];
  /** Popular defines whether we consider the EventGroup to be popular */
  popular: Scalars["Boolean"];
  /**
   * Whether to allow a custom selection of subgroups to be shown as sub-nav items
   * instead of just popular ones
   */
  canSelectSubgroups: Scalars["Boolean"];
  /** Whether this is one of the users, selected favourites */
  userFavourite: Scalars["Boolean"];
  /** The full path in the kambi client to navigate to this group */
  clientPath: Scalars["String"];
  /** The full path in the kambi client to navigate to the in-play bets for this group */
  clientPathLive: Scalars["String"];
  /** Array of parents of this group in order, be careful with nesting! */
  parentGroups: Array<EventGroup>;
  /** Emoji flag representing the country this event takes place in, if available */
  flagEmoji?: Maybe<Scalars["String"]>;
  /** The sub competitions of this group, based on the competition selection strategy that differs per group */
  competitions: Array<EventGroup>;
  /** The 'count' number of sub competitions of this group ordered by most popular */
  topCompetitions: Array<EventGroup>;
  /** The favourited competitions for this EventGroup */
  favouriteCompetitions: Array<EventGroup>;
  /** The country this group belongs to */
  country?: Maybe<Scalars["String"]>;
  /** The region code for the group, iso3166 code for most with some custom regions */
  regionCode?: Maybe<Scalars["String"]>;
  /** The icon for the sport group */
  icon?: Maybe<Scalars["String"]>;
  /** The active indicator for the sport group, used on the nav */
  activeIndicator?: Maybe<Scalars["String"]>;
}

export interface EventGroupTopCompetitionsArgs {
  count: Scalars["Int"];
}

export interface UserNavigationGroup {
  /** Unique identifier of the event group */
  id: Scalars["Int"];
  /** Name of the event group, localized according to the lang parameter */
  name: Scalars["String"];
  /** The number of active bet offers in the event group */
  boCount: Scalars["Int"];
  /** Array of subgroups in this event group */
  groups?: Maybe<Array<UserNavigationGroup>>;
  /** The sport of the event group */
  sport: Scalars["String"];
  /** Total events in this event group */
  eventCount: Scalars["Int"];
  /** Proper english name of the group */
  englishName: Scalars["String"];
  /** Normalized name of the group */
  termKey: Scalars["String"];
  /** Popular defines whether we consider the EventGroup to be popular */
  popular: Scalars["Boolean"];
  /**
   * Whether to allow a custom selection of subgroups to be shown as sub-nav items,
   * instead of just popular ones
   */
  canSelectSubgroups: Scalars["Boolean"];
  /** Whether this is one of the users, selected favourites */
  userFavourite: Scalars["Boolean"];
  /** The full path in the kambi client to navigate to this group */
  clientPath: Scalars["String"];
  /** The full path in the kambi client to navigate to the in-play bets for this group */
  clientPathLive: Scalars["String"];
  /** Array of parents of this group in order, be careful with nesting! */
  parentGroups: Array<EventGroup>;
  /** Emoji flag representing the country this event takes place in, if available */
  flagEmoji?: Maybe<Scalars["String"]>;
  /** The sub competitions of this group, based on the competition selection strategy that differs per group */
  competitions: Array<EventGroup>;
  /** The 'count' number of sub competitions of this group ordered by most popular */
  topCompetitions: Array<EventGroup>;
  /** The favourited competitions for this EventGroup */
  favouriteCompetitions: Array<EventGroup>;
  /** The country this group belongs to */
  country?: Maybe<Scalars["String"]>;
  /** The region code for the group, iso3166 code for most with some custom regions */
  regionCode?: Maybe<Scalars["String"]>;
  /** The icon for the sport group */
  icon?: Maybe<Scalars["String"]>;
  /** The active indicator for the sport group, used on the nav */
  activeIndicator?: Maybe<Scalars["String"]>;
}

export interface UserNavigationGroupTopCompetitionsArgs {
  count: Scalars["Int"];
}

export interface CuratedCard {
  id: Scalars["String"];
  slug: Scalars["String"];
  type: Scalars["String"];
  image?: Maybe<Scalars["String"]>;
  header?: Maybe<Scalars["String"]>;
  subtitle?: Maybe<Scalars["String"]>;
  promotionSlug?: Maybe<Scalars["String"]>;
  promotionLegalText?: Maybe<Scalars["String"]>;
  launchGameText?: Maybe<Scalars["String"]>;
  game?: Maybe<Game>;
  externalLink?: Maybe<Scalars["String"]>;
  sportsRoute?: Maybe<Scalars["String"]>;
  internalLink?: Maybe<Scalars["String"]>;
  /** @deprecated Please use the image field instead. */
  smallImage?: Maybe<Scalars["String"]>;
  /** @deprecated Please use the image field instead. */
  mediumImage?: Maybe<Scalars["String"]>;
  /** @deprecated Please use the image field instead. */
  largeImage?: Maybe<Scalars["String"]>;
}

export interface Session {
  country: Scalars["String"];
  market: Scalars["String"];
  currency: Scalars["String"];
  device: Scalars["String"];
  locale: Scalars["String"];
}

export interface CmsText {
  id: Scalars["String"];
  text: Scalars["String"];
}

export interface PlayerGameRound {
  gameRoundId: Scalars["String"];
  gameProviderId: Scalars["String"];
  providerGameId: Scalars["String"];
  device: Scalars["String"];
  startDate: Scalars["Int"];
  sequenceNumber: Scalars["Int"];
  currency: Scalars["String"];
  initialBalance: Scalars["Int"];
  initialBonusBalance: Scalars["Int"];
  betAmount: Scalars["Int"];
  betBonusAmount: Scalars["Int"];
  finalBalance: Scalars["Int"];
  wageringAfterBet: Scalars["Int"];
  rollbackDate: Scalars["Int"];
}

export interface Article {
  id: Scalars["ID"];
  slug: Scalars["String"];
  title?: Maybe<Scalars["String"]>;
  subtitle?: Maybe<Scalars["String"]>;
  content?: Maybe<Scalars["String"]>;
  thumbnail?: Maybe<Scalars["String"]>;
  image?: Maybe<Scalars["String"]>;
}

export interface ArticlesList {
  id: Scalars["String"];
  name: Scalars["String"];
  articles: Array<Article>;
}

export interface BetDetails {
  combinationRef?: Maybe<Scalars["BigInt"]>;
  playerId?: Maybe<Scalars["String"]>;
  placedDate?: Maybe<Scalars["String"]>;
  stake?: Maybe<Scalars["Int"]>;
  payout?: Maybe<Scalars["Float"]>;
  currency?: Maybe<Scalars["String"]>;
  odds?: Maybe<Scalars["Float"]>;
  status?: Maybe<Scalars["String"]>;
  betDetails?: Maybe<Scalars["String"]>;
  legs?: Maybe<Array<Maybe<BetProjectionsLegs>>>;
  username?: Maybe<Scalars["String"]>;
}

export interface BetProjectionsLegs {
  odds?: Maybe<Scalars["Float"]>;
  outcomes?: Maybe<Array<Maybe<BetProjectionsOutcomes>>>;
}

export interface BetProjectionsOutcomes {
  eventGroupPath?: Maybe<Scalars["String"]>;
  eventName?: Maybe<Scalars["String"]>;
  criterionName?: Maybe<Scalars["String"]>;
  outcomeLabel?: Maybe<Scalars["String"]>;
}

export interface SportsPopularBets {
  popularEvents?: Maybe<Array<Maybe<SportsPopularBetsCategory>>>;
}

export interface SportsPopularBetsCategory {
  name?: Maybe<Scalars["String"]>;
  events?: Maybe<Array<Maybe<SportsPopularBet>>>;
}

export interface SportsPopularBet {
  eventId?: Maybe<Scalars["Int"]>;
  sport?: Maybe<Scalars["String"]>;
}

export interface BlueribbonJackpotConfig {
  externalId: Scalars["ID"];
  requiresManualOptIn: Scalars["Boolean"];
  optedIn: Scalars["Boolean"];
  slug: Scalars["String"];
  title: Scalars["String"];
  image: Scalars["String"];
  pots: Array<Pot>;
  widgetColor: WidgetColor;
  notifications: Notifications;
}

export interface WidgetColor {
  dark?: Maybe<Scalars["String"]>;
  light?: Maybe<Scalars["String"]>;
}

export interface SharedPot {
  name: Scalars["String"];
  shortName: Scalars["String"];
  icon: Scalars["String"];
  splitExplanation: Scalars["String"];
  winText: Scalars["String"];
  winTextAmount: Scalars["String"];
  restartText: Scalars["String"];
  winNotificationIcon: Scalars["String"];
  winNotificationTitle: Scalars["String"];
  winNotificationContent: Scalars["String"];
}

export interface Pot {
  potKey: Scalars["String"];
  externalId: Scalars["String"];
  icon: Scalars["String"];
  name: Scalars["String"];
  shortName: Scalars["String"];
  winText: Scalars["String"];
  mainWinRatio: Scalars["Int"];
  communityWinRatio: Scalars["Int"];
  maxWinAmount: Scalars["Int"];
  winNotificationIcon: Scalars["String"];
  winNotificationTitle: Scalars["String"];
  winNotificationContent: Scalars["String"];
  potExplanation: Scalars["String"];
  potTitleColor: Scalars["String"];
  potInformation: Scalars["String"];
  potInformationAmount: Scalars["String"];
  sharedPot?: Maybe<SharedPot>;
}

export interface ComplexNotification {
  title: Scalars["String"];
  content: Scalars["String"];
}

export interface Notifications {
  gameLaunch: Scalars["String"];
  optIn: ComplexNotification;
}

export interface PromoCardsData {
  data: PromoCards;
}

export interface PromoCards {
  id?: Maybe<Scalars["Int"]>;
  attributes: PromoCardsAttributes;
}

export interface PromoCardsAttributes {
  locale?: Maybe<Scalars["String"]>;
  PromoCards: Array<Maybe<PromoCard>>;
}

export interface PromoCard {
  id: Scalars["Int"];
  Type: Scalars["String"];
  Enabled: Scalars["Boolean"];
  RequiresUserLogin: Scalars["Boolean"];
  StartDate?: Maybe<Scalars["String"]>;
  EndDate?: Maybe<Scalars["String"]>;
  DesktopBgUrl?: Maybe<Scalars["String"]>;
  MobileBgUrl?: Maybe<Scalars["String"]>;
  Fragment?: Maybe<Scalars["String"]>;
  Title?: Maybe<Scalars["String"]>;
  Description?: Maybe<Scalars["String"]>;
  Url?: Maybe<Scalars["String"]>;
}

export type CacheControlScope = "PUBLIC" | "PRIVATE";

export type Modal =
  | "SEARCH"
  | "BETTING_GLOSSARY"
  | "CHOOSE_FAVOURITES"
  | "CHOOSE_FAVOURITE_COMPETITIONS"
  | "JACKPOTS";

export type ArticleQueryVariables = Exact<{
  slug: Scalars["String"];
}>;

export type ArticleQuery = {
  articlesList?: Maybe<{
    articles: Array<{
      id: string;
      title?: Maybe<string>;
      subtitle?: Maybe<string>;
      content?: Maybe<string>;
      image?: Maybe<string>;
    }>;
  }>;
};

export type ArticlesListQueryVariables = Exact<{
  slugs: Array<Scalars["String"]> | Scalars["String"];
}>;

export type ArticlesListQuery = {
  articlesList?: Maybe<{
    id: string;
    name: string;
    articles: Array<{
      id: string;
      slug: string;
      title?: Maybe<string>;
      subtitle?: Maybe<string>;
      thumbnail?: Maybe<string>;
    }>;
  }>;
};

export type GetGamesRtpQueryVariables = Exact<{
  query: Scalars["String"];
  offset: Scalars["Int"];
  limit: Scalars["Int"];
}>;

export type GetGamesRtpQuery = {
  getGamesPaginated: {
    gamesCount: number;
    offset: number;
    games: Array<{
      id: string;
      slug: string;
      title: string;
      actualRtpPast6Months?: Maybe<string>;
      actualRtpPastYear?: Maybe<string>;
      rtp?: Maybe<string>;
    }>;
  };
};

export type GetGamesRtpLightQueryVariables = Exact<{
  query: Scalars["String"];
  offset: Scalars["Int"];
  limit: Scalars["Int"];
}>;

export type GetGamesRtpLightQuery = {
  getGamesPaginated: {
    gamesCount: number;
    offset: number;
    games: Array<{
      id: string;
      slug: string;
      title: string;
      rtp?: Maybe<string>;
    }>;
  };
};

export type ComponentBuilderQueryVariables = Exact<{
  id: Scalars["String"];
}>;

export type ComponentBuilderQuery = { componentDefinitionJSON: string };

export type CuratedCard_GameFragment = {
  id: string;
  backgroundImage: string;
  logo: string;
  name: string;
  slug: string;
};

export type CuratedCardQueryVariables = Exact<{
  slug: Scalars["String"];
}>;

export type CuratedCardQuery = {
  curatedCard?: Maybe<{
    id: string;
    slug: string;
    type: string;
    image?: Maybe<string>;
    header?: Maybe<string>;
    subtitle?: Maybe<string>;
    promotionSlug?: Maybe<string>;
    promotionLegalText?: Maybe<string>;
    launchGameText?: Maybe<string>;
    smallImage?: Maybe<string>;
    mediumImage?: Maybe<string>;
    largeImage?: Maybe<string>;
    sportsRoute?: Maybe<string>;
    externalLink?: Maybe<string>;
    internalLink?: Maybe<string>;
    game?: Maybe<CuratedCard_GameFragment>;
  }>;
  session: { market: string };
};

export type GameDetailsQueryVariables = Exact<{
  slug: Scalars["String"];
}>;

export type GameDetailsQuery = { game?: Maybe<GameDetails_GameFragment> };

export type GameDetails_GameFragment = {
  id: string;
  name: string;
  logo: string;
  backgroundImage: string;
  slug: string;
  description?: Maybe<string>;
  hasPlayForFun: boolean;
  isInMaintenance: boolean;
  realMoneyPlayRequired?: Maybe<boolean>;
  media: Array<{ type: string; path: string; order: number }>;
};

export type GameListQueryVariables = Exact<{
  id: Scalars["String"];
  numberOfGames: Scalars["Int"];
}>;

export type GameListQuery = {
  gamesList?: Maybe<{
    id?: Maybe<string>;
    name?: Maybe<string>;
    games: Array<GameRow_GameFragment>;
  }>;
};

export type GameListExclusiveQueryVariables = Exact<{
  id: Scalars["String"];
  numberOfGames: Scalars["Int"];
}>;

export type GameListExclusiveQuery = {
  gamesList?: Maybe<{
    id?: Maybe<string>;
    name?: Maybe<string>;
    games: Array<GameTile_GameFragment>;
  }>;
};

export type GameListLiveCasinoQueryVariables = Exact<{
  id: Scalars["String"];
  numberOfGames: Scalars["Int"];
}>;

export type GameListLiveCasinoQuery = {
  gamesList?: Maybe<{
    id?: Maybe<string>;
    name?: Maybe<string>;
    games: Array<LiveCasinoCardFragment>;
  }>;
};

export type GameListPageQueryVariables = Exact<{
  query: Scalars["String"];
  offset: Scalars["Int"];
  limit: Scalars["Int"];
}>;

export type GameListPageQuery = {
  getGamesPaginated: {
    gamesCount: number;
    offset: number;
    games: Array<GameTile_GameFragment & LiveCasinoCardFragment>;
  };
};

export type GameListVerticalQueryVariables = Exact<{
  slugs: Array<Scalars["String"]> | Scalars["String"];
}>;

export type GameListVerticalQuery = {
  gamesBySlugs: Array<GameRow_GameFragment>;
};

export type GameStudiosQueryVariables = Exact<{ [key: string]: never }>;

export type GameStudiosQuery = {
  gameStudios: Array<
    Maybe<{
      id: string;
      url: string;
      background: string;
      logo: string;
      slug: string;
      name: string;
    }>
  >;
};

export type GameRow_GameFragment = {
  id: string;
  backgroundImage: string;
  logo: string;
  name: string;
  slug: string;
  gameStudio: string;
  category?: Maybe<string>;
  liveCasinoId?: Maybe<string>;
  isInMaintenance: boolean;
  lobby?: Maybe<{
    bets?: Maybe<{
      min?: Maybe<number>;
      max?: Maybe<number>;
      symbol?: Maybe<string>;
    }>;
  }>;
  jackpot?: Maybe<{
    id: string;
    value: { amount: number; currency: Currency };
  }>;
};

export type GameSearch_GameFragment = GameRow_GameFragment;

export type GameSearchQueryVariables = Exact<{
  query: Scalars["String"];
  offset: Scalars["Int"];
  limit: Scalars["Int"];
}>;

export type GameSearchQuery = {
  gamesSearch: {
    gamesCount: number;
    offset: number;
    games: Array<{ id: string } & GameSearch_GameFragment>;
  };
};

export type GameSearchSuggestionsListContainerQueryVariables = Exact<{
  listId: Scalars["String"];
}>;

export type GameSearchSuggestionsListContainerQuery = {
  gamesList?: Maybe<{ id?: Maybe<string>; games: Array<GameRow_GameFragment> }>;
};

export type GameTile_GameFragment = {
  isInMaintenance: boolean;
  backgroundImage: string;
  logo: string;
  name: string;
  slug: string;
  id: string;
  jackpot?: Maybe<{
    id: string;
    value: { amount: number; currency: Currency };
  }>;
} & GameTileInMaintenance_GameFragment;

export type GameTileInMaintenance_GameFragment = {
  backgroundImage: string;
  logo: string;
  name: string;
};

export type AddGameToMyListMutationVariables = Exact<{
  id: Scalars["String"];
}>;

export type AddGameToMyListMutation = {
  addGameToMyList?: Maybe<{ id: string }>;
};

export type RemoveGameFromMyListMutationVariables = Exact<{
  id: Scalars["String"];
}>;

export type RemoveGameFromMyListMutation = {
  removeGameFromMyList?: Maybe<{ id: string }>;
};

export type GameTileHeartQueryVariables = Exact<{
  numberOfGames: Scalars["Int"];
}>;

export type GameTileHeartQuery = {
  gamesList?: Maybe<{ id?: Maybe<string>; games: Array<{ id: string }> }>;
};

export type JackpotsQueryVariables = Exact<{
  numberOfGames: Scalars["Int"];
}>;

export type JackpotsQuery = {
  gamesList?: Maybe<{
    name?: Maybe<string>;
    games: Array<Jackpots_GameFragment>;
  }>;
};

export type Jackpots_GameFragment = {
  jackpot?: Maybe<{
    id: string;
    value: { amount: number; currency: Currency };
  }>;
} & GameRow_GameFragment;

export type LiveCasinoCard_Lobby_BetsFragment = {
  symbol?: Maybe<string>;
  min?: Maybe<number>;
  max?: Maybe<number>;
};

export type LiveCasinoCard_LobbyFragment = {
  id?: Maybe<string>;
  tableId?: Maybe<string>;
  symbol?: Maybe<string>;
  numberOfPlayers?: Maybe<number>;
  seats?: Maybe<number>;
  provider?: Maybe<string>;
  results: Array<string>;
  image?: Maybe<string>;
  type?: Maybe<string>;
  betBehind?: Maybe<boolean>;
  bets?: Maybe<LiveCasinoCard_Lobby_BetsFragment>;
};

export type LiveCasinoCardFragment = {
  backgroundImage: string;
  id: string;
  isInMaintenance: boolean;
  logo: string;
  name: string;
  slug: string;
  gameStudio: string;
  liveCasinoLobby?: Maybe<LiveCasinoCard_LobbyFragment>;
};

export type LiveCasinoDetailPageQueryVariables = Exact<{
  [key: string]: never;
}>;

export type LiveCasinoDetailPageQuery = {
  groupedLiveCasinoGames: Array<{
    title: string;
    games: Array<GameRow_GameFragment>;
  }>;
};

export type LiveCasinoDetailPageDesktopQueryVariables = Exact<{
  [key: string]: never;
}>;

export type LiveCasinoDetailPageDesktopQuery = {
  gamesList?: Maybe<{ games: Array<LiveCasinoCardFragment> }>;
};

export type MustDropJackpot_MustDropJackpotFragment = {
  label: string;
  image: string;
  id: string;
  amount: { formattedAmount: string };
};

export type MustDropJackpotsGamesListQueryVariables = Exact<{
  id: Scalars["String"];
  numberOfGames: Scalars["Int"];
}>;

export type MustDropJackpotsGamesListQuery = {
  gamesList?: Maybe<{
    name?: Maybe<string>;
    games: Array<GameRow_GameFragment>;
  }>;
};

export type MustDropJackpotsWidget_MustDropJackpotFragment = MustDropJackpot_MustDropJackpotFragment;

export type MustDropJackpotsQueryVariables = Exact<{ [key: string]: never }>;

export type MustDropJackpotsQuery = {
  mustDropJackpots: Array<MustDropJackpotsWidget_MustDropJackpotFragment>;
};

export type PlayerValuablesQueryVariables = Exact<{
  valuableType?: Maybe<ValuableType>;
  badgeRuleName?: Maybe<Scalars["String"]>;
}>;

export type PlayerValuablesQuery = {
  listTitleLabel: string;
  availableListTitleLabel: string;
  usedListTitleLabel: string;
  lockedListTitleLabel: string;
  hoursLabel: string;
  minutesLabel: string;
  seeAllLabel: string;
  noValuablesLabel: string;
  dontUseValuableLabel: string;
  player: {
    valuables: Array<
      | {
          __typename: "PlayerValuableCash";
          requirementType?: Maybe<RequirementType>;
          id: string;
          valuableState: PlayerValuableState;
          expiryDate: number;
          valuableType: ValuableType;
          title: string;
          content: string;
          caveat?: Maybe<string>;
          currency: Currency;
          market: string;
          backgroundImage: string;
          wageringThreshold?: Maybe<number>;
          leftToWager?: Maybe<number>;
          termsLink: string;
          specificTerms?: Maybe<string>;
          itemImage?: Maybe<string>;
          rule: { name: string };
        }
      | {
          __typename: "PlayerValuableSpins";
          description: string;
          coinValue: number;
          requirementType?: Maybe<RequirementType>;
          id: string;
          valuableState: PlayerValuableState;
          expiryDate: number;
          valuableType: ValuableType;
          title: string;
          content: string;
          caveat?: Maybe<string>;
          currency: Currency;
          market: string;
          backgroundImage: string;
          wageringThreshold?: Maybe<number>;
          leftToWager?: Maybe<number>;
          termsLink: string;
          specificTerms?: Maybe<string>;
          itemImage?: Maybe<string>;
          game?: Maybe<{ slug: string }>;
          rule: { name: string };
        }
      | {
          __typename: "PlayerValuableDeposit";
          id: string;
          valuableState: PlayerValuableState;
          expiryDate: number;
          valuableType: ValuableType;
          title: string;
          content: string;
          caveat?: Maybe<string>;
          currency: Currency;
          market: string;
          backgroundImage: string;
          wageringThreshold?: Maybe<number>;
          leftToWager?: Maybe<number>;
          termsLink: string;
          specificTerms?: Maybe<string>;
          itemImage?: Maybe<string>;
          rule: { name: string };
        }
      | {
          __typename: "PlayerValuableSport";
          id: string;
          valuableState: PlayerValuableState;
          expiryDate: number;
          valuableType: ValuableType;
          title: string;
          content: string;
          caveat?: Maybe<string>;
          currency: Currency;
          market: string;
          backgroundImage: string;
          wageringThreshold?: Maybe<number>;
          leftToWager?: Maybe<number>;
          termsLink: string;
          specificTerms?: Maybe<string>;
          itemImage?: Maybe<string>;
          rule: { name: string };
        }
      | {
          __typename: "PlayerValuableCashback";
          description: string;
          requirementType?: Maybe<RequirementType>;
          gameCategories: Array<Maybe<string>>;
          id: string;
          valuableState: PlayerValuableState;
          expiryDate: number;
          valuableType: ValuableType;
          title: string;
          content: string;
          caveat?: Maybe<string>;
          currency: Currency;
          market: string;
          backgroundImage: string;
          wageringThreshold?: Maybe<number>;
          leftToWager?: Maybe<number>;
          termsLink: string;
          specificTerms?: Maybe<string>;
          itemImage?: Maybe<string>;
          games: Array<Maybe<{ title: string; slug: string }>>;
          excludedGames: Array<Maybe<{ title: string }>>;
          rule: { name: string };
        }
      | {
          __typename: "PlayerValuableWageringLock";
          awardType: WageringLockAwardType;
          description: string;
          gameCategories: Array<Maybe<string>>;
          id: string;
          valuableState: PlayerValuableState;
          expiryDate: number;
          valuableType: ValuableType;
          title: string;
          content: string;
          caveat?: Maybe<string>;
          currency: Currency;
          market: string;
          backgroundImage: string;
          wageringThreshold?: Maybe<number>;
          leftToWager?: Maybe<number>;
          termsLink: string;
          specificTerms?: Maybe<string>;
          itemImage?: Maybe<string>;
          games: Array<Maybe<{ title: string }>>;
          excludedGames: Array<Maybe<{ title: string }>>;
          rule: { name: string };
        }
      | {
          __typename: "PlayerValuableBundleLock";
          tierType?: Maybe<BundleLockTierType>;
          requirementType?: Maybe<RequirementType>;
          id: string;
          valuableState: PlayerValuableState;
          expiryDate: number;
          valuableType: ValuableType;
          title: string;
          content: string;
          caveat?: Maybe<string>;
          currency: Currency;
          market: string;
          backgroundImage: string;
          wageringThreshold?: Maybe<number>;
          leftToWager?: Maybe<number>;
          termsLink: string;
          specificTerms?: Maybe<string>;
          itemImage?: Maybe<string>;
          rule: { name: string };
        }
      | {
          __typename: "PlayerValuableFreeBet";
          requirementType?: Maybe<RequirementType>;
          id: string;
          valuableState: PlayerValuableState;
          expiryDate: number;
          valuableType: ValuableType;
          title: string;
          content: string;
          caveat?: Maybe<string>;
          currency: Currency;
          market: string;
          backgroundImage: string;
          wageringThreshold?: Maybe<number>;
          leftToWager?: Maybe<number>;
          termsLink: string;
          specificTerms?: Maybe<string>;
          itemImage?: Maybe<string>;
          rule: { name: string };
        }
    >;
  };
};

type PlayerValuableList_PlayerValuable_PlayerValuableCash_Fragment = {
  __typename: "PlayerValuableCash";
  requirementType?: Maybe<RequirementType>;
  id: string;
  valuableState: PlayerValuableState;
  expiryDate: number;
  valuableType: ValuableType;
  title: string;
  content: string;
  caveat?: Maybe<string>;
  currency: Currency;
  market: string;
  backgroundImage: string;
  wageringThreshold?: Maybe<number>;
  leftToWager?: Maybe<number>;
  itemImage?: Maybe<string>;
  rule: { name: string };
};

type PlayerValuableList_PlayerValuable_PlayerValuableSpins_Fragment = {
  __typename: "PlayerValuableSpins";
  description: string;
  coinValue: number;
  requirementType?: Maybe<RequirementType>;
  id: string;
  valuableState: PlayerValuableState;
  expiryDate: number;
  valuableType: ValuableType;
  title: string;
  content: string;
  caveat?: Maybe<string>;
  currency: Currency;
  market: string;
  backgroundImage: string;
  wageringThreshold?: Maybe<number>;
  leftToWager?: Maybe<number>;
  itemImage?: Maybe<string>;
  game?: Maybe<{ slug: string }>;
  rule: { name: string };
};

type PlayerValuableList_PlayerValuable_PlayerValuableDeposit_Fragment = {
  __typename: "PlayerValuableDeposit";
  id: string;
  valuableState: PlayerValuableState;
  expiryDate: number;
  valuableType: ValuableType;
  title: string;
  content: string;
  caveat?: Maybe<string>;
  currency: Currency;
  market: string;
  backgroundImage: string;
  wageringThreshold?: Maybe<number>;
  leftToWager?: Maybe<number>;
  itemImage?: Maybe<string>;
  rule: { name: string };
};

type PlayerValuableList_PlayerValuable_PlayerValuableSport_Fragment = {
  __typename: "PlayerValuableSport";
  id: string;
  valuableState: PlayerValuableState;
  expiryDate: number;
  valuableType: ValuableType;
  title: string;
  content: string;
  caveat?: Maybe<string>;
  currency: Currency;
  market: string;
  backgroundImage: string;
  wageringThreshold?: Maybe<number>;
  leftToWager?: Maybe<number>;
  itemImage?: Maybe<string>;
  rule: { name: string };
};

type PlayerValuableList_PlayerValuable_PlayerValuableCashback_Fragment = {
  __typename: "PlayerValuableCashback";
  description: string;
  requirementType?: Maybe<RequirementType>;
  id: string;
  valuableState: PlayerValuableState;
  expiryDate: number;
  valuableType: ValuableType;
  title: string;
  content: string;
  caveat?: Maybe<string>;
  currency: Currency;
  market: string;
  backgroundImage: string;
  wageringThreshold?: Maybe<number>;
  leftToWager?: Maybe<number>;
  itemImage?: Maybe<string>;
  rule: { name: string };
};

type PlayerValuableList_PlayerValuable_PlayerValuableWageringLock_Fragment = {
  __typename: "PlayerValuableWageringLock";
  awardType: WageringLockAwardType;
  description: string;
  id: string;
  valuableState: PlayerValuableState;
  expiryDate: number;
  valuableType: ValuableType;
  title: string;
  content: string;
  caveat?: Maybe<string>;
  currency: Currency;
  market: string;
  backgroundImage: string;
  wageringThreshold?: Maybe<number>;
  leftToWager?: Maybe<number>;
  itemImage?: Maybe<string>;
  rule: { name: string };
};

type PlayerValuableList_PlayerValuable_PlayerValuableBundleLock_Fragment = {
  __typename: "PlayerValuableBundleLock";
  tierType?: Maybe<BundleLockTierType>;
  requirementType?: Maybe<RequirementType>;
  id: string;
  valuableState: PlayerValuableState;
  expiryDate: number;
  valuableType: ValuableType;
  title: string;
  content: string;
  caveat?: Maybe<string>;
  currency: Currency;
  market: string;
  backgroundImage: string;
  wageringThreshold?: Maybe<number>;
  leftToWager?: Maybe<number>;
  itemImage?: Maybe<string>;
  rule: { name: string };
};

type PlayerValuableList_PlayerValuable_PlayerValuableFreeBet_Fragment = {
  __typename: "PlayerValuableFreeBet";
  requirementType?: Maybe<RequirementType>;
  id: string;
  valuableState: PlayerValuableState;
  expiryDate: number;
  valuableType: ValuableType;
  title: string;
  content: string;
  caveat?: Maybe<string>;
  currency: Currency;
  market: string;
  backgroundImage: string;
  wageringThreshold?: Maybe<number>;
  leftToWager?: Maybe<number>;
  itemImage?: Maybe<string>;
  rule: { name: string };
};

export type PlayerValuableList_PlayerValuableFragment =
  | PlayerValuableList_PlayerValuable_PlayerValuableCash_Fragment
  | PlayerValuableList_PlayerValuable_PlayerValuableSpins_Fragment
  | PlayerValuableList_PlayerValuable_PlayerValuableDeposit_Fragment
  | PlayerValuableList_PlayerValuable_PlayerValuableSport_Fragment
  | PlayerValuableList_PlayerValuable_PlayerValuableCashback_Fragment
  | PlayerValuableList_PlayerValuable_PlayerValuableWageringLock_Fragment
  | PlayerValuableList_PlayerValuable_PlayerValuableBundleLock_Fragment
  | PlayerValuableList_PlayerValuable_PlayerValuableFreeBet_Fragment;

export type UseValuableMutationVariables = Exact<{
  id: Scalars["String"];
  source?: Maybe<Scalars["String"]>;
}>;

export type UseValuableMutation = { useValuable?: Maybe<boolean> };

export type PromotionCard_PromotionFragment = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  image: string;
  badge?: Maybe<string>;
  tag?: Maybe<string>;
  teaserCaveats?: Maybe<string>;
  ctaText?: Maybe<string>;
};

export type GetBlueribbonJackpotConfigByGameSlugQueryVariables = Exact<{
  gameSlug: Scalars["String"];
}>;

export type GetBlueribbonJackpotConfigByGameSlugQuery = {
  blueribbonJackpotByGameSlug?: Maybe<{
    externalId: string;
    requiresManualOptIn: boolean;
    optedIn: boolean;
    title: string;
    image: string;
    slug: string;
    pots: Array<{
      externalId: string;
      potKey: string;
      name: string;
      shortName: string;
      mainWinRatio: number;
      communityWinRatio: number;
      potTitleColor: string;
      potInformation: string;
      potInformationAmount: string;
      icon: string;
      potExplanation: string;
      sharedPot?: Maybe<{
        name: string;
        shortName: string;
        icon: string;
        splitExplanation: string;
      }>;
    }>;
    notifications: {
      gameLaunch: string;
      optIn: { title: string; content: string };
    };
  }>;
};

export type GetBlueribbonJackpotConfigBySlugQueryVariables = Exact<{
  slug: Scalars["String"];
}>;

export type GetBlueribbonJackpotConfigBySlugQuery = {
  blueribbonJackpotBySlug?: Maybe<{
    externalId: string;
    title: string;
    image: string;
    slug: string;
    widgetColor: { dark?: Maybe<string>; light?: Maybe<string> };
    pots: Array<{
      externalId: string;
      potKey: string;
      name: string;
      shortName: string;
      mainWinRatio: number;
      communityWinRatio: number;
      icon: string;
      potExplanation: string;
      potTitleColor: string;
      potInformation: string;
      potInformationAmount: string;
      sharedPot?: Maybe<{
        name: string;
        shortName: string;
        icon: string;
        splitExplanation: string;
      }>;
    }>;
  }>;
};

export type GetJackpotConfigForWidgetQueryVariables = Exact<{
  slug: Scalars["String"];
}>;

export type GetJackpotConfigForWidgetQuery = {
  blueribbonJackpot?: Maybe<{
    externalId: string;
    title: string;
    image: string;
    slug: string;
    widgetColor: { dark?: Maybe<string>; light?: Maybe<string> };
    pots: Array<{
      externalId: string;
      potKey: string;
      name: string;
      shortName: string;
      mainWinRatio: number;
      communityWinRatio: number;
      icon: string;
      potExplanation: string;
      potTitleColor: string;
      potInformation: string;
      potInformationAmount: string;
      sharedPot?: Maybe<{
        name: string;
        shortName: string;
        icon: string;
        splitExplanation: string;
      }>;
    }>;
  }>;
};

export type GameStudioQueryVariables = Exact<{
  slug: Scalars["String"];
  page: Scalars["Int"];
  pageSize: Scalars["Int"];
}>;

export type GameStudioQuery = {
  gameStudio?: Maybe<{
    id: string;
    name: string;
    gamesCount: number;
    games: Array<Maybe<GameRow_GameFragment>>;
  }>;
};

export type AfterLimitsReached_GameFragment = {
  __typename: "Game";
  id: string;
  slug: string;
  backgroundImage: string;
  logo: string;
  name: string;
};

export type PlayAgainGameBySlugQueryVariables = Exact<{
  slug: Scalars["String"];
}>;

export type PlayAgainGameBySlugQuery = {
  gamesBySlugs: Array<AfterLimitsReached_GameFragment>;
};

export type PlayAgainLatestPlayedQueryVariables = Exact<{
  [key: string]: never;
}>;

export type PlayAgainLatestPlayedQuery = {
  gamesList?: Maybe<{
    id?: Maybe<string>;
    games: Array<AfterLimitsReached_GameFragment>;
  }>;
};

export type ReelRaceCard_ReelRaceFragment = {
  id: string;
  startTime: number;
  optedIn: boolean;
  endTime: number;
  minBet?: Maybe<string>;
  status?: Maybe<string>;
  spinLimit: number;
  promoted: boolean;
  formattedPrize: string;
  formattedPrizes: Array<string>;
  remainingSpins: number;
  game: {
    id: string;
    name: string;
    logo: string;
    backgroundImage: string;
    slug: string;
  };
  translations: {
    optedInCtaSingleGameShort: string;
    optIn: string;
    optedIn: string;
    endingIn: string;
    startingIn: string;
    competeFor: string;
    minBet: string;
    spins: string;
    duration: string;
    durationTemplate: string;
    caveatShort: string;
    today: string;
    tomorrow: string;
  };
};

export type OptInForReelRaceMutationVariables = Exact<{
  id: Scalars["String"];
}>;

export type OptInForReelRaceMutation = {
  optInForReelRace?: Maybe<{ id: string; optedIn: boolean }>;
};

export type ReelRaceOptInWidgetQueryVariables = Exact<{
  limit: Scalars["Int"];
  prioritisePromoted?: Maybe<Scalars["Boolean"]>;
}>;

export type ReelRaceOptInWidgetQuery = {
  reelRaces: Array<{
    id: string;
    startTime: number;
    endTime: number;
    optedIn: boolean;
    minBet?: Maybe<string>;
    status?: Maybe<string>;
    spinLimit: number;
    promoted: boolean;
    formattedPrize: string;
    formattedPrizes: Array<string>;
    game: {
      id: string;
      slug: string;
      name: string;
      logo: string;
      backgroundImage: string;
    };
    translations: {
      competeFor: string;
      optIn: string;
      optedIn: string;
      optedInCtaSingleGameShort: string;
      startingIn: string;
      endingIn: string;
      spins: string;
      duration: string;
      durationTemplate: string;
      caveatShort: string;
      today: string;
      tomorrow: string;
      minBet: string;
    };
  }>;
};

export type ReelRacePreviousCard_ReelRaceFragment = {
  id: string;
  startTime: number;
  endTime: number;
  formattedPrizes: Array<string>;
  status?: Maybe<string>;
  game: { name: string; logo: string; backgroundImage: string };
  leaderboard: Array<{ playerName: string; position: number; points: number }>;
};

export type ReelRaceScheduleCard_ReelRaceFragment = {
  id: string;
  startTime: number;
  optedIn: boolean;
  endTime: number;
  minBet?: Maybe<string>;
  status?: Maybe<string>;
  spinLimit: number;
  promoted: boolean;
  formattedPrize: string;
  formattedPrizes: Array<string>;
  remainingSpins: number;
  game: {
    id: string;
    name: string;
    logo: string;
    backgroundImage: string;
    slug: string;
  };
  translations: {
    optedInCtaSingleGameShort: string;
    optIn: string;
    optedIn: string;
    endingIn: string;
    startingIn: string;
    competeFor: string;
    minBet: string;
    spins: string;
    duration: string;
    durationTemplate: string;
    caveatShort: string;
    today: string;
    tomorrow: string;
  };
};

export type ReelRaceOptInMutationVariables = Exact<{
  id: Scalars["String"];
}>;

export type ReelRaceOptInMutation = {
  optInForReelRace?: Maybe<{ id: string; optedIn: boolean }>;
};

export type ReelRaceWidgetQueryVariables = Exact<{ [key: string]: never }>;

export type ReelRaceWidgetQuery = {
  reelRaces: Array<{
    id: string;
    startTime: number;
    endTime: number;
    optedIn: boolean;
    promoted: boolean;
    spinLimit: number;
    formattedPrize: string;
    cometdChannels: Array<string>;
    game: { slug: string; name: string; logo: string; backgroundImage: string };
    leaderboard: Array<{
      playerId: string;
      playerName: string;
      position: number;
      points: number;
      remainingSpins: number;
      boosters: {
        winsInARow: number;
        triples: number;
        wins: number;
        bigWins: number;
        megaWins: number;
      };
    }>;
  }>;
};

export type ReelRaceListQueryVariables = Exact<{
  limit: Scalars["Int"];
}>;

export type ReelRaceListQuery = {
  reelRaces: Array<{ id: string } & ReelRaceCard_ReelRaceFragment>;
};

export type ReelRacesPageTabPreviousQueryVariables = Exact<{
  limit: Scalars["Int"];
  previous?: Maybe<Scalars["Boolean"]>;
}>;

export type ReelRacesPageTabPreviousQuery = {
  reelRaces: Array<{ id: string } & ReelRacePreviousCard_ReelRaceFragment>;
};

export type ReelRacesPageTabScheduleQueryVariables = Exact<{
  limit: Scalars["Int"];
}>;

export type ReelRacesPageTabScheduleQuery = {
  reelRaces: Array<{ id: string } & ReelRaceScheduleCard_ReelRaceFragment>;
};

export type GetGameSetsQueryVariables = Exact<{
  verticalId?: Maybe<Scalars["String"]>;
}>;

export type GetGameSetsQuery = {
  gameSetsList: Array<{
    id: string;
    key: string;
    title: string;
    icon: string;
    defaultSort: GamesSortOrder;
    supportedSorts: Array<GamesSortOrder>;
    baseQuery: string;
    gameDisplayMode: GameDisplayMode;
    additionalFilterGroups: Array<{
      key: string;
      type: string;
      title: string;
      description: string;
      values: Array<{ key: string; query: string; title?: Maybe<string> }>;
    }>;
  }>;
};

export type Player_Settings_QueryVariables = Exact<{ [key: string]: never }>;

export type Player_Settings_Query = { player: Settings_PlayerFragment };

export type Settings_PlayerFragment = {
  __typename: "Player";
  id: string;
  details: {
    __typename: "PlayerDetails";
    canChangePassword: boolean;
    email: string;
    name: { __typename: "PlayerName"; first: string; last: string };
    extentOfGambling: {
      __typename: "PlayerExtentOfGambling";
      canChange: boolean;
      label?: Maybe<string>;
    };
    phoneNumber: {
      __typename: "PhoneNumber";
      prefix: string;
      number: string;
      verified: boolean;
    };
    address: {
      __typename: "PlayerAddress";
      city: string;
      street: string;
      postCode: string;
      country: { __typename: "Country"; code: string; name: string };
    };
  };
};

export type SetAdventurerPublicityMutationVariables = Exact<{
  input?: Maybe<ContactSettingsInput>;
}>;

export type SetAdventurerPublicityMutation = {
  setAdventurerPublicity?: Maybe<boolean>;
};

export type SetWithdrawalNotificationsMutationVariables = Exact<{
  input?: Maybe<ContactSettingsInput>;
}>;

export type SetWithdrawalNotificationsMutation = {
  setWithdrawalNotifications?: Maybe<boolean>;
};

export type SetNewsletterSubscriptionMutationVariables = Exact<{
  input?: Maybe<ContactSettingsInput>;
}>;

export type SetNewsletterSubscriptionMutation = {
  setNewsletterSubscription?: Maybe<boolean>;
};

export type SetSmsNewsletterSubscriptionMutationVariables = Exact<{
  input?: Maybe<ContactSettingsInput>;
}>;

export type SetSmsNewsletterSubscriptionMutation = {
  setSMSNewsletterSubscription?: Maybe<boolean>;
};

export type SetContactByPhoneMutationVariables = Exact<{
  input?: Maybe<ContactSettingsInput>;
}>;

export type SetContactByPhoneMutation = { setContactByPhone?: Maybe<boolean> };

export type SetContactByPostMutationVariables = Exact<{
  input?: Maybe<ContactSettingsInput>;
}>;

export type SetContactByPostMutation = { setContactByPost?: Maybe<boolean> };

export type SetMarketingCrossSellSubscriptionMutationVariables = Exact<{
  input?: Maybe<ContactSettingsInput>;
}>;

export type SetMarketingCrossSellSubscriptionMutation = {
  setMarketingCrossSellSubscription?: Maybe<boolean>;
};

export type Contact_Settings_Player_AdventurerPublicFragment = {
  __typename: "Player";
  details: {
    contactSettings: {
      adventurerPublic: boolean;
      contactByPhone: boolean;
      contactByPost: boolean;
      subscribedToMarketingCrossSell: boolean;
      subscribedToNewsletters: boolean;
      subscribedToSMSNewsletters: boolean;
      withdrawalNotifications: boolean;
    };
  };
};

export type Player_Contact_Settings_QueryVariables = Exact<{
  [key: string]: never;
}>;

export type Player_Contact_Settings_Query = {
  player: { id: string } & Contact_Settings_Player_AdventurerPublicFragment &
    Contact_Settings_Player_RealityCheckFragment;
};

export type UpdateRealityCheckIntervalMutationVariables = Exact<{
  input?: Maybe<UpdateRealityCheckIntervalInput>;
}>;

export type UpdateRealityCheckIntervalMutation = {
  updateRealityCheckInterval?: Maybe<number>;
};

export type Reality_Check_Labels_QueryVariables = Exact<{
  [key: string]: never;
}>;

export type Reality_Check_Labels_Query = {
  inGameSessionUpdatesLabel: string;
  inGameSessionUpdatesFrequencyLabel: string;
  save: string;
  cancel: string;
};

export type Contact_Settings_Player_RealityCheckFragment = {
  __typename: "Player";
  playOk: {
    __typename: "PlayerPlayOkSettings";
    realityCheck: {
      __typename: "PlayerRealityCheckSettings";
      canChangeInterval: boolean;
      isZeroIntervalAllowed: boolean;
      intervalInMinutes: number;
    };
  };
};

export type Player_Reality_Check_QueryVariables = Exact<{
  [key: string]: never;
}>;

export type Player_Reality_Check_Query = {
  player: { id: string } & Contact_Settings_Player_RealityCheckFragment;
};

export type Player_Login_History_QueryVariables = Exact<{
  [key: string]: never;
}>;

export type Player_Login_History_Query = {
  player: { id: string; loginHistory: Array<{ loginTime: number }> };
};

type ValuableCard_PlayerValuable_PlayerValuableCash_Fragment = {
  __typename: "PlayerValuableCash";
  id: string;
  title: string;
  content: string;
  valuableState: PlayerValuableState;
  valuableType: ValuableType;
  currency: Currency;
  market: string;
  caveat?: Maybe<string>;
  backgroundImage: string;
  specificTerms?: Maybe<string>;
  termsLink: string;
  rule: { name: string };
};

type ValuableCard_PlayerValuable_PlayerValuableSpins_Fragment = {
  __typename: "PlayerValuableSpins";
  coinValue: number;
  description: string;
  id: string;
  title: string;
  content: string;
  valuableState: PlayerValuableState;
  valuableType: ValuableType;
  currency: Currency;
  market: string;
  caveat?: Maybe<string>;
  backgroundImage: string;
  specificTerms?: Maybe<string>;
  termsLink: string;
  rule: { name: string };
};

type ValuableCard_PlayerValuable_PlayerValuableDeposit_Fragment = {
  __typename: "PlayerValuableDeposit";
  id: string;
  title: string;
  content: string;
  valuableState: PlayerValuableState;
  valuableType: ValuableType;
  currency: Currency;
  market: string;
  caveat?: Maybe<string>;
  backgroundImage: string;
  specificTerms?: Maybe<string>;
  termsLink: string;
  rule: { name: string };
};

type ValuableCard_PlayerValuable_PlayerValuableSport_Fragment = {
  __typename: "PlayerValuableSport";
  id: string;
  title: string;
  content: string;
  valuableState: PlayerValuableState;
  valuableType: ValuableType;
  currency: Currency;
  market: string;
  caveat?: Maybe<string>;
  backgroundImage: string;
  specificTerms?: Maybe<string>;
  termsLink: string;
  rule: { name: string };
};

type ValuableCard_PlayerValuable_PlayerValuableCashback_Fragment = {
  __typename: "PlayerValuableCashback";
  id: string;
  title: string;
  content: string;
  valuableState: PlayerValuableState;
  valuableType: ValuableType;
  currency: Currency;
  market: string;
  caveat?: Maybe<string>;
  backgroundImage: string;
  specificTerms?: Maybe<string>;
  termsLink: string;
  rule: { name: string };
};

type ValuableCard_PlayerValuable_PlayerValuableWageringLock_Fragment = {
  __typename: "PlayerValuableWageringLock";
  id: string;
  title: string;
  content: string;
  valuableState: PlayerValuableState;
  valuableType: ValuableType;
  currency: Currency;
  market: string;
  caveat?: Maybe<string>;
  backgroundImage: string;
  specificTerms?: Maybe<string>;
  termsLink: string;
  rule: { name: string };
};

type ValuableCard_PlayerValuable_PlayerValuableBundleLock_Fragment = {
  __typename: "PlayerValuableBundleLock";
  requirementType?: Maybe<RequirementType>;
  id: string;
  title: string;
  content: string;
  valuableState: PlayerValuableState;
  valuableType: ValuableType;
  currency: Currency;
  market: string;
  caveat?: Maybe<string>;
  backgroundImage: string;
  specificTerms?: Maybe<string>;
  termsLink: string;
  rule: { name: string };
};

type ValuableCard_PlayerValuable_PlayerValuableFreeBet_Fragment = {
  __typename: "PlayerValuableFreeBet";
  requirementType?: Maybe<RequirementType>;
  id: string;
  title: string;
  content: string;
  valuableState: PlayerValuableState;
  valuableType: ValuableType;
  currency: Currency;
  market: string;
  caveat?: Maybe<string>;
  backgroundImage: string;
  specificTerms?: Maybe<string>;
  termsLink: string;
  rule: { name: string };
};

export type ValuableCard_PlayerValuableFragment =
  | ValuableCard_PlayerValuable_PlayerValuableCash_Fragment
  | ValuableCard_PlayerValuable_PlayerValuableSpins_Fragment
  | ValuableCard_PlayerValuable_PlayerValuableDeposit_Fragment
  | ValuableCard_PlayerValuable_PlayerValuableSport_Fragment
  | ValuableCard_PlayerValuable_PlayerValuableCashback_Fragment
  | ValuableCard_PlayerValuable_PlayerValuableWageringLock_Fragment
  | ValuableCard_PlayerValuable_PlayerValuableBundleLock_Fragment
  | ValuableCard_PlayerValuable_PlayerValuableFreeBet_Fragment;

type ValuableDetails_PlayerValuable_PlayerValuableCash_Fragment = {
  __typename: "PlayerValuableCash";
  requirementType?: Maybe<RequirementType>;
  id: string;
  backgroundImage: string;
  content: string;
  caveat?: Maybe<string>;
  currency: Currency;
  market: string;
  expiryDate: number;
  valuableType: ValuableType;
  valuableState: PlayerValuableState;
  wageringThreshold?: Maybe<number>;
  leftToWager?: Maybe<number>;
  termsLink: string;
  title: string;
  specificTerms?: Maybe<string>;
  itemImage?: Maybe<string>;
  rule: { name: string };
};

type ValuableDetails_PlayerValuable_PlayerValuableSpins_Fragment = {
  __typename: "PlayerValuableSpins";
  requirementType?: Maybe<RequirementType>;
  id: string;
  backgroundImage: string;
  content: string;
  caveat?: Maybe<string>;
  currency: Currency;
  market: string;
  expiryDate: number;
  valuableType: ValuableType;
  valuableState: PlayerValuableState;
  wageringThreshold?: Maybe<number>;
  leftToWager?: Maybe<number>;
  termsLink: string;
  title: string;
  specificTerms?: Maybe<string>;
  itemImage?: Maybe<string>;
  game?: Maybe<{ slug: string }>;
  rule: { name: string };
};

type ValuableDetails_PlayerValuable_PlayerValuableDeposit_Fragment = {
  __typename: "PlayerValuableDeposit";
  id: string;
  backgroundImage: string;
  content: string;
  caveat?: Maybe<string>;
  currency: Currency;
  market: string;
  expiryDate: number;
  valuableType: ValuableType;
  valuableState: PlayerValuableState;
  wageringThreshold?: Maybe<number>;
  leftToWager?: Maybe<number>;
  termsLink: string;
  title: string;
  specificTerms?: Maybe<string>;
  itemImage?: Maybe<string>;
  rule: { name: string };
};

type ValuableDetails_PlayerValuable_PlayerValuableSport_Fragment = {
  __typename: "PlayerValuableSport";
  id: string;
  backgroundImage: string;
  content: string;
  caveat?: Maybe<string>;
  currency: Currency;
  market: string;
  expiryDate: number;
  valuableType: ValuableType;
  valuableState: PlayerValuableState;
  wageringThreshold?: Maybe<number>;
  leftToWager?: Maybe<number>;
  termsLink: string;
  title: string;
  specificTerms?: Maybe<string>;
  itemImage?: Maybe<string>;
  rule: { name: string };
};

type ValuableDetails_PlayerValuable_PlayerValuableCashback_Fragment = {
  __typename: "PlayerValuableCashback";
  requirementType?: Maybe<RequirementType>;
  gameCategories: Array<Maybe<string>>;
  id: string;
  backgroundImage: string;
  content: string;
  caveat?: Maybe<string>;
  currency: Currency;
  market: string;
  expiryDate: number;
  valuableType: ValuableType;
  valuableState: PlayerValuableState;
  wageringThreshold?: Maybe<number>;
  leftToWager?: Maybe<number>;
  termsLink: string;
  title: string;
  specificTerms?: Maybe<string>;
  itemImage?: Maybe<string>;
  games: Array<Maybe<{ title: string; slug: string }>>;
  excludedGames: Array<Maybe<{ title: string }>>;
  rule: { name: string };
};

type ValuableDetails_PlayerValuable_PlayerValuableWageringLock_Fragment = {
  __typename: "PlayerValuableWageringLock";
  awardType: WageringLockAwardType;
  gameCategories: Array<Maybe<string>>;
  id: string;
  backgroundImage: string;
  content: string;
  caveat?: Maybe<string>;
  currency: Currency;
  market: string;
  expiryDate: number;
  valuableType: ValuableType;
  valuableState: PlayerValuableState;
  wageringThreshold?: Maybe<number>;
  leftToWager?: Maybe<number>;
  termsLink: string;
  title: string;
  specificTerms?: Maybe<string>;
  itemImage?: Maybe<string>;
  games: Array<Maybe<{ title: string }>>;
  excludedGames: Array<Maybe<{ title: string }>>;
  rule: { name: string };
};

type ValuableDetails_PlayerValuable_PlayerValuableBundleLock_Fragment = {
  __typename: "PlayerValuableBundleLock";
  requirementType?: Maybe<RequirementType>;
  id: string;
  backgroundImage: string;
  content: string;
  caveat?: Maybe<string>;
  currency: Currency;
  market: string;
  expiryDate: number;
  valuableType: ValuableType;
  valuableState: PlayerValuableState;
  wageringThreshold?: Maybe<number>;
  leftToWager?: Maybe<number>;
  termsLink: string;
  title: string;
  specificTerms?: Maybe<string>;
  itemImage?: Maybe<string>;
  rule: { name: string };
};

type ValuableDetails_PlayerValuable_PlayerValuableFreeBet_Fragment = {
  __typename: "PlayerValuableFreeBet";
  requirementType?: Maybe<RequirementType>;
  id: string;
  backgroundImage: string;
  content: string;
  caveat?: Maybe<string>;
  currency: Currency;
  market: string;
  expiryDate: number;
  valuableType: ValuableType;
  valuableState: PlayerValuableState;
  wageringThreshold?: Maybe<number>;
  leftToWager?: Maybe<number>;
  termsLink: string;
  title: string;
  specificTerms?: Maybe<string>;
  itemImage?: Maybe<string>;
  rule: { name: string };
};

export type ValuableDetails_PlayerValuableFragment =
  | ValuableDetails_PlayerValuable_PlayerValuableCash_Fragment
  | ValuableDetails_PlayerValuable_PlayerValuableSpins_Fragment
  | ValuableDetails_PlayerValuable_PlayerValuableDeposit_Fragment
  | ValuableDetails_PlayerValuable_PlayerValuableSport_Fragment
  | ValuableDetails_PlayerValuable_PlayerValuableCashback_Fragment
  | ValuableDetails_PlayerValuable_PlayerValuableWageringLock_Fragment
  | ValuableDetails_PlayerValuable_PlayerValuableBundleLock_Fragment
  | ValuableDetails_PlayerValuable_PlayerValuableFreeBet_Fragment;

export type GlossaryQueryVariables = Exact<{ [key: string]: never }>;

export type GlossaryQuery = {
  glossary: Array<{
    id: string;
    term: string;
    aka?: Maybe<string>;
    definition: string;
  }>;
};

export type CmsImageQueryVariables = Exact<{
  key: Scalars["String"];
}>;

export type CmsImageQuery = { sportsCmsImage?: Maybe<string> };

export type CompetitionPillsList_GroupFragment = {
  id: number;
  userFavourite: boolean;
} & GroupPill_GroupFragment;

export type DictionaryTermQueryVariables = Exact<{
  key: Scalars["String"];
}>;

export type DictionaryTermQuery = { dictionaryTerm: string };

export type PluralisableDictionaryTermQueryVariables = Exact<{
  singularKey: Scalars["String"];
  pluralKey: Scalars["String"];
}>;

export type PluralisableDictionaryTermQuery = {
  singularTerm: string;
  pluralTerm: string;
};

export type EditFavouriteCompetitionsQueryVariables = Exact<{
  groupId: Scalars["Int"];
}>;

export type EditFavouriteCompetitionsQuery = {
  favouriteCompetitions: Array<{ id: number }>;
};

export type FavouriteCompetitionsSelectorQueryVariables = Exact<{
  groupId: Scalars["Int"];
}>;

export type FavouriteCompetitionsSelectorQuery = {
  internationalGroupName: string;
  group: {
    name: string;
    groups?: Maybe<
      Array<
        {
          id: number;
          popular: boolean;
          groups?: Maybe<Array<{ id: number; popular: boolean }>>;
        } & FavouriteCompetitionsSelectorRegion_GroupFragment
      >
    >;
  } & FavouriteCompetitionsSelectorIntro_GroupFragment;
};

export type FavouriteCompetitionsSelectorIntro_GroupFragment = { name: string };

export type FavouriteCompetitionsSelectorRegion_GroupFragment = {
  name: string;
  regionCode?: Maybe<string>;
  groups?: Maybe<Array<{ id: number } & CompetitionPillsList_GroupFragment>>;
};

export type FavouriteCompetitionsSelectorModal_GroupFragment = { id: number };

export type FavouriteSportsSelector_GroupFragment = {
  id: number;
  name: string;
  popular: boolean;
} & FavouriteSportsSelectorListItem_GroupFragment;

export type FavouriteSportsSelectorListItem_GroupFragment = {
  id: number;
  name: string;
  clientPath: string;
  icon?: Maybe<string>;
  activeIndicator?: Maybe<string>;
  canSelectSubgroups: boolean;
  favouriteCompetitions: Array<CompetitionPillsList_GroupFragment>;
};

export type FavouriteSportsSelectorContext_CompetitionFragment = {
  id: number;
  regionCode?: Maybe<string>;
  name: string;
} & FavouriteCompetitionsSelectorModal_GroupFragment;

export type FavouriteSportsSelectorContextCompetitionSuggestionsQueryVariables = Exact<{
  id: Scalars["Int"];
}>;

export type FavouriteSportsSelectorContextCompetitionSuggestionsQuery = {
  topCompetitions: Array<FavouriteSportsSelectorContext_CompetitionFragment>;
};

export type FavouriteSportsSelectorContextQueryVariables = Exact<{
  [key: string]: never;
}>;

export type FavouriteSportsSelectorContextQuery = {
  groups: Array<
    {
      id: number;
      userFavourite: boolean;
      canSelectSubgroups: boolean;
      favouriteCompetitions: Array<FavouriteSportsSelectorContext_CompetitionFragment>;
    } & FavouriteSportsSelector_GroupFragment
  >;
};

export type PlayerVerticalQueryVariables = Exact<{ [key: string]: never }>;

export type PlayerVerticalQuery = { player: { vertical: Vertical } };

export type Freebet_QueryVariables = Exact<{ [key: string]: never }>;

export type Freebet_Query = {
  player: {
    valuables: Array<
      | {
          id: string;
          backgroundImage: string;
          currency: Currency;
          expiryDate: number;
          created: number;
          market: string;
          valuableState: PlayerValuableState;
          valuableType: ValuableType;
          title: string;
          content: string;
          caveat?: Maybe<string>;
          itemImage?: Maybe<string>;
        }
      | {
          id: string;
          backgroundImage: string;
          currency: Currency;
          expiryDate: number;
          created: number;
          market: string;
          valuableState: PlayerValuableState;
          valuableType: ValuableType;
          title: string;
          content: string;
          caveat?: Maybe<string>;
          itemImage?: Maybe<string>;
        }
      | {
          id: string;
          backgroundImage: string;
          currency: Currency;
          expiryDate: number;
          created: number;
          market: string;
          valuableState: PlayerValuableState;
          valuableType: ValuableType;
          title: string;
          content: string;
          caveat?: Maybe<string>;
          itemImage?: Maybe<string>;
        }
      | {
          id: string;
          backgroundImage: string;
          currency: Currency;
          expiryDate: number;
          created: number;
          market: string;
          valuableState: PlayerValuableState;
          valuableType: ValuableType;
          title: string;
          content: string;
          caveat?: Maybe<string>;
          itemImage?: Maybe<string>;
        }
      | {
          id: string;
          backgroundImage: string;
          currency: Currency;
          expiryDate: number;
          created: number;
          market: string;
          valuableState: PlayerValuableState;
          valuableType: ValuableType;
          title: string;
          content: string;
          caveat?: Maybe<string>;
          itemImage?: Maybe<string>;
        }
      | {
          id: string;
          backgroundImage: string;
          currency: Currency;
          expiryDate: number;
          created: number;
          market: string;
          valuableState: PlayerValuableState;
          valuableType: ValuableType;
          title: string;
          content: string;
          caveat?: Maybe<string>;
          itemImage?: Maybe<string>;
        }
      | {
          id: string;
          backgroundImage: string;
          currency: Currency;
          expiryDate: number;
          created: number;
          market: string;
          valuableState: PlayerValuableState;
          valuableType: ValuableType;
          title: string;
          content: string;
          caveat?: Maybe<string>;
          itemImage?: Maybe<string>;
        }
      | {
          id: string;
          backgroundImage: string;
          currency: Currency;
          expiryDate: number;
          created: number;
          market: string;
          valuableState: PlayerValuableState;
          valuableType: ValuableType;
          title: string;
          content: string;
          caveat?: Maybe<string>;
          itemImage?: Maybe<string>;
        }
    >;
  };
};

export type GroupPill_GroupFragment = {
  name: string;
  regionCode?: Maybe<string>;
};

export type SportsFirstBetQueryVariables = Exact<{ [key: string]: never }>;

export type SportsFirstBetQuery = { sportsFirstBet: boolean };

export type PopularBetsQueryVariables = Exact<{
  market: Scalars["String"];
  numberOfEvents: Scalars["Int"];
  sports: Scalars["String"];
  startingWithinDays: Scalars["Int"];
}>;

export type PopularBetsQuery = {
  sportsPopularBets?: Maybe<{
    popularEvents?: Maybe<
      Array<
        Maybe<{
          name?: Maybe<string>;
          events?: Maybe<
            Array<Maybe<{ eventId?: Maybe<number>; sport?: Maybe<string> }>>
          >;
        }>
      >
    >;
  }>;
};

export type UserNavigationQueryVariables = Exact<{
  live: Scalars["Boolean"];
}>;

export type UserNavigationQuery = {
  allLabel: string;
  editLabel: string;
  liveLabel: string;
  allSportsLabel: string;
  virtualsSportsLabel: string;
  sportsNavigation: Array<{
    sport: {
      name: string;
      id: number;
      clientPath: string;
      clientPathLive: string;
      termKey: string;
      icon?: Maybe<string>;
      activeIndicator?: Maybe<string>;
      canSelectSubgroups: boolean;
    };
    subNav: Array<{
      competition: {
        name: string;
        id: number;
        clientPath: string;
        clientPathLive: string;
        termKey: string;
        regionCode?: Maybe<string>;
      };
    }>;
  }>;
};

export type TopSearchesQueryVariables = Exact<{
  count: Scalars["Int"];
}>;

export type TopSearchesQuery = {
  topSearches: Array<{
    termKey: string;
    name: string;
    clientPath: string;
    icon?: Maybe<string>;
    parentGroups: Array<{ icon?: Maybe<string>; name: string }>;
  }>;
};

export type SearchQueryVariables = Exact<{
  query: Scalars["String"];
}>;

export type SearchQuery = {
  search: Array<{
    type: SearchResultType;
    id: string;
    localizedName: string;
    country?: Maybe<string>;
    sport?: Maybe<{ icon?: Maybe<string>; name: string }>;
  }>;
};

export type BetDetailsQueryVariables = Exact<{
  combinationRef: Scalars["BigInt"];
}>;

export type BetDetailsQuery = {
  betDetails?: Maybe<{
    username?: Maybe<string>;
    payout?: Maybe<number>;
    currency?: Maybe<string>;
    status?: Maybe<string>;
    legs?: Maybe<
      Array<
        Maybe<{
          outcomes?: Maybe<
            Array<
              Maybe<{
                eventName?: Maybe<string>;
                criterionName?: Maybe<string>;
                outcomeLabel?: Maybe<string>;
              }>
            >
          >;
        }>
      >
    >;
  }>;
};

export type NavigateClientMutationVariables = Exact<{
  path: Scalars["String"];
  trackingLocation: Scalars["String"];
}>;

export type NavigateClientMutation = { navigateClient?: Maybe<boolean> };

export type OpenModalMutationVariables = Exact<{
  modal: Modal;
}>;

export type OpenModalMutation = { openModal?: Maybe<boolean> };

export type CloseModalMutationVariables = Exact<{
  modal: Modal;
}>;

export type CloseModalMutation = { closeModal?: Maybe<boolean> };

export type CloseAllModalsMutationVariables = Exact<{ [key: string]: never }>;

export type CloseAllModalsMutation = { closeAllModals?: Maybe<boolean> };

export type UpdateKambiClientStateMutationVariables = Exact<{
  isVisible: Scalars["Boolean"];
}>;

export type UpdateKambiClientStateMutation = {
  updateKambiClientState?: Maybe<boolean>;
};

export type UpdateBetslipStateMutationVariables = Exact<{
  isVisible: Scalars["Boolean"];
}>;

export type UpdateBetslipStateMutation = {
  updateBetslipState?: Maybe<boolean>;
};

export type ShowSearchMutationVariables = Exact<{ [key: string]: never }>;

export type ShowSearchMutation = { showSearch?: Maybe<boolean> };

export type HideSearchMutationVariables = Exact<{ [key: string]: never }>;

export type HideSearchMutation = { hideSearch?: Maybe<boolean> };

export type ToggleFavouriteGroupMutationVariables = Exact<{
  id: Scalars["Int"];
}>;

export type ToggleFavouriteGroupMutation = {
  toggleFavouriteGroup: { id: number; userFavourite: boolean };
};

export type SetFavouritesMutationVariables = Exact<{
  ids: Array<Scalars["Int"]> | Scalars["Int"];
}>;

export type SetFavouritesMutation = {
  setFavouriteGroups: Array<{ id: number; userFavourite: boolean }>;
};

export type SetFavouriteCompetitionsMutationVariables = Exact<{
  groupId: Scalars["Int"];
  ids: Array<Scalars["Int"]> | Scalars["Int"];
}>;

export type SetFavouriteCompetitionsMutation = {
  setFavouriteCompetitions: Array<{ id: number; userFavourite: boolean }>;
};

export type SessionTouchMutationVariables = Exact<{ [key: string]: never }>;

export type SessionTouchMutation = { sessionTouch?: Maybe<boolean> };

export type LaunchKambiMutationVariables = Exact<{ [key: string]: never }>;

export type LaunchKambiMutation = {
  launchKambi?: Maybe<{
    clientBootstrapUrl: string;
    providerPlayerId?: Maybe<string>;
    ticket?: Maybe<string>;
  }>;
};

export type ActiveModalsQueryVariables = Exact<{ [key: string]: never }>;

export type ActiveModalsQuery = { activeModals: Array<Modal> };

export type BetslipVisibleQueryVariables = Exact<{ [key: string]: never }>;

export type BetslipVisibleQuery = { isBetslipVisible: boolean };

export type KambiClientVisibleQueryVariables = Exact<{ [key: string]: never }>;

export type KambiClientVisibleQuery = { kambiClientVisible: boolean };

export type SearchVisibleQueryVariables = Exact<{ [key: string]: never }>;

export type SearchVisibleQuery = { isSearchVisible: boolean };

export type SportsShellQueryVariables = Exact<{ [key: string]: never }>;

export type SportsShellQuery = {
  hasSelectedFavourites: boolean;
  isSearchVisible: boolean;
};

export type LaunchableKambiClientQueryVariables = Exact<{
  [key: string]: never;
}>;

export type LaunchableKambiClientQuery = {
  userHomepage?: Maybe<string>;
  kambiClientVisible: boolean;
  isBetslipVisible: boolean;
};

export type CurrentReelRaceInfoQueryVariables = Exact<{ [key: string]: never }>;

export type CurrentReelRaceInfoQuery = {
  reelRaces: Array<{
    id: string;
    startTime: number;
    endTime: number;
    optedIn: boolean;
    promoted: boolean;
    spinLimit: number;
    cometdChannels: Array<string>;
    formattedPrizes: Array<string>;
    game: {
      id: string;
      slug: string;
      name: string;
      logo: string;
      backgroundImage: string;
    };
    leaderboard: Array<{
      playerId: string;
      playerName: string;
      position: number;
      points: number;
      remainingSpins: number;
      boosters: {
        winsInARow: number;
        triples: number;
        wins: number;
        bigWins: number;
        megaWins: number;
      };
    }>;
  }>;
};
