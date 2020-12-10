//@flow
import React, { useEffect, useRef, useState, useCallback } from "react";
import { usePlayerLevelUpEvent } from "Utils/hooks/usePlayerLevelUpEvent";
import SumoIconConfetti from "./SumoIconConfetti";

// need to match value in CSS
const ANIM_DURATION = 3000;

export default function SumoIconConfettiContainer() {
  const { setLevelUpCallback } = usePlayerLevelUpEvent();

  const [isConfettiVisible, showConfetti] = useState<boolean>(false);
  const timeoutIdRef = useRef();
  const hideConfetti = () => showConfetti(false);

  // change of level could mean only level up
  // confetti animation starts if it is different than prev
  const runAnimation = useCallback(() => {
    showConfetti(true);

    const timeoutId: TimeoutID = setTimeout(hideConfetti, ANIM_DURATION);
    timeoutIdRef.current = timeoutId; // eslint-disable-line fp/no-mutation
  }, []);

  setLevelUpCallback(runAnimation);

  useEffect(() => {
    // in case game is closed before timeout execution
    return () => clearTimeout(timeoutIdRef.current);
  }, []);

  return isConfettiVisible ? <SumoIconConfetti /> : null;
}
