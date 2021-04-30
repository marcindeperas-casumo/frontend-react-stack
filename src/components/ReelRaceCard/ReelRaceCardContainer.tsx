import { useMutation } from "@apollo/client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "Models/modal";
import * as A from "Types/apollo";
import { useJurisdiction } from "Utils/hooks";
import { isWarmUpPhaseSelector } from "Models/handshake";
import { REACT_APP_MODAL } from "Src/constants";
import { ReelRaceCard } from "./ReelRaceCard";
import { OptInForReelRace } from "./ReelRaceCard.graphql";

type Props = {
  reelRace: A.ReelRaceCard_ReelRaceFragment;
};

export const ReelRaceCardContainer = ({ reelRace }: Props) => {
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
    dispatch(
      showModal(REACT_APP_MODAL.ID.ACCOUNT_WARM_UP, { input: reelRace })
    );

  const optInAction =
    isDGOJ && isInWarmUpPhase ? showWarmUpModal : optInForReelRace;

  return <ReelRaceCard reelRace={reelRace} optIn={optInAction} />;
};
