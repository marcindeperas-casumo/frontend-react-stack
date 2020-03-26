// @flow
// ====================================================
// GraphQL query operation: componentBuilderQuery
// ====================================================
export type componentBuilderQuery = {
  /**
   * "getCMSFieldAsJSON" is only needed for the component builder until we add type-definitions for all the
   * component properties that are available to be used for the component builder.
   * Task: https://jira.casumocave.com/browse/PRCA-308
   */
  componentDefinitionJSON: string,
};
export type componentBuilderQueryVariables = {
  id: string,
};

// ====================================================
// GraphQL query operation: CuratedCardQuery
// ====================================================

export type CuratedCardQuery_curatedCard_game = {
  id: string,
  backgroundImage: string,
  logo: string,
  name: string,
  slug: string,
};
export type CuratedCardQuery_curatedCard = {
  id: string,
  slug: string,
  type: string,
  image: ?string,
  header: ?string,
  subtitle: ?string,
  promotionSlug: ?string,
  promotionLegalText: ?string,
  launchGameText: ?string,
  smallImage: ?string,
  mediumImage: ?string,
  largeImage: ?string,
  game: ?CuratedCardQuery_curatedCard_game,
};
export type CuratedCardQuery = {
  curatedCard: ?CuratedCardQuery_curatedCard,
};
export type CuratedCardQueryVariables = {
  slug: string,
};

// ====================================================
// GraphQL query operation: GameListQuery
// ====================================================

export type GameListQuery_gamesList_games = {
  isInMaintenance: boolean,
  backgroundImage: string,
  logo: string,
  name: string,
  slug: string,
  id: string,
  isInMyList: boolean,
};
export type GameListQuery_gamesList = {
  id: ?string,
  name: ?string,
  games: Array<GameListQuery_gamesList_games>,
};
export type GameListQuery = {
  gamesList: ?GameListQuery_gamesList,
};
export type GameListQueryVariables = {
  id: string,
  numberOfGames: number,
};

// ====================================================
// GraphQL query operation: GameListExclusiveQuery
// ====================================================

export type GameListExclusiveQuery_gamesList_games = {
  isInMaintenance: boolean,
  backgroundImage: string,
  logo: string,
  name: string,
  slug: string,
  id: string,
  isInMyList: boolean,
};
export type GameListExclusiveQuery_gamesList = {
  id: ?string,
  name: ?string,
  games: Array<GameListExclusiveQuery_gamesList_games>,
};
export type GameListExclusiveQuery = {
  gamesList: ?GameListExclusiveQuery_gamesList,
};
export type GameListExclusiveQueryVariables = {
  id: string,
  numberOfGames: number,
};

// ====================================================
// GraphQL query operation: GameListLiveCasinoQuery
// ====================================================

export type GameListLiveCasinoQuery_gamesList_games_liveCasinoLobby_bets = {
  symbol: ?string,
  min: ?number,
  max: ?number,
};
export type GameListLiveCasinoQuery_gamesList_games_liveCasinoLobby = {
  id: ?string,
  tableId: ?string,
  symbol: ?string,
  numberOfPlayers: ?number,
  seats: ?number,
  provider: ?string,
  results: Array<string>,
  image: ?string,
  type: ?string,
  betBehind: ?boolean,
  bets: ?GameListLiveCasinoQuery_gamesList_games_liveCasinoLobby_bets,
};
export type GameListLiveCasinoQuery_gamesList_games = {
  backgroundImage: string,
  id: string,
  isInMaintenance: boolean,
  isInMyList: boolean,
  liveCasinoLobby: ?GameListLiveCasinoQuery_gamesList_games_liveCasinoLobby,
  logo: string,
  name: string,
  slug: string,
};
export type GameListLiveCasinoQuery_gamesList = {
  id: ?string,
  name: ?string,
  games: Array<GameListLiveCasinoQuery_gamesList_games>,
};
export type GameListLiveCasinoQuery = {
  seeMoreText: string,
  playNowText: string,
  gamesList: ?GameListLiveCasinoQuery_gamesList,
};
export type GameListLiveCasinoQueryVariables = {
  id: string,
  numberOfGames: number,
};

// ====================================================
// GraphQL query operation: GameListVerticalQuery
// ====================================================

export type GameListVerticalQuery_gamesBySlugs_lobby_bets = {
  min: ?number,
  max: ?number,
  symbol: ?string,
};
export type GameListVerticalQuery_gamesBySlugs_lobby = {
  bets: ?GameListVerticalQuery_gamesBySlugs_lobby_bets,
};
export type GameListVerticalQuery_gamesBySlugs = {
  id: string,
  backgroundImage: string,
  logo: string,
  name: string,
  slug: string,
  lobby: ?GameListVerticalQuery_gamesBySlugs_lobby,
};
export type GameListVerticalQuery = {
  gamesBySlugs: Array<GameListVerticalQuery_gamesBySlugs>,
};
export type GameListVerticalQueryVariables = {
  slugs: Array<string>,
};

// ====================================================
// GraphQL query operation: GameStudiosQuery
// ====================================================

export type GameStudiosQuery_gameStudios = {
  id: string,
  url: string,
  background: string,
  logo: string,
  slug: string,
  name: string,
};
export type GameStudiosQuery = {
  gameStudios: Array<?GameStudiosQuery_gameStudios>,
};

// ====================================================
// GraphQL query operation: GameRowSessionDetailsQuery
// ====================================================

export type GameRowSessionDetailsQuery_gamesBySlugs_lobby_bets = {
  min: ?number,
  max: ?number,
  symbol: ?string,
};
export type GameRowSessionDetailsQuery_gamesBySlugs_lobby = {
  bets: ?GameRowSessionDetailsQuery_gamesBySlugs_lobby_bets,
};
export type GameRowSessionDetailsQuery_gamesBySlugs = {
  id: string,
  backgroundImage: string,
  logo: string,
  name: string,
  slug: string,
  lobby: ?GameRowSessionDetailsQuery_gamesBySlugs_lobby,
};
export type GameRowSessionDetailsQuery = {
  gamesBySlugs: Array<GameRowSessionDetailsQuery_gamesBySlugs>,
};
export type GameRowSessionDetailsQueryVariables = {
  slugs: Array<string>,
};

// ====================================================
// GraphQL query operation: GameSearchQuery
// ====================================================

export type GameSearchQuery_gamesSearch_results_lobby_bets = {
  min: ?number,
  max: ?number,
  symbol: ?string,
};
export type GameSearchQuery_gamesSearch_results_lobby = {
  bets: ?GameSearchQuery_gamesSearch_results_lobby_bets,
};
export type GameSearchQuery_gamesSearch_results = {
  id: string,
  backgroundImage: string,
  logo: string,
  name: string,
  slug: string,
  lobby: ?GameSearchQuery_gamesSearch_results_lobby,
};
export type GameSearchQuery_gamesSearch = {
  resultsCount: number,
  results: Array<?GameSearchQuery_gamesSearch_results>,
};
export type GameSearchQuery = {
  gamesSearch: GameSearchQuery_gamesSearch,
};
export type GameSearchQueryVariables = {
  query: string,
  page: number,
  pageSize: number,
};

// ====================================================
// GraphQL query operation: GameSearchCMSQuery
// ====================================================

export type GameSearchCMSQuery = {
  searchSuggestionText: string,
};

// ====================================================
// GraphQL query operation: GameSearchSuggestionsListContainerQuery
// ====================================================

export type GameSearchSuggestionsListContainerQuery_gamesList_games_lobby_bets = {
  min: ?number,
  max: ?number,
  symbol: ?string,
};
export type GameSearchSuggestionsListContainerQuery_gamesList_games_lobby = {
  bets: ?GameSearchSuggestionsListContainerQuery_gamesList_games_lobby_bets,
};
export type GameSearchSuggestionsListContainerQuery_gamesList_games = {
  id: string,
  backgroundImage: string,
  logo: string,
  name: string,
  slug: string,
  lobby: ?GameSearchSuggestionsListContainerQuery_gamesList_games_lobby,
};
export type GameSearchSuggestionsListContainerQuery_gamesList = {
  id: ?string,
  games: Array<GameSearchSuggestionsListContainerQuery_gamesList_games>,
};
export type GameSearchSuggestionsListContainerQuery = {
  title: string,
  gamesList: ?GameSearchSuggestionsListContainerQuery_gamesList,
};
export type GameSearchSuggestionsListContainerQueryVariables = {
  titleId: string,
  listId: string,
};

// ====================================================
// GraphQL query operation: GameTileInMaintenanceCmsQuery
// ====================================================

export type GameTileInMaintenanceCmsQuery = {
  temporaryUnavailableText: string,
};

// ====================================================
// GraphQL query operation: GameTileHeartQuery
// ====================================================

