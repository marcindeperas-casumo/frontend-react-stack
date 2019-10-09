// @flow
import bridge from "../DurandalReactBridge";
import { KO_APP_EVENT_NAVIGATE } from "../constants";

export const navigate = ({ url }: { url: string }) =>
  bridge.emit(KO_APP_EVENT_NAVIGATE, { url });
