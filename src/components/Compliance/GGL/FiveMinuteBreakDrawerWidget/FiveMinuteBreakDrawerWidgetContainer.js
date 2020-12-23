// @flow
import * as React from "react";
//import { useSelector, useDispatch } from "react-redux";
import {
  useTranslations,
  //useCurrentReelRaceInfo,
  useJurisdiction,
} from "Utils/hooks";
//import { showModal } from "Models/modal";
//import { playingSelector } from "Models/playing";
//import { isNativeByUserAgent } from "Src/gameProviders/utils";
//import { REACT_APP_MODAL } from "Src/constants";
import { FiveMinuteBreakDrawerWidget } from "./FiveMinuteBreakDrawerWidget";

type Props = {
  className?: string,
};

export const FiveMinuteBreakDrawerWidgetContainer = ({ className }: Props) => {
  const { isGGL } = useJurisdiction();
  //const dispatch = useDispatch();
  //const playing = useSelector(playingSelector);
  //const currentReelRaceFromHook = useCurrentReelRaceInfo(playing?.gameId);
  //const currentRace = isNativeByUserAgent() ? null : currentReelRaceFromHook;

  const t = useTranslations("ggl-five-minute-break");

  // if (!currentRace || !currentRace?.isInProgress) {
  //   return null;
  // }

  //const gameDuration = parseInt((endTime - startTime) / 1000 / 60, 10) || 0;

  // React.useEffect(() => {
  //   if (t) {
  //     dispatch(
  //       showModal(REACT_APP_MODAL.ID.GGL_FIVE_MINUTE_BREAK_ONGOING, {
  //         content: t,
  //         timeLeft: Date.now() + 5 * 60 * 1000,
  //         extraActionOnAccept: () => {
  //           /* nav to KO */
  //         },
  //       })
  //     );
  //   }
  // }, [t]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!isGGL) {
    return null;
  }

  return (
    <div className={className}>
      <FiveMinuteBreakDrawerWidget
        t={t}
        timeLeft={Date.now() + 60 * 1000}
        timeElapsed={Date.now()}
      />
    </div>
  );
};
