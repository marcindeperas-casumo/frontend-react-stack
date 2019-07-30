// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { PdfButton } from "./PdfButton";

let href;
const stories = storiesOf("PdfButton", module);
const props = {
  label: "Download PDF",
  fetchHref: () => {},
};

stories.add("loading href", () => <PdfButton {...props} />);

stories.add("with href", () => <PdfButton {...props} href="/games" />);