export type GameTileHeartQuery_gamesList_games = {
  id: string,
};
export type GameTileHeartQuery_gamesList = {
  id: ?string,
  games: Array<GameTileHeartQuery_gamesList_games>,
};
export type GameTileHeartQuery = {
  gamesList: ?GameTileHeartQuery_gamesList,
};
export type GameTileHeartQueryVariables = {
  listId: string,
  numberOfGames: number,
};

// ====================================================
// GraphQL mutation operation: AddGameToMyList
// ====================================================

export type AddGameToMyList_addGameToMyList = {
  id: string,
  isInMyList: boolean,
};
export type AddGameToMyList = {
  addGameToMyList: ?AddGameToMyList_addGameToMyList,
};
export type AddGameToMyListVariables = {
  id: string,
};

// ====================================================
// GraphQL mutation operation: RemoveGameFromMyList
// ====================================================

export type RemoveGameFromMyList_removeGameFromMyList = {
  id: string,
  isInMyList: boolean,
};
export type RemoveGameFromMyList = {
  removeGameFromMyList: ?RemoveGameFromMyList_removeGameFromMyList,
};
export type RemoveGameFromMyListVariables = {
  id: string,
};

// ====================================================
// GraphQL query operation: JackpotsQuery
// ====================================================

export type JackpotsQuery_gamesList_games_lobby_bets = {
  min: ?number,
  max: ?number,
  symbol: ?string,
};
export type JackpotsQuery_gamesList_games_lobby = {
  bets: ?JackpotsQuery_gamesList_games_lobby_bets,
};
export type JackpotsQuery_gamesList_games_jackpot_value = {
  amount: number,
  currency: Currency,
};
export type JackpotsQuery_gamesList_games_jackpot = {
  id: string,
  value: JackpotsQuery_gamesList_games_jackpot_value,
};
export type JackpotsQuery_gamesList_games = {
  id: string,
  backgroundImage: string,
  logo: string,
  name: string,
  slug: string,
  lobby: ?JackpotsQuery_gamesList_games_lobby,
  jackpot: ?JackpotsQuery_gamesList_games_jackpot,
};
export type JackpotsQuery_gamesList = {
  name: ?string,
  games: Array<JackpotsQuery_gamesList_games>,
};
export type JackpotsQuery = {
  gamesList: ?JackpotsQuery_gamesList,
};
export type JackpotsQueryVariables = {
  numberOfGames: number,
};

// ====================================================
// GraphQL query operation: LiveCasinoDetailPageQuery
// ====================================================

export type LiveCasinoDetailPageQuery_groupedLiveCasinoGames_games_lobby_bets = {
  min: ?number,
  max: ?number,
  symbol: ?string,
};
export type LiveCasinoDetailPageQuery_groupedLiveCasinoGames_games_lobby = {
  bets: ?LiveCasinoDetailPageQuery_groupedLiveCasinoGames_games_lobby_bets,
};
export type LiveCasinoDetailPageQuery_groupedLiveCasinoGames_games = {
  id: string,
  backgroundImage: string,
  logo: string,
  name: string,
  slug: string,
  lobby: ?LiveCasinoDetailPageQuery_groupedLiveCasinoGames_games_lobby,
};
export type LiveCasinoDetailPageQuery_groupedLiveCasinoGames = {
  title: string,
  games: Array<LiveCasinoDetailPageQuery_groupedLiveCasinoGames_games>,
};
export type LiveCasinoDetailPageQuery = {
  groupedLiveCasinoGames: Array<LiveCasinoDetailPageQuery_groupedLiveCasinoGames>,
};

// ====================================================
// GraphQL query operation: MustDropJackpotGamesListQuery
// ====================================================

export type MustDropJackpotGamesListQuery_gamesList_games_lobby_bets = {
  min: ?number,
  max: ?number,
  symbol: ?string,
};
export type MustDropJackpotGamesListQuery_gamesList_games_lobby = {
  bets: ?MustDropJackpotGamesListQuery_gamesList_games_lobby_bets,
};
export type MustDropJackpotGamesListQuery_gamesList_games = {
  id: string,
  backgroundImage: string,
  logo: string,
  name: string,
  slug: string,
  lobby: ?MustDropJackpotGamesListQuery_gamesList_games_lobby,
};
export type MustDropJackpotGamesListQuery_gamesList = {
  games: Array<MustDropJackpotGamesListQuery_gamesList_games>,
};
export type MustDropJackpotGamesListQuery = {
  gamesList: ?MustDropJackpotGamesListQuery_gamesList,
};
export type MustDropJackpotGamesListQueryVariables = {
  id: string,
};

// ====================================================
// GraphQL query operation: MustDropJackpotsGamesListQuery
// ====================================================

export type MustDropJackpotsGamesListQuery_gamesList_games_lobby_bets = {
  min: ?number,
  max: ?number,
  symbol: ?string,
};
export type MustDropJackpotsGamesListQuery_gamesList_games_lobby = {
  bets: ?MustDropJackpotsGamesListQuery_gamesList_games_lobby_bets,
};
export type MustDropJackpotsGamesListQuery_gamesList_games = {
  id: string,
  backgroundImage: string,
  logo: string,
  name: string,
  slug: string,
  lobby: ?MustDropJackpotsGamesListQuery_gamesList_games_lobby,
};
export type MustDropJackpotsGamesListQuery_gamesList = {
  name: ?string,
  games: Array<MustDropJackpotsGamesListQuery_gamesList_games>,
};
export type MustDropJackpotsGamesListQuery = {
  seeMoreText: string,
  gamesList: ?MustDropJackpotsGamesListQuery_gamesList,
};
export type MustDropJackpotsGamesListQueryVariables = {
  id: string,
  numberOfGames: number,
};

// ====================================================
// GraphQL query operation: MustDropJackpotsQuery
// ====================================================

export type MustDropJackpotsQuery_mustDropJackpots_amount = {
  formattedAmount: string,
};
export type MustDropJackpotsQuery_mustDropJackpots = {
  label: string,
  image: string,
  id: string,
  amount: MustDropJackpotsQuery_mustDropJackpots_amount,
};
export type MustDropJackpotsQuery = {
  mustDropJackpots: Array<MustDropJackpotsQuery_mustDropJackpots>,
};

// ====================================================
// GraphQL query operation: PlayerValuablesQuery
// ====================================================

export type PlayerValuablesQuery_player_valuables_PlayerValuableSpins_game = {
  slug: string,
};
export type PlayerValuablesQuery_player_valuables =
  | {
      __typename:
        | "PlayerValuableDeposit"
        | "PlayerValuableFreeBet"
        | "PlayerValuableSport",
      id: string,
      valuableState: PlayerValuableState,
      expiryDate: BigInt,
      valuableType: ValuableType,
      title: string,
      content: string,
      caveat: ?string,
      currency: Currency,
      market: string,
      backgroundImage: string,
      wageringThreshold: ?number,
      leftToWager: ?number,
    }
  | {
      __typename: "PlayerValuableSpins",
      id: string,
      valuableState: PlayerValuableState,
      expiryDate: BigInt,
      valuableType: ValuableType,
      title: string,
      content: string,
      caveat: ?string,
      currency: Currency,
      market: string,
      backgroundImage: string,
      wageringThreshold: ?number,
      leftToWager: ?number,
      description: string,
      coinValue: number,
      requirementType: ?RequirementType,
      game: ?PlayerValuablesQuery_player_valuables_PlayerValuableSpins_game,
    }
  | {
      __typename: "PlayerValuableCash",
      id: string,
      valuableState: PlayerValuableState,
      expiryDate: BigInt,
      valuableType: ValuableType,
      title: string,
      content: string,
      caveat: ?string,
      currency: Currency,
      market: string,
      backgroundImage: string,
      wageringThreshold: ?number,
      leftToWager: ?number,
      requirementType: ?RequirementType,
    };
export type PlayerValuablesQuery_player = {
  valuables: Array<PlayerValuablesQuery_player_valuables>,
};
export type PlayerValuablesQuery = {
  listTitleLabel: string,
  availableListTitleLabel: string,
  lockedListTitleLabel: string,
  hoursLabel: string,
  minutesLabel: string,
  seeAllLabel: string,
  noValuablesLabel: string,
  dontUseValuableLabel: string,
  player: PlayerValuablesQuery_player,
};
export type PlayerValuablesQueryVariables = {
  valuableType?: ?ValuableType,
};

// ====================================================
// GraphQL mutation operation: UseValuable
// ====================================================

export type UseValuable = {
  useValuable: ?boolean,
};
export type UseValuableVariables = {
  id: string,
  source?: ?string,
};

// ====================================================
// GraphQL query operation: PromotionsListQuery
// ====================================================

export type PromotionsListQuery_promotionsList_promotions = {
  id: string,
  slug: string,
  title: string,
  subtitle: string,
  image: string,
  badge: ?string,
};
export type PromotionsListQuery_promotionsList = {
  id: string,
  name: string,
  promotions: Array<PromotionsListQuery_promotionsList_promotions>,
};
export type PromotionsListQuery = {
  seeMoreText: string,
  promotionsList: ?PromotionsListQuery_promotionsList,
};
export type PromotionsListQueryVariables = {
  slug: string,
};

