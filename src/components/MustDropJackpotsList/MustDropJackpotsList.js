// @flow
import React, { PureComponent } from "react";
import Scrollable from "@casumo/cmp-scrollable";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
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
  seeMore: string,
};

export default class MustDropJackpotsList extends PureComponent<Props> {
  render() {
    const { ids, title, seeMore } = this.props;
    const idsByColumns = generateColumns(ids);

    return (
      <div className="u-padding-top--xlg">
        <Flex justify="space-between">
          <Flex.Item>
            <ScrollableListTitle title={title} />
          </Flex.Item>
          <Flex.Item className="u-padding-right--md">
            <a href="/games/must-drop-jackpots">
              <Text tag="h3" className="t-color-blue">
                {seeMore}
              </Text>
            </a>
          </Flex.Item>
        </Flex>
        <Scrollable padding={PADDING_PER_DEVICE} itemSpacing="md">
          <div className="c-jackpots-list-tile o-flex o-flex__item o-flex__item-fixed-size">
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
