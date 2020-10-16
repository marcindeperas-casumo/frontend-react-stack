// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import { WinsInARowBooster } from "./WinsInARowBooster";
import { BigWinsBooster } from "./BigWinsBooster";
import { MegaWinsBooster } from "./MegaWinsBooster";

type Props = {
  winsInARow: number,
  bigWins: number,
  megaWins: number,
  className?: string,
};

export function ReelRaceBoosters({
  winsInARow,
  bigWins,
  megaWins,
  className,
}: Props) {
  return (
    <Flex
      className={className}
      direction="horizontal"
      align="center"
      justify="center"
    >
      <Flex.Item>
        <WinsInARowBooster winsInARow={winsInARow} className="u-width--4xlg" />
      </Flex.Item>
      <Flex.Item>
        <BigWinsBooster bigWins={bigWins} className="u-width--4xlg" />
      </Flex.Item>
      <Flex.Item>
        <MegaWinsBooster megaWins={megaWins} className="u-width--4xlg" />
      </Flex.Item>
    </Flex>
  );
}
