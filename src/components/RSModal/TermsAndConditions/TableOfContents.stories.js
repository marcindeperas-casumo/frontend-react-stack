// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { TableOfContents } from "./TableOfContents";
import { parseTableOfContents } from "./termsAndConditions.utils";
import cms from "./__mocks__/cms";

const stories = storiesOf("RSModal/T&C", module);

const originalContent = cms.content;
const { tableOfContents } = parseTableOfContents(originalContent);

stories.add("TableOfContents", () => {
  return <TableOfContents tableOfContents={tableOfContents} />;
});
