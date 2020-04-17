// @flow
import * as React from "react";
import Button from "@casumo/cmp-button";
import { MobileAndTablet, Desktop } from "Components/ResponsiveLayout";

export function LimitHeaderButton(props: {
  onClick: () => void,
  children: React.Node,
  variesForDesktop?: true,
}) {
  if (props.variesForDesktop) {
    return (
      <>
        <Desktop>
          <a href="#" onClick={props.onClick} className="t-color-plum">
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

function NormalVariant(props: { onClick: () => void, children: React.Node }) {
  return (
    <Button onClick={props.onClick} variant="secondary">
      {props.children}
    </Button>
  );
}
