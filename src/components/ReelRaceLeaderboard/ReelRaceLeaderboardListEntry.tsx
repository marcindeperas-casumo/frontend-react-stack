import * as React from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import cx from "classnames";
import { isMobile } from "Components/ResponsiveLayout";
import { LaurelPosition } from "./LaurelPosition";
import { Prize } from "./Prize";
import SpinSymbol from "./images/spin-symbol.svg";

import "./ReelRaceLeaderboardListEntry.scss";

type Props = {
  position: number;
  remainingSpins?: number;
  spinLimit?: number;
  showSpins?: boolean;
  text: string;
  prize?: string | undefined;
  points: number;
  highlighted?: boolean;
  className?: string;
  showLaurel?: boolean;
  inverted?: boolean;
};

type RemainingSpinsProps = {
  remainingSpins: number;
  spinLimit: number;
};

function RemainingSpins({ remainingSpins, spinLimit }: RemainingSpinsProps) {
  const SPINS_WARNING_THRESHOLD = 0.15;

  const isRemainingSpinsRunOut = React.useCallback(
    () => remainingSpins / spinLimit < SPINS_WARNING_THRESHOLD,
    [remainingSpins, spinLimit]
  );

  return (
    <Flex.Item
      className={cx(
        "c-reel-race__remaining-spins text-grey-50 o-flex-justify--center u-padding-y--sm u-padding-x o-flex-align--center t-border-r--lg",
        {
          "opacity-100": isMobile(),
          "text-red-30 opacity-100": isRemainingSpinsRunOut(),
        }
      )}
    >
      <SpinSymbol className={"c-reel-race__spin-symbol"} />
      <div className="u-margin-left--sm font-bold">{remainingSpins}</div>
    </Flex.Item>
  );
}

export const ReelRaceLeaderboardListEntry = React.forwardRef<
  HTMLDivElement,
  Props
>(
  (
    {
      position,
      remainingSpins,
      spinLimit,
      showSpins = false,
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
        "t-opacity-background-100 o-flex-space-between",
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
      <Flex.Block className="c-reel-race__nickname min-w-[90px]">
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
      {showSpins && (
        <RemainingSpins remainingSpins={remainingSpins} spinLimit={spinLimit} />
      )}
      <Flex.Item>
        <Text tag="div" className="u-font-weight-bold u-text-align-right w-[50px]">
          {points}
        </Text>
      </Flex.Item>
    </Flex>
  )
);
