// @flow
import * as React from "react";
import cx from "classnames";
import Text from "@casumo/cmp-text";
import Flex from "@casumo/cmp-flex";
import { TournamentIcon, TimeLockedIcon, LaurelIcon } from "@casumo/cmp-icons";
import { DateTime } from "luxon";
import * as A from "Types/apollo";
import { GameThumb } from "Components/GameThumb";
import type { ReelRacesContentPage } from "Components/ReelRacesPage/ReelRacesPageContainer";
import { interpolate } from "Utils";

type Props = {
  reelRace: A.ReelRaceScheduleCard_ReelRace,
  t: ReelRacesContentPage,
};

export function ReelRaceScheduleCard({ reelRace, t }: Props) {
  const [open, setOpen] = React.useState(false);
  const { translations } = reelRace;
  const startTimeDate = DateTime.fromMillis(reelRace.startTime);
  const isTomorrow = startTimeDate.startOf("day").diffNow("days") > 0;

  const toggle = React.useCallback(() => setOpen(state => !state), [setOpen]);

  return (
    <div
      onClick={toggle}
      className="t-background-white u-position-relative t-border-r--md u-margin--md t-elevation--10"
    >
      <Flex
        className={cx(
          "u-padding--md",
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
        <Flex.Block direction="vertical" className="u-margin-left--md">
          <Text tag="div" className="u-font-weight-bold u-margin-bottom">
            {interpolate(
              reelRace.promoted
                ? t?.mobile_promoted_race_title_single
                : t?.mobile_race_title_single,
              {
                name: reelRace.game.name,
              }
            )}
          </Text>
          <Flex spacing="none">
            <TimeLockedIcon
              size="sm"
              className={cx(
                "u-margin-right",
                reelRace.promoted && "t-color-yellow-30"
              )}
            />
            <Text tag="span" size="sm" className="u-font-weight-bold">
              {`${
                isTomorrow ? translations.tomorrow : translations.today
              } ${startTimeDate.toFormat("t")}`}
            </Text>
          </Flex>
        </Flex.Block>
        <Flex className="u-margin-left">
          <TournamentIcon
            className={cx(
              reelRace.promoted ? "t-color-yellow-30" : "t-color-grey-50"
            )}
          />
          <Text tag="span" className="u-font-weight-bold u-margin-left--sm">
            {reelRace.formattedPrize}
          </Text>
        </Flex>
      </Flex>
      {open && <Flex>hi</Flex>}
    </div>
  );
}
