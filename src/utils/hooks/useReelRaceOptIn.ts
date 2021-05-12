import { useCallback } from "react";
import { useMutation } from "@apollo/client";
import { useDispatch } from "react-redux";
import * as A from "Types/apollo";
import { showModal } from "Models/modal";
import { useJurisdiction, usePlayerWarmUpDetails } from "Utils/hooks";
import { REACT_APP_MODAL } from "Src/constants";
import { OptInForReelRace } from "Components/ReelRaceCard/ReelRaceCard.graphql";

type TReelRace =
  | A.ReelRaceCard_ReelRaceFragment
  | A.ReelRaceScheduleCard_ReelRaceFragment;

export const useReelRaceOptIn = (reelRace: TReelRace) => {
  const { id } = reelRace;
  const { isDGOJ } = useJurisdiction();
  const dispatch = useDispatch();
  const { fetchDetailsAsync } = usePlayerWarmUpDetails();

  const [optInForReelRace] = useMutation(OptInForReelRace, {
    variables: {
      id,
    },
    optimisticResponse: {
      __typename: "Mutation",
      optInForReelRace: {
        __typename: "ReelRace",
        id,
        optedIn: true,
      },
    },
  });

  const optIn = useCallback(async () => {
    if (!isDGOJ) {
      return optInForReelRace();
    }

    const details = await fetchDetailsAsync();

    if (details.inWarmupPhase) {
      return dispatch(
        showModal(REACT_APP_MODAL.ID.ACCOUNT_WARM_UP, {
          input: { ...reelRace, ...details },
        })
      );
    }

    return optInForReelRace();
  }, [reelRace, fetchDetailsAsync, dispatch, isDGOJ, optInForReelRace]);

  return {
    optInAction: optIn,
  };
};
