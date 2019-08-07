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
    diff: { daily: 500, weekly: 2500, monthly: 10000 },
  },
  {
    id: "cd4ef6bf-74f1-49fa-86c7-8b157af0c44d",
    timestamp: "2019-08-02T16:19:26Z",
    diff: { daily: null, weekly: null, monthly: null },
  },
  {
    id: "2e48a8fa-e0bb-4132-8aba-7348bc21dd58",
    timestamp: "2019-08-02T14:31:07Z",
    diff: { daily: 666 },
  },
  {
    id: "2a148d46-441b-49a6-abf5-c1b75fae9b3b",
    timestamp: "2019-08-02T11:41:14Z",
    diff: { daily: 595 },
  },
  {
    id: "a1157dd7-ecdb-4723-9aa2-2bba01ac4891",
    timestamp: "2019-08-02T11:29:22Z",
    diff: { daily: 596 },
  },
  {
    id: "bcc9632c-e421-43cd-a579-f618c18592e6",
    timestamp: "2019-08-02T11:00:53Z",
    diff: { daily: 597 },
  },
  {
    id: "284dcb7e-b258-4403-ab6a-1f339d25ed50",
    timestamp: "2019-07-31T21:52:20Z",
    diff: { daily: 598 },
  },
  {
    id: "640e6695-65c2-434f-9e03-8d67a76fa6e1",
    timestamp: "2019-07-31T18:21:37Z",
    diff: { daily: 599 },
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
