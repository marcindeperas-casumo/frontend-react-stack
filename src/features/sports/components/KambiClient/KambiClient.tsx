import { gql, getApolloContext } from "@apollo/client";
// @ts-expect-error ts-migrate(2305) FIXME: Module '"../../../../../node_modules/@apollo/clien... Remove this comment to see the full error message
import type { ExecutionResult } from "@apollo/client";
import React from "react";
import classNames from "classnames";
import { pick } from "ramda";
import { connect } from "react-redux";
import { BalanceBetSlip } from "Features/sports/components/BalanceBetSlip";
import * as A from "Types/apollo";
import bridge from "Src/DurandalReactBridge";
import { injectScript } from "Utils";
import { showTerms } from "Services/ShowTermsService";
import { getKambiWidgetAPI } from "Features/sports/kambi";
import "./KambiClient.scss";
import { oddsFormatChangeAction } from "Models/sportsEvents";
import { showModal } from "Models/modal";
import { REACT_APP_MODAL } from "Src/constants";
import { deTaxMessageUrl } from "./widgets/deTaxMessage";
import {
  kambiClientEventHandler,
  KAMBI_EVENTS,
} from "./kambiClientEventHandler";
const SPORTS_FIRST_BET_QUERY = gql`
  query SportsFirstBetQuery {
    sportsFirstBet
  }
`;
type OwnProps = {
  bootstrapUrl: string;
  market: string;
  locale: string;
  currency: string;
  playerId?: string;
  ticket?: string;
  onNavigate: (s: string) => any;
  homeRoute?: string;
  isHidden?: boolean;
  searchMode: boolean;
  isBetslipVisible?: boolean;
  sessionKeepAlive?: () => Promise<ExecutionResult<A.SessionTouchMutation>>;
  onLoginCompleted?: () => void;
  onOddsFormatChangeAction: (data: any) => void;
  showSelfExcludedModal: (data: any) => void;
};
type State = {
  sportsFirstBet: boolean;
  isBetSlipMaximized: boolean;
};
type Props = OwnProps & typeof KambiClient.defaultProps;
export class KambiClient extends React.Component<Props, State> {
  static contextType = getApolloContext();
  state = {
    sportsFirstBet: false,
    isBetSlipMaximized: false,
  };
  static defaultProps = {
    onNavigate: () => {},
    searchMode: false,
    isBetslipVisible: true,
    onLoginCompleted: () => {},
  };
  componentDidMount() {
    this.redirectToUserHomeRoute();
    this.initIsFirstBet();
    /* eslint-disable fp/no-mutation */
    (window as any)._kc = {
      ...pick(["currency", "locale", "playerId", "ticket"], {
        ...this.props,
      }),
      market: this.marketToKambi(this.props.market),
      oddsFormat: "decimal",
    };
    // pre-setup the widget api
    getKambiWidgetAPI();
    (window as any).customerSettings = {
      enableOddsFormatSelector: true,
      enableNavigationPanel: false,
      hideHeader: true,
      enableFilterMenu: false,
      enableQuickBrowse: false,
      enableTermSearch: false,
      reservedRoutes: ["filter/virtuals", "promotions"],
      emptyClientRoutes: [/^search$/, "search#home"],
      heartbeat: this.props.sessionKeepAlive,
      notification: this.onNotification,
      loginUrl: "/log-in",
    };
    (window as any).widgetSettings = {
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
  onNotification = (event: { [s: string]: any }) => {
    if (
      (event as any).name === "loginRequestDone" &&
      this.props.onLoginCompleted
    ) {
      this.props.onLoginCompleted();
    }
    const isFirstBet =
      (event as any).data?.event === KAMBI_EVENTS.PLACE_BET &&
      this.state.sportsFirstBet;

    if (isFirstBet) {
      kambiClientEventHandler(
        event,
        true,
        () => {},
        this.props.market,
        this.props.showSelfExcludedModal
      );
      this.setState({ sportsFirstBet: false });
    } else {
      kambiClientEventHandler(
        event,
        false,
        this.props.onOddsFormatChangeAction,
        this.props.market,
        this.props.showSelfExcludedModal
      );
    }

    if ((event as any)?.data?.event === "kambi betslip status") {
      const isBetSlipMaximized =
        (event as any).data.kambi.betslip.position === "maximized";
      this.setState({ isBetSlipMaximized });
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
    if ((window as any)._kbc) {
      (window as any)._kbc.dispose();
    }
    window.removeEventListener("hashchange", this.handleHashChange);
  }
  redirectToUserHomeRoute = (prevHomeRoute?: string | undefined) => {
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
  replaceSportsHub = () => {
    if (window.location.hash.indexOf("sports-hub") > -1) {
      // eslint-disable-next-line fp/no-mutation
      window.location.hash = window.location.hash.replace(
        "sports-hub",
        "filter"
      );
    }
  };
  handleHashChange = () => {
    this.redirectToUserHomeRoute();
    this.replaceSportsHub();
    this.props.onNavigate(window.location.hash);
  };
  initIsFirstBet = async () => {
    const { data } = await this.context.client.query({
      query: SPORTS_FIRST_BET_QUERY,
      fetchPolicy: "network-only",
    });
    if (data.sportsFirstBet) {
      this.setState({ sportsFirstBet: true });
    }
  };
  marketToKambi = (market: string) => {
    return market === "JP" ? "EA" : market;
  };
  render() {
    return (
      <div
        className={classNames("bg-grey-0", {
          "c-kambi-client--hidden": this.props.isHidden,
        })}
      >
        <div id="KambiBC" className="pt-lg" />

        {this.props.isBetslipVisible ? null : (
          <style
            dangerouslySetInnerHTML={{
              __html: `
            .mod-KambiBC-betslip-container { display: none }
          `,
            }}
          />
        )}
        <BalanceBetSlip maximized={this.state.isBetSlipMaximized} />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch): any => ({
  onOddsFormatChangeAction: data => dispatch(oddsFormatChangeAction(data)),
  showSelfExcludedModal: (config: any = {}) =>
    dispatch(showModal(REACT_APP_MODAL.ID.EXCLUDED_GAME, config)),
});

export default connect(null, mapDispatchToProps)(KambiClient);
