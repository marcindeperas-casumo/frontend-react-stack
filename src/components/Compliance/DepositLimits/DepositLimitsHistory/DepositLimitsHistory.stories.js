// @flow
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { DepositLimitsHistory } from "./DepositLimitsHistory";
import t from "./__mocks__/cms";

const stories = storiesOf("DepositLimits/DepositLimitsHistory", module);
const history = [
  {
    id: "413a0771-e7a9-4c4f-a7b3-3cd9856cd63f",
    timestamp: "2019-08-05T14:25:20Z",
    type: "decrease",
    changes: [
      {
        limitKind: "daily",
        before: 600,
        after: 500,
      },
      {
        limitKind: "weekly",
        before: 1500,
        after: 1400,
      },
      {
        limitKind: "monthly",
        before: 3000,
        after: 2500,
      },
    ],
    setOnRegistration: false,
  },
  {
    id: "cd4ef6bf-74f1-49fa-86c7-8b157af0c44d",
    timestamp: "2019-08-02T16:19:26Z",
    type: "removed",
    changes: [
      {
        limitKind: "daily",
        before: 500,
        after: null,
      },
      {
        limitKind: "weekly",
        before: 1400,
        after: null,
      },
      {
        limitKind: "monthly",
        before: 2500,
        after: null,
      },
    ],
    setOnRegistration: false,
  },
  {
    id: "2e48a8fa-e0bb-4132-8aba-7348bc21dd58",
    timestamp: "2019-08-02T14:31:07Z",
    type: "decrease",
    changes: [
      {
        limitKind: "daily",
        before: null,
        after: 666,
      },
      {
        limitKind: "weekly",
        before: null,
        after: 3333,
      },
      {
        limitKind: "monthly",
        before: null,
        after: 9999,
      },
    ],
    setOnRegistration: false,
  },
];
const props = {
  fetchTranslations: action("fetchTranslations"),
  getLimitsHistory: action("getLimitsHistory"),
  currency: "EUR",
  locale: "en-GB",
  history,
  t,
};

stories.add("Default", () => <DepositLimitsHistory {...props} />);