// ====================================================
// GraphQL query operation: GameStudioQuery
// ====================================================

export type GameStudioQuery_gameStudio_games_lobby_bets = {
  min: ?number,
  max: ?number,
  symbol: ?string,
};
export type GameStudioQuery_gameStudio_games_lobby = {
  bets: ?GameStudioQuery_gameStudio_games_lobby_bets,
};
export type GameStudioQuery_gameStudio_games = {
  id: string,
  backgroundImage: string,
  logo: string,
  name: string,
  slug: string,
  lobby: ?GameStudioQuery_gameStudio_games_lobby,
};
export type GameStudioQuery_gameStudio = {
  id: string,
  gamesCount: number,
  games: Array<?GameStudioQuery_gameStudio_games>,
};
export type GameStudioQuery = {
  gameStudio: ?GameStudioQuery_gameStudio,
};
export type GameStudioQueryVariables = {
  slug: string,
  page: number,
  pageSize: number,
};

// ====================================================
// GraphQL mutation operation: OptInForReelRace
// ====================================================

export type OptInForReelRace_optInForReelRace = {
  id: string,
  optedIn: boolean,
};
export type OptInForReelRace = {
  optInForReelRace: ?OptInForReelRace_optInForReelRace,
};
export type OptInForReelRaceVariables = {
  id: string,
};

// ====================================================
// GraphQL query operation: ReelRaceCardQuery
// ====================================================

export type ReelRaceCardQuery_session = {
  locale: string,
};
export type ReelRaceCardQuery = {
  session: ReelRaceCardQuery_session,
};

// ====================================================
// GraphQL query operation: ReelRaceListQuery
// ====================================================

export type ReelRaceListQuery_reelRaces_game = {
  id: string,
  name: string,
  logo: string,
  backgroundImage: string,
  slug: string,
};
export type ReelRaceListQuery_reelRaces_translations = {
  optedInCtaSingleGameShort: string,
  optIn: string,
  optedIn: string,
  endingIn: string,
  startingIn: string,
  competeFor: string,
  spins: string,
  duration: string,
  durationTemplate: string,
  minBet: string,
  caveatShort: string,
};
export type ReelRaceListQuery_reelRaces = {
  id: string,
  game: ReelRaceListQuery_reelRaces_game,
  startTime: BigInt,
  optedIn: boolean,
  endTime: BigInt,
  status: ?string,
  spinLimit: number,
  minBet: ?string,
  promoted: boolean,
  formattedPrize: string,
  remainingSpins: number,
  translations: ReelRaceListQuery_reelRaces_translations,
};
export type ReelRaceListQuery = {
  title: string,
  seeMore: string,
  reelRaces: Array<ReelRaceListQuery_reelRaces>,
};
export type ReelRaceListQueryVariables = {
  limit: number,
};

// ====================================================
// GraphQL query operation: ReelRaceWidgetQuery
// ====================================================

export type ReelRaceWidgetQuery_reelRaces_game = {
  slug: string,
  name: string,
  logo: string,
  backgroundImage: string,
};
export type ReelRaceWidgetQuery_reelRaces_leaderboard_boosters = {
  winsInARow: number,
  triples: number,
  wins: number,
  bigWins: number,
  megaWins: number,
};
export type ReelRaceWidgetQuery_reelRaces_leaderboard = {
  playerId: string,
  playerName: string,
  position: number,
  points: number,
  remainingSpins: number,
  boosters: ReelRaceWidgetQuery_reelRaces_leaderboard_boosters,
};
export type ReelRaceWidgetQuery_reelRaces = {
  id: string,
  game: ReelRaceWidgetQuery_reelRaces_game,
  startTime: BigInt,
  endTime: BigInt,
  optedIn: boolean,
  promoted: boolean,
  spinLimit: number,
  formattedPrize: string,
  cometdChannels: Array<string>,
  leaderboard: Array<ReelRaceWidgetQuery_reelRaces_leaderboard>,
};
export type ReelRaceWidgetQuery = {
  reelRaces: Array<ReelRaceWidgetQuery_reelRaces>,
};

// ====================================================
// GraphQL query operation: LastGamePlayed
// ====================================================

export type LastGamePlayed_gamesList_games = {
  slug: string,
};
export type LastGamePlayed_gamesList = {
  games: Array<LastGamePlayed_gamesList_games>,
};
export type LastGamePlayed = {
  gamesList: ?LastGamePlayed_gamesList,
};

// ====================================================
// GraphQL query operation: SearchNotFoundWithGameSuggestionsContainerQuery
// ====================================================

export type SearchNotFoundWithGameSuggestionsContainerQuery = {
  image: string,
  title: string,
  contentLatest: string,
  contentPopular: string,
};

// ====================================================
// GraphQL query operation: PLAYER_SETTINGS_LABELS_QUERY
// ====================================================

export type PLAYER_SETTINGS_LABELS_QUERY = {
  name: string,
  email: string,
  password: string,
  mobileNumber: string,
  address: string,
  edit: string,
  verify: string,
  gamblingExtent: string,
};

// ====================================================
// GraphQL query operation: PLAYER_SETTINGS_QUERY
// ====================================================

export type PLAYER_SETTINGS_QUERY_player_details_name = {
  __typename: "PlayerName",
  first: string,
  last: string,
};
export type PLAYER_SETTINGS_QUERY_player_details_extentOfGambling = {
  __typename: "PlayerExtentOfGambling",
  canChange: boolean,
  label: ?string,
};
export type PLAYER_SETTINGS_QUERY_player_details_phoneNumber = {
  __typename: "PhoneNumber",
  prefix: string,
  number: string,
  verified: boolean,
};
export type PLAYER_SETTINGS_QUERY_player_details_address_country = {
  __typename: "Country",
  code: string,
  name: string,
};
export type PLAYER_SETTINGS_QUERY_player_details_address = {
  __typename: "PlayerAddress",
  city: string,
  street: string,
  postCode: string,
  country: PLAYER_SETTINGS_QUERY_player_details_address_country,
};
export type PLAYER_SETTINGS_QUERY_player_details = {
  __typename: "PlayerDetails",
  name: PLAYER_SETTINGS_QUERY_player_details_name,
  canChangePassword: boolean,
  extentOfGambling: PLAYER_SETTINGS_QUERY_player_details_extentOfGambling,
  phoneNumber: PLAYER_SETTINGS_QUERY_player_details_phoneNumber,
  address: PLAYER_SETTINGS_QUERY_player_details_address,
  email: string,
};
export type PLAYER_SETTINGS_QUERY_player = {
  id: string,
  __typename: "Player",
  details: PLAYER_SETTINGS_QUERY_player_details,
};
export type PLAYER_SETTINGS_QUERY = {
  player: PLAYER_SETTINGS_QUERY_player,
};

// ====================================================
// GraphQL mutation operation: SetAdventurerPublicity
// ====================================================

export type SetAdventurerPublicity = {
  setAdventurerPublicity: ?boolean,
};
export type SetAdventurerPublicityVariables = {
  input?: ?ContactSettingsInput,
};

// ====================================================
// GraphQL mutation operation: SetWithdrawalNotifications
// ====================================================

export type SetWithdrawalNotifications = {
  setWithdrawalNotifications: ?boolean,
};
export type SetWithdrawalNotificationsVariables = {
  input?: ?ContactSettingsInput,
};

// ====================================================
// GraphQL mutation operation: SetNewsletterSubscription
// ====================================================

export type SetNewsletterSubscription = {
  setNewsletterSubscription: ?boolean,
};
export type SetNewsletterSubscriptionVariables = {
  input?: ?ContactSettingsInput,
};

// ====================================================
// GraphQL mutation operation: SetSMSNewsletterSubscription
// ====================================================

export type SetSMSNewsletterSubscription = {
  setSMSNewsletterSubscription: ?boolean,
};
export type SetSMSNewsletterSubscriptionVariables = {
  input?: ?ContactSettingsInput,
};

// ====================================================
// GraphQL mutation operation: SetContactByPhone
// ====================================================

export type SetContactByPhone = {
  setContactByPhone: ?boolean,
};
export type SetContactByPhoneVariables = {
  input?: ?ContactSettingsInput,
};

// ====================================================
// GraphQL mutation operation: SetContactByPost
// ====================================================

export type SetContactByPost = {
  setContactByPost: ?boolean,
};
export type SetContactByPostVariables = {
  input?: ?ContactSettingsInput,
};

// ====================================================
// GraphQL query operation: PLAYER_CONTACT_SETTINGS_QUERY
// ====================================================

