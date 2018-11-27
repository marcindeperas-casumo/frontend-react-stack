// @flow
import React, { PureComponent } from "react";
import Scrollable from "@casumo/cmp-scrollable";
import { generateColumns } from "Utils/utils";
import ScrollableListTitle from "Components/ScrollableListTitle";
import JackpotsListTile from "Components/JackpotsListTile";
import MustDropJackpotsWidget from "Components/MustDropJackpotsWidget";

const PADDING_PER_DEVICE = {
  default: "md",
  tablet: "2xlg",
  desktop: "2xlg",
};

export type Props = {
  ids: Array<string>,
  className?: string,
  title: string,
};

export default class MustDropJackpotsList extends PureComponent<Props> {
  render() {
    const { ids, title } = this.props;
    const idsByColumns = generateColumns(ids);

    return (
      <div className="u-padding-top--xlg">
        <ScrollableListTitle title={title} />
        <Scrollable padding={PADDING_PER_DEVICE} itemSpacing="md">
          <div className="c-jackpots-list-tile o-flex__item o-flex__item-fixed-size u-padding-bottom--md">
            <MustDropJackpotsWidget />
          </div>
          {idsByColumns.map((columnIds, i) => (
            <JackpotsListTile
              ids={columnIds}
              key={`must-drop-jackpots-tile-${i}`}
            />
          ))}
        </Scrollable>
      </div>
    );
  }
}
