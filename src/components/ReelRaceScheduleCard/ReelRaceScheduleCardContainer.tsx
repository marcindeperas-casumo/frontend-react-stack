import { useMutation } from "@apollo/client";
import * as React from "react";
import { useDispatch } from "react-redux";
import { useJurisdiction } from "Utils/hooks";
import type { TReelRacesContentPage } from "Components/ReelRacesPage/ReelRacesPageContainer";
import * as A from "Types/apollo";
import { showModal } from "Models/modal";
import { REACT_APP_MODAL } from "Src/constants";
import { useAccountWarmUpContext } from "../RSModal/AccountWarmUp/AccountWarmUpContext";
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
  const { inWarmupPhase, verified, warmupTimeEnd } = useAccountWarmUpContext();

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

  const showWarmUpModal = () =>
    dispatch(
      showModal(REACT_APP_MODAL.ID.ACCOUNT_WARM_UP, {
        input: { ...reelRace, inWarmupPhase, verified, warmupTimeEnd },
      })
    );

  const optInAction =
    isDGOJ && inWarmupPhase ? showWarmUpModal : optInForReelRace;

  return (
    <ReelRaceScheduleCard
      expanded={expanded}
      optInForReelRace={optInAction}
      reelRace={reelRace}
      t={t}
    />
  );
}
