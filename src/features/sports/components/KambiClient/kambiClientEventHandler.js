// @flow
import gql from "graphql-tag";
import { pathOr } from "ramda";
import { isDesktop, isTablet } from "Components/ResponsiveLayout";
import bridge from "Src/DurandalReactBridge";
import tracker from "Services/tracker";
import { apolloClientPromise } from "Models/apollo/apollo.client";
import {
  EVENTS,
  EVENT_PROPS,
  KO_APP_EVENT_BETSLIP_VISIBLE,
} from "Src/constants";

export const SPORTS_FIRST_BET_QUERY = gql`
  query SportsFirstBetQuery {
    sportsFirstBet
  }
`;

const trackPageView = (page: { type: string, title: string, path: string }) => {
  // clean up bethistory date in path
  const cleanPath = page.type === "bethistory" ? "/bethistory" : page.path;

  tracker.track(EVENTS.MIXPANEL_SPORTS_PAGEVIEW, {
    [EVENT_PROPS.SPORTS_PAGE_TYPE]: page.type,
    [EVENT_PROPS.SPORTS_PAGE_TITLE]: page.title,
    [EVENT_PROPS.SPORTS_PAGE_PATH]: cleanPath,
  });
};

const trackAddToBetslipIfLife = (obj: any) => {
  const betPath = ["ecommerce", "add", "products", 0];
  const isLivePage: boolean = pathOr("", ["page", "path"], obj)
    .split("/")
    .includes("in-play");
  const sportName: string = pathOr(
    "unknown",
    ["hit", "categories", "event_group_two"],
    obj
  );
  const eventName: string = pathOr("unknown", [...betPath, "name"], obj);
  const eventId: number = pathOr(0, [...betPath, "id"], obj);
  const trackingName: string = isLivePage
    ? EVENTS.MIXPANEL_SPORTS_BETSLIP_LIVE_PAGE
    : EVENTS.MIXPANEL_SPORTS_BETSLIP_LIVE_NOW;

  tracker.track(trackingName, {
    [EVENT_PROPS.SPORTS_NAME]: sportName,
    [EVENT_PROPS.SPORTS_EVENT_NAME]: eventName,
    [EVENT_PROPS.SPORTS_EVENT_ID]: eventId,
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

const trackHomeMatchClicked = (page: { title: string, path: string }) => {
  tracker.track(EVENTS.MIXPANEL_SPORTS_HOME_MATCH_CLICKED, {
    [EVENT_PROPS.SPORTS_PAGE_TITLE]: page.title,
    [EVENT_PROPS.SPORTS_PAGE_PATH]: page.path,
  });
};

const trackHomeOddsClicked = (categories: {
  event_group_five: string,
  event_group_two: string,
}) => {
  tracker.track(EVENTS.MIXPANEL_SPORTS_HOME_ODDS_CLICKED, {
    [EVENT_PROPS.SPORTS_NAME]: categories.event_group_two,
    [EVENT_PROPS.SPORTS_EVENT_NAME]: categories.event_group_five,
  });
};

const trackBetPlaced = async (revenue: string, type: string) => {
  const apolloClient = await apolloClientPromise;
  const { data } = await apolloClient.query({
    query: SPORTS_FIRST_BET_QUERY,
    fetchPolicy: "network-only",
  });

  if (data.sportsFirstBet) {
    tracker.track(EVENTS.MIXPANEL_SPORTS_FIRST_BET_PLACED, {
      [EVENT_PROPS.TYPE]: type,
      [EVENT_PROPS.STAKE]: revenue,
    });
  }
  // null: no bets at all, false: it has more than one bet
  if (data.sportsFirstBet === false) {
    tracker.track(EVENTS.MIXPANEL_SPORTS_BET_PLACED, {
      [EVENT_PROPS.TYPE]: type,
      [EVENT_PROPS.STAKE]: revenue,
    });
  }
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

export function kambiClientEventHandler(event: any) {
  if (event.name !== "dataLayerPushed" || !event.data || !event.data.kambi) {
    return;
  }

  if (event.data.event === "kambi betslip status" && !isDesktop()) {
    emitBetslipVisibleToKoStack(
      isTablet(),
      Boolean(event.data.kambi?.betslip?.quantity)
    );
  }

  if (event.data.event === "kambi place bet") {
    trackBetPlaced(
      event.data.kambi?.ecommerce?.purchase?.actionField?.revenue,
      event.data.kambi?.hit?.bet?.type
    );
  }

  if (event.data.event === "kambi add to betslip") {
    event.data.kambi?.hit?.categories?.is_live &&
      trackAddToBetslipIfLife(event.data.kambi);

    event.data.kambi?.page?.type === "home" &&
      trackHomeOddsClicked(event.data.kambi?.hit?.categories);
  }

  if (event.data.event === "kambi page view") {
    trackPageView(event.data.kambi?.page);
  }

  if (event.data.event === "kambi promo card click") {
    trackHomeCardClicked(event.data.kambi?.interaction?.label);
  }

  if (event.data.event === "kambi sandwich filter click") {
    trackHomeFilterClicked(event.data.kambi?.interaction?.label);
  }

  if (event.data.event === "kambi kambi more wagers click") {
    trackHomeMatchClicked(event.data.kambi?.page);
  }
}
