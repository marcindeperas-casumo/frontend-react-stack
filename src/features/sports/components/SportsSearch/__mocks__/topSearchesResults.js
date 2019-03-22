const hasResults = {
  topSearches: [
    {
      termKey: "football",
      name: "Football",
      clientPath: "filter/football",
      icon: "https://cms.casumo.com/wp-content/uploads/2019/01/football1.svg",
      parentGroups: [],
    },
    {
      termKey: "basketball",
      name: "Basketball",
      clientPath: "filter/basketball",
      icon: "https://cms.casumo.com/wp-content/uploads/2019/02/basketball1.svg",
      parentGroups: [],
    },
    {
      termKey: "tennis",
      name: "Tennis",
      clientPath: "filter/tennis",
      icon: "https://cms.casumo.com/wp-content/uploads/2019/02/tennis.svg",
      parentGroups: [],
    },
    {
      termKey: "golf",
      name: "Golf",
      clientPath: "filter/golf",
      icon: "https://cms.casumo.com/wp-content/uploads/2019/02/golf.svg",
      parentGroups: [],
    },
    {
      termKey: "volleyball",
      name: "Volleyball",
      clientPath: "filter/volleyball",
      icon: "https://cms.casumo.com/wp-content/uploads/2019/02/volleyball.svg",
      parentGroups: [],
    },
    {
      termKey: "ice_hockey",
      name: "Ice Hockey",
      clientPath: "filter/ice_hockey",
      icon: "https://cms.casumo.com/wp-content/uploads/2019/02/ice_hockey.svg",
      parentGroups: [],
    },
    {
      termKey: "champions_league",
      name: "Champions League",
      clientPath: "filter/football/champions_league",
      icon: "https://cms.casumo.com/wp-content/uploads/2019/02/misc_badge.svg",
      parentGroups: [
        {
          icon:
            "https://cms.casumo.com/wp-content/uploads/2019/01/football1.svg",
          name: "Football",
        },
      ],
    },
    {
      termKey: "allsvenskan",
      name: "Allsvenskan",
      clientPath: "filter/football/sweden/allsvenskan",
      icon: "https://cms.casumo.com/wp-content/uploads/2019/02/misc_badge.svg",
      parentGroups: [
        {
          icon:
            "https://cms.casumo.com/wp-content/uploads/2019/01/football1.svg",
          name: "Football",
        },
        {
          icon:
            "https://cms.casumo.com/wp-content/uploads/2019/02/misc_badge.svg",
          name: "Sweden",
        },
      ],
    },
    {
      termKey: "premier_league",
      name: "Premier League",
      clientPath: "filter/football/england/premier_league",
      icon: "https://cms.casumo.com/wp-content/uploads/2019/02/misc_badge.svg",
      parentGroups: [
        {
          icon:
            "https://cms.casumo.com/wp-content/uploads/2019/01/football1.svg",
          name: "Football",
        },
        {
          icon:
            "https://cms.casumo.com/wp-content/uploads/2019/02/misc_badge.svg",
          name: "England",
        },
      ],
    },
    {
      termKey: "the_championship",
      name: "The Championship",
      clientPath: "filter/football/england/the_championship",
      icon: "https://cms.casumo.com/wp-content/uploads/2019/02/misc_badge.svg",
      parentGroups: [
        {
          icon:
            "https://cms.casumo.com/wp-content/uploads/2019/01/football1.svg",
          name: "Football",
        },
        {
          icon:
            "https://cms.casumo.com/wp-content/uploads/2019/02/misc_badge.svg",
          name: "England",
        },
      ],
    },
  ],
};

export default {
  hasResults,
};
