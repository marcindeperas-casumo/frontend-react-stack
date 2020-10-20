//@flow
import React from "react";
import { IFRAME_MODE, IFRAME_PIQ_ENV } from "Models/payments";
import { isTestEnv } from "Utils";
import { PiqIframeComponent } from "./PiqIframeComponent";
import type { Props as ParentPropsType } from "./PiqIframeComponent";

const ENV = isTestEnv ? IFRAME_PIQ_ENV.TEST : IFRAME_PIQ_ENV.LIVE;
const ID = "cvvCodeIframeId";

export const CvvCodeIframe = (props: ParentPropsType) => {
  const localProps = {
    ...props,
    env: ENV,
    id: ID,
    mode: IFRAME_MODE.CVV_CODE,
  };
  return <PiqIframeComponent {...localProps} />;
};
