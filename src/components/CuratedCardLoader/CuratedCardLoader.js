// @flow
import React, { PureComponent } from "react";
import CuratedCard from "Components/CuratedCard";
import { CURATED_SLUG, WELCOME_OFFER_CARD } from "Models/curated";

type Props = {
  hasMadeFirstDeposit: boolean,
  defaultCardSlug: string,
};

class CuratedCardLoader extends PureComponent<Props> {
  render() {
    const { hasMadeFirstDeposit, defaultCardSlug } = this.props;
    const cardToShow = !hasMadeFirstDeposit
      ? WELCOME_OFFER_CARD
      : defaultCardSlug;
    const slug = `${CURATED_SLUG}.${cardToShow}`;

    return <CuratedCard slug={slug} />;
  }
}

export default CuratedCardLoader;
