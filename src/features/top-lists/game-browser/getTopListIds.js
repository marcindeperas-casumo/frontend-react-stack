import {
  composePromises,
  notUndefined,
  property as getProperty
} from "../../../utils";

export default composePromises(getProperty("topListIds"), notUndefined);
