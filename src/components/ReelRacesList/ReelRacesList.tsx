// @flow
import * as React from "react";
import classNames from "classnames";
import ScrollableList from "Components/ScrollableList";
import * as A from "Types/apollo";
// __FIX__ Why can't it resolve "Components/ReelRaceCard"?
import { ReelRaceCardContainer as ReelRaceCard } from "Components/ReelRaceCard/ReelRaceCardContainer";
import { ScrollableListPaginated } from "Components/ScrollableListPaginated";
import { Desktop, MobileAndTablet } from "Components/ResponsiveLayout";
import { topMarginClasses } from "Components/GameListHorizontal/constants";

type Props = {
  title: ?string,
  seeMore: ?string,
};

type ReelRacesListProps = Props & A.ReelRaceListQuery;

export class ReelRacesList extends React.PureComponent<ReelRacesListProps> {
  render() {
    const { title, seeMore, reelRaces } = this.props;
    const seeMoreUrl = "/reel-races";

    const itemRenderer = ({ columnIndex, style }) => (
      <div style={style}>
        <div
          className={classNames("c-reel-race-card", {
            "u-margin-left": columnIndex > 0,
          })}
        >
          <ReelRaceCard reelRace={reelRaces[columnIndex]} />
        </div>
      </div>
    );

    return (
      <div className={`o-wrapper ${topMarginClasses}`}>
        <MobileAndTablet>
          <ScrollableList
            title={title}
            itemClassName="c-reel-race-card"
            items={reelRaces}
            itemRenderer={i => <ReelRaceCard reelRace={reelRaces[i]} />}
            Component={ReelRaceCard}
            {...(seeMore ? { seeMoreText: seeMore, seeMoreUrl } : {})}
          />
        </MobileAndTablet>
        <Desktop>
          <ScrollableListPaginated
            title={title}
            itemCount={reelRaces.length}
            itemRenderer={itemRenderer}
            itemControlClass="c-scrollable-list-paginated__reel_races-button"
            tileHeight={220}
            {...(seeMore
              ? { seeMore: { text: seeMore, url: seeMoreUrl } }
              : {})}
          />
        </Desktop>
      </div>
    );
  }
}