export type PLAYER_CONTACT_SETTINGS_QUERY_player_details_contactSettings = {
  withdrawalNotifications: boolean,
  adventurerPublic: boolean,
  subscribedToNewsletters: boolean,
  subscribedToSMSNewsletters: boolean,
  contactByPhone: boolean,
  contactByPost: boolean,
};
export type PLAYER_CONTACT_SETTINGS_QUERY_player_details = {
  contactSettings: PLAYER_CONTACT_SETTINGS_QUERY_player_details_contactSettings,
};
export type PLAYER_CONTACT_SETTINGS_QUERY_player_playOk_realityCheck = {
  __typename: "PlayerRealityCheckSettings",
  canChangeInterval: boolean,
  isZeroIntervalAllowed: boolean,
  intervalInMinutes: number,
};
export type PLAYER_CONTACT_SETTINGS_QUERY_player_playOk = {
  __typename: "PlayerPlayOkSettings",
  realityCheck: PLAYER_CONTACT_SETTINGS_QUERY_player_playOk_realityCheck,
};
export type PLAYER_CONTACT_SETTINGS_QUERY_player = {
  id: string,
  __typename: "Player",
  details: PLAYER_CONTACT_SETTINGS_QUERY_player_details,
  playOk: PLAYER_CONTACT_SETTINGS_QUERY_player_playOk,
};
export type PLAYER_CONTACT_SETTINGS_QUERY = {
  player: PLAYER_CONTACT_SETTINGS_QUERY_player,
};

// ====================================================
// GraphQL query operation: NOTIFICATIONS_LABELS_QUERY
// ====================================================

export type NOTIFICATIONS_LABELS_QUERY = {
  subscriptionsTitle: string,
  subscriptionsDescription: string,
  subscriptionsEmailLabel: string,
  subscriptionsSMSLabel: string,
  subscriptionsPhoneLabel: string,
  subscriptionsPostLabel: string,
  notificationsApprovedWithdrawalsEmailLabel: string,
  notificationsInGameSessionUpdatesLabel: string,
  inGameSessionUpdatesOffLabel: string,
  inGameSessionUpdatesFrequencyLabel: string,
};

// ====================================================
// GraphQL mutation operation: UpdateRealityCheckInterval
// ====================================================

export type UpdateRealityCheckInterval = {
  updateRealityCheckInterval: ?number,
};
export type UpdateRealityCheckIntervalVariables = {
  input?: ?UpdateRealityCheckIntervalInput,
};

// ====================================================
// GraphQL query operation: REALITY_CHECK_LABELS_QUERY
// ====================================================

export type REALITY_CHECK_LABELS_QUERY = {
  inGameSessionUpdatesLabel: string,
  inGameSessionUpdatesFrequencyLabel: string,
  save: string,
  cancel: string,
};

// ====================================================
// GraphQL query operation: PLAYER_REALITY_CHECK_QUERY
// ====================================================

export type PLAYER_REALITY_CHECK_QUERY_player_playOk_realityCheck = {
  __typename: "PlayerRealityCheckSettings",
  canChangeInterval: boolean,
  isZeroIntervalAllowed: boolean,
  intervalInMinutes: number,
};
export type PLAYER_REALITY_CHECK_QUERY_player_playOk = {
  __typename: "PlayerPlayOkSettings",
  realityCheck: PLAYER_REALITY_CHECK_QUERY_player_playOk_realityCheck,
};
export type PLAYER_REALITY_CHECK_QUERY_player = {
  id: string,
  __typename: "Player",
  playOk: PLAYER_REALITY_CHECK_QUERY_player_playOk,
};
export type PLAYER_REALITY_CHECK_QUERY = {
  player: PLAYER_REALITY_CHECK_QUERY_player,
};

// ====================================================
// GraphQL query operation: PLAYER_LOGIN_HISTORY_QUERY
// ====================================================

export type PLAYER_LOGIN_HISTORY_QUERY_player_loginHistory = {
  loginTime: Long,
};
export type PLAYER_LOGIN_HISTORY_QUERY_player = {
  id: string,
  loginHistory: Array<PLAYER_LOGIN_HISTORY_QUERY_player_loginHistory>,
};
export type PLAYER_LOGIN_HISTORY_QUERY = {
  player: PLAYER_LOGIN_HISTORY_QUERY_player,
};

// ====================================================
// GraphQL query operation: PLAYER_SECTIONS_LABELS_QUERY
// ====================================================

export type PLAYER_SECTIONS_LABELS_QUERY = {
  accountDetailsTitle: string,
  accountDetailsDescription: string,
  notificationsTitle: string,
  notificationsDescription: string,
  currentSessionMessage: string,
  lastSessionMessage: string,
  accountActivity: string,
  logout: string,
};

// ====================================================
// GraphQL query operation: ValuableDetailsQuery
// ====================================================

export type ValuableDetailsQuery = {
  termsAndConditionLabel: string,
  cashUnlockedActionLabel: string,
  spinsUnlockedActionLabel: string,
  playToUnlockLabel: string,
  depositToUnlockLabel: string,
  depositNowLabel: string,
  expirationTimeLabel: string,
  termsAndConditionsContent: string,
  wageringStatus: string,
  minute_singular: string,
  minute_plural: string,
  hour_singular: string,
  hour_plural: string,
  day_singular: string,
  day_plural: string,
};

// ====================================================
// GraphQL query operation: GlossaryQuery
// ====================================================

export type GlossaryQuery_glossary = {
  id: string,
  term: string,
  aka: ?string,
  definition: string,
};
export type GlossaryQuery = {
  glossary: Array<GlossaryQuery_glossary>,
};

// ====================================================
// GraphQL query operation: CmsImageQuery
// ====================================================

export type CmsImageQuery = {
  sportsCmsImage: ?string,
};
export type CmsImageQueryVariables = {
  key: string,
};

// ====================================================
// GraphQL query operation: DictionaryTermQuery
// ====================================================

export type DictionaryTermQuery = {
  dictionaryTerm: string,
};
export type DictionaryTermQueryVariables = {
  key: string,
};

// ====================================================
// GraphQL query operation: PluralisableDictionaryTermQuery
// ====================================================

export type PluralisableDictionaryTermQuery = {
  singularTerm: string,
  pluralTerm: string,
};
export type PluralisableDictionaryTermQueryVariables = {
  singularKey: string,
  pluralKey: string,
};

// ====================================================
// GraphQL query operation: EditFavouriteCompetitions
// ====================================================

export type EditFavouriteCompetitions_favouriteCompetitions = {
  /**
   * Unique identifier of the event group
   */
  id: number,
};
export type EditFavouriteCompetitions = {
  favouriteCompetitions: Array<EditFavouriteCompetitions_favouriteCompetitions>,
};
export type EditFavouriteCompetitionsVariables = {
  groupId: number,
};

// ====================================================
// GraphQL query operation: FavouriteCompetitionsSelectorQuery
// ====================================================

export type FavouriteCompetitionsSelectorQuery_group_groups_groups = {
  /**
   * Unique identifier of the event group
   */
  id: number,

  /**
   * Whether this is one of the users, selected favourites
   */
  userFavourite: boolean,

  /**
   * Name of the event group, localized according to the lang parameter
   */
  name: string,

  /**
   * The region code for the group, iso3166 code for most with some custom regions
   */
  regionCode: ?string,

  /**
   * Popular defines whether we consider the EventGroup to be popular
   */
  popular: boolean,
};
export type FavouriteCompetitionsSelectorQuery_group_groups = {
  /**
   * Unique identifier of the event group
   */
  id: number,

  /**
   * Popular defines whether we consider the EventGroup to be popular
   */
  popular: boolean,

  /**
   * Name of the event group, localized according to the lang parameter
   */
  name: string,

  /**
   * The region code for the group, iso3166 code for most with some custom regions
   */
  regionCode: ?string,

  /**
   * Array of subgroups in this event group
   */
  groups: ?Array<FavouriteCompetitionsSelectorQuery_group_groups_groups>,
};
export type FavouriteCompetitionsSelectorQuery_group = {
  /**
   * Name of the event group, localized according to the lang parameter
   */
  name: string,

  /**
   * Array of subgroups in this event group
   */
  groups: ?Array<FavouriteCompetitionsSelectorQuery_group_groups>,
};
export type FavouriteCompetitionsSelectorQuery = {
  /**
   * Get list of sub-groups from a given group"
   */
  group: FavouriteCompetitionsSelectorQuery_group,
  internationalGroupName: string,
};
export type FavouriteCompetitionsSelectorQueryVariables = {
  groupId: number,
};

// ====================================================
// GraphQL query operation: FavouriteSportsSelectorContextCompetitionSuggestions
// ====================================================

