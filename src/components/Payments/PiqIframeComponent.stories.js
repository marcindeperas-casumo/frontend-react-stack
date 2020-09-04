import React, { useState } from "react";
import { storiesOf } from "@storybook/react";
import { PiqIframeComponent } from "./PiqIframeComponent";
import { IFRAME_MODE } from "./constants";

const stories = storiesOf("Payments");

const iframeSettings = {
  id: 1,
  env: "test",
  mode: IFRAME_MODE.CVV_CODE,
};

const PiqTestWrapper = () => {
  const [error, setError] = useState();
  const [token, setToken] = useState();
  const props = {
    ...iframeSettings,
    onValidation: e => {
      setError(e);
      setToken(null);
    },
    onSuccess: t => {
      setToken(t);
      setError(null);
    },
  };

  return (
    <div>
      <PiqIframeComponent {...props} />
      <div>Validation error: {error || "cvv is valid"}</div>
      <div>Valid token: {token || "validation error"}</div>
    </div>
  );
};

stories.add("Piq Iframe component", () => <PiqTestWrapper />);
