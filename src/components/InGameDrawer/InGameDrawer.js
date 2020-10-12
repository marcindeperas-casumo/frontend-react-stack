// @flow
import React from "react";
import { isNativeByUserAgent } from "GameProviders";
import { QuickDeposit } from "Components/QuickDeposit";
import { InGameDrawerLinksContainer as InGameDrawerLinks } from "./InGameDrawerLinksContainer";

type Props = {
  onLiveChatClick: Function,
  onExitGameClick: Function,
};

export const InGameDrawer = ({ onLiveChatClick, onExitGameClick }: Props) => {
  const isQuickDepositDisabled = isNativeByUserAgent();

  return (
    <div className="t-background-grey-90 t-border-r">
      {isQuickDepositDisabled && (
        <QuickDeposit className="u-padding-left--lg u-padding-right--md u-padding-y--md" />
      )}
      <InGameDrawerLinks
        className="u-padding--lg"
        onExitGameClick={onExitGameClick}
        onLiveChatClick={onLiveChatClick}
      />
    </div>
  );
};
