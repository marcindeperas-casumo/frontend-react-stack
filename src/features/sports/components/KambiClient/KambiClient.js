/* @flow */
import React from "react";
import classNames from "classnames";
import type { ExecutionResult } from "@apollo/react-hooks";
import { pick } from "ramda";
import bridge from "Src/DurandalReactBridge";
import { injectScript } from "Utils";
import { showTerms } from "Services/ShowTermsService";
import { getKambiWidgetAPI } from "Features/sports/kambi";
import { deTaxMessageUrl } from "./widgets/deTaxMessage";

import "./KambiClient.scss";

type Props = {
  bootstrapUrl: string,
  market: string,
  locale: string,
  currency: string,
  playerId?: string,
  ticket: string,
  onNavigate: string => any,
  homeRoute?: string,
  isHidden?: boolean,
  searchMode: boolean,
  isBetslipVisible?: boolean,
  sessionKeepAlive: () => Promise<ExecutionResult<SessionTouch>>,
  onLoginCompleted?: () => void,
};

export default class KambiClient extends React.Component<Props> {
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
      reservedRoutes: ["home"],
      emptyClientRoutes: [/^search$/, "search#home"],
      heartbeat: this.props.sessionKeepAlive,
      notification: this.onNotification,
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

  onNotification = (event: { [string]: * }) => {
    if (event.name === "loginRequestDone") {
      this.props.onLoginCompleted && this.props.onLoginCompleted();
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

    const onHome = window.location.hash === "#home";
    const onPrevHomeRoute =
      prevHomeRoute && window.location.hash === `#${prevHomeRoute}`;

    if (this.props.homeRoute && (onHome || onPrevHomeRoute)) {
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
        className={classNames({
          "c-kambi-client--hidden": this.props.isHidden,
        })}
      >
        <div id="KambiBC" className="u-padding-top" />

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
