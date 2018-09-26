import { isAuthenticated } from "Reducers/handshake/selectors";
import { createStructuredSelector } from "reselect";
import { activeComponents } from "Reducers/migrationComponents/selector";

export const getAppData = createStructuredSelector({
  isAuthenticated,
  activeComponents,
});
