//@flow
import React from "react";
import { IFRAME_MODE } from "Models/payments";
import { PiqIframeComponent } from "./PiqIframeComponent";
import type { Props as ParentPropsType } from "./PiqIframeComponent";

export const CvvCodeIframe = (props: ParentPropsType) => {
  const localProps = {
    ...props,
    mode: IFRAME_MODE.CVV_CODE,
  };
  return <PiqIframeComponent {...localProps} />;
};
