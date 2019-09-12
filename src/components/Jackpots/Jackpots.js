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

const JackpotsColumn = ({ column }) => {
  return (
    <List
      itemSpacing="sm"
      items={column}
      render={jackpot => (
        <GameRow
          game={jackpot}
          onLaunchGame={() => launchGame({ slug: jackpot.slug })}
        />
      )}
    />
  );
};

// we are bond to use "id" because of the cellRenderer method inside ScrollableListPaginated.js
const JackpotColumnRenderer = ({ id: idsInColumn, i }) => (
  <JackpotsColumn key={`jackpots-column-${i}`} column={idsInColumn} />
);

export default class Jackpots extends PureComponent<Props> {
  static defaultProps = {
    jackpots: [],
    title: "",
  };

  render() {
    const { jackpots, title } = this.props;
    const columns = generateColumns(jackpots);
    const itemClassName = "c-jackpots-list-tile";

    return (
      <div className="u-margin-x--3xlg@desktop">
        <div className="o-wrapper">
          <Mobile>
            <div className="u-padding-top--xlg" data-test="scrollable-jackpots">
              <ScrollableListTitle paddingLeft title={title} />
              <Scrollable
                itemClassName={itemClassName}
                padding={PADDING_PER_DEVICE}
                itemSpacing="md"
              >
                {columns.map((id, i) => JackpotColumnRenderer({ id, i }))}
              </Scrollable>
            </div>
          </Mobile>
          <Desktop>
            <ScrollableListPaginated
              list={{
                title,
                itemIds: columns,
              }}
              Component={JackpotColumnRenderer}
              className={itemClassName}
              itemSpacing="md"
              itemControlClass="c-scrollable-list-paginated__button"
              tileHeight={315}
            />
          </Desktop>
        </div>
      </div>
    );
  }
}
