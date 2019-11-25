// @flow
import bridge from "../DurandalReactBridge";
import { KO_APP_EVENT_NAVIGATE, KO_APP_EVENT_CHANGE_ROUTE } from "../constants";

export const navigate = ({ url }: { url: string }) =>
  bridge.emit(KO_APP_EVENT_NAVIGATE, { url });

export const navigateById = ({
  routeId,
  params,
}: {
  routeId: string,
  params?: Object,
}) =>
  bridge.emit(KO_APP_EVENT_CHANGE_ROUTE, {
    routeId,
    params,
  });
