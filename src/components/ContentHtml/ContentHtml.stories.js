// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { ContentHtml } from "./ContentHtml";

const stories = storiesOf("ContentHtml", module);
const html = `
  <p>Minimum first deposit of £10 to be eligible for the deposit bonus.</p>
  <p>Only available on first deposit.</p>
`.repeat(20);

stories.add("Default", () => <ContentHtml html={html} />);

stories.add("Expandable", () => (
  <ContentHtml
    html={html}
    expandable
    className="t-background-grey-0 u-padding-y--lg t-border-r--md"
  />
));
