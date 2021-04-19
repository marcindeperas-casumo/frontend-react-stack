import React, { useEffect, useRef, useState, useCallback } from "react";
import { useAdventurerContext } from "Components/GamePage/Contexts/AdventurerContext";
import SumoIconConfetti from "./SumoIconConfetti";
// @ts-expect-error ts-migrate(2614) FIXME: Module '"*.scss"' has no exported member 'animatio... Remove this comment to see the full error message
import { animation_duration } from "./SumoIconConfetti.scss";

export default function SumoIconConfettiContainer() {
  const { level } = useAdventurerContext();
  const [isConfettiVisible, showConfetti] = useState<boolean>(false);
  const timeoutIdRef = useRef<NodeJS.Timeout>();
  const hideConfetti = () => showConfetti(false);
  const isFirstRun = useRef(true);

  // change of level could mean only level up
  // confetti animation starts if it is different than prev
  const runAnimation = useCallback(() => {
    showConfetti(true);

    const timeoutId = setTimeout(hideConfetti, Number(animation_duration));
    timeoutIdRef.current = timeoutId; // eslint-disable-line fp/no-mutation
  }, []);

  useEffect(() => {
    if (isFirstRun.current) {
      // eslint-disable-next-line fp/no-mutation
      isFirstRun.current = false;
      return;
    }

    runAnimation();
    // in case game is closed before timeout execution
    return () => clearTimeout(timeoutIdRef.current);
  }, [level, runAnimation, isFirstRun]);

  return isConfettiVisible ? <SumoIconConfetti /> : null;
}
