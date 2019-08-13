// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import MockStore from "Components/MockStore";
import { TermsAndConditions } from "./TermsAndConditions";
import cms from "./__mocks__/cms";

const acks = {
  first: {
    version: 16,
    timestamp: new Date("2019-01-01T06:06:06").valueOf(),
  },
  last: {
    version: 17,
    timestamp: new Date("2019-06-01T07:07:07").valueOf(),
  },
};

const state = {
  schema: {
    cms: {
      "toc.dgoj.v17.content": {
        slug: "toc.dgoj.v17.content",
        content: cms.content,
      },
    },
  },
};

const stories = storiesOf("RSModal/T&C", module);
const actions = {
  fetchTACAcknowledgements: action("fetchTACAcknowledgements"),
  fetchTranslations: action("fetchTranslations"),
};
stories.add("Default", () => (
  <MockStore state={state}>
    <TermsAndConditions t={cms} acks={acks} {...actions} locale="en-GB" />
  </MockStore>
));
