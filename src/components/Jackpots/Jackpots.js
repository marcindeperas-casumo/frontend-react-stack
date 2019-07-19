// @flow
import React, { PureComponent } from "react";
import List from "@casumo/cmp-list";
import Scrollable from "@casumo/cmp-scrollable";
import { launchGame } from "Services/LaunchGameService";
import ScrollableListTitle from "Components/ScrollableListTitle";
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

export default class Jackpots extends PureComponent<Props> {
  static defaultProps = {
    jackpots: [],
    title: "",
  };

  render() {
    const { jackpots, title } = this.props;
    const columns = generateColumns(jackpots);

    return (
      <div className="u-padding-top--xlg">
        <ScrollableListTitle paddingLeft title={title} />
        <Scrollable
          itemClassName="c-jackpots-list-tile"
          padding={PADDING_PER_DEVICE}
          itemSpacing="md"
        >
          {columns.map((column, i) => (
            <JackpotsColumn key={`jackpots-column-${i}`} column={column} />
          ))}
        </Scrollable>
      </div>
    );
  }
}

function JackpotsColumn({ column }) {
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
}
