// @flow
import React from "react";

export default [
  {
    icon: (
      <img src="https://cms.casumo.com/wp-content/uploads/2019/02/handball.svg" />
    ),
    text: "Football",
    path: "filter/football",
    key: "football",
    subNav: [
      {
        text: "🇬🇧 Premier League",
        path: "filter/football/premier_league",
        key: "premier_league",
        parentPath: "filter/football",
      },
      {
        text: "🇬🇧 The Championship",
        path: "filter/football/championship",
        key: "championship",
        parentPath: "filter/football",
      },
      {
        text: "🇬🇧 FA CUP",
        path: "filter/football/fa_cup",
        key: "fa_cup",
        parentPath: "filter/football",
      },
    ],
  },
  {
    icon: (
      <img src="https://cms.casumo.com/wp-content/uploads/2019/02/tennis.svg" />
    ),
    text: "Tennis",
    path: "filter/tennis",
    key: "tennis",
    subNav: [
      {
        text: "Tennis tournament 1",
        path: "filter/tennis/tennis1",
        key: "tennis1",
      },
      {
        text: "🇬🇧 Wimbledon",
        path: "filter/tennis/wimbledon",
        key: "wimbledon",
      },
      {
        text: "Davis Cup",
        path: "filter/tennis/davis_cup",
        key: "davis_cup",
      },
    ],
  },
  {
    icon: (
      <img src="https://cms.casumo.com/wp-content/uploads/2019/02/horse_racing.svg" />
    ),
    text: "Horse Racing",
    path: "racing/horse_racing",
    key: "horse_racing",
    subNav: [
      {
        text: "🇬🇧 Aintree",
        path: "racing/horse_racing/aintree",
        key: "aintree",
      },
      {
        text: "🇬🇧 Cheltenham",
        path: "racing/horse_racing/cheltenham",
        key: "cheltenham",
      },
    ],
  },
  {
    icon: (
      <img src="https://cms.casumo.com/wp-content/uploads/2019/02/cricket.svg" />
    ),
    text: "Cricket",
    path: "filter/cricket",
    key: "cricket",
    subNav: [
      {
        text: "The Ashes",
        path: "filter/cricket/ashes",
        key: "ashes",
      },
    ],
  },
];
