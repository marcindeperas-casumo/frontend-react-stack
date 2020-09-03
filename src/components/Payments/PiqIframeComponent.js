import React, { useEffect, useRef, useState } from "react";
import { uidGenerator } from "Utils";
import {
  piqIframeUrlBase as urlBase,
  composeIframeUrl,
  MESSAGE_ACTION,
} from "./constants";

const iframeIdGenerator = uidGenerator();

export const PiqIframeComponent = ({
  id = iframeIdGenerator.next().value,
  env,
  mode,
  luhnCheck = true,
  onIframeMessage,
  onError,
  onSuccess,
}) => {
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
