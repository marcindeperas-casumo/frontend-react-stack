// @flow
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { equals } from "ramda";
import bridge from "Src/DurandalReactBridge";
import { playerLogoutStartedSelector } from "Models/player";
import { showModal } from "Models/modal";
import {
  ROUTE_IDS,
  REACT_APP_MODAL,
  KO_APP_EVENT_MODAL_HIDDEN,
} from "Src/constants";
import { useCrossCodebaseNavigation, useJurisdiction } from "Utils/hooks";

type UseBeforePlayingModalProps = {
  canLaunch: boolean,
};

const isModalDismissed = equals(REACT_APP_MODAL.RETURN_CODE.DISMISSED);

export function useBeforePlayingModal({
  canLaunch,
}: UseBeforePlayingModalProps): void {
  const dispatch = useDispatch();
  const { navigateToKO } = useCrossCodebaseNavigation();
  const { isDGOJ } = useJurisdiction();
  const logoutStarted = useSelector(playerLogoutStartedSelector);
  const navigateToHome = React.useCallback(
    ({ returnCode }) => {
      if (isModalDismissed(returnCode)) {
        navigateToKO(ROUTE_IDS.TOP_LISTS);
      }
    },
    [navigateToKO]
  );

  React.useEffect(() => {
    if (!isDGOJ || !canLaunch || logoutStarted) {
      return;
    }

    bridge.on(KO_APP_EVENT_MODAL_HIDDEN, navigateToHome);

    dispatch(showModal(REACT_APP_MODAL.ID.SLOT_CONTROL_SYSTEM_CONFIGURATION));

    return function unsubscribe() {
      bridge.off(KO_APP_EVENT_MODAL_HIDDEN, navigateToHome);
    };
  }, [dispatch, isDGOJ, canLaunch, navigateToHome, logoutStarted]);
}
