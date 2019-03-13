/* @flow */
import React from "react";
import classNames from "classnames";
import { pick } from "ramda";
import bridge from "Src/DurandalReactBridge";
import { injectScript } from "Utils";

import "./KambiClient.scss";

type KambiClientProps = {
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
  betslipVisible?: boolean,
  sessionKeepAlive: () => void,
};

export default class KambiClient extends React.Component<KambiClientProps> {
  static defaultProps = {
    onNavigate: () => {},
    searchMode: false,
    betslipVisible: true,
    sessionKeepAlive: () => {},
  };

  componentDidMount() {
    this.redirectToUserHomeRoute();

    /* eslint-disable fp/no-mutation */
    window._kc = pick(["currency", "locale", "market", "playerId", "ticket"], {
      ...this.props,
    });

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
    };
    /* eslint-enable fp/no-mutation */

    injectScript(this.props.bootstrapUrl);

    window.addEventListener("hashchange", this.handleHashChange);
    bridge.on("sports-path-updated", this.handleHashChange);
  }

  componentDidUpdate(prevProps: KambiClientProps) {
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
      <>
        <div
          id="KambiBC"
          className={classNames({
            "c-kambi-client--hidden": this.props.isHidden,
          })}
        />

        {this.props.betslipVisible ? null : (
          <style
            dangerouslySetInnerHTML={{
              __html: `
            .mod-KambiBC-betslip-container { display: none }
          `,
            }}
          />
        )}
      </>
    );
  }
}
