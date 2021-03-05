import { useQuery } from "@apollo/client";
import React from "react";
import * as A from "Types/apollo";
import PLAYER_LOGIN_HISTORY_QUERY from "Components/Settings/SettingsSections/PlayerLoginHistoryQuery.graphql";
import Timer from "Components/Timer";

export const CurrentSessionTimer = () => {
  const { data, loading } = useQuery<
    A.Player_Login_History_Query,
    A.Player_Login_History_QueryVariables
  >(PLAYER_LOGIN_HISTORY_QUERY, {
    fetchPolicy: "network-only",
  });

  if (loading || !data) {
    return null;
  }

  // eslint-disable-next-line no-unused-vars
  const [lastLogin, ...otherLogins] = data.player.loginHistory;

  return (
    <Timer
      render={state => `${state.hours}:${state.minutes}:${state.seconds}`}
      startTime={lastLogin.loginTime}
    />
  );
};
