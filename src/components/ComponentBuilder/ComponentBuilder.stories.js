import React from "react";
import { storiesOf } from "@storybook/react";
import info from "Storybook/storybookInfo";
import ComponentBuilder from "Components/ComponentBuilder";
import ComponentBuilderRenderer from "Components/ComponentBuilder/ComponentBuilderRenderer";
import ComponentBuilderCMS from "Components/ComponentBuilder/ComponentBuilderCMS";
import MockStore from "Components/MockStore";

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

const ComponentBuilderStory = () => (
  <MockStore state={state}>
    <ComponentBuilder slug="foo" />
  </MockStore>
);

const ComponentBuilderRendererStory = () => (
  <MockStore state={state}>
    <ComponentBuilderRenderer componentDefinitions={componentDefinitions} />
  </MockStore>
);

const ComponentBuilderCMSStory = () => (
  <MockStore state={state}>
    <ComponentBuilderCMS
      fetch={() => {}}
      componentDefinitions={componentDefinitions}
    />
  </MockStore>
);

stories.add(
  "ComponentBuilder (Connected)",
  ComponentBuilderStory,
  info({
    text: `This component is rendering out components defined in a CMS page (indentified by its slug).
      If the page is not fetched yet it will start fetching it.`,
  })
);

stories.add(
  "ComponentBuilderRenderer",
  ComponentBuilderRendererStory,
  info({
    text:
      "This component is rendering out components defined by a data structure.",
  })
);

stories.add(
  "ComponentBuilderCMS",
  ComponentBuilderCMSStory,
  info({
    text: `The component is rendering out the components defined by a data structure,
      and also calls the 'fetch' prop on component mount.`,
  })
);
