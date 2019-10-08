// @flow
import React, { PureComponent } from "react";
import MustDropJackpot from "Components/MustDropJackpot";
import MustDropJackpotsWidgetSkeleton from "Components/MustDropJackpotsWidget/MustDropJackpotsWidgetSkeleton";

type Props = {
  isFetched: boolean,
  jackpots: Array<Object>,
  fetchJackpots: () => void,
  fetchCmsContent: () => void,
  subscribeToUpdates: () => void,
  unsubscribeFromUpdates: () => void,
};

class MustDropJackpotsWidget extends PureComponent<Props> {
  componentDidMount() {
    const { fetchJackpots, fetchCmsContent, subscribeToUpdates } = this.props;

    fetchJackpots();
    fetchCmsContent();
    subscribeToUpdates();
  }

  componentWillUnmount() {
    this.props.unsubscribeFromUpdates();
  }

  render() {
    const { isFetched, jackpots } = this.props;

    if (!isFetched) {
      return <MustDropJackpotsWidgetSkeleton />;
    }

    return (
      <a
        href="/en/games/must-drop-jackpots"
        className="o-flex--vertical u-width--full u-height--full t-border-r--md u-overflow-hidden"
      >
        {jackpots.map(jackpot => (
          <MustDropJackpot key={jackpot.id} jackpot={jackpot} />
        ))}
      </a>
    );
  }
}

export default MustDropJackpotsWidget;
