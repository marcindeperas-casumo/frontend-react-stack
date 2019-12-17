// @flow
import * as React from "react";
import Text from "@casumo/cmp-text";
import Flex from "@casumo/cmp-flex";
import type { ReelRace, ReelRacesTranslations } from "Models/reelRaces";
import Timer from "Components/Timer";

type Props = {
  t: ReelRacesTranslations,
  playerSpins: number,
  reelRace: ReelRace,
  reelRaceStarted: ReelRace | null,
};

const getTimer = (time: number) => {
  if (time) {
    return (
      <Timer
        key={time}
        endTime={time}
        render={o => `${o.minutes}:${o.seconds}`}
        onEnd={() => "00:00"}
      />
    );
  }
};

export function ReelRaceWidgetInfo(props: Props) {
  const { t, reelRace, reelRaceStarted } = props;
  const time = reelRaceStarted ? reelRace.endTime : reelRace.startTime;

  return (
    <Flex
      direction="horizontal"
      justify="space-between"
      className="u-padding--md"
    >
      <Flex direction="vertical" spacing="none" className="flex-1">
        <Text tag="span" size="xs">
          {reelRaceStarted ? t.ending_in : t.starting_in}
        </Text>
        <Text tag="span" size="lg" className="u-font-weight-bold t-color-plum">
          {getTimer(time)}
        </Text>
      </Flex>
      <Flex direction="vertical" spacing="none" className="u-text-align-right">
        <Text tag="span" size="xs" className="u-opacity-75">
          {t.spins}
        </Text>
        <Text tag="span" size="lg" className="u-font-weight-bold t-color-plum">
          {reelRaceStarted && props.playerSpins !== null
            ? props.playerSpins
            : reelRace.spins}
        </Text>
      </Flex>
    </Flex>
  );
}
