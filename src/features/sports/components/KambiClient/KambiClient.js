/* @flow */
import React from "react";
import gql from "graphql-tag";
import classNames from "classnames";
import type { ExecutionResult } from "@apollo/react-hooks";
import { getApolloContext } from "@apollo/react-hooks";
import { pathOr, pick } from "ramda";
import { isDesktop, isTablet } from "Components/ResponsiveLayout";
import * as A from "Types/apollo";
import bridge from "Src/DurandalReactBridge";
import { injectScript } from "Utils";
import { showTerms } from "Services/ShowTermsService";
import tracker from "Services/tracker";
import {
  EVENTS,
  EVENT_PROPS,
  KO_APP_EVENT_BETSLIP_VISIBLE,
} from "Src/constants";
import { getKambiWidgetAPI } from "Features/sports/kambi";
import { deTaxMessageUrl } from "./widgets/deTaxMessage";

import "./KambiClient.scss";

export const SPORTS_FIRST_BET_QUERY = gql`
  query SportsFirstBetQuery {
    sportsFirstBet
  }
`;

type Props = {
  bootstrapUrl: string,
  market: string,
  locale: string,
  currency: string,
  playerId?: string,
  ticket?: string,
  onNavigate: string => any,
  homeRoute?: string,
  isHidden?: boolean,
  searchMode: boolean,
  isBetslipVisible?: boolean,
  sessionKeepAlive?: () => Promise<ExecutionResult<A.SessionTouch>>,
  onLoginCompleted?: () => void,
};

export default class KambiClient extends React.Component<Props> {
  static contextType = getApolloContext();

  static defaultProps = {
    onNavigate: () => {},
    searchMode: false,
    isBetslipVisible: true,
    onLoginCompleted: () => {},
  };

  componentDidMount() {
    this.redirectToUserHomeRoute();

    /* eslint-disable fp/no-mutation */
    window._kc = {
      ...pick(["currency", "locale", "market", "playerId", "ticket"], {
        ...this.props,
      }),
      oddsFormat: this.props.market.toLowerCase().includes("gb")
        ? "fractional"
        : "decimal",
    };

    // pre-setup the widget api
    getKambiWidgetAPI();

    window.customerSettings = {
      enableOddsFormatSelector: true,
      enableNavigationPanel: false,
      hideHeader: true,
      enableFilterMenu: false,
      enableQuickBrowse: false,
      enableTermSearch: false,
      reservedRoutes: [],
      emptyClientRoutes: [/^search$/, "search#home"],
      heartbeat: this.props.sessionKeepAlive,
      notification: this.onNotification,
      loginUrl: "/log-in",
    };

    window.widgetSettings = {
      widgets: [
        {
          widgetId: "de-tax-message",
          url: deTaxMessageUrl,
          height: 55,
          conditions: {
            markets: ["DE"],
          },
        },
      ],

      targets: {
        betslipMain: [
          {
            widgetId: "de-tax-message",
          },
        ],
      },
    };
    /* eslint-enable fp/no-mutation */

    injectScript(this.props.bootstrapUrl);

    window.addEventListener("hashchange", this.handleHashChange);
    bridge.on("sports-path-updated", this.handleHashChange);

    // listen to events from widget iframes
    window.addEventListener("message", this.onWidgetMessage, false);
  }

  trackPageView = (page: { type: string, title: string, path: string }) => {
    // clean up bethistory date in path
    const cleanPath = page.type === "bethistory" ? "/bethistory" : page.path;

    tracker.track(EVENTS.MIXPANEL_SPORTS_PAGEVIEW, {
      [EVENT_PROPS.SPORTS_PAGE_TYPE]: page.type,
      [EVENT_PROPS.SPORTS_PAGE_TITLE]: page.title,
      [EVENT_PROPS.SPORTS_PAGE_PATH]: cleanPath,
    });
  };

