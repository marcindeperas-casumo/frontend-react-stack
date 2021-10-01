import * as React from "react";
import { useDispatch } from "react-redux";
import { oddsFormatChangeAction } from "Models/sportsEvents";
import { OddsFormatEvent } from "Models/sportsEvents/sportsEvents.types";

export const useDispatchOddsFormatChange = ({
  oddsFormat,
}: OddsFormatEvent) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(oddsFormatChangeAction({ oddsFormat }));
  }, [dispatch, oddsFormat]);
};
