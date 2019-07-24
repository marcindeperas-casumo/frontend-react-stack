// @flow
import React from "react";

const activeIndicator = `<?xml version="1.0" encoding="UTF-8"?> <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none"> <g style="mix-blend-mode:multiply"> <rect x="20" y="19" width="22" height="22" rx="11" fill="currentColor"></rect> </g> </svg>`;

export const liveNavItem = {
  iconProps: {
    activeIndicator,
    iconSrc: "https://cms.casumo.com/wp-content/uploads/2019/02/football.svg",
    alt: "Football",
  },
  text: "Football",
  path: "filter/football/all/all/all/in-play",
  key: "football",
  subNav: [
    {
      text: "All",
      path: "filter/football/australia/state_cups/all/in-play",
      key: "all",
      parentPath: "filter/football/all/all/all/in-play",
    },
  ],
};

export const navItems = [
  {
    iconProps: {
      activeIndicator,
      iconSrc: "https://cms.casumo.com/wp-content/uploads/2019/02/football.svg",
      alt: "Football",
    },
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
    iconProps: {
      activeIndicator,
      iconSrc: "https://cms.casumo.com/wp-content/uploads/2019/02/tennis.svg",
      alt: "Tennis",
    },
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
    iconProps: {
      activeIndicator,
      iconSrc:
        "https://cms.casumo.com/wp-content/uploads/2019/02/horse_racing.svg",
      alt: "Horse Racing",
    },
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
    iconProps: {
      activeIndicator,
      iconSrc: "https://cms.casumo.com/wp-content/uploads/2019/02/cricket.svg",
      alt: "Horse Racing",
    },
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