export type FavouriteSportsSelectorContextCompetitionSuggestions_topCompetitions = {
  /**
   * Unique identifier of the event group
   */
  id: number,

  /**
   * The region code for the group, iso3166 code for most with some custom regions
   */
  regionCode: ?string,

  /**
   * Name of the event group, localized according to the lang parameter
   */
  name: string,
};
export type FavouriteSportsSelectorContextCompetitionSuggestions = {
  /**
   * TopCompetitions returns the most popular subgroups of a group, currently based on number of events
   */
  topCompetitions: Array<FavouriteSportsSelectorContextCompetitionSuggestions_topCompetitions>,
};
export type FavouriteSportsSelectorContextCompetitionSuggestionsVariables = {
  id: number,
};

// ====================================================
// GraphQL query operation: FavouriteSportsSelectorContext
// ====================================================

export type FavouriteSportsSelectorContext_groups_favouriteCompetitions = {
  /**
   * Unique identifier of the event group
   */
  id: number,

  /**
   * Whether this is one of the users, selected favourites
   */
  userFavourite: boolean,

  /**
   * Name of the event group, localized according to the lang parameter
   */
  name: string,

  /**
   * The region code for the group, iso3166 code for most with some custom regions
   */
  regionCode: ?string,
};
export type FavouriteSportsSelectorContext_groups = {
  /**
   * Unique identifier of the event group
   */
  id: number,

  /**
   * Whether this is one of the users, selected favourites
   */
  userFavourite: boolean,

  /**
   * Whether to allow a custom selection of subgroups to be shown as sub-nav items
   * instead of just popular ones
   */
  canSelectSubgroups: boolean,

  /**
   * Name of the event group, localized according to the lang parameter
   */
  name: string,

  /**
   * Popular defines whether we consider the EventGroup to be popular
   */
  popular: boolean,

  /**
   * The icon for the sport group
   */
  icon: ?string,

  /**
   * The active indicator for the sport group, used on the nav
   */
  activeIndicator: ?string,

  /**
   * The favourited competitions for this EventGroup
   */
  favouriteCompetitions: Array<FavouriteSportsSelectorContext_groups_favouriteCompetitions>,
};
export type FavouriteSportsSelectorContext = {
  /**
   * Get list of available event groups from the root level
   */
  groups: Array<FavouriteSportsSelectorContext_groups>,
};

// ====================================================
// GraphQL query operation: PlayerVertical
// ====================================================

export type PlayerVertical_player = {
  vertical: Vertical,
};
export type PlayerVertical = {
  player: PlayerVertical_player,
};

// ====================================================
// GraphQL query operation: FREEBET_QUERY
// ====================================================

export type FREEBET_QUERY_player_valuables = {
  id: string,
  backgroundImage: string,
  currency: Currency,
  expiryDate: BigInt,
  created: BigInt,
  market: string,
  valuableState: PlayerValuableState,
  valuableType: ValuableType,
  title: string,
  content: string,
  caveat: ?string,
};
export type FREEBET_QUERY_player = {
  valuables: Array<FREEBET_QUERY_player_valuables>,
};
export type FREEBET_QUERY = {
  player: FREEBET_QUERY_player,
};

// ====================================================
// GraphQL query operation: LaunchableKambiClientQuery
// ====================================================

export type LaunchableKambiClientQuery = {
  userHomepage: ?string,
  kambiClientVisible: boolean,
  isBetslipVisible: boolean,
};

// ====================================================
// GraphQL query operation: UserNavigation
// ====================================================

export type UserNavigation_sportsNavigation_sport = {
  /**
   * Name of the event group, localized according to the lang parameter
   */
  name: string,

  /**
   * Unique identifier of the event group
   */
  id: number,

  /**
   * The full path in the kambi client to navigate to this group
   */
  clientPath: string,

  /**
   * The full path in the kambi client to navigate to the in-play bets for this group
   */
  clientPathLive: string,

  /**
   * Normalized name of the group
   */
  termKey: string,

  /**
   * The icon for the sport group
   */
  icon: ?string,

  /**
   * The active indicator for the sport group, used on the nav
   */
  activeIndicator: ?string,

  /**
   * Whether to allow a custom selection of subgroups to be shown as sub-nav items
   * instead of just popular ones
   */
  canSelectSubgroups: boolean,
};
export type UserNavigation_sportsNavigation_subNav_competition = {
  /**
   * Name of the event group, localized according to the lang parameter
   */
  name: string,

  /**
   * Unique identifier of the event group
   */
  id: number,

  /**
   * The full path in the kambi client to navigate to this group
   */
  clientPath: string,

  /**
   * The full path in the kambi client to navigate to the in-play bets for this group
   */
  clientPathLive: string,

  /**
   * Normalized name of the group
   */
  termKey: string,

  /**
   * The region code for the group, iso3166 code for most with some custom regions
   */
  regionCode: ?string,
};
export type UserNavigation_sportsNavigation_subNav = {
  competition: UserNavigation_sportsNavigation_subNav_competition,
};
export type UserNavigation_sportsNavigation = {
  sport: UserNavigation_sportsNavigation_sport,
  subNav: Array<UserNavigation_sportsNavigation_subNav>,
};
export type UserNavigation = {
  allLabel: string,
  editLabel: string,
  liveLabel: string,
  sportsNavigation: Array<UserNavigation_sportsNavigation>,
};
export type UserNavigationVariables = {
  live: boolean,
};

// ====================================================
// GraphQL query operation: TopSearches
// ====================================================

export type TopSearches_topSearches_parentGroups = {
  /**
   * The icon for the sport group
   */
  icon: ?string,

  /**
   * Name of the event group, localized according to the lang parameter
   */
  name: string,
};
export type TopSearches_topSearches = {
  /**
   * Normalized name of the group
   */
  termKey: string,

  /**
   * Name of the event group, localized according to the lang parameter
   */
  name: string,

  /**
   * The full path in the kambi client to navigate to this group
   */
  clientPath: string,

  /**
   * The icon for the sport group
   */
  icon: ?string,

  /**
   * Array of parents of this group in order, be careful with nesting!
   */
  parentGroups: Array<TopSearches_topSearches_parentGroups>,
};
export type TopSearches = {
  /**
   * Top searches returns the event groups for the groupIds marked as popular
   */
  topSearches: Array<TopSearches_topSearches>,
};
export type TopSearchesVariables = {
  count: number,
};

// ====================================================
// GraphQL query operation: SearchQuery
// ====================================================

export type SearchQuery_search_sport = {
  /**
   * The icon for the sport group
   */
  icon: ?string,

  /**
   * Name of the event group, localized according to the lang parameter
   */
  name: string,
};
export type SearchQuery_search = {
  /**
   * The type of search result, N.B Not overly reliable"
   */
  type: SearchResultType,

  /**
   * ListView resource context (route key) for displaying search item (e.g. /football/all/all/liverpool)"
   */
  id: string,

  /**
   * Translated name of the search result
   */
  localizedName: string,

  /**
   * The country this search result is associated
   */
  country: ?string,

  /**
   * The sport that this search result is associated to is nullable as relies on
   * finding by Kambi controlled data.
   */
  sport: ?SearchQuery_search_sport,
};
export type SearchQuery = {
  /**
   * Search for events matching a given query, non english lang will search english results too"
   */
  search: Array<SearchQuery_search>,
};
export type SearchQueryVariables = {
  query: string,
};

// ====================================================
// GraphQL query operation: SportsShellQuery
// ====================================================

export type SportsShellQuery = {
  hasSelectedFavourites: boolean,
  isSearchVisible: boolean,
};

// ====================================================
// GraphQL mutation operation: NavigateClient
// ====================================================

export type NavigateClient = {
  navigateClient: ?boolean,
};
export type NavigateClientVariables = {
  path: string,
  trackingLocation: string,
};

// ====================================================
// GraphQL mutation operation: OpenModal
// ====================================================

export type OpenModal = {
  openModal: ?boolean,
};
export type OpenModalVariables = {
  modal: Modal,
};

// ====================================================
// GraphQL mutation operation: CloseModal
// ====================================================

export type CloseModal = {
  closeModal: ?boolean,
};
export type CloseModalVariables = {
  modal: Modal,
};

// ====================================================
// GraphQL mutation operation: CloseAllModals
// ====================================================

export type CloseAllModals = {
  closeAllModals: ?boolean,
};

// ====================================================
// GraphQL mutation operation: UpdateKambiClientState
// ====================================================

export type UpdateKambiClientState = {
  updateKambiClientState: ?boolean,
};
export type UpdateKambiClientStateVariables = {
  isVisible: boolean,
};

// ====================================================
// GraphQL mutation operation: UpdateBetslipState
// ====================================================

export type UpdateBetslipState = {
  updateBetslipState: ?boolean,
};
export type UpdateBetslipStateVariables = {
  isVisible: boolean,
};

// ====================================================
// GraphQL mutation operation: ShowSearch
// ====================================================

export type ShowSearch = {
  showSearch: ?boolean,
};

// ====================================================
// GraphQL mutation operation: HideSearch
// ====================================================

export type HideSearch = {
  hideSearch: ?boolean,
};

