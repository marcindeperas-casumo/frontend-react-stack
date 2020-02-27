import React, { useEffect, useState } from "react";
import { getLastLogins } from "Api/api.lastLogin";
import Timer from "Components/Timer";

export const CurrentSessionTimer = () => {
  const currentTime = Date.now();
  const [sessionStart, setSessionStart] = useState(null);

  useEffect(() => {
    (async () => {
      // eslint-disable-next-line no-unused-vars
      const [lastLogin, ...otherLogins] = await getLastLogins();

      setSessionStart(lastLogin?.loginTime || currentTime);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!sessionStart) {
    return "00:00:00";
  }

  return (
    <Timer
      render={state => `${state.hours}:${state.minutes}:${state.seconds}`}
      startTime={sessionStart}
    />
  );
};
