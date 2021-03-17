import { storiesOf } from "@storybook/react";
import * as React from "react";
import { Changelog } from "./Changelog";
import cms, { changelog } from "./__mocks__/cms";
import "./termsAndConditions.scss";

const stories = storiesOf("RSModal/T&C", module);

stories.add("Changelog", () => (
  <Changelog
    t={cms}
    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ t: { table_of_contents_title: string; chan... Remove this comment to see the full error message
    locale="en-GB"
    ackTimestamp={1355314332000}
    changelog={changelog}
  />
));
