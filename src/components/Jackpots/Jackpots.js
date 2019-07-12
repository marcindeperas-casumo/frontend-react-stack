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

const JackpotColumnRenderer = ({ id, i }) => (
  <JackpotsColumn key={`jackpots-column-${i}`} column={id} />
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
      <div className="o-wrapper">
        <Mobile>
          <div className="u-padding-top--xlg" data-test="scrollable-jackpots">
            <ScrollableListTitle paddingLeft={true} title={title} />
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
            itemControlClass="c-game-list-horizontal-desktop-paginated__button"
            tileHeight={291}
          />
        </Desktop>
      </div>
    );
  }
}
