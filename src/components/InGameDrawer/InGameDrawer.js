// @flow
import React from "react";
import { QuickDeposit } from "Components/QuickDeposit";
import { InGameDrawerLinksContainer as InGameDrawerLinks } from "./InGameDrawerLinksContainer";

type Props = {
  onLiveChatClick: Function,
  onExitGameClick: Function,
};

export const InGameDrawer = ({ onLiveChatClick, onExitGameClick }: Props) => (
  <div className="t-background-grey-90 t-border-r">
    <QuickDeposit classNames="u-padding-left--xlg u-padding-right--md u-padding-y--md" />
    <InGameDrawerLinks
      classNames="u-padding-left--xlg u-padding-right--md u-padding-y--lg"
      onExitGameClick={onExitGameClick}
      onLiveChatClick={onLiveChatClick}
    />
  </div>
);
