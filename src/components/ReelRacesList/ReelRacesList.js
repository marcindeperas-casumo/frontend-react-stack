// @flow
import * as React from "react";
import classNames from "classnames";
import ScrollableList from "Components/ScrollableList";
import * as A from "Types/apollo";
// __FIX__ Why can't it resolve "Components/ReelRaceCard"?
import { ReelRaceCardContainer as ReelRaceCard } from "Components/ReelRaceCard/ReelRaceCardContainer";
import { ScrollableListPaginated } from "Components/ScrollableListPaginated";
import { Desktop, MobileAndTablet } from "Components/ResponsiveLayout";

export class ReelRacesList extends React.PureComponent<A.ReelRaceListQuery> {
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
      <div className="u-margin-x--3xlg@desktop">
        <div className="o-wrapper">
          <MobileAndTablet>
            <ScrollableList
              title={title}
              itemClassName="c-reel-race-card"
              seeMoreText={seeMore}
              seeMoreUrl={seeMoreUrl}
              items={reelRaces}
              itemRenderer={i => <ReelRaceCard reelRace={reelRaces[i]} />}
              Component={ReelRaceCard}
            />
          </MobileAndTablet>
          <Desktop>
            <ScrollableListPaginated
              title={title}
              itemCount={reelRaces.length}
              itemRenderer={itemRenderer}
              itemControlClass="c-scrollable-list-paginated__reel_races-button"
              tileHeight={248}
              seeMore={{
                text: seeMore,
                url: seeMoreUrl,
              }}
            />
          </Desktop>
        </div>
      </div>
    );
  }
}
