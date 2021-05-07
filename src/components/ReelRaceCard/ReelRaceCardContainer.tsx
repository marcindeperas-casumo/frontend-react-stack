import { useMutation } from "@apollo/client";
import React from "react";
import { useDispatch } from "react-redux";
import { showModal } from "Models/modal";
import * as A from "Types/apollo";
import { useJurisdiction } from "Utils/hooks";
import { REACT_APP_MODAL } from "Src/constants";
import { useAccountWarmUpContext } from "../RSModal/AccountWarmUp/AccountWarmUpContext";
import { ReelRaceCard } from "./ReelRaceCard";
import { OptInForReelRace } from "./ReelRaceCard.graphql";

type Props = {
  reelRace: A.ReelRaceCard_ReelRaceFragment;
};

export const ReelRaceCardContainer = ({ reelRace }: Props) => {
  const { inWarmupPhase, verified, warmupTimeEnd } = useAccountWarmUpContext();

  const [optInForReelRace] = useMutation(OptInForReelRace, {
    variables: {
      id: reelRace.id,
    },
    optimisticResponse: {
      __typename: "Mutation",
      optInForReelRace: {
        __typename: "ReelRace",
        id: reelRace.id,
        optedIn: true,
      },
    },
  });

  const { isDGOJ } = useJurisdiction();
  const dispatch = useDispatch();

  const showWarmUpModal = () =>
    dispatch(
      showModal(REACT_APP_MODAL.ID.ACCOUNT_WARM_UP, {
        input: { ...reelRace, inWarmupPhase, verified, warmupTimeEnd },
      })
    );

  const optInAction =
    isDGOJ && inWarmupPhase ? showWarmUpModal : optInForReelRace;

  return <ReelRaceCard reelRace={reelRace} optIn={optInAction} />;
};
