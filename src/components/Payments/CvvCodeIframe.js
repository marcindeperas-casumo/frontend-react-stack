import React from "react";
import { IFRAME_MODE } from "Models/payments";
import { PiqIframeComponent } from "./PiqIframeComponent";

export const CvvCodeIframe = props => {
  const localProps = {
    ...props,
    mode: IFRAME_MODE.CVV_CODE,
  };
  return <PiqIframeComponent {...localProps} />;
};
