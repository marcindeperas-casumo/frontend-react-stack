import { useMutation } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";
import * as A from "Types/apollo";
import { showModal } from "Models/modal";
import { isWarmUpPhaseSelector } from "Models/handshake";
import { useJurisdiction } from "Utils/hooks";
import { REACT_APP_MODAL } from "Src/constants";
import { OptInForReelRace } from "./ReelRaceCard.graphql";

export const useReelRaceOptIn = (reelRace: A.ReelRaceCard_ReelRaceFragment) => {
  const { id } = reelRace;
  const { isDGOJ } = useJurisdiction();
  const dispatch = useDispatch();
  const isInWarmUpPhase = useSelector(isWarmUpPhaseSelector);
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

  const showWarmUpModal = () =>
    dispatch(showModal(REACT_APP_MODAL.ID.ACCOUNT_WARM_UP));

  const optInAction =
    isDGOJ && isInWarmUpPhase ? showWarmUpModal : optInForReelRace;

  return {
    optInAction,
  };
};
