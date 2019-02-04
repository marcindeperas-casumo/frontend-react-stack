// @flow
import React, { PureComponent } from "react";
import CuratedCard from "Components/CuratedCard";
import { CURATED_SLUG, WELCOME_OFFER_CARD } from "Models/curated";

type Props = {
  hasMadeFirstDeposit: boolean,
  defaultCard: string,
  // subscribeDepositUpdates: () => void,
  // unsubscribeDepositUpdates: () => void,
};

class CuratedCardLoader extends PureComponent<Props> {
  // componentDidMount() {
  //   this.props.subscribeDepositUpdates();
  // }

  // componentWillUnmount() {
  //   this.props.unsubscribeDepositUpdates();
  // }

  render() {
    const { hasMadeFirstDeposit, defaultCard } = this.props;
    const cardToShow = !hasMadeFirstDeposit ? WELCOME_OFFER_CARD : defaultCard;
    const slug = `${CURATED_SLUG}.${cardToShow}`;

    return <CuratedCard slug={slug} />;
  }
}

export default CuratedCardLoader;
