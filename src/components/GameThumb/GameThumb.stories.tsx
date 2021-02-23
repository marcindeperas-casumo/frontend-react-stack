// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { GameThumb } from "Components/GameThumb";

const stories = storiesOf("GameThumb", module);
const logoBackground =
  "https://cms.casumo.com/wp-content/uploads/2014/06/Starburst_Thumb.jpg";
const logo =
  "https://cms.casumo.com/wp-content/uploads/2014/02/Starburst_Logo.png";

stories.add("Default", () => (
  <GameThumb src={logoBackground} mark={logo} alt="Starburst" />
));
