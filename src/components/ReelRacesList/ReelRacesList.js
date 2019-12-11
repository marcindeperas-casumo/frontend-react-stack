// @flow
import * as React from "react";
import type { ReelRacesTranslations } from "Models/reelRaces";
import ScrollableList from "Components/ScrollableList";
import ReelRaceCard from "Components/ReelRaceCard";
import { ScrollableListPaginated } from "Components/ScrollableListPaginated";
import { Desktop, MobileAndTablet } from "Components/ResponsiveLayout";

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
    const seeMoreUrl = "/reel-races";

    return (
      <div className="u-margin-x--3xlg@desktop">
        <div className="o-wrapper">
          <MobileAndTablet>
            <ScrollableList
              title={t.title}
              seeMoreText={t.more_link}
              seeMoreUrl={seeMoreUrl}
              itemIds={this.props.reelRacesIds}
              Component={ReelRaceCard}
            />
          </MobileAndTablet>
          <Desktop>
            <ScrollableListPaginated
              list={{
                title: t.title,
                itemIds: this.props.reelRacesIds,
              }}
              Component={ReelRaceCard}
              className="c-reel-race-card"
              itemControlClass="c-scrollable-list-paginated__reel_races-button"
              tileHeight={248}
              seeMore={{
                text: t.more_link,
                url: seeMoreUrl,
              }}
            />
          </Desktop>
        </div>
      </div>
    );
  }
}
