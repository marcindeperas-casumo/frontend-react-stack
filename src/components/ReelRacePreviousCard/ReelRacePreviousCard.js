// @flow
import * as React from "react";
import cx from "classnames";
import Text from "@casumo/cmp-text";
import Flex from "@casumo/cmp-flex";
import { TimeLockedIcon } from "@casumo/cmp-icons";
import { DateTime } from "luxon";
import * as A from "Types/apollo";
import { GameThumb } from "Components/GameThumb";
import type { ReelRacesContentPage } from "Components/ReelRacesPage/ReelRacesPage";
import { interpolate } from "Utils";
import { useIsScreenMinimumTablet } from "Utils/hooks";
import { ReelRacePreviousCardWinners } from "./ReelRacePreviousCardWinners";

type Props = {
  reelRace: A.ReelRacePreviousCard_ReelRace,
  t: ReelRacesContentPage,
  expanded: boolean,
};

export function ReelRacePreviousCard({ reelRace, t, expanded = false }: Props) {
  const [open, setOpen] = React.useState(expanded);
  const isNotMobile = useIsScreenMinimumTablet();
  const startTimeDate = DateTime.fromMillis(reelRace.startTime);

  const toggle = React.useCallback(() => setOpen(state => !state), [setOpen]);

  return (
    <div className="t-background-white u-position-relative t-border-r--md u-margin--md t-elevation--10">
      <Flex
        align="center"
        onClick={toggle}
        className="u-padding--md u-cursor-pointer t-border-r--md"
      >
        <Flex.Item className="o-flex__item--no-shrink">
          <GameThumb
            src={reelRace.game.backgroundImage}
            alt={reelRace.game.name}
            mark={reelRace.game.logo}
            width={60}
            height={60}
          />
        </Flex.Item>
        <Flex.Block direction="vertical" className="u-margin-left--md">
          <Text tag="div" className="u-font-weight-bold u-margin-bottom">
            {interpolate(t?.mobile_race_title_single, {
              name: reelRace.game.name,
            })}
          </Text>
        </Flex.Block>
        <Flex
          className={cx("u-margin-left", isNotMobile && "u-margin-right--lg")}
          align={isNotMobile ? "center" : "normal"}
        >
          <TimeLockedIcon className="t-color-grey-50" />
          <Text tag="span" className="u-font-weight-bold u-margin-left--sm">
            {startTimeDate.toFormat("t")}
          </Text>
        </Flex>
      </Flex>
      <ReelRacePreviousCardWinners reelRace={reelRace} t={t} expanded={open} />
    </div>
  );
}
