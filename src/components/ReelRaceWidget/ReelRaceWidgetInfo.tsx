import Text from "@casumo/cmp-text";
import Flex from "@casumo/cmp-flex";
import * as React from "react";
import * as A from "Types/apollo";
import Timer from "Components/Timer";
import type { ReelRacesTranslations } from "Models/reelRaces";

type Props = A.ReelRaceWidgetQuery["reelRaces"][number] & {
  t: ReelRacesTranslations;
};
export function ReelRaceWidgetInfo({ t, ...props }: Props) {
  return (
    <Flex
      direction="horizontal"
      justify="space-between"
      className="u-padding--md"
    >
      <Flex direction="vertical" spacing="none" className="flex-1">
        <Text tag="span" size="xs">
          {t.starting_in}
        </Text>
        <Text
          tag="span"
          size="lg"
          className="u-font-weight-bold text-purple-60"
        >
          <Timer
            endTime={props.startTime}
            render={o => `${o.minutes}:${o.seconds}`}
            onEnd={() => "00:00"}
          />
        </Text>
      </Flex>
      <Flex direction="vertical" spacing="none" className="u-text-align-right">
        <Text tag="span" size="xs">
          {t.spins}
        </Text>
        <Text
          tag="span"
          size="lg"
          className="u-font-weight-bold text-purple-60"
        >
          {props.spinLimit}
        </Text>
      </Flex>
    </Flex>
  );
}
