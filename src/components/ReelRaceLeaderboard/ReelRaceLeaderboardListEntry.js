// @flow
import * as React from "react";
import cx from "classnames";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { LaurelPosition } from "./LaurelPosition";
import { Price } from "./Price";

type Props = {
  position: number,
  text: string,
  price?: ?string,
  points: number,
  highlighted?: boolean,
};

export const ReelRaceLeaderboardListEntry = ({
  position,
  text,
  price,
  points,
  highlighted,
}: Props) => (
  <Flex
    align="center"
    className={cx("u-width--full u-padding-y--sm u-padding-right--lg", {
      "t-background-yellow-30": highlighted,
    })}
  >
    <Flex.Item>
      <LaurelPosition position={position} highlighted={highlighted} />
    </Flex.Item>
    <Flex.Block>
      <Text tag="div">{text}</Text>
    </Flex.Block>
    <Flex.Item>
      <Price price={price} highlighted={highlighted} />
    </Flex.Item>
    <Flex.Item>
      <Text
        tag="div"
        className="u-font-weight-bold u-margin-left u-width--2xlg u-text-align-right"
      >
        {points}
      </Text>
    </Flex.Item>
  </Flex>
);
