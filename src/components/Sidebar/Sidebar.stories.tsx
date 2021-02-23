// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import MockStore from "Components/MockStore";
import { Sidebar } from "./Sidebar";

const stories = storiesOf("Sidebar", module);

stories.add("Default with bonus", () => (
  <MockStore>
    <Sidebar
      username="Sumo20"
      wallet="£987.65"
      bonus="+ £55.03 Bonus"
      logout={() => {}}
    />
  </MockStore>
));
