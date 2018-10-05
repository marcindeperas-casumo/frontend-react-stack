import { isAuthenticated } from "Reducers/handshake/selectors";
import { createStructuredSelector } from "reselect";
import { activeComponents } from "Reducers/migrationComponents/selector";

export const appContainerSelector = createStructuredSelector({
  isAuthenticated,
  activeComponents,
});
