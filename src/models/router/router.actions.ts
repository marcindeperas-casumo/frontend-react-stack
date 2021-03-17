import { types } from "./router.constants";

export const activateComponent = ({ componentId, routeParams }) => ({
  type: types.ACTIVATE_COMPONENT,
  componentId,
  routeParams,
});
