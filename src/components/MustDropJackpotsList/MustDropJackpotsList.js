// @flow
import React, { PureComponent } from "react";
import Scrollable from "@casumo/cmp-scrollable";
import { generateColumns } from "Utils";
import * as A from "Types/apollo";
import { ScrollableListTitleRow } from "Components/ScrollableListTitleRow";
import { JackpotsListTile } from "Components/JackpotsListTile";
import { ScrollableListPaginated } from "Components/ScrollableListPaginated";
import { Desktop, MobileAndTablet } from "Components/ResponsiveLayout";
import MustDropJackpotsWidget from "Components/MustDropJackpotsWidget";

const PADDING_PER_DEVICE = {
  default: "md",
  tablet: "3xlg",
  desktop: "3xlg",
};

export type Props = {
  jackpots: Array<A.GameRow_Game>,
  className?: string,
  name: string,
  seeMore: string,
};

const mustDropWidgetId = "must-drop-jackpots-widget";

export default class MustDropJackpotsList extends PureComponent<Props> {
  get columns(): Array<Array<A.GameRow_Game>> {
    // __FIX__ - sort out typing here. We're returning an array of strings or games.
    const jackpotsByColumns = generateColumns(this.props.jackpots);
    return [[mustDropWidgetId], ...jackpotsByColumns];
  }
  // __FIX__ - this will blow up.
  keyGetter = (i: number) =>
    this.columns[i].indexOf(mustDropWidgetId) !== -1
      ? mustDropWidgetId
      : this.columns[i][0];

  mobileMustDropJackpotRenderer = (i: number) => {
    const isIdMustDropWidgetId =
      this.columns[i].indexOf(mustDropWidgetId) !== -1;
    return isIdMustDropWidgetId ? (
      <MustDropJackpotsWidget />
    ) : (
      <JackpotsListTile games={this.columns[i]} />
    );
  };

  desktopMustDropJackpotRenderer = ({
    id: idsInColumn,
    i,
  }: {
    id: Array<string>,
    i: number,
  }) => {
    const isIdMustDropWidgetId = idsInColumn.indexOf(mustDropWidgetId) !== -1;

    return isIdMustDropWidgetId ? (
      <MustDropJackpotsWidget />
    ) : (
      <JackpotsListTile ids={idsInColumn} />
    );
  };

  render() {
    const { name, seeMore } = this.props;
    const seeMoreUrl = "/games/must-drop-jackpots";

    return (
      <div className="u-margin-x--3xlg@desktop">
        <div className="o-wrapper">
          <MobileAndTablet>
            <div className="u-padding-top--xlg">
              <ScrollableListTitleRow
                paddingLeft
                seeMore={{ text: seeMore, url: seeMoreUrl }}
                title={name}
              />
              <Scrollable
                keyGetter={this.keyGetter}
                numberOfItems={this.columns.length}
                itemRenderer={this.mobileMustDropJackpotRenderer}
                itemClassName="c-jackpots-list-tile"
                padding={PADDING_PER_DEVICE}
              />
            </div>
          </MobileAndTablet>
          <Desktop>
            <ScrollableListPaginated
              list={{
                name,
                itemIds: this.columns,
              }}
              Component={this.desktopMustDropJackpotRenderer}
              className="c-jackpots-list-tile u-height--full"
              // 288 it's the result of each GameRow height (96px) times the rows (3)
              tileHeight={288}
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
