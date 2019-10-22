// @flow
import React, { PureComponent } from "react";
import List from "@casumo/cmp-list";
import Scrollable from "@casumo/cmp-scrollable";
import { launchGame } from "Services/LaunchGameService";
import ScrollableListTitle from "Components/ScrollableListTitle";
import { ScrollableListPaginated } from "Components/ScrollableListPaginated";
import { Desktop, Mobile } from "Components/ResponsiveLayout";
import { GameRow } from "Components/GameRow/GameRow";
import { generateColumns } from "Utils";

const PADDING_PER_DEVICE = {
  default: "md",
  tablet: "3xlg",
  desktop: "3xlg",
};

export type Props = {
  jackpots: Array<Jackpots_Game>,
  className?: string,
  title: string,
};

const JackpotsColumn = ({ column }: { column: Array<Jackpots_Game> }) => {
  return (
    <List
      itemSpacing="sm"
      items={column}
      render={jackpot => (
        <GameRow
          game={jackpot}
          className="t-background-white t-border-r--md t-box-shadow"
          onLaunchGame={() => launchGame({ slug: jackpot.slug })}
        />
      )}
    />
  );
};

export default class Jackpots extends PureComponent<Props> {
  static defaultProps = {
    jackpots: [],
    title: "",
  };

  get columns(): Array<Array<Jackpots_Game>> {
    return generateColumns(this.props.jackpots);
  }

  keyGetter = (i: number) => this.columns[i][0].slug;

  mobileJackpotColumnRenderer = (i: number) => {
    return <JackpotsColumn column={this.columns[i]} />;
  };

  desktopJackpotColumnRenderer = ({
    id: gamesInColumn,
    i,
  }: {
    id: Array<Jackpots_Game>,
    i: number,
  }) => <JackpotsColumn key={gamesInColumn[0].slug} column={gamesInColumn} />;

  render() {
    const { title } = this.props;

    return (
      <div className="u-margin-x--3xlg@desktop">
        <div className="o-wrapper">
          <Mobile>
            <div className="u-padding-top--xlg" data-test="scrollable-jackpots">
              <ScrollableListTitle paddingLeft title={title} />
              <Scrollable
                keyGetter={this.keyGetter}
                itemRenderer={this.mobileJackpotColumnRenderer}
                numberOfItems={this.columns.length}
                itemClassName="c-jackpots-list-tile"
                padding={PADDING_PER_DEVICE}
              />
            </div>
          </Mobile>
          <Desktop>
            <ScrollableListPaginated
              list={{
                title,
                itemIds: this.columns,
              }}
              Component={this.desktopJackpotColumnRenderer}
              className="c-jackpots-list-tile"
              itemControlClass="c-scrollable-list-paginated__button"
              tileHeight={315}
            />
          </Desktop>
        </div>
      </div>
    );
  }
}
