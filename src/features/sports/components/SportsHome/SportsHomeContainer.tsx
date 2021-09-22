import React from "react";
import { useMarket } from "Utils/hooks";
import { SportsHome } from "./SportsHome";

export const NUMBER_OF_EVENTS = 10;
export const SPORTS = "FOOTBALL";

export const SportsHomeContainer = () => {
  const market = useMarket();
  return (
    <SportsHome
      numberOfEvents={NUMBER_OF_EVENTS}
      market={market}
      sports={SPORTS}
    />
  );
};
