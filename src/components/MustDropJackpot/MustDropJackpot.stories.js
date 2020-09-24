// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { MustDropJackpot } from "Components/MustDropJackpot";
const stories = storiesOf("MustDropJackpot", module);

const jackpot = {
  label: "Pays before 1AM",
  image: "https://cms.casumo.com/wp-content/uploads/2018/11/Daily-Drop.svg",
  id: "31001",
  name: "Daily Drop Jackpot",
  type: "time",
  amount: {
    value: "887.50",
    currency: "GBP",
    formattedAmount: "£887",
  },
  target: "2018-11-22 22:00:00",
};

stories.add("Default", () => <MustDropJackpot jackpot={jackpot} />);
