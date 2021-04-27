import { useMutation } from "@apollo/client";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useJurisdiction } from "Utils/hooks";
import type { TReelRacesContentPage } from "Components/ReelRacesPage/ReelRacesPageContainer";
import * as A from "Types/apollo";
import { showModal } from "Models/modal";
import { isWarmUpPhaseSelector } from "Models/handshake";
import { REACT_APP_MODAL } from "Src/constants";
import { ReelRaceOptInMutation } from "./ReelRaceScheduleCard.graphql";
import { ReelRaceScheduleCard } from "./ReelRaceScheduleCard";

type TProps = {
  reelRace: A.ReelRaceScheduleCard_ReelRaceFragment;
  t: TReelRacesContentPage | null;
  expanded: boolean;
};

export function ReelRaceScheduleCardContainer({
  reelRace,
  t,
  expanded = false,
}: TProps) {
  const [optInForReelRace] = useMutation(ReelRaceOptInMutation, {
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
  const isInWarmUpPhase = useSelector(isWarmUpPhaseSelector);

  const showWarmUpModal = () =>
    dispatch(showModal(REACT_APP_MODAL.ID.ACCOUNT_WARM_UP, { reelRace }));

  const optInAction =
    isDGOJ && isInWarmUpPhase ? showWarmUpModal : optInForReelRace;

  return (
    <ReelRaceScheduleCard
      expanded={expanded}
      optInForReelRace={optInAction}
      reelRace={reelRace}
      t={t}
    />
  );
}
