import Text from "@casumo/cmp-text";
import React from "react";
import cx from "classnames";

type TProps = {
  /** The Subtitle text to render */
  subtitle: string;
  /* Additional css classes to add to the component **/
  className?: string;
};

export const ContentSubtitle: React.FC<TProps> = ({
  subtitle,
  className,
}: TProps) => (
  <Text
    className={cx(className, "col-span-1 u-padding-x--lg u-margin-bottom--lg")}
    tag="h2"
  >
    {subtitle}
  </Text>
);
