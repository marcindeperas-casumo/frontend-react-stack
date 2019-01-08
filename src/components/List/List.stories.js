// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { select } from "@storybook/addon-knobs/react";

import info from "Storybook/storybookInfo";
import List from "Components/List";

const stories = storiesOf("List", module);

const data = ["Tom", "Dick", "Harry"];

const spacings = ["xs", "sm", "default", "md", "lg", "xlg", "2xlg"];

stories.add(
  "Default",
  () => (
    <List
      itemSpacing={select("item spacing", spacings, "default")}
      items={data}
      render={item => <p className="u-margin-bottom--none">{item}</p>}
    />
  ),
  info({ text: "Default" })
);
