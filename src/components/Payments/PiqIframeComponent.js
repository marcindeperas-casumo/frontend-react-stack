// @flow
import React, { useEffect, useRef, useState } from "react";
import { uidGenerator } from "Utils";
import {
  piqIframeUrlBase as urlBase,
  composeIframeUrl,
  MESSAGE_ACTION,
  TYPE_TO_CARD,
  IFRAME_MODE,
} from "./constants";

const iframeIdGenerator = uidGenerator();

type Props = {
  id: ?number,
  mode: $Values<typeof IFRAME_MODE>,
  env: string,
  luhnCheck: boolean,
  onSuccess: (token: string) => {},
  onValidation: (errorCode: string) => {},
  onCardType: (param: string) => {},
  onCardIdentifier: (param: string) => {},
};

export const PiqIframeComponent = ({
  id = iframeIdGenerator.next().value,
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

    if (action === MESSAGE_ACTION.INITIALIZE) {
      setChildFrame({
        window: source,
        origin: origin,
      });
    }

    if (action === MESSAGE_ACTION.SUCCESS) {
      onSuccess(data.param);
    }

    if (action === MESSAGE_ACTION.VALIDATION) {
      onValidation(data.param);
    }

    if (action === MESSAGE_ACTION.CARD_TYPE) {
      onCardType(TYPE_TO_CARD[data.param]);
    }

    if (action === MESSAGE_ACTION.CARD_IDENTIFIER) {
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

  return <iframe ref={iframe} title={`piqIframe_${id}`} src={url} />;
};
