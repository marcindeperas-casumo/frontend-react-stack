import React from "react";
import { IFRAME_MODE, IFRAME_PIQ_ENV } from "Models/payments";
import { isTestEnv } from "Utils";
import { PiqIframeComponent } from "./PiqIframeComponent";

const ENV = isTestEnv() ? IFRAME_PIQ_ENV.TEST : IFRAME_PIQ_ENV.LIVE;
const ID = "cvvCodeIframeId";

type Props = {
  onValidation: (errorCode: string) => void;
  onSuccess: (token: string) => void;
};

export const CvvCodeIframe = (props: Props) => {
  const localProps = {
    ...props,
    env: ENV,
    id: ID,
    mode: IFRAME_MODE.CVV_CODE,
  };

  return <PiqIframeComponent {...localProps} />;
};
