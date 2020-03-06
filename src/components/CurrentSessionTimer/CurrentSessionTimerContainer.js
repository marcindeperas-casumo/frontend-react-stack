import React from "react";
import { useQuery } from "@apollo/react-hooks";
import PLAYER_LOGIN_HISTORY_QUERY from "Components/Settings/SettingsSections/PlayerLoginHistoryQuery.graphql";
import { CurrentSessionTimer } from "./CurrentSessionTimer";

export const CurrentSessionTimerContainer = () => {
  const { data, loading } = useQuery(PLAYER_LOGIN_HISTORY_QUERY);
  const currentTime = Date.now();

  if (loading || !data) {
    return currentTime;
  }

  // eslint-disable-next-line no-unused-vars
  const [lastLogin, ...otherLogins] = data.player.loginHistory;

  return (
    <CurrentSessionTimer
      render={state => `${state.hours}:${state.minutes}:${state.seconds}`}
      startTime={lastLogin.loginTime}
    />
  );
};
