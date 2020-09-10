import React from "react";
import { PiqIframeComponent } from "./PiqIframeComponent";
import { IFRAME_MODE } from "./constants";

export const CVVCode = props => {
  const localProps = {
    ...props,
    mode: IFRAME_MODE.CVV_CODE,
  };
  return <PiqIframeComponent {...localProps} />;
};
