// @flow
import * as React from "react";
import type { ReelRacesTranslations } from "Models/reelRaces";
import ScrollableList from "Components/ScrollableList";
import ReelRaceCard from "Components/ReelRaceCard";

type Props = {
  areTranslationsFetched: boolean,
  fetchReelRaces: () => void,
  fetchTranslations: () => void,
  subscribeReelRacesUpdates: () => void,
  unsubscribeReelRacesUpdates: () => void,
  t: ReelRacesTranslations & { more_link: string },
  reelRacesIds: Array<string>,
  isFetched: boolean,
};

export class ReelRacesList extends React.PureComponent<Props> {
  componentDidMount() {
    if (!this.props.isFetched) {
      this.props.fetchReelRaces();
    }

    if (!this.props.areTranslationsFetched) {
      this.props.fetchTranslations();
    }

    this.props.subscribeReelRacesUpdates();
  }

  componentWillUnmount() {
    this.props.unsubscribeReelRacesUpdates();
  }

  render() {
    if (!this.props.areTranslationsFetched) {
      return null;
    }
    const { t } = this.props;

    return (
      <ScrollableList
        title={t.title}
        seeMoreText={t.more_link}
        seeMoreUrl="/reel-races"
        itemIds={this.props.reelRacesIds}
        Component={ReelRaceCard}
      />
    );
  }
}
