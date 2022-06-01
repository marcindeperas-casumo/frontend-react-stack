import * as React from "react";
import cx from "classnames";

type TProps = {
  children: React.ReactNode;
  className?: string;
  roundedTop?: boolean;
  roundedBottom?: boolean;
};

export function Panel({
  className,
  children,
  roundedTop = true,
  roundedBottom = true,
}: TProps) {
  return (
    <div
      className={cx(
        "bg-white t-elevation--10 u-padding-x--md u-padding-y--lg",
        {
          "t-border-r-top-left--md t-border-r-top-right--md": roundedTop,
          "t-border-r-bottom-left--md t-border-r-bottom-right--md":
            roundedBottom,
        },
        className
      )}
    >
      {children}
    </div>
  );
}
