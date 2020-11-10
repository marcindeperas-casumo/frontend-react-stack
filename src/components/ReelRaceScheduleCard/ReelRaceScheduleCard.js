// @flow
import * as React from "react";
import cx from "classnames";
import Text from "@casumo/cmp-text";
import Flex from "@casumo/cmp-flex";
import { TournamentIcon, TimeLockedIcon, LaurelIcon } from "@casumo/cmp-icons";
import { DateTime } from "luxon";
import { useMutation } from "@apollo/react-hooks";
import * as A from "Types/apollo";
import { GameThumb } from "Components/GameThumb";
import type { ReelRacesContentPage } from "Components/ReelRacesPage/ReelRacesPage";
import { interpolate } from "Utils";
import { useIsScreenMinimumTablet } from "Utils/hooks";
import { ReelRaceScheduleCardContent } from "./ReelRaceScheduleCardContent";
import { ReelRaceOptInMutation } from "./ReelRaceScheduleCard.graphql";

type Props = {
  reelRace: A.ReelRaceScheduleCard_ReelRace,
  t: ReelRacesContentPage,
  expanded: boolean,
};

export function ReelRaceScheduleCard({ reelRace, t, expanded = false }: Props) {
  const [open, setOpen] = React.useState(expanded);
  const [optInForReelRace] = useMutation(ReelRaceOptInMutation, {
    variables: {
      id: reelRace.id,
    },
    optimisticResponse: {
      __typename: "Mutation",
      optInForReelRace: {
        __typename: "ReelRace",
        id: reelRace.id,
        optedIn: true,
      },
    },
  });
  const isNotMobile = useIsScreenMinimumTablet();
  const { translations } = reelRace;
  const startTimeDate = DateTime.fromMillis(reelRace.startTime);
  const isTomorrow = startTimeDate.startOf("day").diffNow("days") > 0;

  const toggle = React.useCallback(() => setOpen(state => !state), [setOpen]);

  return (
    <div className="t-background-white u-position-relative t-border-r--md u-margin--md t-elevation--10">
      <Flex
        align={open && isNotMobile ? "center" : "normal"}
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
          {!open && (
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
          )}
        </Flex.Block>
        <Flex
          className={cx("u-margin-left", isNotMobile && "u-margin-right--lg")}
          align={isNotMobile ? "center" : "normal"}
        >
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
      {open && (
        <ReelRaceScheduleCardContent
          reelRace={reelRace}
          t={t}
          // $FlowFixMe
          optIn={optInForReelRace}
          showPrizes={open}
        />
      )}
    </div>
  );
}
