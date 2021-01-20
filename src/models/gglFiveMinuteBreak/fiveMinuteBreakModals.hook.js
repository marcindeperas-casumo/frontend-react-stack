// @flow
import * as React from "react";
import * as R from "ramda";
import { DateTime } from "luxon";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { fiveMinuteBreakSelector } from "Models/gglFiveMinuteBreak";
import { useSelectModal, showModal as showModalAction } from "Models/modal";
import {
  useTranslations,
  useCurrentReelRaceInfo,
  useCrossCodebaseNavigation,
} from "Utils/hooks";
import { REACT_APP_MODAL, ROUTE_IDS } from "Src/constants";
import type {
  PauseResumeGameSlugProps,
  GglRealityCheckSummary,
} from "./fiveMinuteBreak.types";

export function useFiveMinuteBreakModals({
  pauseGame,
  resumeGame,
  gameSlug,
}: PauseResumeGameSlugProps) {
  const dispatch = useDispatch();
  const t = useTranslations("ggl-five-minute-break");
  const { navigateToKO } = useCrossCodebaseNavigation();
  const {
    activeRCSession,
    activeRCBreak,
  }: GglRealityCheckSummary = useSelector(
    fiveMinuteBreakSelector,
    shallowEqual
  );
  const currentRace = useCurrentReelRaceInfo(gameSlug);
  const { modalId } = useSelectModal();
  const [visibleModal, setVisibleModal] = React.useState(null);
  const [isReelRaceModalShown, setIsReelRaceModalShown] = React.useState(false);

  const raceStartTime = DateTime.fromMillis(
    R.propOr(0, "startTime", currentRace)
  );
  const raceEndTime = DateTime.fromMillis(R.propOr(0, "endTime", currentRace));
  const sessionExpirationTime = DateTime.fromMillis(
    R.propOr(0, "expiringTime", activeRCSession)
  );
  const timeMissed = Math.round(
    raceEndTime.diff(sessionExpirationTime).as("minutes")
  );
  const tournamentLength = Math.round(
    raceEndTime.diff(raceStartTime).as("minutes")
  );

  const showModal = (id, settings) => dispatch(showModalAction(id, settings));

  React.useEffect(() => {
    // eslint-disable-next-line no-switch-statements/no-switch, default-case
    switch (modalId) {
      case null:
      case REACT_APP_MODAL.ID.GGL_FIVE_MINUTE_BREAK_ONGOING:
      case REACT_APP_MODAL.ID.GGL_FIVE_MINUTE_BREAK_FINISHED:
      case REACT_APP_MODAL.ID.GGL_FIVE_MINUTE_BREAK_REEL_RACE:
        setVisibleModal(modalId);
        break;
    }
  }, [modalId]);

  React.useEffect(() => {
    if (activeRCBreak) {
      pauseGame();
      if (
        visibleModal !== REACT_APP_MODAL.ID.GGL_FIVE_MINUTE_BREAK_ONGOING &&
        t
      ) {
        showModal(REACT_APP_MODAL.ID.GGL_FIVE_MINUTE_BREAK_ONGOING, {
          content: t,
          timeLeft: activeRCBreak.expiringTime,
          extraActionOnAccept: () => {
            navigateToKO(ROUTE_IDS.TOP_LISTS);
          },
        });
      }

      return;
    }

    if (
      !activeRCBreak &&
      visibleModal === REACT_APP_MODAL.ID.GGL_FIVE_MINUTE_BREAK_ONGOING
    ) {
      resumeGame();
      showModal(REACT_APP_MODAL.ID.GGL_FIVE_MINUTE_BREAK_FINISHED, {
        content: t,
      });
      return;
    }

    if (
      timeMissed > 0 &&
      timeMissed <= 60 &&
      visibleModal === null &&
      t &&
      !isReelRaceModalShown
    ) {
      showModal(REACT_APP_MODAL.ID.GGL_FIVE_MINUTE_BREAK_REEL_RACE, {
        content: t,
        timeMissed,
        tournamentLength,
      });
      setIsReelRaceModalShown(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    visibleModal,
    isReelRaceModalShown,
    activeRCBreak,
    activeRCSession,
    t,
    currentRace,
  ]);
}
