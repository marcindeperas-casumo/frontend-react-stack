import { ButtonSecondary } from "@casumo/cmp-button";
import * as React from "react";
import { MobileAndTablet, Desktop } from "Components/ResponsiveLayout";

export function LimitHeaderButton(props: {
  onClick: () => void;
  children: React.ReactNode;
  variesForDesktop?: boolean;
}) {
  if (props.variesForDesktop) {
    return (
      <>
        <Desktop>
          <a href="#" onClick={props.onClick} className="text-purple-60">
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

function NormalVariant(props: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <ButtonSecondary size="sm" onClick={props.onClick}>
      <span className="text-black">{props.children}</span>
    </ButtonSecondary>
  );
}
