import { storiesOf } from "@storybook/react";
import {
  CasinoTabSelectedIcon,
  CasumoProfileIcon,
  FootballIcon,
} from "@casumo/cmp-icons";
import React from "react";
import { Navbar } from "Components/Navbar";
const stories = storiesOf("Navbar", module);
const items = [
  {
    icon: CasinoTabSelectedIcon,
    label: "Casino",
    to: "/casino",
  },
  {
    icon: FootballIcon,
    label: "Sports",
    to: "/sports",
  },
  {
    icon: CasumoProfileIcon,
    label: "Samuel L. Jackson",
    to: "/profile",
  },
];

stories.add("Default", () => <Navbar items={items} />);
