// @flow
import React from "react";
import "./LayoutPage.scss";

type Props = {
  children: string,
};

export const LayoutPage = (props: Props) => {
  return (
    <div className="u-height--full u-width--full t-background-chrome-dark-3">
      {props.children}
    </div>
  );
};
