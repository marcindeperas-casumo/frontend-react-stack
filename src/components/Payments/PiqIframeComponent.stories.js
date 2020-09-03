import React from "react";
import { storiesOf } from "@storybook/react";
import { PiqIframeComponent } from "./PiqIframeComponent";
import { IFRAME_MODE } from "./constants";

const stories = storiesOf("Payments");

const iframeSettings = {
  env: "test",
  mode: IFRAME_MODE.CVV_CODE,
};

stories.add("Piq Iframe component", () => {
  const props = {
    ...iframeSettings,
  };

  return <PiqIframeComponent {...props} />;
});
