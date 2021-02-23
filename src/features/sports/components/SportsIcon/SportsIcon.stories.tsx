// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { activeIndicator } from "Features/sports/components/SportsNav/sportsNavUtils";
import SportsIcon from "./SportsIcon";

const stories = storiesOf("Sports/SportsIcon", module);
const activeIndicatorCustom = `<?xml version="1.0" encoding="UTF-8"?> <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none"> <g style="mix-blend-mode:multiply"> <rect width="22" height="22" rx="11" fill="currentColor"></rect> </g> </svg>`;

const footballProps = {
  alt: "Football",
  iconSrc: "https://cms.casumo.com/wp-content/uploads/2019/01/football1.svg",
  activeIndicator,
};

stories.add("Football (active)", () => (
  <SportsIcon {...footballProps} isActive />
));

stories.add("Football (inactive)", () => <SportsIcon {...footballProps} />);

const americanFootballProps = {
  alt: "Yankee soccer",
  iconSrc:
    "https://cms.casumo.com/wp-content/uploads/2019/02/american-football.svg",
  activeIndicator: activeIndicatorCustom,
};

stories.add("American Football (active)", () => (
  <SportsIcon {...americanFootballProps} isActive />
));

stories.add("American Football (inactive)", () => (
  <SportsIcon {...americanFootballProps} />
));
