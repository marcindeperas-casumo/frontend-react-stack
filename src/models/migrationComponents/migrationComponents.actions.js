import { types } from "./migrationComponents.constants";

export const activateComponent = ({ componentId, routeParams }) => ({
  type: types.ACTIVATE_COMPONENT,
  componentId,
  routeParams,
});
