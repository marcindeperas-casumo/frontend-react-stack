// @flow
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { showModal } from "Models/modal";
import { REACT_APP_MODAL } from "Src/constants";
import { WAGERING_NOTIFICATION_TYPES } from "../../models/playing/playing.constants";

type Props = {
  bonusAmount: number,
};

export const useInGameBonusOrRealBalanceCheck = ({ bonusAmount }: Props) => {
  const dispatch = useDispatch();

  const [bonusBalanceModalShown, setBonusBalanceModalShown] = useState(false);
  const [realBalanceModalShown, setRealBalanceModalShown] = useState(false);
  const [bonusBalance, setBonusBalance] = useState(0);

  useEffect(() => {
    if (bonusBalance !== bonusAmount) {
      setBonusBalance(bonusAmount);
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
  }, [dispatch, bonusAmount, bonusBalance, bonusBalanceModalShown]);

  useEffect(() => {
    if (!bonusAmount && bonusBalance && !realBalanceModalShown) {
      dispatch(
        showModal(REACT_APP_MODAL.ID.WAGERING_NOTIFICATION, {
          mustAccept: false,
          type: WAGERING_NOTIFICATION_TYPES.REAL_MONEY_WAGERING,
        })
      );
      setRealBalanceModalShown(true);
    }
  }, [dispatch, bonusAmount, bonusBalance, realBalanceModalShown]);
};
