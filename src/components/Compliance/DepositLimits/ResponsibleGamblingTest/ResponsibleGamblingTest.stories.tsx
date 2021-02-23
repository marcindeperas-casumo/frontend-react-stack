import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { ResponsibleGamblingTest } from "./ResponsibleGamblingTest";
import t from "./__mocks__/cms";

const stories = storiesOf("DepositLimits/ResponsibleGamblingTest", module);

const props = {
  sendRGTestResult: action("sendRGTestResult"),
  fetchQuestions: action("fetchQuestions"),
};
// @ts-expect-error ts-migrate(2741) FIXME: Property 'void' is missing in type '{ sendRGTestRe... Remove this comment to see the full error message
stories.add("Default", () => <ResponsibleGamblingTest t={t} {...props} />);
