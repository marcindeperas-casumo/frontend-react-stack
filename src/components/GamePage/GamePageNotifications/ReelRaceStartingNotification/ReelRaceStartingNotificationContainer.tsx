// @flow
import * as React from "react";
import { useSelector } from "react-redux";
import { DateTime } from "luxon";
import * as R from "ramda";
import { useInterval } from "react-use";
import { playingSelector } from "Models/playing";
import { useCurrentReelRaceInfo } from "Utils/hooks/useCurrentReelRaceInfo";
import { ReelRaceStartingNotification } from "./ReelRaceStartingNotification";

const SECONDS_LEFT_WHEN_SHOWN = 10;

function secondsLeftFromNow(dt: DateTime) {
  return parseInt(dt.diffNow().as("seconds"));
}

export function ReelRaceStartingNotificationContainer() {
  const playing = useSelector(playingSelector);
  const [dismissed, setDismissed] = React.useState(false);
  const [secondsLeft, setSecondsLeft] = React.useState(0);
  const reelRaceInfo = useCurrentReelRaceInfo(playing?.gameId);
  const startTime = DateTime.fromMillis(R.propOr(0, "startTime", reelRaceInfo));
  const skipInterval = dismissed || secondsLeft < 0;

  React.useEffect(() => {
    setSecondsLeft(secondsLeftFromNow(startTime));
    setDismissed(!reelRaceInfo);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reelRaceInfo?.tournamentId]);

  useInterval(
    () => {
      setSecondsLeft(secondsLeftFromNow(startTime));
    },
    skipInterval ? null : 1000
  );

  if (dismissed) {
    return null;
  }

  if (secondsLeft > SECONDS_LEFT_WHEN_SHOWN || secondsLeft < 1) {
    return null;
  }

  return (
    <ReelRaceStartingNotification
      secondsLeft={secondsLeft}
      secondsLeftWhenShown={SECONDS_LEFT_WHEN_SHOWN}
      onClickDismiss={() => setDismissed(true)}
    />
  );
}
