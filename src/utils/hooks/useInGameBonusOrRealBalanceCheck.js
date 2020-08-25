// @flow
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { showModal } from "Models/modal";
import { REACT_APP_MODAL } from "Src/constants";
import { WAGERING_NOTIFICATION_TYPES } from "../../models/playing/playing.constants";

type Props = {
  bonusAmountProp: number,
};

export const useInGameBonusOrRealBalanceCheck = ({
  bonusAmountProp,
}: Props) => {
  const dispatch = useDispatch();

  const [bonusBalanceModalShown, setBonusBalanceModalShown] = useState(false);
  const [realBalanceModalShown, setRealBalanceModalShown] = useState(false);
  const [internalBonusBalance, setInternalBonusBalance] = useState(0);

  useEffect(() => {
    if (internalBonusBalance !== bonusAmountProp) {
      setInternalBonusBalance(bonusAmountProp);
      if (!bonusBalanceModalShown) {
        dispatch(
          showModal(REACT_APP_MODAL.ID.WAGERING_NOTIFICATION, {
            mustAccept: false,
            type: WAGERING_NOTIFICATION_TYPES.BONUS_MONEY_WAGERING,
          })
        );
        setBonusBalanceModalShown(true);
      }
    }
  }, [dispatch, bonusAmountProp, internalBonusBalance, bonusBalanceModalShown]);

  useEffect(() => {
    // we're recording the bonusAmount prop in internal state to cater for use case when bonus balance gets to 0 and wagering switches to real balance
    if (!bonusAmountProp && internalBonusBalance && !realBalanceModalShown) {
      dispatch(
        showModal(REACT_APP_MODAL.ID.WAGERING_NOTIFICATION, {
          mustAccept: false,
          type: WAGERING_NOTIFICATION_TYPES.REAL_MONEY_WAGERING,
        })
      );
      setRealBalanceModalShown(true);
    }
  }, [dispatch, bonusAmountProp, internalBonusBalance, realBalanceModalShown]);
};
