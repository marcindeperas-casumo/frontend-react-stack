// @flow
import React, { PureComponent } from "react";
import { URL_PREFIXES } from "Src/constants";
import LazyPortal from "Components/LazyPortal";
import { Router } from "Components/Router";

type Props = {
  onAppStarted: () => void,
  subscribeToPlayerUpdates: Function,
  unsubscribeToPlayerUpdates: Function,
  playerId: string,
  language: string,
  market: string,
  isAuthenticated: boolean,
  activeComponents: Array<string>,
  routeParams: Array<Object>,
};

export class App extends PureComponent<Props> {
  subscribe: Function;

  componentDidMount() {
    const { onAppStarted } = this.props;

    onAppStarted();
    this.subscribe();
  }

  componentWillUnmount() {
    this.props.unsubscribeToPlayerUpdates();
  }

  componentDidUpdate(props: Props) {
    const { playerId: oldPlayerId } = props;
    const initialPageLoad = !oldPlayerId;

    if (initialPageLoad) {
      this.subscribe();
    }
  }

  subscribe = () => {
    this.props.subscribeToPlayerUpdates();
  };

  render() {
    const { isAuthenticated, language, market } = this.props;
    const basePath = URL_PREFIXES[market];

    if (!isAuthenticated) {
      return null;
    }

    return (
      <>
        <Router basePath={basePath} language={language} />
        <LazyPortal
          hostElementId="react-host-deposit-limits"
          loader={() =>
            import("Components/Compliance/DepositLimits/DepositLimitsView")
          }
          namedExport="DepositLimitsViewContainer"
        />
      </>
    );
  }
}
