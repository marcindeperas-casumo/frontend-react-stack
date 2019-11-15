// @flow
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
export type JackpotsQuery_gamesList_games_jackpotInfo = {
  id: string,
  formattedJackpotAmount: ?string,
};
export type JackpotsQuery_gamesList_games = {
  slug: string,
  name: string,
  logo: string,
  logoBackground: string,
  lobby: ?JackpotsQuery_gamesList_games_lobby,
  jackpotInfo: ?JackpotsQuery_gamesList_games_jackpotInfo,
};
export type JackpotsQuery_gamesList = {
  title: ?string,
  games: ?Array<?JackpotsQuery_gamesList_games>,
};
export type JackpotsQuery = {
  gamesList: ?JackpotsQuery_gamesList,
};

// ====================================================
// GraphQL query operation: PlayerValuablesQuery
// ====================================================

export type PlayerValuablesQuery_player_valuables_PlayerValuableSpins_game = {
  slug: string,
};
export type PlayerValuablesQuery_player_valuables =
  | {
      __typename: "PlayerValuableDeposit" | "PlayerValuableSport",
      id: string,
      valuableState: PlayerValuableState,
      expirationTimeInHours: number,
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
      expirationTimeInHours: number,
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
      expirationTimeInHours: number,
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
  valuables: Array<?PlayerValuablesQuery_player_valuables>,
};
export type PlayerValuablesQuery = {
  listTitleLabel: string,
  availableListTitleLabel: string,
  lockedListTitleLabel: string,
  hoursLabel: string,
  minutesLabel: string,
  seeAllLabel: string,
  noValuablesLabel: string,
  player: PlayerValuablesQuery_player,
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
// GraphQL mutation operation: LaunchKambi
// ====================================================

export type LaunchKambi_launchKambi = {
  clientBootstrapUrl: string,
  providerPlayerId: string,
  ticket: string,
};
export type LaunchKambi = {
  launchKambi: ?LaunchKambi_launchKambi,
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
export type GameRow_Game_jackpotInfo = {
  id: string,
  formattedJackpotAmount: ?string,
};
export type GameRow_Game = {
  slug: string,
  name: string,
  logo: string,
  logoBackground: string,
  lobby: ?GameRow_Game_lobby,
  jackpotInfo: ?GameRow_Game_jackpotInfo,
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
export type Jackpots_Game_jackpotInfo = {
  id: string,
  formattedJackpotAmount: ?string,
};
export type Jackpots_Game = {
  slug: string,
  name: string,
  logo: string,
  logoBackground: string,
  lobby: ?Jackpots_Game_lobby,
  jackpotInfo: ?Jackpots_Game_jackpotInfo,
};

// ====================================================
// GraphQL fragment: PlayerValuableList_PlayerValuable
// ====================================================

export type PlayerValuableList_PlayerValuable_PlayerValuableDeposit = {
  __typename: "PlayerValuableDeposit" | "PlayerValuableSport",
  id: string,
  valuableState: PlayerValuableState,
  expirationTimeInHours: number,
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
  expirationTimeInHours: number,
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
  expirationTimeInHours: number,
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
    | "PlayerValuableSport",
  id: string,
  title: string,
  content: string,
  valuableState: PlayerValuableState,
  valuableType: ValuableType,
  expirationTimeInHours: number,
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
  expirationTimeInHours: number,
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
  __typename: "PlayerValuableDeposit" | "PlayerValuableSport",
  id: string,
  backgroundImage: string,
  content: string,
  caveat: ?string,
  currency: Currency,
  market: string,
  expirationTimeInHours: number,
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
  expirationTimeInHours: number,
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
  expirationTimeInHours: number,
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

export type PlayerValuableState =
  | "Consumed"
  | "Expired"
  | "Fresh"
  | "Locked"
  | "Used";
export type ValuableType = "cash" | "deposit" | "spins" | "sport";
export type Currency = "CAD" | "DKK" | "EUR" | "GBP";
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