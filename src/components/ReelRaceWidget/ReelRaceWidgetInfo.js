// @flow
import * as React from "react";
import Text from "@casumo/cmp-text";
import Flex from "@casumo/cmp-flex";
import type { ReelRace, ReelRacesTranslations } from "Models/reelRaces";
import Timer from "Components/Timer";

type Props = {
  t: ReelRacesTranslations,
  reelRace: ReelRace,
};

export function ReelRaceWidgetInfo(props: Props) {
  const { t, reelRace } = props;

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
        <Text tag="span" size="lg" className="u-font-weight-bold t-color-plum">
          <Timer
            key={reelRace.startTime}
            endTime={reelRace.startTime}
            render={o => `${o.minutes}:${o.seconds}`}
            onEnd={() => "00:00"}
          />
        </Text>
      </Flex>
      <Flex direction="vertical" spacing="none" className="u-text-align-right">
        <Text tag="span" size="xs">
          {t.spins}
        </Text>
        <Text tag="span" size="lg" className="u-font-weight-bold t-color-plum">
          {reelRace.spins}
        </Text>
      </Flex>
    </Flex>
  );
}
