// @flow
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Changelog } from "./Changelog";
import cms from "./__mocks__/cms";
import "./termsAndConditions.scss";

const stories = storiesOf("RSModal/T&C", module);

stories.add("Changelog", () => (
  <Changelog
    t={cms}
    locale="en-GB"
    ackTimestamp={1355314332000}
    changelog={cms.versions[16].changelog}
  />
));
