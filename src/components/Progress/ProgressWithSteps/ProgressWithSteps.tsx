import * as React from "react";
import cx from "classnames";
import Badge from "@casumo/cmp-badge";

export type TProgressWithStepsProps = {
  steps: Array<{
    label: string;
    isActive: boolean;
  }>;
};

export function ProgressWithSteps({ steps }: TProgressWithStepsProps) {
  return (
    <div className="flex flex-row justify-between items-center">
      {steps.map(({ label, isActive }, index) => (
        <React.Fragment key={label}>
          {index > 0 && (
            <div
              className={cx(
                "h-0.5",
                "flex-grow",
                isActive ? "bg-purple-60" : "bg-grey-20"
              )}
            ></div>
          )}
          <Badge
            circle
            tag="div"
            bgColor={isActive ? "purple-60" : "white"}
            txtColor={isActive ? "white" : "grey-20"}
            className={cx({
              "border-2 border-grey-20": !isActive,
            })}
          >
            {label}
          </Badge>
        </React.Fragment>
      ))}
    </div>
  );
}
