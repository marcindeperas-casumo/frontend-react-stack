import { storiesOf } from "@storybook/react";
import React from "react";
import { PdfButton } from "./PdfButton";

const stories = storiesOf("PdfButton", module);
const props = {
  label: "Download PDF",
  fetchHref: () => {},
};

stories.add("loading href", () => <PdfButton {...props} />);

stories.add("with href", () => <PdfButton {...props} href="/games" />);
