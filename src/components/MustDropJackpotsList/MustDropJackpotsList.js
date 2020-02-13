// @flow
import React, { PureComponent } from "react";
import classNames from "classnames";
import Scrollable from "@casumo/cmp-scrollable";
import type { CellRendererParams } from "react-virtualized";
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
  seeMoreText: string,
};

const MUST_DROP_WIDGET_ID = "must-drop-jackpots-widget";

export default class MustDropJackpotsList extends PureComponent<Props> {
  get columns(): Array<Array<A.GameRow_Game>> {
    const jackpotsByColumns = generateColumns(this.props.jackpots);
    // __FIX__ - sort out typing here. We're returning an array of string or game.
    // $FlowFixMe
    return [[MUST_DROP_WIDGET_ID], ...jackpotsByColumns];
  }

  keyGetter = (i: number) =>
    this.columns[i].indexOf(MUST_DROP_WIDGET_ID) !== -1
      ? MUST_DROP_WIDGET_ID
      : this.columns[i][0].id;

  mobileMustDropJackpotRenderer = (i: number) => {
    const isIdMustDropWidgetId =
      this.columns[i].indexOf(MUST_DROP_WIDGET_ID) !== -1;
    return isIdMustDropWidgetId ? (
      <MustDropJackpotsWidget key={MUST_DROP_WIDGET_ID} />
    ) : (
      <JackpotsListTile games={this.columns[i]} />
    );
  };

  desktopMustDropJackpotRenderer = ({
    columnIndex,
    style,
  }: CellRendererParams) => {
    const isIdMustDropWidgetId =
      this.columns[columnIndex].indexOf(MUST_DROP_WIDGET_ID) !== -1;
    const isNotFirstElement = columnIndex > 0;

    const elementClassNames = classNames(
      "u-height--full c-jackpots-list-tile",
      {
        "u-margin-left": isNotFirstElement,
      }
    );

    return (
      <div style={style}>
        <div className={elementClassNames}>
          {isIdMustDropWidgetId ? (
            <MustDropJackpotsWidget />
          ) : (
            <JackpotsListTile games={this.columns[columnIndex]} />
          )}
        </div>
      </div>
    );
  };

  render() {
    const { name, seeMoreText } = this.props;
    const seeMoreUrl = "/games/must-drop-jackpots";

    return (
      <div className="u-margin-x--3xlg@desktop">
        <div className="o-wrapper">
          <MobileAndTablet>
            <div className="u-padding-top--xlg">
              <ScrollableListTitleRow
                paddingLeft
                seeMore={{ text: seeMoreText, url: seeMoreUrl }}
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
              title={name}
              itemCount={this.columns.length}
              itemRenderer={this.desktopMustDropJackpotRenderer}
              tileHeight={288} // each GameRow height (96px) * n rows (3)
              seeMore={{ text: seeMoreText, url: seeMoreUrl }}
            />
          </Desktop>
        </div>
      </div>
    );
  }
}
