// @flow
import { useEffect } from "react";
import { isEmpty } from "ramda";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "Models/modal";
import bridge from "Src/DurandalReactBridge";
import { KO_APP_EVENT_MODAL_HIDDEN } from "Src/constants";
import { realityCheckSelector } from "Models/playOkay/realityCheck";

type Props = {
  pauseGame: () => Promise<void>,
  resumeGame: () => void,
};

export function useRealityCheckModal({ pauseGame, resumeGame }: Props) {
  const dispatch = useDispatch();
  const realityCheck = useSelector(realityCheckSelector);
  const config = { mustAccept: true };

  useEffect(() => {
    if (!isEmpty(realityCheck)) {
      if (pauseGame) {
        pauseGame().then(() => {
          dispatch(showModal("REALITY_CHECK_MODAL", config));
        });
      } else {
        dispatch(showModal("REALITY_CHECK_MODAL", config));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [realityCheck]);

  useEffect(() => {
    const resumeGameCommand = () => {
      resumeGame && resumeGame();
    };

    bridge.on(KO_APP_EVENT_MODAL_HIDDEN, resumeGameCommand);

    return () => {
      bridge.off(KO_APP_EVENT_MODAL_HIDDEN, resumeGameCommand);
    };
  }, [resumeGame]);
}