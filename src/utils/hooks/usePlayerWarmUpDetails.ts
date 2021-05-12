import * as React from "react";
import { useSelector } from "react-redux";
import { getDetails } from "Api/api.esPlayerWarmUp";
import { playerIdSelector } from "Models/handshake";
import type { TPlayerWarmUpDetailsResponse } from "Models/accountWarmUp";
import { useJurisdiction } from "./useJurisdiction";

export function usePlayerWarmUpDetails() {
  const { isDGOJ } = useJurisdiction();
  const [details, setDetails] = React.useState<TPlayerWarmUpDetailsResponse>();
  const [loading, setLoading] = React.useState<boolean>(true);
  const playerId = useSelector(playerIdSelector);

  const fetchDetails = React.useCallback(async () => {
    if (isDGOJ && playerId) {
      const response = await getDetails({ playerId });
      if (!response) {
        setLoading(false);
        return;
      }

      setDetails(response);
      setLoading(false);
    }
  }, [isDGOJ, playerId]);

  const fetchDetailsAsync = () => getDetails({ playerId });

  return {
    fetchDetailsAsync,
    fetchDetails,
    loading,
    details,
  };
}
