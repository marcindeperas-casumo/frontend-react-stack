// @flow
import cx from "classnames";

const baseClassName = "c-rr-booster";

export function getArcClassName(isLit: boolean): string {
  return cx(
    `${baseClassName}__arc`,
    !isLit ? "t-color-black t-opacity--25" : "t-color-teal-50"
  );
}
