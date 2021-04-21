import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import * as React from "react";
import cx from "classnames";
import { LaurelPosition } from "./LaurelPosition";
import { Prize } from "./Prize";

import "./ReelRaceLeaderboardListEntry.scss";

type Props = {
  position: number;
  text: string;
  prize?: string | undefined;
  points: number;
  highlighted?: boolean;
  className?: string;
  showLaurel?: boolean;
  inverted?: boolean;
};

export const ReelRaceLeaderboardListEntry = React.forwardRef<
  HTMLDivElement,
  Props
>(
  (
    {
      position,
      text,
      prize,
      showLaurel,
      points,
      highlighted,
      inverted,
      className,
    },
    ref
  ) => (
    <Flex
      containerRef={ref}
      align="center"
      className={cx(
        "c-reel-race-leaderboard-list-entry",
        "u-width--full u-padding-y--sm u-padding-right--md u-padding-left",
        "t-opacity-background-100",
        {
          "bg-yellow-30 t-border-yellow-30": highlighted,
          "bg-white border-grey-5": !inverted && !highlighted,
          "text-black": !inverted || highlighted,
          "text-white bg-grey-90 border-grey-90": inverted && !highlighted,
        },
        className
      )}
    >
      <Flex.Item>
        <LaurelPosition
          position={position}
          highlighted={highlighted}
          showLaurel={showLaurel}
          inverted={inverted}
        />
      </Flex.Item>
      <Flex.Block>
        <Text
          tag="div"
          className={cx({
            "u-font-weight-bold": highlighted,
          })}
        >
          {text}
        </Text>
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
  )
);
