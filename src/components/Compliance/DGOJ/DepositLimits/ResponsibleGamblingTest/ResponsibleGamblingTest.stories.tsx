import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import * as React from "react";
import { ResponsibleGamblingTest } from "./ResponsibleGamblingTest";
import t from "./__mocks__/cms";

const stories = storiesOf(
  "Compliance/DGOJ/DepositLimits/ResponsibleGamblingTest",
  module
);

const props = {
  sendRGTestResult: action("sendRGTestResult"),
  fetchQuestions: action("fetchQuestions"),
};
stories.add("Default", () => <ResponsibleGamblingTest t={t} {...props} />);
