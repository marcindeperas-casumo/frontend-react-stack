import Text from "@casumo/cmp-text";
import Flex from "@casumo/cmp-flex";
import { TournamentIcon, TimeLockedIcon, LaurelIcon } from "@casumo/cmp-icons";
import * as React from "react";
import { DateTime } from "luxon";
import cx from "classnames";
import * as A from "Types/apollo";
import { GameThumb } from "Components/GameThumb";
import type { TReelRacesContentPage } from "Components/ReelRacesPage/ReelRacesPageContainer";
import { interpolate } from "Utils";
import { useIsScreenMinimumTablet } from "Utils/hooks";
import { ReelRaceScheduleCardContent } from "./ReelRaceScheduleCardContent";

type Props = {
  reelRace: A.ReelRaceScheduleCard_ReelRaceFragment;
  t: TReelRacesContentPage;
  expanded: boolean;
  optInForReelRace: () => void;
};

export function ReelRaceScheduleCard({
  reelRace,
  t,
  expanded = false,
  optInForReelRace = () => {},
}: Props) {
  const [open, setOpen] = React.useState(expanded);
  const { translations } = reelRace;
  const startTimeDate = DateTime.fromMillis(reelRace.startTime);
  const isTomorrow = startTimeDate.startOf("day").diffNow("days").valueOf() > 0;

  const toggle = React.useCallback(() => setOpen(state => !state), [setOpen]);

  return (
    <div className="t-background-white u-position-relative t-border-r--md u-margin--md t-elevation--10">
      <Flex
        align="center"
        onClick={toggle}
        className={cx(
          "u-padding--md u-cursor-pointer",
          reelRace.promoted && "t-background-purple-80 t-color-white",
          open
            ? "t-border-r-top-left--md t-border-r-top-right--md"
            : "t-border-r--md"
        )}
      >
        <Flex.Item className="o-flex__item--no-shrink">
          {reelRace.promoted && (
            <LaurelIcon className="u-position-absolute t-color-yellow-30 t-background-black t-border t-border-r-top-left--md t-border-r-bottom-right--md t-border-yellow-30 o-inset-top--none o-inset-left--none u-width--lg u-height--lg u-padding--sm" />
          )}
          <GameThumb
            src={reelRace.game.backgroundImage}
            alt={reelRace.game.name}
            mark={reelRace.game.logo}
            width={60}
            height={60}
          />
        </Flex.Item>
        <Flex.Block className="u-margin-left--md">
          <Flex
            direction={open && reelRace.promoted ? "horizontal" : "vertical"}
          >
            <Flex.Block>
              <Text
                tag="div"
                className={cx(
                  "u-font",
                  !reelRace.promoted && "t-color-grey-70"
                )}
              >
                {interpolate(
                  reelRace.promoted
                    ? t?.mobile_promoted_race_title_single
                    : t?.mobile_race_title_single,
                  {
                    name: reelRace.game.name,
                  }
                )}
              </Text>
            </Flex.Block>
            <Flex.Item>
              <TournamentIcon
                size="sm"
                className={cx(
                  reelRace.promoted ? "t-color-yellow-30" : "t-color-grey-90"
                )}
              />
              <Text
                tag="span"
                className={cx(
                  "u-font-weight-bold u-margin-left--sm",
                  reelRace.promoted ? "t-color-yellow-30" : "t-color-grey-90"
                )}
              >
                {reelRace.formattedPrize}
              </Text>
            </Flex.Item>
          </Flex>
        </Flex.Block>
        <Flex.Item>
          {!open && (
            <Flex direction="vertical" align="end" spacing="none">
              <Text
                tag="p"
                size="xs"
                className={cx(
                  "u-margin-bottom--sm u-text-align-right",
                  reelRace.promoted ? "t-color-white-30" : "t-color-grey-50"
                )}
              >
                {isTomorrow ? translations.tomorrow : translations.today}
              </Text>
              <Flex direction="horizontal" align="center">
                <TimeLockedIcon
                  size="sm"
                  className={cx(
                    "u-margin-right--sm",
                    reelRace.promoted ? "t-color-yellow-30" : "t-color-grey-50"
                  )}
                />
                <Text
                  tag="p"
                  size="xs"
                  className={cx(
                    "u-font-weight-bold u-margin--none u-text-align-right",
                    reelRace.promoted ? "t-color-yellow-30" : "t-color-grey-50"
                  )}
                >
                  {startTimeDate.toFormat("t")}
                </Text>
              </Flex>
            </Flex>
          )}
        </Flex.Item>
      </Flex>
      {open && (
        <ReelRaceScheduleCardContent
          reelRace={reelRace}
          t={t}
          optIn={optInForReelRace}
          showPrizes={expanded}
        />
      )}
    </div>
  );
}
