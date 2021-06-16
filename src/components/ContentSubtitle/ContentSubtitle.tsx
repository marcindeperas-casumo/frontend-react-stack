import Text from "@casumo/cmp-text";
import React from "react";
import cx from "classnames";

type TProps = {
  /** The Subtitle text to render */
  subtitle: string;
  /* Additional css classes to add to the component **/
  className?: string;
  /** The Column width this item should span in the grid layout, currently supporting 2 columns  */
  gridColumnWidth?: string;
};

export const ContentSubtitle: React.FC<TProps> = ({
  subtitle,
  className,
  gridColumnWidth = "2",
}: TProps) => (
  <Text
    className={cx(
      className,
      gridColumnWidth && `col-span-${gridColumnWidth}`,
      "px-lg mb-lg"
    )}
    tag="h2"
  >
    {subtitle}
  </Text>
);
