// @flow
import React, { useEffect, useRef, useState } from "react";
import {
  IFRAME_MESSAGE_ACTION,
  IFRAME_TYPE_TO_CARD,
  IFRAME_MODE,
} from "Models/payments";
import { piqIframeUrlBase as urlBase, composeIframeUrl } from "./constants";
import "./PiqIframe.scss";

export type Props = {
  id: number,
  mode: $Values<typeof IFRAME_MODE>,
  env: string,
  luhnCheck: boolean,
  onSuccess: (token: string) => {},
  onValidation: (errorCode: string) => {},
  onCardType: (param: string) => {},
  onCardIdentifier: (param: string) => {},
};

export const PiqIframeComponent = ({
  id,
  env,
  mode,
  luhnCheck = true,
  onSuccess,
  onValidation,
  onCardType,
  onCardIdentifier,
}: Props) => {
  const iframe = useRef(null);
  //eslint-disable-next-line no-unused-vars
  const [childFrame, setChildFrame] = useState(null);

  const piqIframeMessageHandler = ({ data, source, origin }) => {
    const { action } = data;

    if (action === IFRAME_MESSAGE_ACTION.INITIALIZE) {
      setChildFrame({
        window: source,
        origin: origin,
      });
    }

    if (action === IFRAME_MESSAGE_ACTION.SUCCESS) {
      onSuccess(data.param);
    }

    if (action === IFRAME_MESSAGE_ACTION.VALIDATION) {
      onValidation(data.param);
    }

    if (action === IFRAME_MESSAGE_ACTION.CARD_TYPE) {
      onCardType(IFRAME_TYPE_TO_CARD[data.param]);
    }

    if (action === IFRAME_MESSAGE_ACTION.CARD_IDENTIFIER) {
      onCardIdentifier(data.param);
    }
  };

  useEffect(() => {
    window.addEventListener("message", piqIframeMessageHandler, true);

    return () => {
      window.removeEventListener("message", piqIframeMessageHandler, true);
    };
  });

  const url = composeIframeUrl({ urlBase, env, mode, luhnCheck, id });

  return (
    <iframe
      ref={iframe}
      className="c-cvv-piq-iframe"
      title={`piqIframe_${id}`}
      src={url}
    />
  );
};
