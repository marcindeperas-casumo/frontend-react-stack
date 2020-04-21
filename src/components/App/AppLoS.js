// @flow
import React from "react";
import { Router as ReachRouter } from "@reach/router";
import { LazySportsLoS } from "Features/sports/components/SportsLoS";

export const AppLoS = () => {
  return (
    <ReachRouter>
      <LazySportsLoS path={"/react-stack/:urlPrefix/sports"} />
    </ReachRouter>
  );
};
