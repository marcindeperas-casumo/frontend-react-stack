// @flow
import * as React from "react";
import Text from "@casumo/cmp-text";
import Flex from "@casumo/cmp-flex";
import Timer from "Components/Timer";

type Props = {
  endTime: number,
  spins: number,
  t: {
    spins: string,
    ending_in: string,
  },
};

export function ReelRacePlayerInfo(props: Props) {
  return (
    <Flex
      direction="horizontal"
      justify="space-between"
      className="u-padding--md"
    >
      <Flex direction="vertical" spacing="none" className="flex-1">
        <Text tag="span" size="xs">
          {props.t.ending_in}
        </Text>
        <Text
          tag="span"
          size="lg"
          className="u-font-weight-bold t-color-purple-60"
        >
          <Timer
            key={props.endTime}
            endTime={props.endTime}
            render={o => `${o.minutes}:${o.seconds}`}
            onEnd={() => "00:00"}
          />
        </Text>
      </Flex>
      <Flex direction="vertical" spacing="none" className="u-text-align-right">
        <Text tag="span" size="xs">
          {props.t.spins}
        </Text>
        <Text
          tag="span"
          size="lg"
          className="u-font-weight-bold t-color-purple-60"
        >
          {props.spins}
        </Text>
      </Flex>
    </Flex>
  );
}
