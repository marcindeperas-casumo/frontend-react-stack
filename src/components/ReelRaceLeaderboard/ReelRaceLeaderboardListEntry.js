// @flow
import * as React from "react";
import cx from "classnames";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { LaurelPosition } from "./LaurelPosition";
import { Prize } from "./Prize";

type Props = {
  position: number,
  text: string,
  prize?: ?string,
  points: number,
  highlighted?: boolean,
  className?: string,
};

export const ReelRaceLeaderboardListEntry = ({
  position,
  text,
  prize,
  points,
  highlighted,
  className,
}: Props) => (
  <Flex
    align="center"
    className={cx(
      "u-padding-y--sm u-padding-right--lg",
      {
        "t-background-yellow-30": highlighted,
      },
      className
    )}
  >
    <Flex.Item>
      <LaurelPosition
        position={position}
        highlighted={highlighted}
        showLaurel={Boolean(prize)}
      />
    </Flex.Item>
    <Flex.Block>
      <Text tag="div">{text}</Text>
    </Flex.Block>
    <Flex.Item>
      {prize && <Prize prize={prize} highlighted={highlighted} />}
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
