// @flow
import bridge from "../DurandalReactBridge";
import { KO_APP_EVENT_NAVIGATE, KO_APP_EVENT_CHANGE_ROUTE } from "../constants";
export const navigate = ({ url }: {
    url: string;
}) => (bridge as any).emit(KO_APP_EVENT_NAVIGATE, { url });
export const navigateById = ({ routeId, params, queryParams, }: {
    routeId: string;
    params?: Object;
    queryParams?: Object;
}) => (bridge as any).emit(KO_APP_EVENT_CHANGE_ROUTE, {
    routeId,
    params,
    queryParams,
});
