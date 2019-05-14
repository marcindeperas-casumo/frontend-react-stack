// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import SportsIcon from "./SportsIcon";

const stories = storiesOf("Sports/SportsIcon", module);

const footballProps = {
  alt: "Football",
  iconSrc: "https://cms.casumo.com/wp-content/uploads/2019/01/football1.svg",
  activeIndicatorSrc: `https://cms.casumo.com/wp-content/uploads/2019/03/sports-active-indicator-default.svg`,
};

stories.add("Football (active)", () => (
  <SportsIcon {...footballProps} isActive />
));

stories.add("Football (inactive)", () => <SportsIcon {...footballProps} />);

const americanFootballProps = {
  alt: "Yankee soccer",
  iconSrc:
    "https://cms.casumo.com/wp-content/uploads/2019/02/american-football.svg",
  activeIndicatorSrc: `https://cms.casumo.com/wp-content/uploads/2019/03/sports-active-indicator-custom.svg`,
};

stories.add("American Football (active)", () => (
  <SportsIcon {...americanFootballProps} isActive />
));

stories.add("American Football (inactive)", () => (
  <SportsIcon {...americanFootballProps} />
));
