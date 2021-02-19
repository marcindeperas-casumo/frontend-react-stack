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
    icon: CasinoTabSelectedIcon,
    label: "Casino",
    to: "/casino",
    isActive: true,
  },
  {
    icon: FootballIcon,
    label: "Sports",
    to: "/sports",
    isActive: false,
  },
  {
    icon: CasumoProfileIcon,
    label: "Samuel L. Jackson",
    to: "/profile",
    isActive: false,
  },
];

stories.add("Default", () => <Navbar items={items} />);
