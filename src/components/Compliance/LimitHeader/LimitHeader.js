// @flow
import * as React from "react";
import * as R from "ramda";
import { MobileAndTablet, Desktop } from "Components/ResponsiveLayout";
import { LimitHeaderNormal } from "./LimitHeaderNormal";
import { LimitHeaderBig } from "./LimitHeaderBig";

export function LimitHeader(props: {
  title: string,
  icon: React.Node,
  children: ?React.Node,
  variesForDesktop?: true,
}) {
  if (props.variesForDesktop) {
    return (
      <>
        <Desktop>
          <LimitHeaderBig {...R.pick(["title", "children"], props)} />
        </Desktop>
        <MobileAndTablet>
          <LimitHeaderNormal
            {...R.pick(["title", "icon", "children"], props)}
          />
        </MobileAndTablet>
      </>
    );
  }

  return (
    <LimitHeaderNormal {...R.pick(["title", "icon", "children"], props)} />
  );
}
