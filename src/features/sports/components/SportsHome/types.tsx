export type SportsHomeTranslations = {
  live: string;
  draw: string;
  title: string;
  away: string;
  home: string;
};

export type SportsHomeTranslationsDictionary = {
  dictionary: TranslationDictionaryItem[];
};

export type TranslationDictionaryItem = {
  key: string;
  value: string;
};

export type SportsHomeOutcome = {
  id: number;
  type: string;
  label: string;
  odds: number;
  fractional: string;
  american: string;
  isDisabled: boolean;
};

export type SportsHomeEventPath = {
  id: number;
  name: string;
  englishName: string;
  termKey: string;
};

export type SportsHomeLiveEventStatistics = {
  homeStatistics: string[];
  awayStatistics: string[];
};

export type SportsHomeTimerType = {
  seconds: number;
  minutes: number;
  disabled: boolean;
  running: boolean;
};

export type SportsHomeEvent = {
  id: number;
  betOfferId: number;
  betOfferType: number;
  name: string;
  sport: string;
  group: string;
  startTime: string;
  live: boolean;
  scoreHome: string;
  scoreAway: string;
  statistics: SportsHomeLiveEventStatistics;
  show: boolean;
  homeName: string;
  awayName: string;
  outcomes: SportsHomeOutcome[];
  path: SportsHomeEventPath[];
  timer: SportsHomeTimerType;
};

export type SportsHomeType = {
  translations: SportsHomeTranslations;
  events: SportsHomeEvent[];
  oddsFormat: string;
  locale: string;
};

export type PromoCardsType = {
  promoCards: PromoCardType[];
};

export type PromoCardType = {
  id: number;
  type: string;
  url: string;
  enabled: boolean;
  requiresUserLogin: boolean;
  startDate: string;
  endDate: string;
  desktopBgUrl: string;
  mobileBgUrl: string;
  title: string;
  description: string;
  fragment: string;
  nextOffEventStartDate: string;
  nextOffEventName: string;
  locale: string;
  onClick(url: string, type: string): void;
};

// Kambi Offering Api Types
export interface KambiBetOffer {
  id: number;
  betOfferType: KambiBetOfferType;
  eventId: number;
  outcomes: KambiBetOfferOutcome[];
}

export interface KambiBetOfferType {
  id: number;
  name: string;
  englishName: string;
}

export interface KambiBetOfferOutcome {
  id: number;
  label: string;
  type: string;
  participant: string;
  odds: number;
  status: string;
  oddsAmerican: string;
  oddsFractional: string;
}

export interface KambiEventPath {
  id: number;
  name: string;
  englishName: string;
  termKey: string;
}

export interface KambiEvent {
  id: number;
  name: string;
  englishName: string;
  homeName: string;
  awayName: string;
  start: string;
  group: string;
  groupId: number;
  sport: string;
  path: KambiEventPath[];
  state: string;
}

export interface KambiOfferingResponse {
  betOffers: KambiBetOffer[];
  events: KambiEvent[];
}

export interface KambiEventServerResponse {
  data: KambiOfferingResponse;
}

export interface KambiEventScore {
  home: string;
  away: string;
  info: string;
  who: string;
}

export interface KambiLiveEventStatisticsSets {
  home: number[];
  away: number[];
}
export interface KambiLiveEventStatistics {
  sets: KambiLiveEventStatisticsSets;
}

export interface KambiLiveEvent {
  eventId: number;
  score: KambiEventScore;
  statistics: KambiLiveEventStatistics;
}
export interface KambiLiveEventResponse {
  liveData: KambiLiveEvent[];
}
export interface KambiLiveEventServerResponse {
  data: KambiLiveEventResponse;
}

export interface SportsHomeConfigurationTranslations {
  title: string;
  status: string;
  available_sports: string;
  order_no: string;
  mobile: SportsHomeTranslationsMobile;
  desktop: SportsHomeTranslationsDesktop;
  tablet: SportsHomeTranslationsTablet;
  starting_within_days: string;
  title_live: string;
  status_live: string;
  available_sports_live: string;
  order_no_live: string;
  mobile_live: SportsHomeTranslationsMobile;
  desktop_live: SportsHomeTranslationsDesktop;
  tablet_live: SportsHomeTranslationsTablet;
  starting_within_days_live: string;
  order_no_promo: string;
  status_promo: string;
  title_promo: string;
  tc_disclaimer_promo: string;
}

export interface SportsHomeTranslationsMobile {
  number_of_events_mobile: string;
}

export interface SportsHomeTranslationsDesktop {
  number_of_events_desktop: string;
}

export interface SportsHomeTranslationsTablet {
  number_of_events_tablet: string;
}

export interface SportsHomePopularBetsConfigurations {
  PopularEventsWidgetConfigurations: PopularEventsWidgetConfigurations;
  PopularLiveEventsWidgetConfigurations: PopularEventsWidgetConfigurations;
  PromoCardsWidgetConfigurations: PromoCardsWidgetConfigurations;
}

// every widget should extend this interface
export interface SportsHomeWidget {
  orderNo: number;
  isEnabled: boolean;
  title: string;
}

export interface PopularEventsWidgetConfigurations extends SportsHomeWidget {
  availableSports: string;
  numberOfEventsMobile: number;
  numberOfEventsTablet: number;
  numberOfEventsDesktop: number;
  startingWithinDays: number;
}

export interface PopularLiveEventsWidgetConfigurations
  extends PopularEventsWidgetConfigurations {}

export interface PromoCardsWidgetConfigurations extends SportsHomeWidget {
  tcDisclaimer: string;
}
export interface WidgetComponent {
  component: any;
  orderNo: number;
  isEnabled: boolean;
}

export interface PromoCardsData {
  id: number;
  URL: string;
  Type: string;
  Title: string;
  StartDate: string;
  EndDate: string;
  RequiresUserLogin: boolean;
  DesktopBgUrl: string;
  MobileBgUrl: string;
  Fragment: string;
  Enabled: boolean;
  Description: string;
}

export interface KambiLandingEventResponse {
  id: number;
  name: string;
  englishName: string;
  start: string;
  originalStartTime: string;
  sport: string;
  state: string;
}

export interface KambiLandingEventsListResponse {
  event: KambiLandingEventResponse;
}

export interface KambiLandingEventCategoriesListResponse {
  name: string;
  events: KambiLandingEventsListResponse[];
}

export interface KambiLandingEventsResponse {
  result: KambiLandingEventCategoriesListResponse[];
}

export interface KambiLandingEventsServerResponse {
  data: KambiLandingEventsResponse;
}
