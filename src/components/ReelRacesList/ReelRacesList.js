// @flow
import * as React from "react";
import type { ReelRacesTranslations } from "Models/reelRaces";
import ScrollableList from "Components/ScrollableList";
import { ReelRaceCard } from "Components/ReelRaceCard";
import { ScrollableListPaginated } from "Components/ScrollableListPaginated";
import { Desktop, MobileAndTablet } from "Components/ResponsiveLayout";

type Props = {
  areTranslationsFetched: boolean,
  title: string,
  reelRaces: Array<string>,
  isFetched: boolean,
};

export class ReelRacesList extends React.PureComponent<Props> {
  render() {
    if (!this.props.areTranslationsFetched) {
      return null;
    }
    const { title } = this.props;
    const seeMoreUrl = "/reel-races";

    return (
      <div className="u-margin-x--3xlg@desktop">
        <div className="o-wrapper">
          <MobileAndTablet>
            <ScrollableList
              title={title}
              seeMoreText="..."
              seeMoreUrl={seeMoreUrl}
              items={this.props.reelRaces}
              Component={ReelRaceCard}
            />
          </MobileAndTablet>
          <Desktop>
            <ScrollableListPaginated
              list={{
                title: title,
                itemIds: this.props.reelRaces,
              }}
              Component={ReelRaceCard}
              className="c-reel-race-card"
              itemControlClass="c-scrollable-list-paginated__reel_races-button"
              tileHeight={248}
              seeMore={{
                text: "...",
                url: seeMoreUrl,
              }}
            />
          </Desktop>
        </div>
      </div>
    );
  }
}
