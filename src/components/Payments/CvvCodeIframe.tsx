//@flow
import React from "react";
import { IFRAME_MODE, IFRAME_PIQ_ENV } from "Models/payments";
import { isTestEnv } from "Utils";
import { PiqIframeComponent } from "./PiqIframeComponent";

const ENV = isTestEnv() ? IFRAME_PIQ_ENV.TEST : IFRAME_PIQ_ENV.LIVE;
const ID = "cvvCodeIframeId";

type Props = {
  // @ts-expect-error ts-migrate(2300) FIXME: Duplicate identifier 'void'.
  onValidation: string => void,
  // @ts-expect-error ts-migrate(2300) FIXME: Duplicate identifier 'void'.
  onSuccess: string => void,
};

export const CvvCodeIframe = (props: Props) => {
  const localProps = {
    ...props,
    env: ENV,
    id: ID,
    mode: IFRAME_MODE.CVV_CODE,
  };
  // @ts-expect-error ts-migrate(2322) FIXME: Type '{ env: string; id: string; mode: string; onV... Remove this comment to see the full error message
  return <PiqIframeComponent {...localProps} />;
};
