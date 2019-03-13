// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import info from "Storybook/storybookInfo";

import SportsIcon from "./SportsIcon";

const stories = storiesOf("Sports/SportsIcon", module);

const icon = "https://cms.casumo.com/wp-content/uploads/2019/01/football1.svg";
const active =
  "https://cms.casumo.com/wp-content/uploads/2019/01/football11.svg";
const props = { src: { icon, active } };

stories.add(
  "Active",
  () => <SportsIcon {...props} isActive />,
  info({ text: "Default" })
);

stories.add(
  "Inactive",
  () => <SportsIcon {...props} />,
  info({ text: "Default" })
);
