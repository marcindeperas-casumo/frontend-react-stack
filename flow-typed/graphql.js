// @flow
// ====================================================
// GraphQL query operation: JackpotsQuery
// ====================================================
export type gJackpotsQuery_gamesList_games_lobby_bets = {
  min: ?number,
  max: ?number,
  symbol: ?string,
};
export type gJackpotsQuery_gamesList_games_lobby = {
  bets: ?gJackpotsQuery_gamesList_games_lobby_bets,
};
export type gJackpotsQuery_gamesList_games_jackpotInfo = {
  id: string,
  formattedJackpotAmount: ?string,
};
export type gJackpotsQuery_gamesList_games = {
  slug: string,
  name: string,
  logo: string,
  logoBackground: string,
  lobby: ?gJackpotsQuery_gamesList_games_lobby,
  jackpotInfo: ?gJackpotsQuery_gamesList_games_jackpotInfo,
};
export type gJackpotsQuery_gamesList = {
  title: ?string,
  games: ?Array<?gJackpotsQuery_gamesList_games>,
};
export type gJackpotsQuery = {
  gamesList: ?gJackpotsQuery_gamesList,
};

// ====================================================
// GraphQL query operation: PlayerValuablesQuery
// ====================================================

export type gPlayerValuablesQuery_player_valuables_PlayerValuableSpins_game = {
  slug: string,
};
export type gPlayerValuablesQuery_player_valuables =
  | {
      __typename: "PlayerValuableDeposit" | "PlayerValuableSport",
      id: string,
      valuableState: gPlayerValuableState,
      expirationTimeInHours: number,
      expiryDate: BigInt,
      valuableType: gValuableType,
      title: string,
      content: string,
      caveat: ?string,
      currency: gCurrency,
      market: string,
      backgroundImage: string,
      wageringThreshold: ?number,
      leftToWager: ?number,
    }
  | {
      __typename: "PlayerValuableSpins",
      id: string,
      valuableState: gPlayerValuableState,
      expirationTimeInHours: number,
      expiryDate: BigInt,
      valuableType: gValuableType,
      title: string,
      content: string,
      caveat: ?string,
      currency: gCurrency,
      market: string,
      backgroundImage: string,
      wageringThreshold: ?number,
      leftToWager: ?number,
      description: string,
      coinValue: number,
      requirementType: ?gRequirementType,
      game: ?gPlayerValuablesQuery_player_valuables_PlayerValuableSpins_game,
    }
  | {
      __typename: "PlayerValuableCash",
      id: string,
      valuableState: gPlayerValuableState,
      expirationTimeInHours: number,
      expiryDate: BigInt,
      valuableType: gValuableType,
      title: string,
      content: string,
      caveat: ?string,
      currency: gCurrency,
      market: string,
      backgroundImage: string,
      wageringThreshold: ?number,
      leftToWager: ?number,
      requirementType: ?gRequirementType,
    };
export type gPlayerValuablesQuery_player = {
  valuables: Array<gPlayerValuablesQuery_player_valuables>,
};
export type gPlayerValuablesQuery = {
  listTitleLabel: string,
  availableListTitleLabel: string,
  lockedListTitleLabel: string,
  hoursLabel: string,
  minutesLabel: string,
  seeAllLabel: string,
  noValuablesLabel: string,
  player: gPlayerValuablesQuery_player,
};

// ====================================================
// GraphQL mutation operation: UseValuable
// ====================================================

export type gUseValuable = {
  useValuable: ?boolean,
};
export type gUseValuableVariables = {
  id: string,
  source?: ?string,
};

// ====================================================
// GraphQL query operation: PLAYER_SETTINGS_LABELS_QUERY
// ====================================================

