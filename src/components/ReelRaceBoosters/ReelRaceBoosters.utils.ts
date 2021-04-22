import cx from "classnames";

const baseClassName = "c-rr-booster";

export function getArcClassName(isLit: boolean): string {
  return cx(
    `${baseClassName}__arc`,
    !isLit ? "text-black t-opacity--25" : "text-teal-50"
  );
}
