// @flow
import * as React from "react";
import { ButtonSecondary } from "@casumo/cmp-button";
import { MobileAndTablet, Desktop } from "Components/ResponsiveLayout";

export function LimitHeaderButton(props: {
  onClick: () => void,
  // @ts-expect-error ts-migrate(2694) FIXME: Namespace 'React' has no exported member 'Node'.
  children: React.Node,
  variesForDesktop?: boolean,
}) {
  if (props.variesForDesktop) {
    return (
      <>
        <Desktop>
          <a href="#" onClick={props.onClick} className="t-color-purple-60">
            {props.children}
          </a>
        </Desktop>
        <MobileAndTablet>
          <NormalVariant {...props} />
        </MobileAndTablet>
      </>
    );
  }

  return <NormalVariant {...props} />;
}

// @ts-expect-error ts-migrate(2694) FIXME: Namespace 'React' has no exported member 'Node'.
function NormalVariant(props: { onClick: () => void, children: React.Node }) {
  return (
    <ButtonSecondary size="sm" onClick={props.onClick}>
      <span className="t-color-black">{props.children}</span>
    </ButtonSecondary>
  );
}
