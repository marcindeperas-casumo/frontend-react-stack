// @flow
import { KO_APP_EVENT_LAUNCH_MODAL } from "Src/constants";
import bridge from "../DurandalReactBridge";

export const launchModal = ({
  modal,
  ...rest
}: {
  modal: string,
  rest: Array<mixed>,
}) =>
  bridge.emit(KO_APP_EVENT_LAUNCH_MODAL, {
    modal,
    ...rest,
  });
