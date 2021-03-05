import React, { useEffect, useRef, useState, useCallback } from "react";
import { useAdventurerContext } from "Components/GamePage/Contexts/AdventurerContext";
import SumoIconConfetti from "./SumoIconConfetti";
// @ts-expect-error ts-migrate(2614) FIXME: Module '"*.scss"' has no exported member 'animatio... Remove this comment to see the full error message
import { animation_duration } from "./SumoIconConfetti.scss";

export default function SumoIconConfettiContainer() {
  const { onLevelUp } = useAdventurerContext();
  const [isConfettiVisible, showConfetti] = useState<boolean>(false);
  const timeoutIdRef = useRef<NodeJS.Timeout>();
  const hideConfetti = () => showConfetti(false);

  // change of level could mean only level up
  // confetti animation starts if it is different than prev
  const runAnimation = useCallback(() => {
    showConfetti(true);

    const timeoutId = setTimeout(hideConfetti, Number(animation_duration));
    timeoutIdRef.current = timeoutId; // eslint-disable-line fp/no-mutation
  }, []);

  // @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 1.
  onLevelUp(runAnimation);

  useEffect(() => {
    // in case game is closed before timeout execution
    return () => clearTimeout(timeoutIdRef.current);
  }, []);

  return isConfettiVisible ? <SumoIconConfetti /> : null;
}
