// @flow
import React, { PureComponent } from "react";
import Scrollable from "@casumo/cmp-scrollable";
import { generateColumns } from "Utils/utils";
import MustDropJackpotsListTile from "./MustDropJackpotsListTile";
import ScrollableListTitle from "Components/ScrollableListTitle";
import "./MustDropJackpotsList.scss";

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

export default class Jackpots extends PureComponent<Props> {
  render() {
    const { ids, title } = this.props;
    const idsByColumns = generateColumns(ids);

    return (
      <div className="u-padding-top--xlg">
        <ScrollableListTitle title={title} />
        <Scrollable padding={PADDING_PER_DEVICE} itemSpacing="md">
          {idsByColumns.map((columnIds, i) => (
            <MustDropJackpotsListTile
              ids={columnIds}
              key={`must-drop-jackpots-tile-${i}`}
            />
          ))}
        </Scrollable>
      </div>
    );
  }
}
