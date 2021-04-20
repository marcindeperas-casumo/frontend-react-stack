import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useMutation } from "@apollo/client";
import * as A from "Types/apollo";
import { showModal } from "Models/modal";
import { isWarmUpPhaseSelector } from "Models/handshake";
import { useJurisdiction, useTranslations } from "Utils/hooks";
import { REACT_APP_MODAL } from "Src/constants";
import { CMS_SLUG } from "../RSModal/AccountWarmUp";
import type { TAccountWarmUpPage } from "../RSModal/AccountWarmUp";
import { OptInForReelRace } from "./ReelRaceCard.graphql";

export const useReelRaceOptIn = (reelRace: A.ReelRaceCard_ReelRaceFragment) => {
  const { id } = reelRace;
  const { isDGOJ } = useJurisdiction();
  const dispatch = useDispatch();
  const isInWarmUpPhase = useSelector(isWarmUpPhaseSelector);
  const content = useTranslations<TAccountWarmUpPage>(CMS_SLUG);
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

  const showWarmUpModal = useCallback(
    () =>
      content &&
      dispatch(showModal(REACT_APP_MODAL.ID.ACCOUNT_WARM_UP, { content })),
    [content, dispatch]
  );

  const optInAction =
    isDGOJ && isInWarmUpPhase ? showWarmUpModal : optInForReelRace;

  return {
    optInAction,
  };
};
