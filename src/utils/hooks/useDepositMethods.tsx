import { useSelector, useDispatch } from "react-redux";
import { featureFlagSelector, marketSelector } from "Models/handshake";
import { showModal } from "Models/modal";
import { setQuickDepositMethod } from "Models/payments/payments.actions";
import { REACT_APP_MODAL } from "Src/constants";
import { useAvailableQuickDepositMethods } from "Utils/hooks";

const quickDepositDisabledMarkets = [];

export const useDepositMethods = () => {
  const dispatch = useDispatch();
  const market = useSelector(marketSelector);
  const quickDepositFeatureFlagEnabled = useSelector(
    featureFlagSelector("quick-deposit")
  );

  const showQuickDeposit =
    !quickDepositDisabledMarkets.includes(market) ||
    quickDepositFeatureFlagEnabled;

  const savedQuickDepositMethods = useAvailableQuickDepositMethods();
  const hasQuickDepositMethods =
    showQuickDeposit && savedQuickDepositMethods.length > 0;

  const navigateToCashier = () => {
    dispatch(showModal(REACT_APP_MODAL.ID.QUIT_GAME_NOTIFICATION));
  };

  const launchQuickDeposit = () => {
    dispatch(setQuickDepositMethod(savedQuickDepositMethods[0]));
  };

  return {
    hasQuickDepositMethods,
    navigateToCashier,
    launchQuickDeposit,
  };
};