export type gPLAYER_SETTINGS_LABELS_QUERY = {
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

export type gPLAYER_SETTINGS_QUERY_player_details_name = {
  __typename: "PlayerName",
  first: string,
  last: string,
};
export type gPLAYER_SETTINGS_QUERY_player_details_extentOfGambling = {
  __typename: "PlayerExtentOfGambling",
  canChange: boolean,
  label: ?string,
};
export type gPLAYER_SETTINGS_QUERY_player_details_phoneNumber = {
  __typename: "PhoneNumber",
  prefix: string,
  number: string,
  verified: boolean,
};
export type gPLAYER_SETTINGS_QUERY_player_details_address_country = {
  __typename: "Country",
  code: string,
  name: string,
};
export type gPLAYER_SETTINGS_QUERY_player_details_address = {
  __typename: "PlayerAddress",
  city: string,
  street: string,
  postCode: string,
  country: gPLAYER_SETTINGS_QUERY_player_details_address_country,
};
export type gPLAYER_SETTINGS_QUERY_player_details = {
  __typename: "PlayerDetails",
  name: gPLAYER_SETTINGS_QUERY_player_details_name,
  canChangePassword: boolean,
  extentOfGambling: gPLAYER_SETTINGS_QUERY_player_details_extentOfGambling,
  phoneNumber: gPLAYER_SETTINGS_QUERY_player_details_phoneNumber,
  address: gPLAYER_SETTINGS_QUERY_player_details_address,
  email: string,
};
export type gPLAYER_SETTINGS_QUERY_player = {
  id: string,
  __typename: "Player",
  details: gPLAYER_SETTINGS_QUERY_player_details,
};
export type gPLAYER_SETTINGS_QUERY = {
  player: gPLAYER_SETTINGS_QUERY_player,
};

// ====================================================
// GraphQL mutation operation: SetAdventurerPublicity
// ====================================================

export type gSetAdventurerPublicity = {
  setAdventurerPublicity: ?boolean,
};
export type gSetAdventurerPublicityVariables = {
  input?: ?gContactSettingsInput,
};

// ====================================================
// GraphQL mutation operation: SetWithdrawalNotifications
// ====================================================

export type gSetWithdrawalNotifications = {
  setWithdrawalNotifications: ?boolean,
};
export type gSetWithdrawalNotificationsVariables = {
  input?: ?gContactSettingsInput,
};

// ====================================================
// GraphQL mutation operation: SetNewsletterSubscription
// ====================================================

export type gSetNewsletterSubscription = {
  setNewsletterSubscription: ?boolean,
};
export type gSetNewsletterSubscriptionVariables = {
  input?: ?gContactSettingsInput,
};

// ====================================================
// GraphQL mutation operation: SetSMSNewsletterSubscription
// ====================================================

export type gSetSMSNewsletterSubscription = {
  setSMSNewsletterSubscription: ?boolean,
};
export type gSetSMSNewsletterSubscriptionVariables = {
  input?: ?gContactSettingsInput,
};

// ====================================================
// GraphQL mutation operation: SetContactByPhone
// ====================================================

export type gSetContactByPhone = {
  setContactByPhone: ?boolean,
};
export type gSetContactByPhoneVariables = {
  input?: ?gContactSettingsInput,
};

// ====================================================
// GraphQL mutation operation: SetContactByPost
// ====================================================

export type gSetContactByPost = {
  setContactByPost: ?boolean,
};
export type gSetContactByPostVariables = {
  input?: ?gContactSettingsInput,
};

// ====================================================
// GraphQL query operation: PLAYER_CONTACT_SETTINGS_QUERY
// ====================================================

export type gPLAYER_CONTACT_SETTINGS_QUERY_player_details_contactSettings = {
  withdrawalNotifications: boolean,
  adventurerPublic: boolean,
  subscribedToNewsletters: boolean,
  subscribedToSMSNewsletters: boolean,
  contactByPhone: boolean,
  contactByPost: boolean,
};
export type gPLAYER_CONTACT_SETTINGS_QUERY_player_details = {
  contactSettings: gPLAYER_CONTACT_SETTINGS_QUERY_player_details_contactSettings,
};
export type gPLAYER_CONTACT_SETTINGS_QUERY_player_playOk_realityCheck = {
  __typename: "PlayerRealityCheckSettings",
  canChangeInterval: boolean,
  isZeroIntervalAllowed: boolean,
  intervalInMinutes: number,
};
export type gPLAYER_CONTACT_SETTINGS_QUERY_player_playOk = {
  __typename: "PlayerPlayOkSettings",
  realityCheck: gPLAYER_CONTACT_SETTINGS_QUERY_player_playOk_realityCheck,
};
export type gPLAYER_CONTACT_SETTINGS_QUERY_player = {
  id: string,
  __typename: "Player",
  details: gPLAYER_CONTACT_SETTINGS_QUERY_player_details,
  playOk: gPLAYER_CONTACT_SETTINGS_QUERY_player_playOk,
};
export type gPLAYER_CONTACT_SETTINGS_QUERY = {
  player: gPLAYER_CONTACT_SETTINGS_QUERY_player,
};

// ====================================================
// GraphQL query operation: NOTIFICATIONS_LABELS_QUERY
// ====================================================

export type gNOTIFICATIONS_LABELS_QUERY = {
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

export type gUpdateRealityCheckInterval = {
  updateRealityCheckInterval: ?number,
};
export type gUpdateRealityCheckIntervalVariables = {
  input?: ?gUpdateRealityCheckIntervalInput,
};

// ====================================================
// GraphQL query operation: REALITY_CHECK_LABELS_QUERY
// ====================================================

export type gREALITY_CHECK_LABELS_QUERY = {
  inGameSessionUpdatesLabel: string,
  inGameSessionUpdatesFrequencyLabel: string,
  save: string,
  cancel: string,
};

// ====================================================
// GraphQL query operation: PLAYER_REALITY_CHECK_QUERY
// ====================================================

export type gPLAYER_REALITY_CHECK_QUERY_player_playOk_realityCheck = {
  __typename: "PlayerRealityCheckSettings",
  canChangeInterval: boolean,
  isZeroIntervalAllowed: boolean,
  intervalInMinutes: number,
};
export type gPLAYER_REALITY_CHECK_QUERY_player_playOk = {
  __typename: "PlayerPlayOkSettings",
  realityCheck: gPLAYER_REALITY_CHECK_QUERY_player_playOk_realityCheck,
};
export type gPLAYER_REALITY_CHECK_QUERY_player = {
  id: string,
  __typename: "Player",
  playOk: gPLAYER_REALITY_CHECK_QUERY_player_playOk,
};
export type gPLAYER_REALITY_CHECK_QUERY = {
  player: gPLAYER_REALITY_CHECK_QUERY_player,
};

// ====================================================
// GraphQL query operation: PLAYER_LOGIN_HISTORY_QUERY
// ====================================================

export type gPLAYER_LOGIN_HISTORY_QUERY_player_loginHistory = {
  loginTime: Long,
};
export type gPLAYER_LOGIN_HISTORY_QUERY_player = {
  id: string,
  loginHistory: Array<gPLAYER_LOGIN_HISTORY_QUERY_player_loginHistory>,
};
export type gPLAYER_LOGIN_HISTORY_QUERY = {
  player: gPLAYER_LOGIN_HISTORY_QUERY_player,
};

// ====================================================
// GraphQL query operation: PLAYER_SECTIONS_LABELS_QUERY
// ====================================================

export type gPLAYER_SECTIONS_LABELS_QUERY = {
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

export type gValuableDetailsQuery = {
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

export type gGlossaryQuery_glossary = {
  id: string,
  term: string,
  aka: ?string,
  definition: string,
};
export type gGlossaryQuery = {
  glossary: Array<gGlossaryQuery_glossary>,
};

// ====================================================
// GraphQL query operation: CmsImageQuery
// ====================================================

export type gCmsImageQuery = {
  sportsCmsImage: ?string,
};
export type gCmsImageQueryVariables = {
  key: string,
};

// ====================================================
// GraphQL query operation: DictionaryTermQuery
// ====================================================

export type gDictionaryTermQuery = {
  dictionaryTerm: string,
};
export type gDictionaryTermQueryVariables = {
  key: string,
};

// ====================================================
// GraphQL query operation: PluralisableDictionaryTermQuery
// ====================================================

export type gPluralisableDictionaryTermQuery = {
  singularTerm: string,
  pluralTerm: string,
};
export type gPluralisableDictionaryTermQueryVariables = {
  singularKey: string,
  pluralKey: string,
};

// ====================================================
// GraphQL query operation: EditFavouriteCompetitions
// ====================================================

export type gEditFavouriteCompetitions_favouriteCompetitions = {
  /**
   * Unique identifier of the event group
   */
  id: number,
};
export type gEditFavouriteCompetitions = {
  favouriteCompetitions: Array<gEditFavouriteCompetitions_favouriteCompetitions>,
};
export type gEditFavouriteCompetitionsVariables = {
  groupId: number,
};

// ====================================================
// GraphQL query operation: FavouriteCompetitionsSelectorQuery
// ====================================================

export type gFavouriteCompetitionsSelectorQuery_group_groups_groups = {
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
export type gFavouriteCompetitionsSelectorQuery_group_groups = {
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
  groups: ?Array<gFavouriteCompetitionsSelectorQuery_group_groups_groups>,
};
export type gFavouriteCompetitionsSelectorQuery_group = {
  /**
   * Name of the event group, localized according to the lang parameter
   */
  name: string,

  /**
   * Array of subgroups in this event group
   */
  groups: ?Array<gFavouriteCompetitionsSelectorQuery_group_groups>,
};
export type gFavouriteCompetitionsSelectorQuery = {
  /**
   * Get list of sub-groups from a given group"
   */
  group: gFavouriteCompetitionsSelectorQuery_group,
  internationalGroupName: string,
};
export type gFavouriteCompetitionsSelectorQueryVariables = {
  groupId: number,
};

// ====================================================
// GraphQL query operation: FavouriteSportsSelectorContextCompetitionSuggestions
// ====================================================

export type gFavouriteSportsSelectorContextCompetitionSuggestions_topCompetitions = {
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
export type gFavouriteSportsSelectorContextCompetitionSuggestions = {
  /**
   * TopCompetitions returns the most popular subgroups of a group, currently based on number of events
   */
  topCompetitions: Array<gFavouriteSportsSelectorContextCompetitionSuggestions_topCompetitions>,
};
export type gFavouriteSportsSelectorContextCompetitionSuggestionsVariables = {
  id: number,
};

// ====================================================
// GraphQL query operation: FavouriteSportsSelectorContext
// ====================================================

export type gFavouriteSportsSelectorContext_groups_favouriteCompetitions = {
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
export type gFavouriteSportsSelectorContext_groups = {
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
  favouriteCompetitions: Array<gFavouriteSportsSelectorContext_groups_favouriteCompetitions>,
};
export type gFavouriteSportsSelectorContext = {
  /**
   * Get list of available event groups from the root level
   */
  groups: Array<gFavouriteSportsSelectorContext_groups>,
};

// ====================================================
// GraphQL query operation: PlayerVertical
// ====================================================

export type gPlayerVertical_player = {
  vertical: gVertical,
};
export type gPlayerVertical = {
  player: gPlayerVertical_player,
};

// ====================================================
// GraphQL mutation operation: LaunchKambi
// ====================================================

export type gLaunchKambi_launchKambi = {
  clientBootstrapUrl: string,
  providerPlayerId: string,
  ticket: string,
};
export type gLaunchKambi = {
  launchKambi: ?gLaunchKambi_launchKambi,
};

// ====================================================
// GraphQL query operation: LaunchableKambiClientQuery
// ====================================================

export type gLaunchableKambiClientQuery = {
  userHomepage: ?string,
  kambiClientVisible: boolean,
  isBetslipVisible: boolean,
};

// ====================================================
// GraphQL query operation: UserNavigation
// ====================================================

export type gUserNavigation_sportsNavigation_sport = {
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
export type gUserNavigation_sportsNavigation_subNav_competition = {
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
export type gUserNavigation_sportsNavigation_subNav = {
  competition: gUserNavigation_sportsNavigation_subNav_competition,
};
export type gUserNavigation_sportsNavigation = {
  sport: gUserNavigation_sportsNavigation_sport,
  subNav: Array<gUserNavigation_sportsNavigation_subNav>,
};
export type gUserNavigation = {
  allLabel: string,
  editLabel: string,
  liveLabel: string,
  sportsNavigation: Array<gUserNavigation_sportsNavigation>,
};
export type gUserNavigationVariables = {
  live: boolean,
};

// ====================================================
// GraphQL query operation: TopSearches
// ====================================================

export type gTopSearches_topSearches_parentGroups = {
  /**
   * The icon for the sport group
   */
  icon: ?string,

  /**
   * Name of the event group, localized according to the lang parameter
   */
  name: string,
};
export type gTopSearches_topSearches = {
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
  parentGroups: Array<gTopSearches_topSearches_parentGroups>,
};
export type gTopSearches = {
  /**
   * Top searches returns the event groups for the groupIds marked as popular
   */
  topSearches: Array<gTopSearches_topSearches>,
};
export type gTopSearchesVariables = {
  count: number,
};

// ====================================================
// GraphQL query operation: SearchQuery
// ====================================================

export type gSearchQuery_search_sport = {
  /**
   * The icon for the sport group
   */
  icon: ?string,

  /**
   * Name of the event group, localized according to the lang parameter
   */
  name: string,
};
export type gSearchQuery_search = {
  /**
   * The type of search result, N.B Not overly reliable"
   */
  type: gSearchResultType,

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
  sport: ?gSearchQuery_search_sport,
};
export type gSearchQuery = {
  /**
   * Search for events matching a given query, non english lang will search english results too"
   */
  search: Array<gSearchQuery_search>,
};
export type gSearchQueryVariables = {
  query: string,
};

// ====================================================
// GraphQL query operation: SportsShellQuery
// ====================================================

export type gSportsShellQuery = {
  hasSelectedFavourites: boolean,
  isSearchVisible: boolean,
};

// ====================================================
// GraphQL mutation operation: NavigateClient
// ====================================================

export type gNavigateClient = {
  navigateClient: ?boolean,
};
export type gNavigateClientVariables = {
  path: string,
  trackingLocation: string,
};

// ====================================================
// GraphQL mutation operation: OpenModal
// ====================================================

export type gOpenModal = {
  openModal: ?boolean,
};
export type gOpenModalVariables = {
  modal: gModal,
};

// ====================================================
// GraphQL mutation operation: CloseModal
// ====================================================

export type gCloseModal = {
  closeModal: ?boolean,
};
export type gCloseModalVariables = {
  modal: gModal,
};

// ====================================================
// GraphQL mutation operation: CloseAllModals
// ====================================================

export type gCloseAllModals = {
  closeAllModals: ?boolean,
};

// ====================================================
// GraphQL mutation operation: UpdateKambiClientState
// ====================================================

export type gUpdateKambiClientState = {
  updateKambiClientState: ?boolean,
};
export type gUpdateKambiClientStateVariables = {
  isVisible: boolean,
};

// ====================================================
// GraphQL mutation operation: UpdateBetslipState
// ====================================================

export type gUpdateBetslipState = {
  updateBetslipState: ?boolean,
};
export type gUpdateBetslipStateVariables = {
  isVisible: boolean,
};

// ====================================================
// GraphQL mutation operation: ShowSearch
// ====================================================

export type gShowSearch = {
  showSearch: ?boolean,
};

// ====================================================
// GraphQL mutation operation: HideSearch
// ====================================================

export type gHideSearch = {
  hideSearch: ?boolean,
};

// ====================================================
// GraphQL mutation operation: ToggleFavouriteGroup
// ====================================================

export type gToggleFavouriteGroup_toggleFavouriteGroup = {
  /**
   * Unique identifier of the event group
   */
  id: number,

  /**
   * Whether this is one of the users, selected favourites
   */
  userFavourite: boolean,
};
export type gToggleFavouriteGroup = {
  toggleFavouriteGroup: gToggleFavouriteGroup_toggleFavouriteGroup,
};
export type gToggleFavouriteGroupVariables = {
  id: number,
};

// ====================================================
// GraphQL mutation operation: SetFavourites
// ====================================================

export type gSetFavourites_setFavouriteGroups = {
  /**
   * Unique identifier of the event group
   */
  id: number,

  /**
   * Whether this is one of the users, selected favourites
   */
  userFavourite: boolean,
};
export type gSetFavourites = {
  setFavouriteGroups: Array<gSetFavourites_setFavouriteGroups>,
};
export type gSetFavouritesVariables = {
  ids: Array<number>,
};

// ====================================================
// GraphQL mutation operation: SetFavouriteCompetitions
// ====================================================

export type gSetFavouriteCompetitions_setFavouriteCompetitions = {
  /**
   * Unique identifier of the event group
   */
  id: number,

  /**
   * Whether this is one of the users, selected favourites
   */
  userFavourite: boolean,
};
export type gSetFavouriteCompetitions = {
  setFavouriteCompetitions: Array<gSetFavouriteCompetitions_setFavouriteCompetitions>,
};
export type gSetFavouriteCompetitionsVariables = {
  groupId: number,
  ids: Array<number>,
};

// ====================================================
// GraphQL mutation operation: SessionTouch
// ====================================================

export type gSessionTouch = {
  /**
   * Pings the current session to keep it alive, requires the session cookie to be present in the headers
   */
  sessionTouch: ?boolean,
};

// ====================================================
// GraphQL query operation: ActiveModals
// ====================================================

export type gActiveModals = {
  activeModals: Array<gModal>,
};

// ====================================================
// GraphQL query operation: BetslipVisible
// ====================================================

export type gBetslipVisible = {
  isBetslipVisible: boolean,
};

// ====================================================
// GraphQL query operation: KambiClientVisible
// ====================================================

export type gKambiClientVisible = {
  kambiClientVisible: boolean,
};

// ====================================================
// GraphQL query operation: SearchVisible
// ====================================================

export type gSearchVisible = {
  isSearchVisible: boolean,
};

// ====================================================
// GraphQL fragment: GameRow_Game
// ====================================================

export type gGameRow_Game_lobby_bets = {
  min: ?number,
  max: ?number,
  symbol: ?string,
};
export type gGameRow_Game_lobby = {
  bets: ?gGameRow_Game_lobby_bets,
};
export type gGameRow_Game_jackpotInfo = {
  id: string,
  formattedJackpotAmount: ?string,
};
export type gGameRow_Game = {
  slug: string,
  name: string,
  logo: string,
  logoBackground: string,
  lobby: ?gGameRow_Game_lobby,
  jackpotInfo: ?gGameRow_Game_jackpotInfo,
};

// ====================================================
// GraphQL fragment: Jackpots_Game
// ====================================================

export type gJackpots_Game_lobby_bets = {
  min: ?number,
  max: ?number,
  symbol: ?string,
};
export type gJackpots_Game_lobby = {
  bets: ?gJackpots_Game_lobby_bets,
};
export type gJackpots_Game_jackpotInfo = {
  id: string,
  formattedJackpotAmount: ?string,
};
export type gJackpots_Game = {
  slug: string,
  name: string,
  logo: string,
  logoBackground: string,
  lobby: ?gJackpots_Game_lobby,
  jackpotInfo: ?gJackpots_Game_jackpotInfo,
};

// ====================================================
// GraphQL fragment: PlayerValuableList_PlayerValuable
// ====================================================

export type gPlayerValuableList_PlayerValuable_PlayerValuableDeposit = {
  __typename: "PlayerValuableDeposit" | "PlayerValuableSport",
  id: string,
  valuableState: gPlayerValuableState,
  expirationTimeInHours: number,
  expiryDate: BigInt,
  valuableType: gValuableType,
  title: string,
  content: string,
  caveat: ?string,
  currency: gCurrency,
  market: string,
  backgroundImage: string,
  wageringThreshold: ?number,
  leftToWager: ?number,
};
export type gPlayerValuableList_PlayerValuable_PlayerValuableSpins_game = {
  slug: string,
};
export type gPlayerValuableList_PlayerValuable_PlayerValuableSpins = {
  __typename: "PlayerValuableSpins",
  id: string,
  valuableState: gPlayerValuableState,
  expirationTimeInHours: number,
  expiryDate: BigInt,
  valuableType: gValuableType,
  title: string,
  content: string,
  caveat: ?string,
  currency: gCurrency,
  market: string,
  backgroundImage: string,
  wageringThreshold: ?number,
  leftToWager: ?number,
  description: string,
  coinValue: number,
  requirementType: ?gRequirementType,
  game: ?gPlayerValuableList_PlayerValuable_PlayerValuableSpins_game,
};
export type gPlayerValuableList_PlayerValuable_PlayerValuableCash = {
  __typename: "PlayerValuableCash",
  id: string,
  valuableState: gPlayerValuableState,
  expirationTimeInHours: number,
  expiryDate: BigInt,
  valuableType: gValuableType,
  title: string,
  content: string,
  caveat: ?string,
  currency: gCurrency,
  market: string,
  backgroundImage: string,
  wageringThreshold: ?number,
  leftToWager: ?number,
  requirementType: ?gRequirementType,
};
export type gPlayerValuableList_PlayerValuable =
  | gPlayerValuableList_PlayerValuable_PlayerValuableDeposit
  | gPlayerValuableList_PlayerValuable_PlayerValuableSpins
  | gPlayerValuableList_PlayerValuable_PlayerValuableCash; // ====================================================
// GraphQL fragment: SETTINGS_PLAYER
// ====================================================

export type gSETTINGS_PLAYER_details_name = {
  __typename: "PlayerName",
  first: string,
  last: string,
};
export type gSETTINGS_PLAYER_details_extentOfGambling = {
  __typename: "PlayerExtentOfGambling",
  canChange: boolean,
  label: ?string,
};
export type gSETTINGS_PLAYER_details_phoneNumber = {
  __typename: "PhoneNumber",
  prefix: string,
  number: string,
  verified: boolean,
};
export type gSETTINGS_PLAYER_details_address_country = {
  __typename: "Country",
  code: string,
  name: string,
};
export type gSETTINGS_PLAYER_details_address = {
  __typename: "PlayerAddress",
  city: string,
  street: string,
  postCode: string,
  country: gSETTINGS_PLAYER_details_address_country,
};
export type gSETTINGS_PLAYER_details = {
  __typename: "PlayerDetails",
  name: gSETTINGS_PLAYER_details_name,
  canChangePassword: boolean,
  extentOfGambling: gSETTINGS_PLAYER_details_extentOfGambling,
  phoneNumber: gSETTINGS_PLAYER_details_phoneNumber,
  address: gSETTINGS_PLAYER_details_address,
  email: string,
};
export type gSETTINGS_PLAYER = {
  id: string,
  __typename: "Player",
  details: gSETTINGS_PLAYER_details,
};

// ====================================================
// GraphQL fragment: Contact_Settings_Player_withdrawalNotifications
// ====================================================

export type gContact_Settings_Player_withdrawalNotifications_details_contactSettings = {
  withdrawalNotifications: boolean,
};
export type gContact_Settings_Player_withdrawalNotifications_details = {
  contactSettings: gContact_Settings_Player_withdrawalNotifications_details_contactSettings,
};
export type gContact_Settings_Player_withdrawalNotifications = {
  __typename: "Player",
  details: gContact_Settings_Player_withdrawalNotifications_details,
};

// ====================================================
// GraphQL fragment: Contact_Settings_Player_adventurerPublic
// ====================================================

export type gContact_Settings_Player_adventurerPublic_details_contactSettings = {
  adventurerPublic: boolean,
};
export type gContact_Settings_Player_adventurerPublic_details = {
  contactSettings: gContact_Settings_Player_adventurerPublic_details_contactSettings,
};
export type gContact_Settings_Player_adventurerPublic = {
  __typename: "Player",
  details: gContact_Settings_Player_adventurerPublic_details,
};

// ====================================================
// GraphQL fragment: Contact_Settings_Player_subscribedToNewsletters
// ====================================================

export type gContact_Settings_Player_subscribedToNewsletters_details_contactSettings = {
  subscribedToNewsletters: boolean,
};
export type gContact_Settings_Player_subscribedToNewsletters_details = {
  contactSettings: gContact_Settings_Player_subscribedToNewsletters_details_contactSettings,
};
export type gContact_Settings_Player_subscribedToNewsletters = {
  __typename: "Player",
  details: gContact_Settings_Player_subscribedToNewsletters_details,
};

// ====================================================
// GraphQL fragment: Contact_Settings_Player_subscribedToSMSNewsletters
// ====================================================

export type gContact_Settings_Player_subscribedToSMSNewsletters_details_contactSettings = {
  subscribedToSMSNewsletters: boolean,
};
export type gContact_Settings_Player_subscribedToSMSNewsletters_details = {
  contactSettings: gContact_Settings_Player_subscribedToSMSNewsletters_details_contactSettings,
};
export type gContact_Settings_Player_subscribedToSMSNewsletters = {
  __typename: "Player",
  details: gContact_Settings_Player_subscribedToSMSNewsletters_details,
};

// ====================================================
// GraphQL fragment: Contact_Settings_Player_contactByPhone
// ====================================================

export type gContact_Settings_Player_contactByPhone_details_contactSettings = {
  contactByPhone: boolean,
};
export type gContact_Settings_Player_contactByPhone_details = {
  contactSettings: gContact_Settings_Player_contactByPhone_details_contactSettings,
};
export type gContact_Settings_Player_contactByPhone = {
  __typename: "Player",
  details: gContact_Settings_Player_contactByPhone_details,
};

// ====================================================
// GraphQL fragment: Contact_Settings_Player_contactByPost
// ====================================================

export type gContact_Settings_Player_contactByPost_details_contactSettings = {
  contactByPost: boolean,
};
export type gContact_Settings_Player_contactByPost_details = {
  contactSettings: gContact_Settings_Player_contactByPost_details_contactSettings,
};
export type gContact_Settings_Player_contactByPost = {
  __typename: "Player",
  details: gContact_Settings_Player_contactByPost_details,
};

// ====================================================
// GraphQL fragment: Contact_Settings_Player_realityCheck
// ====================================================

export type gContact_Settings_Player_realityCheck_playOk_realityCheck = {
  __typename: "PlayerRealityCheckSettings",
  canChangeInterval: boolean,
  isZeroIntervalAllowed: boolean,
  intervalInMinutes: number,
};
export type gContact_Settings_Player_realityCheck_playOk = {
  __typename: "PlayerPlayOkSettings",
  realityCheck: gContact_Settings_Player_realityCheck_playOk_realityCheck,
};
export type gContact_Settings_Player_realityCheck = {
  __typename: "Player",
  playOk: gContact_Settings_Player_realityCheck_playOk,
};

// ====================================================
// GraphQL fragment: ValuableCard_PlayerValuable
// ====================================================

export type gValuableCard_PlayerValuable_PlayerValuableCash = {
  __typename:
    | "PlayerValuableCash"
    | "PlayerValuableDeposit"
    | "PlayerValuableSport",
  id: string,
  title: string,
  content: string,
  valuableState: gPlayerValuableState,
  valuableType: gValuableType,
  expirationTimeInHours: number,
  currency: gCurrency,
  market: string,
  caveat: ?string,
  backgroundImage: string,
};
export type gValuableCard_PlayerValuable_PlayerValuableSpins = {
  __typename: "PlayerValuableSpins",
  id: string,
  title: string,
  content: string,
  valuableState: gPlayerValuableState,
  valuableType: gValuableType,
  expirationTimeInHours: number,
  currency: gCurrency,
  market: string,
  caveat: ?string,
  backgroundImage: string,
  coinValue: number,
  description: string,
};
export type gValuableCard_PlayerValuable =
  | gValuableCard_PlayerValuable_PlayerValuableCash
  | gValuableCard_PlayerValuable_PlayerValuableSpins; // ====================================================
// GraphQL fragment: ValuableDetails_PlayerValuable
// ====================================================

export type gValuableDetails_PlayerValuable_PlayerValuableDeposit = {
  __typename: "PlayerValuableDeposit" | "PlayerValuableSport",
  id: string,
  backgroundImage: string,
  content: string,
  caveat: ?string,
  currency: gCurrency,
  market: string,
  expirationTimeInHours: number,
  expiryDate: BigInt,
  valuableType: gValuableType,
  valuableState: gPlayerValuableState,
  wageringThreshold: ?number,
  leftToWager: ?number,
};
export type gValuableDetails_PlayerValuable_PlayerValuableSpins_game = {
  slug: string,
};
export type gValuableDetails_PlayerValuable_PlayerValuableSpins = {
  __typename: "PlayerValuableSpins",
  id: string,
  backgroundImage: string,
  content: string,
  caveat: ?string,
  currency: gCurrency,
  market: string,
  expirationTimeInHours: number,
  expiryDate: BigInt,
  valuableType: gValuableType,
  valuableState: gPlayerValuableState,
  wageringThreshold: ?number,
  leftToWager: ?number,
  requirementType: ?gRequirementType,
  game: ?gValuableDetails_PlayerValuable_PlayerValuableSpins_game,
};
export type gValuableDetails_PlayerValuable_PlayerValuableCash = {
  __typename: "PlayerValuableCash",
  id: string,
  backgroundImage: string,
  content: string,
  caveat: ?string,
  currency: gCurrency,
  market: string,
  expirationTimeInHours: number,
  expiryDate: BigInt,
  valuableType: gValuableType,
  valuableState: gPlayerValuableState,
  wageringThreshold: ?number,
  leftToWager: ?number,
  requirementType: ?gRequirementType,
};
export type gValuableDetails_PlayerValuable =
  | gValuableDetails_PlayerValuable_PlayerValuableDeposit
  | gValuableDetails_PlayerValuable_PlayerValuableSpins
  | gValuableDetails_PlayerValuable_PlayerValuableCash; // ====================================================
// GraphQL fragment: CompetitionPillsList_Group
// ====================================================

export type gCompetitionPillsList_Group = {
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

export type gFavouriteCompetitionsSelectorIntro_Group = {
  /**
   * Name of the event group, localized according to the lang parameter
   */
  name: string,
};

// ====================================================
// GraphQL fragment: FavouriteCompetitionsSelectorRegion_Group
// ====================================================

export type gFavouriteCompetitionsSelectorRegion_Group_groups = {
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
export type gFavouriteCompetitionsSelectorRegion_Group = {
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
  groups: ?Array<gFavouriteCompetitionsSelectorRegion_Group_groups>,
};

// ====================================================
// GraphQL fragment: FavouriteCompetitionsSelectorModal_Group
// ====================================================

export type gFavouriteCompetitionsSelectorModal_Group = {
  /**
   * Unique identifier of the event group
   */
  id: number,
};

// ====================================================
// GraphQL fragment: FavouriteSportsSelector_Group
// ====================================================

export type gFavouriteSportsSelector_Group_favouriteCompetitions = {
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
export type gFavouriteSportsSelector_Group = {
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
  favouriteCompetitions: Array<gFavouriteSportsSelector_Group_favouriteCompetitions>,
};

// ====================================================
// GraphQL fragment: FavouriteSportsSelectorListItem_Group
// ====================================================

export type gFavouriteSportsSelectorListItem_Group_favouriteCompetitions = {
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
export type gFavouriteSportsSelectorListItem_Group = {
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
  favouriteCompetitions: Array<gFavouriteSportsSelectorListItem_Group_favouriteCompetitions>,
};

// ====================================================
// GraphQL fragment: FavouriteSportsSelectorContext_Competition
// ====================================================

export type gFavouriteSportsSelectorContext_Competition = {
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

export type gGroupPill_Group = {
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

export type gPlayerValuableState =
  | "Consumed"
  | "Expired"
  | "Fresh"
  | "Locked"
  | "Used";
export type gValuableType = "cash" | "deposit" | "spins" | "sport";
export type gCurrency = "CAD" | "DKK" | "EUR" | "GBP";
export type gRequirementType = "deposit" | "wager";
export type gVertical = "CASINO" | "SPORTS";
export type gSearchResultType = "LEAGUE" | "PARTICIPANT" | "REGION" | "SPORT";
export type gModal =
  | "BETTING_GLOSSARY"
  | "CHOOSE_FAVOURITES"
  | "CHOOSE_FAVOURITE_COMPETITIONS"
  | "SEARCH";
export type gContactSettingsInput = {|
  on: boolean,
|};
export type gUpdateRealityCheckIntervalInput = {|
  intervalSeconds: number,
|};

// ====================================================
// END Enums and Input Objects
//==============================================================
