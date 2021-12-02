import { pathOr } from "ramda";
import { isDesktop, isTablet } from "Components/ResponsiveLayout";
import bridge from "Src/DurandalReactBridge";
import tracker from "Services/tracker";
import {
  EVENTS,
  EVENT_PROPS,
  KO_APP_EVENT_BETSLIP_VISIBLE,
} from "Src/constants";
import { OddsFormatEvent } from "Models/sportsEvents/sportsEvents.types";

export const KAMBI_EVENTS = {
  BETSLIP_STATUS: "kambi betslip status",
  PLACE_BET: "kambi place bet",
  ADD_TO_BETSLIP: "kambi add to betslip",
  PAGE_VIEW: "kambi page view",
  PROMO_CARD_CLICK: "kambi promo card click",
  SANDWICH_FILTER_CLICK: "kambi sandwich filter click",
  MORE_WAGERS_CLICK: "kambi kambi more wagers click",
  BET_DENIED: "kambi bet denied",
  ODDS_FORMAT: "kambi odds format",
} as const;

const trackPageView = (page: { type: string; title: string; path: string }) => {
  // clean up bethistory date in path
  const cleanPath = page.type === "bethistory" ? "/bethistory" : page.path;

  if (page.type === "bethistory" && !page.title) {
    return;
  }

  tracker.track(EVENTS.MIXPANEL_SPORTS_PAGEVIEW, {
    [EVENT_PROPS.SPORTS_PAGE_TYPE]: page.type,
    [EVENT_PROPS.SPORTS_PAGE_TITLE]: page.title,
    [EVENT_PROPS.SPORTS_PAGE_PATH]: cleanPath,
  });
};

const trackHomeCardClicked = (type: string) => {
  tracker.track(EVENTS.MIXPANEL_SPORTS_HOME_CARD_CLICKED, {
    [EVENT_PROPS.TYPE]: type,
  });
};

const trackHomeFilterClicked = (type: string) => {
  tracker.track(EVENTS.MIXPANEL_SPORTS_HOME_FILTER_CLICKED, {
    [EVENT_PROPS.TYPE]: type,
  });
};

const trackHomeMatchClicked = (page: { title: string; path: string }) => {
  tracker.track(EVENTS.MIXPANEL_SPORTS_HOME_MATCH_CLICKED, {
    [EVENT_PROPS.SPORTS_PAGE_TITLE]: page.title,
    [EVENT_PROPS.SPORTS_PAGE_PATH]: page.path,
  });
};

const trackAddToBetslip = (kambi: any, market: string) => {
  const bet = pathOr([], ["ecommerce", "add", "products", 0], kambi);
  const isLivePage: boolean = pathOr("", ["page", "path"], kambi)
    .split("/")
    .includes("in-play");

  if (bet) {
    tracker.track(EVENTS.MIXPANEL_SPORTS_ADD_TO_BETSLIP, {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'id' does not exist on type 'any[]'.
      [EVENT_PROPS.SPORTS_EVENT_ID]: bet.id,
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'name' does not exist on type 'any[]'.
      [EVENT_PROPS.SPORTS_EVENT_NAME]: bet.name,
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'category' does not exist on type 'any[]'... Remove this comment to see the full error message
      [EVENT_PROPS.CATEGORY]: bet.category,
      [EVENT_PROPS.SPORTS_PAGE_TYPE]: `${isLivePage ? "Live " : ""}${
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'betslipLocationSource' does not exist on... Remove this comment to see the full error message
        bet.betslipLocationSource
      }`,
      [EVENT_PROPS.MARKET]: market,
    });
  }
};

const trackBetPlaced = (
  revenue: string,
  type: string,
  sportsFirstBet: boolean
) => {
  const name = sportsFirstBet
    ? EVENTS.MIXPANEL_SPORTS_FIRST_BET_PLACED
    : EVENTS.MIXPANEL_SPORTS_BET_PLACED;
  tracker.track(name, {
    [EVENT_PROPS.TYPE]: type,
    [EVENT_PROPS.STAKE]: revenue,
  });
};

const emitBetslipVisibleToKoStack = (
  isTabletDevice: boolean,
  isBetslipVisible: boolean
) => {
  bridge.emit(KO_APP_EVENT_BETSLIP_VISIBLE, {
    isTablet: isTabletDevice,
    isBetslipVisible,
  });
};

export function kambiClientEventHandler(
  event: any,
  sportsFirstBet: boolean,
  callback?: any,
  market?: string
) {
  if (event.name !== "dataLayerPushed" || !event.data || !event.data.kambi) {
    return;
  }

  if (
    event.data.event === KAMBI_EVENTS.BET_DENIED &&
    event.data.kambi?.hit?.bet &&
    event.data.kambi.hit.bet["denied reason"] === "not enough funds"
  ) {
    tracker.track(EVENTS.MIXPANEL_SPORTS_BET_FAILED, {
      [EVENT_PROPS.BET_VALUE]: event.data.kambi.hit.bet["bet value"],
    });
  }

  if (event.data.event === KAMBI_EVENTS.BETSLIP_STATUS && !isDesktop()) {
    emitBetslipVisibleToKoStack(
      isTablet(),
      Boolean(event.data.kambi?.betslip?.quantity)
    );
  }

  if (event.data.event === KAMBI_EVENTS.PLACE_BET) {
    trackBetPlaced(
      event.data.kambi?.ecommerce?.purchase?.actionField?.revenue,
      event.data.kambi?.hit?.bet?.type,
      sportsFirstBet
    );
  }

  if (event.data.event === KAMBI_EVENTS.ADD_TO_BETSLIP) {
    trackAddToBetslip(event.data.kambi, market);
  }

  if (event.data.event === KAMBI_EVENTS.PAGE_VIEW) {
    trackPageView(event.data.kambi?.page);
  }

  if (event.data.event === KAMBI_EVENTS.PROMO_CARD_CLICK) {
    trackHomeCardClicked(event.data.kambi?.interaction?.label);
  }

  if (event.data.event === KAMBI_EVENTS.SANDWICH_FILTER_CLICK) {
    trackHomeFilterClicked(event.data.kambi?.interaction?.label);
  }

  if (event.data.event === KAMBI_EVENTS.MORE_WAGERS_CLICK) {
    trackHomeMatchClicked(event.data.kambi?.page);
  }

  if (event.data.event === KAMBI_EVENTS.ODDS_FORMAT) {
    callback({
      oddsFormat: event.data.kambi?.client?.oddsFormat,
    } as OddsFormatEvent);
  }
}