// ====================================================
// GraphQL mutation operation: ToggleFavouriteGroup
// ====================================================

export type ToggleFavouriteGroup_toggleFavouriteGroup = {
  /**
   * Unique identifier of the event group
   */
  id: number,

  /**
   * Whether this is one of the users, selected favourites
   */
  userFavourite: boolean,
};
export type ToggleFavouriteGroup = {
  toggleFavouriteGroup: ToggleFavouriteGroup_toggleFavouriteGroup,
};
export type ToggleFavouriteGroupVariables = {
  id: number,
};

// ====================================================
// GraphQL mutation operation: SetFavourites
// ====================================================

export type SetFavourites_setFavouriteGroups = {
  /**
   * Unique identifier of the event group
   */
  id: number,

  /**
   * Whether this is one of the users, selected favourites
   */
  userFavourite: boolean,
};
export type SetFavourites = {
  setFavouriteGroups: Array<SetFavourites_setFavouriteGroups>,
};
export type SetFavouritesVariables = {
  ids: Array<number>,
};

// ====================================================
// GraphQL mutation operation: SetFavouriteCompetitions
// ====================================================

export type SetFavouriteCompetitions_setFavouriteCompetitions = {
  /**
   * Unique identifier of the event group
   */
  id: number,

  /**
   * Whether this is one of the users, selected favourites
   */
  userFavourite: boolean,
};
export type SetFavouriteCompetitions = {
  setFavouriteCompetitions: Array<SetFavouriteCompetitions_setFavouriteCompetitions>,
};
export type SetFavouriteCompetitionsVariables = {
  groupId: number,
  ids: Array<number>,
};

// ====================================================
// GraphQL mutation operation: SessionTouch
// ====================================================

export type SessionTouch = {
  /**
   * Pings the current session to keep it alive, requires the session cookie to be present in the headers
   */
  sessionTouch: ?boolean,
};

// ====================================================
// GraphQL mutation operation: LaunchKambi
// ====================================================

export type LaunchKambi_launchKambi = {
  clientBootstrapUrl: string,
  providerPlayerId: ?string,
  ticket: ?string,
};
export type LaunchKambi = {
  launchKambi: ?LaunchKambi_launchKambi,
};

// ====================================================
// GraphQL mutation operation: LaunchKambiLoS
// ====================================================

export type LaunchKambiLoS_launchKambi = {
  clientBootstrapUrl: string,
};
export type LaunchKambiLoS = {
  launchKambi: ?LaunchKambiLoS_launchKambi,
};
export type LaunchKambiLoSVariables = {
  playForFun: boolean,
};

// ====================================================
// GraphQL query operation: ActiveModals
// ====================================================

export type ActiveModals = {
  activeModals: Array<Modal>,
};

// ====================================================
// GraphQL query operation: BetslipVisible
// ====================================================

export type BetslipVisible = {
  isBetslipVisible: boolean,
};

// ====================================================
// GraphQL query operation: KambiClientVisible
// ====================================================

export type KambiClientVisible = {
  kambiClientVisible: boolean,
};

// ====================================================
// GraphQL query operation: SearchVisible
// ====================================================

export type SearchVisible = {
  isSearchVisible: boolean,
};

// ====================================================
// GraphQL fragment: CuratedCard_Game
// ====================================================

export type CuratedCard_Game = {
  id: string,
  backgroundImage: string,
  logo: string,
  name: string,
  slug: string,
};

// ====================================================
// GraphQL fragment: GameRow_Game
// ====================================================

export type GameRow_Game_lobby_bets = {
  min: ?number,
  max: ?number,
  symbol: ?string,
};
export type GameRow_Game_lobby = {
  bets: ?GameRow_Game_lobby_bets,
};
export type GameRow_Game = {
  id: string,
  backgroundImage: string,
  logo: string,
  name: string,
  slug: string,
  lobby: ?GameRow_Game_lobby,
};

// ====================================================
// GraphQL fragment: GameSearch_Game
// ====================================================

export type GameSearch_Game_lobby_bets = {
  min: ?number,
  max: ?number,
  symbol: ?string,
};
export type GameSearch_Game_lobby = {
  bets: ?GameSearch_Game_lobby_bets,
};
export type GameSearch_Game = {
  id: string,
  backgroundImage: string,
  logo: string,
  name: string,
  slug: string,
  lobby: ?GameSearch_Game_lobby,
};

// ====================================================
// GraphQL fragment: GameSearchSuggestionsList_Game
// ====================================================

export type GameSearchSuggestionsList_Game_lobby_bets = {
  min: ?number,
  max: ?number,
  symbol: ?string,
};
export type GameSearchSuggestionsList_Game_lobby = {
  bets: ?GameSearchSuggestionsList_Game_lobby_bets,
};
export type GameSearchSuggestionsList_Game = {
  id: string,
  backgroundImage: string,
  logo: string,
  name: string,
  slug: string,
  lobby: ?GameSearchSuggestionsList_Game_lobby,
};

// ====================================================
// GraphQL fragment: GameTile_Game
// ====================================================

export type GameTile_Game = {
  isInMaintenance: boolean,
  backgroundImage: string,
  logo: string,
  name: string,
  slug: string,
  id: string,
  isInMyList: boolean,
};

// ====================================================
// GraphQL fragment: GameTileInMaintenance_Game
// ====================================================

export type GameTileInMaintenance_Game = {
  backgroundImage: string,
  logo: string,
  name: string,
};

// ====================================================
// GraphQL fragment: Jackpots_Game
// ====================================================

export type Jackpots_Game_lobby_bets = {
  min: ?number,
  max: ?number,
  symbol: ?string,
};
export type Jackpots_Game_lobby = {
  bets: ?Jackpots_Game_lobby_bets,
};
export type Jackpots_Game_jackpot_value = {
  amount: number,
  currency: Currency,
};
export type Jackpots_Game_jackpot = {
  id: string,
  value: Jackpots_Game_jackpot_value,
};
export type Jackpots_Game = {
  id: string,
  backgroundImage: string,
  logo: string,
  name: string,
  slug: string,
  lobby: ?Jackpots_Game_lobby,
  jackpot: ?Jackpots_Game_jackpot,
};

// ====================================================
// GraphQL fragment: LiveCasinoCard_Lobby_Bets
// ====================================================

export type LiveCasinoCard_Lobby_Bets = {
  symbol: ?string,
  min: ?number,
  max: ?number,
};

// ====================================================
// GraphQL fragment: LiveCasinoCard_Lobby
// ====================================================

export type LiveCasinoCard_Lobby_bets = {
  symbol: ?string,
  min: ?number,
  max: ?number,
};
export type LiveCasinoCard_Lobby = {
  id: ?string,
  tableId: ?string,
  symbol: ?string,
  numberOfPlayers: ?number,
  seats: ?number,
  provider: ?string,
  results: Array<string>,
  image: ?string,
  type: ?string,
  betBehind: ?boolean,
  bets: ?LiveCasinoCard_Lobby_bets,
};

// ====================================================
// GraphQL fragment: LiveCasinoCard
// ====================================================

export type LiveCasinoCard_liveCasinoLobby_bets = {
  symbol: ?string,
  min: ?number,
  max: ?number,
};
export type LiveCasinoCard_liveCasinoLobby = {
  id: ?string,
  tableId: ?string,
  symbol: ?string,
  numberOfPlayers: ?number,
  seats: ?number,
  provider: ?string,
  results: Array<string>,
  image: ?string,
  type: ?string,
  betBehind: ?boolean,
  bets: ?LiveCasinoCard_liveCasinoLobby_bets,
};
export type LiveCasinoCard = {
  backgroundImage: string,
  id: string,
  isInMaintenance: boolean,
  isInMyList: boolean,
  liveCasinoLobby: ?LiveCasinoCard_liveCasinoLobby,
  logo: string,
  name: string,
  slug: string,
};

// ====================================================
// GraphQL fragment: MustDropJackpot_MustDropJackpot
// ====================================================

export type MustDropJackpot_MustDropJackpot_amount = {
  formattedAmount: string,
};
export type MustDropJackpot_MustDropJackpot = {
  label: string,
  image: string,
  id: string,
  amount: MustDropJackpot_MustDropJackpot_amount,
};

// ====================================================
// GraphQL fragment: MustDropJackpotsWidget_MustDropJackpot
// ====================================================

export type MustDropJackpotsWidget_MustDropJackpot_amount = {
  formattedAmount: string,
};
export type MustDropJackpotsWidget_MustDropJackpot = {
  label: string,
  image: string,
  id: string,
  amount: MustDropJackpotsWidget_MustDropJackpot_amount,
};

// ====================================================
// GraphQL fragment: PlayerValuableList_PlayerValuable
// ====================================================

