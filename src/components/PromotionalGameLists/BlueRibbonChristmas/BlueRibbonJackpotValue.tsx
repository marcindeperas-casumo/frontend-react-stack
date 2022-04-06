import Text from "@casumo/cmp-text";
import Skeleton from "@casumo/cmp-skeleton";
import * as React from "react";
import { JackpotStatus } from "./blueRibbonConsts";

type BlueRibbonJackpotValueProps = {
  size: "md" | "xs";
  classes: string;
  status?: JackpotStatus;
  children: React.ReactNode;
  tag?: string;
};

export function BlueRibbonJackpotValue(props: BlueRibbonJackpotValueProps) {
  const { size, classes, status, children, tag = "p" } = props;

  const isMediumSize: boolean = size === "md";

  return status === undefined ? (
    <Text
      size={size}
      className={classes}
      tag={tag}
      style={{
        width: isMediumSize ? "150px" : "75px",
        margin: "0",
      }}
    >
      <Skeleton
        colorHi="transparent"
        colorLow="#e5eaed"
        viewBox={null}
        width="100%"
        height={isMediumSize ? "25px" : "12px"}
        opacity="0.5"
        style={{
          paddingTop: isMediumSize ? "8px" : "1px",
        }}
      >
        <rect x="0" y="0" rx="8" ry="8" width="100%" height="100%" />
      </Skeleton>
    </Text>
  ) : (
    <Text
      size={size}
      className={classes}
      tag={tag}
      style={{
        margin: "0",
        height: isMediumSize ? "25px" : "12px",
      }}
    >
      {children}
    </Text>
  );
}