  trackAddToBetslipIfLife = (obj: any) => {
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

  trackHomeCardClicked = (type: string) => {
    tracker.track(EVENTS.MIXPANEL_SPORTS_HOME_CARD_CLICKED, {
      [EVENT_PROPS.TYPE]: type,
    });
  };

  trackHomeFilterClicked = (type: string) => {
    tracker.track(EVENTS.MIXPANEL_SPORTS_HOME_FILTER_CLICKED, {
      [EVENT_PROPS.TYPE]: type,
    });
  };

  trackHomeMatchClicked = (page: { title: string, path: string }) => {
    tracker.track(EVENTS.MIXPANEL_SPORTS_HOME_MATCH_CLICKED, {
      [EVENT_PROPS.SPORTS_PAGE_TITLE]: page.title,
      [EVENT_PROPS.SPORTS_PAGE_PATH]: page.path,
    });
  };

  trackHomeOddsClicked = (categories: {
    event_group_five: string,
    event_group_two: string,
  }) => {
    tracker.track(EVENTS.MIXPANEL_SPORTS_HOME_ODDS_CLICKED, {
      [EVENT_PROPS.SPORTS_NAME]: categories.event_group_two,
      [EVENT_PROPS.SPORTS_EVENT_NAME]: categories.event_group_five,
    });
  };

  trackBetPlaced = async (revenue: string, type: string) => {
    const { data } = await this.context.client.query({
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

  emitBetslipVisibleToKoStack(
    isTabletDevice: boolean,
    isBetslipVisible: boolean
  ) {
    bridge.emit(KO_APP_EVENT_BETSLIP_VISIBLE, {
      isTablet: isTabletDevice,
      isBetslipVisible,
    });
  }

  onNotification = (event: { [string]: any }) => {
    if (event.name === "loginRequestDone") {
      this.props.onLoginCompleted && this.props.onLoginCompleted();
    }

    if (event.name !== "dataLayerPushed" || !event.data || !event.data.kambi) {
      return;
    }

    // `dataLayerPushed` events
    if (event.data.event === "kambi place bet") {
      this.trackBetPlaced(
        event.data.kambi?.ecommerce?.purchase?.actionField?.revenue,
        event.data.kambi?.hit?.bet?.type
      );
    }

    if (event.data.event === "kambi add to betslip") {
      event.data.kambi?.hit?.categories?.is_live &&
        this.trackAddToBetslipIfLife(event.data.kambi);

      event.data.kambi?.page?.type === "home" &&
        this.trackHomeOddsClicked(event.data.kambi?.hit?.categories);
    }

    if (event.data.event === "kambi page view") {
      this.trackPageView(event.data.kambi?.page);
    }

    if (event.data.event === "kambi betslip status" && !isDesktop()) {
      this.emitBetslipVisibleToKoStack(
        isTablet(),
        Boolean(event.data.kambi?.betslip?.quantity)
      );
    }

    if (event.data.event === "kambi promo card click") {
      this.trackHomeCardClicked(event.data.kambi?.interaction?.label);
    }

    if (event.data.event === "kambi sandwich filter click") {
      this.trackHomeFilterClicked(event.data.kambi?.interaction?.label);
    }

    if (event.data.event === "kambi kambi more wagers click") {
      this.trackHomeMatchClicked(event.data.kambi?.page);
    }
  };

  onWidgetMessage = (message: MessageEvent) => {
    // MessageEvent.data property is a mixed type so need to check the type here too
    if (!message.data || typeof message.data.type !== "string") {
      return;
    }

    if (message.data.type === "SHOW_TERMS") {
      getKambiWidgetAPI().then(wapi => {
        wapi.set(wapi.BETSLIP_MAXIMIZED, { maximized: false });
        showTerms();
      });
    }
  };

  componentDidUpdate(prevProps: Props) {
    if (prevProps.homeRoute !== this.props.homeRoute) {
      this.redirectToUserHomeRoute(prevProps.homeRoute);
    }
  }

  componentWillUnmount() {
    window._kbc && window._kbc.dispose();
    window.removeEventListener("hashchange", this.handleHashChange);
  }

  redirectToUserHomeRoute = (prevHomeRoute: ?string) => {
    // allows kambi client to be hidden if search doesn't have a #filter (i.e. initial search view)
    if (this.props.searchMode) {
      return;
    }

    const onPrevHomeRoute =
      prevHomeRoute && window.location.hash === `#${prevHomeRoute}`;

    if (this.props.homeRoute && onPrevHomeRoute) {
      // eslint-disable-next-line fp/no-mutation
      window.location.hash = this.props.homeRoute;
    }
  };

  handleHashChange = () => {
    this.redirectToUserHomeRoute();
    this.props.onNavigate(window.location.hash);
  };

  render() {
    return (
      <div
        className={classNames("t-background-grey-0", {
          "c-kambi-client--hidden": this.props.isHidden,
        })}
      >
        <div
          id="KambiBC"
          className="u-padding-top--md@desktop u-padding-top--sm@tablet u-padding-top--none@mobile"
        />

        {this.props.isBetslipVisible ? null : (
          <style
            dangerouslySetInnerHTML={{
              __html: `
            .mod-KambiBC-betslip-container { display: none }
          `,
            }}
          />
        )}
      </div>
    );
  }
}
