// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import info from "Storybook/storybookInfo";

import SportsIcon from "./SportsIcon";

const stories = storiesOf("Sports/SportsIcon", module);

const footballProps = {
  src: {
    icon: "https://cms.casumo.com/wp-content/uploads/2019/01/football1.svg",
    active: "https://cms.casumo.com/wp-content/uploads/2019/01/football11.svg",
  },
};

stories.add(
  "Football (active)",
  () => <SportsIcon {...footballProps} isActive />,
  info({ text: "Football (active)" })
);

stories.add(
  "Football (inactive)",
  () => <SportsIcon {...footballProps} />,
  info({ text: "Football (inactive)" })
);

const americanFootballProps = {
  src: {
    icon:
      "https://cms.casumo.com/wp-content/uploads/2019/02/american-football.svg",
    active: "https://cms.casumo.com/wp-content/uploads/2019/01/football11.svg",
  },
};

stories.add(
  "American Football (active)",
  () => <SportsIcon {...americanFootballProps} isActive />,
  info({ text: "Football (active)" })
);

stories.add(
  "American Football (inactive)",
  () => <SportsIcon {...americanFootballProps} />,
  info({ text: "Football (inactive)" })
);
