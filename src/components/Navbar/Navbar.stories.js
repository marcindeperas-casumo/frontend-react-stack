// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import {
  CasinoTabSelectedIcon,
  CasumoProfileIcon,
  FootballIcon,
} from "@casumo/cmp-icons";
import { Navbar } from "Components/Navbar";
const stories = storiesOf("Navbar", module);
const items = [
  {
    Icon: CasinoTabSelectedIcon,
    text: "Casino",
    to: "/",
    active: true,
  },
  {
    Icon: FootballIcon,
    text: "Sports",
    to: "/",
    active: false,
  },
  {
    Icon: CasumoProfileIcon,
    text: "Samuel L. Jackson",
    to: "/",
    active: false,
  },
];

stories.add("Default", () => <Navbar items={items} />);