export type PlayerValuableList_PlayerValuable_PlayerValuableDeposit = {
  __typename:
    | "PlayerValuableDeposit"
    | "PlayerValuableFreeBet"
    | "PlayerValuableSport",
  id: string,
  valuableState: PlayerValuableState,
  expiryDate: BigInt,
  valuableType: ValuableType,
  title: string,
  content: string,
  caveat: ?string,
  currency: Currency,
  market: string,
  backgroundImage: string,
  wageringThreshold: ?number,
  leftToWager: ?number,
};
export type PlayerValuableList_PlayerValuable_PlayerValuableSpins_game = {
  slug: string,
};
export type PlayerValuableList_PlayerValuable_PlayerValuableSpins = {
  __typename: "PlayerValuableSpins",
  id: string,
  valuableState: PlayerValuableState,
  expiryDate: BigInt,
  valuableType: ValuableType,
  title: string,
  content: string,
  caveat: ?string,
  currency: Currency,
  market: string,
  backgroundImage: string,
  wageringThreshold: ?number,
  leftToWager: ?number,
  description: string,
  coinValue: number,
  requirementType: ?RequirementType,
  game: ?PlayerValuableList_PlayerValuable_PlayerValuableSpins_game,
};
export type PlayerValuableList_PlayerValuable_PlayerValuableCash = {
  __typename: "PlayerValuableCash",
  id: string,
  valuableState: PlayerValuableState,
  expiryDate: BigInt,
  valuableType: ValuableType,
  title: string,
  content: string,
  caveat: ?string,
  currency: Currency,
  market: string,
  backgroundImage: string,
  wageringThreshold: ?number,
  leftToWager: ?number,
  requirementType: ?RequirementType,
};
export type PlayerValuableList_PlayerValuable =
  | PlayerValuableList_PlayerValuable_PlayerValuableDeposit
  | PlayerValuableList_PlayerValuable_PlayerValuableSpins
  | PlayerValuableList_PlayerValuable_PlayerValuableCash; // ====================================================
// GraphQL fragment: PromotionCard_Promotion
// ====================================================

export type PromotionCard_Promotion = {
  id: string,
  slug: string,
  title: string,
  subtitle: string,
  image: string,
  badge: ?string,
};

// ====================================================
// GraphQL fragment: ReelRaceCard_ReelRace
// ====================================================

export type ReelRaceCard_ReelRace_game = {
  id: string,
  name: string,
  logo: string,
  backgroundImage: string,
  slug: string,
};
export type ReelRaceCard_ReelRace_translations = {
  optedInCtaSingleGameShort: string,
  optIn: string,
  optedIn: string,
  endingIn: string,
  startingIn: string,
  competeFor: string,
  spins: string,
  duration: string,
  durationTemplate: string,
  minBet: string,
  caveatShort: string,
};
export type ReelRaceCard_ReelRace = {
  id: string,
  game: ReelRaceCard_ReelRace_game,
  startTime: BigInt,
  optedIn: boolean,
  endTime: BigInt,
  status: ?string,
  spinLimit: number,
  minBet: ?string,
  promoted: boolean,
  formattedPrize: string,
  remainingSpins: number,
  translations: ReelRaceCard_ReelRace_translations,
};

// ====================================================
// GraphQL fragment: SETTINGS_PLAYER
// ====================================================

export type SETTINGS_PLAYER_details_name = {
  __typename: "PlayerName",
  first: string,
  last: string,
};
export type SETTINGS_PLAYER_details_extentOfGambling = {
  __typename: "PlayerExtentOfGambling",
  canChange: boolean,
  label: ?string,
};
export type SETTINGS_PLAYER_details_phoneNumber = {
  __typename: "PhoneNumber",
  prefix: string,
  number: string,
  verified: boolean,
};
export type SETTINGS_PLAYER_details_address_country = {
  __typename: "Country",
  code: string,
  name: string,
};
export type SETTINGS_PLAYER_details_address = {
  __typename: "PlayerAddress",
  city: string,
  street: string,
  postCode: string,
  country: SETTINGS_PLAYER_details_address_country,
};
export type SETTINGS_PLAYER_details = {
  __typename: "PlayerDetails",
  name: SETTINGS_PLAYER_details_name,
  canChangePassword: boolean,
  extentOfGambling: SETTINGS_PLAYER_details_extentOfGambling,
  phoneNumber: SETTINGS_PLAYER_details_phoneNumber,
  address: SETTINGS_PLAYER_details_address,
  email: string,
};
export type SETTINGS_PLAYER = {
  id: string,
  __typename: "Player",
  details: SETTINGS_PLAYER_details,
};

// ====================================================
// GraphQL fragment: Contact_Settings_Player_withdrawalNotifications
// ====================================================

export type Contact_Settings_Player_withdrawalNotifications_details_contactSettings = {
  withdrawalNotifications: boolean,
};
export type Contact_Settings_Player_withdrawalNotifications_details = {
  contactSettings: Contact_Settings_Player_withdrawalNotifications_details_contactSettings,
};
export type Contact_Settings_Player_withdrawalNotifications = {
  __typename: "Player",
  details: Contact_Settings_Player_withdrawalNotifications_details,
};

// ====================================================
// GraphQL fragment: Contact_Settings_Player_adventurerPublic
// ====================================================

export type Contact_Settings_Player_adventurerPublic_details_contactSettings = {
  adventurerPublic: boolean,
};
export type Contact_Settings_Player_adventurerPublic_details = {
  contactSettings: Contact_Settings_Player_adventurerPublic_details_contactSettings,
};
export type Contact_Settings_Player_adventurerPublic = {
  __typename: "Player",
  details: Contact_Settings_Player_adventurerPublic_details,
};

// ====================================================
// GraphQL fragment: Contact_Settings_Player_subscribedToNewsletters
// ====================================================

export type Contact_Settings_Player_subscribedToNewsletters_details_contactSettings = {
  subscribedToNewsletters: boolean,
};
export type Contact_Settings_Player_subscribedToNewsletters_details = {
  contactSettings: Contact_Settings_Player_subscribedToNewsletters_details_contactSettings,
};
export type Contact_Settings_Player_subscribedToNewsletters = {
  __typename: "Player",
  details: Contact_Settings_Player_subscribedToNewsletters_details,
};

// ====================================================
// GraphQL fragment: Contact_Settings_Player_subscribedToSMSNewsletters
// ====================================================

export type Contact_Settings_Player_subscribedToSMSNewsletters_details_contactSettings = {
  subscribedToSMSNewsletters: boolean,
};
export type Contact_Settings_Player_subscribedToSMSNewsletters_details = {
  contactSettings: Contact_Settings_Player_subscribedToSMSNewsletters_details_contactSettings,
};
export type Contact_Settings_Player_subscribedToSMSNewsletters = {
  __typename: "Player",
  details: Contact_Settings_Player_subscribedToSMSNewsletters_details,
};

// ====================================================
// GraphQL fragment: Contact_Settings_Player_contactByPhone
// ====================================================

export type Contact_Settings_Player_contactByPhone_details_contactSettings = {
  contactByPhone: boolean,
};
export type Contact_Settings_Player_contactByPhone_details = {
  contactSettings: Contact_Settings_Player_contactByPhone_details_contactSettings,
};
export type Contact_Settings_Player_contactByPhone = {
  __typename: "Player",
  details: Contact_Settings_Player_contactByPhone_details,
};

// ====================================================
// GraphQL fragment: Contact_Settings_Player_contactByPost
// ====================================================

export type Contact_Settings_Player_contactByPost_details_contactSettings = {
  contactByPost: boolean,
};
export type Contact_Settings_Player_contactByPost_details = {
  contactSettings: Contact_Settings_Player_contactByPost_details_contactSettings,
};
export type Contact_Settings_Player_contactByPost = {
  __typename: "Player",
  details: Contact_Settings_Player_contactByPost_details,
};

// ====================================================
// GraphQL fragment: Contact_Settings_Player_realityCheck
// ====================================================

export type Contact_Settings_Player_realityCheck_playOk_realityCheck = {
  __typename: "PlayerRealityCheckSettings",
  canChangeInterval: boolean,
  isZeroIntervalAllowed: boolean,
  intervalInMinutes: number,
};
export type Contact_Settings_Player_realityCheck_playOk = {
  __typename: "PlayerPlayOkSettings",
  realityCheck: Contact_Settings_Player_realityCheck_playOk_realityCheck,
};
export type Contact_Settings_Player_realityCheck = {
  __typename: "Player",
  playOk: Contact_Settings_Player_realityCheck_playOk,
};

// ====================================================
// GraphQL fragment: ValuableCard_PlayerValuable
// ====================================================

