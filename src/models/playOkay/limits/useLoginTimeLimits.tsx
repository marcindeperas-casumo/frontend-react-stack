import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { playerIdSelector } from "Models/handshake";
import {
  useGetPlayerStateByIdQuery,
  selectLoginTimeLimitFromResult,
} from "Models/playOkay";
import { useJurisdiction } from "Utils/hooks";
import { showModal, isModalOpenSelector } from "Models/modal";
import { REACT_APP_MODAL } from "Src/constants";

export function useLoginTimeLimits() {
  const { isSGA } = useJurisdiction();
  const dispatch = useDispatch();
  const playerId = useSelector(playerIdSelector) as string;
  const isAnyModalOpen = useSelector(isModalOpenSelector);
  const { isLoadingLimits, dailyLimit, weeklyLimit, monthlyLimit } =
    useGetPlayerStateByIdQuery(playerId, {
      skip: !isSGA,
      selectFromResult: ({ data, isLoading }) => ({
        isLoadingLimits: isLoading,
        dailyLimit: selectLoginTimeLimitFromResult("Daily", data),
        weeklyLimit: selectLoginTimeLimitFromResult("Weekly", data),
        monthlyLimit: selectLoginTimeLimitFromResult("Monthly", data),
      }),
    });

  React.useEffect(() => {
    if (!isSGA || isLoadingLimits || isAnyModalOpen) {
      return;
    }

    if (dailyLimit && weeklyLimit && monthlyLimit) {
      return;
    }

    dispatch(
      showModal(REACT_APP_MODAL.ID.TIME_LIMITS_FORM, {
        mustAccept: true,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isSGA,
    isLoadingLimits,
    isAnyModalOpen,
    dailyLimit,
    weeklyLimit,
    monthlyLimit,
  ]);
}
