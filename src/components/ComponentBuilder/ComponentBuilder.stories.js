// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import MockStore from "Components/MockStore";
import { ComponentBuilderRenderer } from "./ComponentBuilderRenderer";

const componentDefinitions = [
  { acf_fc_layout: "GAMES_LIST", id: "popularGames" },
  {
    acf_fc_layout: "HTML_CONTENT",
    html: "<br /><br /><div>This is some custom HTML code.</div>",
  },
  { acf_fc_layout: "GAMES_LIST", id: "exclusiveGames" },
  {
    acf_fc_layout: "HTML_CONTENT",
    html: "<br /><br /><div>HTML code again.</div><br /><br />",
  },
];
const state = {
  schema: {
    cms: {
      foo: {
        slug: "foo",
        fields: {
          content_builder: componentDefinitions,
        },
      },
    },
  },
};

const stories = storiesOf("ComponentBuilder", module);

const ComponentBuilderRendererStory = () => (
  <MockStore state={state}>
    <ComponentBuilderRenderer componentDefinitions={componentDefinitions} />
  </MockStore>
);

stories.add("ComponentBuilderRenderer", ComponentBuilderRendererStory, {
  info: {
    text:
      "This component is rendering out components defined by a data structure.",
  },
});
