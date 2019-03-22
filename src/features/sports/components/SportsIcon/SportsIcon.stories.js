// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import info from "Storybook/storybookInfo";
import SportsIcon from "./SportsIcon";

const stories = storiesOf("Sports/SportsIcon", module);

const footballProps = {
  alt: "Football",
  iconSrc: "https://cms.casumo.com/wp-content/uploads/2019/01/football1.svg",
  activeIndicatorSrc: `https://cms.casumo.com/wp-content/uploads/2019/03/sports-active-indicator-default.svg`,
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
  alt: "Yankee soccer",
  iconSrc:
    "https://cms.casumo.com/wp-content/uploads/2019/02/american-football.svg",
  activeIndicatorSrc: `https://cms.casumo.com/wp-content/uploads/2019/03/sports-active-indicator-custom.svg`,
};

stories.add(
  "American Football (active)",
  () => <SportsIcon {...americanFootballProps} isActive />,
  info({ text: "American Football (active)" })
);

stories.add(
  "American Football (inactive)",
  () => <SportsIcon {...americanFootballProps} />,
  info({ text: "American Football (inactive)" })
);