export type ValuableCard_PlayerValuable_PlayerValuableCash = {
  __typename:
    | "PlayerValuableCash"
    | "PlayerValuableDeposit"
    | "PlayerValuableFreeBet"
    | "PlayerValuableSport",
  id: string,
  title: string,
  content: string,
  valuableState: PlayerValuableState,
  valuableType: ValuableType,
  currency: Currency,
  market: string,
  caveat: ?string,
  backgroundImage: string,
};
export type ValuableCard_PlayerValuable_PlayerValuableSpins = {
  __typename: "PlayerValuableSpins",
  id: string,
  title: string,
  content: string,
  valuableState: PlayerValuableState,
  valuableType: ValuableType,
  currency: Currency,
  market: string,
  caveat: ?string,
  backgroundImage: string,
  coinValue: number,
  description: string,
};
export type ValuableCard_PlayerValuable =
  | ValuableCard_PlayerValuable_PlayerValuableCash
  | ValuableCard_PlayerValuable_PlayerValuableSpins; // ====================================================
// GraphQL fragment: ValuableDetails_PlayerValuable
// ====================================================

export type ValuableDetails_PlayerValuable_PlayerValuableDeposit = {
  __typename:
    | "PlayerValuableDeposit"
    | "PlayerValuableFreeBet"
    | "PlayerValuableSport",
  id: string,
  backgroundImage: string,
  content: string,
  caveat: ?string,
  currency: Currency,
  market: string,
  expiryDate: BigInt,
  valuableType: ValuableType,
  valuableState: PlayerValuableState,
  wageringThreshold: ?number,
  leftToWager: ?number,
};
export type ValuableDetails_PlayerValuable_PlayerValuableSpins_game = {
  slug: string,
};
export type ValuableDetails_PlayerValuable_PlayerValuableSpins = {
  __typename: "PlayerValuableSpins",
  id: string,
  backgroundImage: string,
  content: string,
  caveat: ?string,
  currency: Currency,
  market: string,
  expiryDate: BigInt,
  valuableType: ValuableType,
  valuableState: PlayerValuableState,
  wageringThreshold: ?number,
  leftToWager: ?number,
  requirementType: ?RequirementType,
  game: ?ValuableDetails_PlayerValuable_PlayerValuableSpins_game,
};
export type ValuableDetails_PlayerValuable_PlayerValuableCash = {
  __typename: "PlayerValuableCash",
  id: string,
  backgroundImage: string,
  content: string,
  caveat: ?string,
  currency: Currency,
  market: string,
  expiryDate: BigInt,
  valuableType: ValuableType,
  valuableState: PlayerValuableState,
  wageringThreshold: ?number,
  leftToWager: ?number,
  requirementType: ?RequirementType,
};
export type ValuableDetails_PlayerValuable =
  | ValuableDetails_PlayerValuable_PlayerValuableDeposit
  | ValuableDetails_PlayerValuable_PlayerValuableSpins
  | ValuableDetails_PlayerValuable_PlayerValuableCash; // ====================================================
// GraphQL fragment: CompetitionPillsList_Group
// ====================================================

export type CompetitionPillsList_Group = {
  /**
   * Unique identifier of the event group
   */
  id: number,

  /**
   * Whether this is one of the users, selected favourites
   */
  userFavourite: boolean,

  /**
   * Name of the event group, localized according to the lang parameter
   */
  name: string,

  /**
   * The region code for the group, iso3166 code for most with some custom regions
   */
  regionCode: ?string,
};

// ====================================================
// GraphQL fragment: FavouriteCompetitionsSelectorIntro_Group
// ====================================================

export type FavouriteCompetitionsSelectorIntro_Group = {
  /**
   * Name of the event group, localized according to the lang parameter
   */
  name: string,
};

// ====================================================
// GraphQL fragment: FavouriteCompetitionsSelectorRegion_Group
// ====================================================

export type FavouriteCompetitionsSelectorRegion_Group_groups = {
  /**
   * Unique identifier of the event group
   */
  id: number,

  /**
   * Whether this is one of the users, selected favourites
   */
  userFavourite: boolean,

  /**
   * Name of the event group, localized according to the lang parameter
   */
  name: string,

  /**
   * The region code for the group, iso3166 code for most with some custom regions
   */
  regionCode: ?string,
};
export type FavouriteCompetitionsSelectorRegion_Group = {
  /**
   * Name of the event group, localized according to the lang parameter
   */
  name: string,

  /**
   * The region code for the group, iso3166 code for most with some custom regions
   */
  regionCode: ?string,

  /**
   * Array of subgroups in this event group
   */
  groups: ?Array<FavouriteCompetitionsSelectorRegion_Group_groups>,
};

// ====================================================
// GraphQL fragment: FavouriteCompetitionsSelectorModal_Group
// ====================================================

export type FavouriteCompetitionsSelectorModal_Group = {
  /**
   * Unique identifier of the event group
   */
  id: number,
};

// ====================================================
// GraphQL fragment: FavouriteSportsSelector_Group
// ====================================================

export type FavouriteSportsSelector_Group_favouriteCompetitions = {
  /**
   * Unique identifier of the event group
   */
  id: number,

  /**
   * Whether this is one of the users, selected favourites
   */
  userFavourite: boolean,

  /**
   * Name of the event group, localized according to the lang parameter
   */
  name: string,

  /**
   * The region code for the group, iso3166 code for most with some custom regions
   */
  regionCode: ?string,
};
export type FavouriteSportsSelector_Group = {
  /**
   * Unique identifier of the event group
   */
  id: number,

  /**
   * Name of the event group, localized according to the lang parameter
   */
  name: string,

  /**
   * Popular defines whether we consider the EventGroup to be popular
   */
  popular: boolean,

  /**
   * The icon for the sport group
   */
  icon: ?string,

  /**
   * The active indicator for the sport group, used on the nav
   */
  activeIndicator: ?string,

  /**
   * Whether to allow a custom selection of subgroups to be shown as sub-nav items
   * instead of just popular ones
   */
  canSelectSubgroups: boolean,

  /**
   * The favourited competitions for this EventGroup
   */
  favouriteCompetitions: Array<FavouriteSportsSelector_Group_favouriteCompetitions>,
};

// ====================================================
// GraphQL fragment: FavouriteSportsSelectorListItem_Group
// ====================================================

export type FavouriteSportsSelectorListItem_Group_favouriteCompetitions = {
  /**
   * Unique identifier of the event group
   */
  id: number,

  /**
   * Whether this is one of the users, selected favourites
   */
  userFavourite: boolean,

  /**
   * Name of the event group, localized according to the lang parameter
   */
  name: string,

  /**
   * The region code for the group, iso3166 code for most with some custom regions
   */
  regionCode: ?string,
};
export type FavouriteSportsSelectorListItem_Group = {
  /**
   * Unique identifier of the event group
   */
  id: number,

  /**
   * Name of the event group, localized according to the lang parameter
   */
  name: string,

  /**
   * The icon for the sport group
   */
  icon: ?string,

  /**
   * The active indicator for the sport group, used on the nav
   */
  activeIndicator: ?string,

  /**
   * Whether to allow a custom selection of subgroups to be shown as sub-nav items
   * instead of just popular ones
   */
  canSelectSubgroups: boolean,

  /**
   * The favourited competitions for this EventGroup
   */
  favouriteCompetitions: Array<FavouriteSportsSelectorListItem_Group_favouriteCompetitions>,
};

// ====================================================
// GraphQL fragment: FavouriteSportsSelectorContext_Competition
// ====================================================

export type FavouriteSportsSelectorContext_Competition = {
  /**
   * Unique identifier of the event group
   */
  id: number,

  /**
   * The region code for the group, iso3166 code for most with some custom regions
   */
  regionCode: ?string,

  /**
   * Name of the event group, localized according to the lang parameter
   */
  name: string,
};

// ====================================================
// GraphQL fragment: GroupPill_Group
// ====================================================

export type GroupPill_Group = {
  /**
   * Name of the event group, localized according to the lang parameter
   */
  name: string,

  /**
   * The region code for the group, iso3166 code for most with some custom regions
   */
  regionCode: ?string,
};

// ====================================================
// START Enums and Input Objects
//==============================================================

export type ValuableType = "cash" | "deposit" | "freeBet" | "spins" | "sport";
export type PlayerValuableState =
  | "Consumed"
  | "Expired"
  | "Fresh"
  | "Locked"
  | "Used";
export type Currency =
  | "CAD"
  | "DKK"
  | "EUR"
  | "GBP"
  | "INR"
  | "NZD"
  | "SEK"
  | "USD";
export type RequirementType = "deposit" | "wager";
export type Vertical = "CASINO" | "SPORTS";
export type SearchResultType = "LEAGUE" | "PARTICIPANT" | "REGION" | "SPORT";
export type Modal =
  | "BETTING_GLOSSARY"
  | "CHOOSE_FAVOURITES"
  | "CHOOSE_FAVOURITE_COMPETITIONS"
  | "SEARCH";
export type ContactSettingsInput = {|
  on: boolean,
|};
export type UpdateRealityCheckIntervalInput = {|
  intervalSeconds: number,
|};

// ====================================================
// END Enums and Input Objects
//==============================================================
