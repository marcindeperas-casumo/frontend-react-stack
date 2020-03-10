// @flow
import React from "react";
import { FullscreenView } from "Components/FullscreenView";
import "./LayoutPage.scss";

type Props = {
  children: string,
};

export const LayoutPage = (props: Props) => {
  return (
    <FullscreenView className="u-height--full u-width--full t-background-chrome-dark-3">
      {props.children}
    </FullscreenView>
  );
};
