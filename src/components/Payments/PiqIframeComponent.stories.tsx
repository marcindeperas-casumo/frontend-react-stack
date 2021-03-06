import { storiesOf } from "@storybook/react";
import React, { useState } from "react";
import { IFRAME_MODE } from "Models/payments";
import { PiqIframeComponent } from "./PiqIframeComponent";

// @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
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
