import { useSelector, useDispatch } from "react-redux";
import { featureFlagSelector, marketSelector } from "Models/handshake";
import { showModal } from "Models/modal";
import { setQuickDepositMethod } from "Models/payments/payments.actions";
import { REACT_APP_MODAL } from "Src/constants";
import { useAvailableQuickDepositMethods } from "Utils/hooks";
import tracker from "Services/tracker";
import { EVENTS } from "Src/constants";

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
    tracker.track(EVENTS.MIXPANEL_QUICK_DEPOSIT_CURRENCY_SIGN_CLICKED, {});
    tracker.track(EVENTS.MIXPANEL_EXIT_GAME_STEP_STARTED, {});
    dispatch(showModal(REACT_APP_MODAL.ID.QUIT_GAME_NOTIFICATION));
  };

  const launchQuickDeposit = () => {
    tracker.track(EVENTS.MIXPANEL_CASHIER_LINK_CLICKED, {});
    tracker.track(EVENTS.MIXPANEL_QUICK_DEPOSIT_PROCESS_INITIATED, {});
    dispatch(setQuickDepositMethod(savedQuickDepositMethods[0]));
  };

  return {
    hasQuickDepositMethods,
    navigateToCashier,
    launchQuickDeposit,
  };
};
