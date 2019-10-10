// @flow
import React, { PureComponent } from "react";
import Scrollable from "@casumo/cmp-scrollable";
import { generateColumns } from "Utils";
import { ScrollableListTitleRow } from "Components/ScrollableListTitleRow";
import JackpotsListTile from "Components/JackpotsListTile";
import { ScrollableListPaginated } from "Components/ScrollableListPaginated";
import { Desktop, Mobile } from "Components/ResponsiveLayout";
import MustDropJackpotsWidget from "Components/MustDropJackpotsWidget";

const PADDING_PER_DEVICE = {
  default: "md",
  tablet: "3xlg",
  desktop: "3xlg",
};

export type Props = {
  ids: Array<string>,
  className?: string,
  title: string,
  seeMore: string,
};

const mustDropWidgetId = "must-drop-jackpots-widget";

export default class MustDropJackpotsList extends PureComponent<Props> {
  get items(): Array<Array<string>> {
    const idsByColumns = generateColumns(this.props.ids);
    return [[mustDropWidgetId], ...idsByColumns];
  }

  keyGetter = (i: number) =>
    this.items[i].indexOf(mustDropWidgetId) !== -1
      ? `must-drop-jackpots-tile-${i}`
      : `jackpots-column-${i}`;

  mobileMustDropJackpotRenderer = (i: number) => {
    const isIdMustDropWidgetId = this.items[i].indexOf(mustDropWidgetId) !== -1;

    return isIdMustDropWidgetId ? (
      <MustDropJackpotsWidget />
    ) : (
      <JackpotsListTile ids={this.items[i]} />
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
      <MustDropJackpotsWidget key={mustDropWidgetId} />
    ) : (
      <JackpotsListTile
        ids={idsInColumn}
        key={`must-drop-jackpots-tile-${i}`}
      />
    );
  };

  render() {
    const { title, seeMore } = this.props;
    const seeMoreUrl = "/games/must-drop-jackpots";

    return (
      <div className="u-margin-x--3xlg@desktop">
        <div className="o-wrapper">
          <Mobile>
            <div className="u-padding-top--xlg">
              <ScrollableListTitleRow
                paddingLeft
                seeMore={{ text: seeMore, url: seeMoreUrl }}
                title={title}
              />
              <Scrollable
                keyGetter={this.keyGetter}
                numberOfItems={this.items.length}
                itemRenderer={this.mobileMustDropJackpotRenderer}
                itemClassName="c-jackpots-list-tile"
                padding={PADDING_PER_DEVICE}
              />
            </div>
          </Mobile>
          <Desktop>
            <ScrollableListPaginated
              list={{
                title,
                itemIds: this.items,
              }}
              Component={this.desktopMustDropJackpotRenderer}
              className="c-jackpots-list-tile u-height--full"
              itemControlClass="c-scrollable-list-paginated__button"
              tileHeight={315}
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
