// @flow
import * as React from "react";
import * as R from "ramda";
import { MobileAndTablet, Desktop } from "Components/ResponsiveLayout";
import { LimitHeaderNormal } from "./LimitHeaderNormal";
import { LimitHeaderBig } from "./LimitHeaderBig";

export function LimitHeader(props: {
  title: string,
  // @ts-expect-error ts-migrate(2694) FIXME: Namespace 'React' has no exported member 'Node'.
  icon: React.Node,
  // @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  children: ?React.Node,
  variesForDesktop?: boolean,
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
