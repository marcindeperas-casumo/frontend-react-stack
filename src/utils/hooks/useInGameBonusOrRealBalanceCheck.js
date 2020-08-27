// @flow
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { showModal } from "Models/modal";
import { useJurisdiction } from "Utils/hooks";
import { REACT_APP_MODAL } from "Src/constants";
import { WAGERING_NOTIFICATION_TYPES } from "../../models/playing/playing.constants";

type Props = {
  bonusAmount: number,
};

export const useInGameBonusOrRealBalanceCheck = ({ bonusAmount }: Props) => {
  const { isUKGC } = useJurisdiction();
  const dispatch = useDispatch();
  const [bonusBalanceModalShown, setBonusBalanceModalShown] = useState(false);
  const [realBalanceModalShown, setRealBalanceModalShown] = useState(false);

  useEffect(() => {
    if (!isUKGC) {
      return undefined;
    }
    // Positive bonus balance - show modal once
    if (bonusAmount && !bonusBalanceModalShown) {
      dispatch(
        showModal(REACT_APP_MODAL.ID.WAGERING_NOTIFICATION, {
          mustAccept: false,
          type: WAGERING_NOTIFICATION_TYPES.BONUS_MONEY_WAGERING,
        })
      );
      setBonusBalanceModalShown(true);
      // Negative bonus balance and bonus modal already shown - time to show real balance notification once
    } else if (
      !bonusAmount &&
      bonusBalanceModalShown &&
      !realBalanceModalShown
    ) {
      dispatch(
        showModal(REACT_APP_MODAL.ID.WAGERING_NOTIFICATION, {
          mustAccept: false,
          type: WAGERING_NOTIFICATION_TYPES.REAL_MONEY_WAGERING,
        })
      );
      setRealBalanceModalShown(true);
    }
  }, [
    dispatch,
    bonusAmount,
    bonusBalanceModalShown,
    realBalanceModalShown,
    isUKGC,
  ]);
};
