// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { TableOfContents } from "./TableOfContents";
import { parseTableOfContents } from "./termsAndConditions.utils";
import { content } from "./__mocks__/cms";

const stories = storiesOf("RSModal/T&C", module);

const { tableOfContents } = parseTableOfContents(content);

stories.add("TableOfContents", () => {
  return <TableOfContents tableOfContents={tableOfContents} />;
});
