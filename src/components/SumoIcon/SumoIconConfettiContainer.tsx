//@flow
import React, { useEffect, useRef, useState, useCallback } from "react";
import { useAdventurerContext } from "Components/GamePage/Contexts/AdventurerContext";
import SumoIconConfetti from "./SumoIconConfetti";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './SumoIconConfetti.scss' or it... Remove this comment to see the full error message
import { animation_duration } from "./SumoIconConfetti.scss";

export default function SumoIconConfettiContainer() {
  const { onLevelUp } = useAdventurerContext();
  const [isConfettiVisible, showConfetti] = useState<boolean>(false);
  const timeoutIdRef = useRef();
  const hideConfetti = () => showConfetti(false);

  // change of level could mean only level up
  // confetti animation starts if it is different than prev
  const runAnimation = useCallback(() => {
    showConfetti(true);

    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'TimeoutID'.
    const timeoutId: TimeoutID = setTimeout(
      hideConfetti,
      Number(animation_duration)
    );
    timeoutIdRef.current = timeoutId; // eslint-disable-line fp/no-mutation
  }, []);

  onLevelUp(runAnimation);

  useEffect(() => {
    // in case game is closed before timeout execution
    return () => clearTimeout(timeoutIdRef.current);
  }, []);

  return isConfettiVisible ? <SumoIconConfetti /> : null;
}
