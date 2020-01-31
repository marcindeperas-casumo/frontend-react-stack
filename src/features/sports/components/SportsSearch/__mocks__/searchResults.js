const icon = "https://cms.casumo.com/wp-content/uploads/2019/01/football1.svg";

const hasResults = {
  search: [
    {
      type: "PARTICIPANT",
      id: "/football/all/all/arsenal",
      localizedName: "Arsenal",
      country: null,
      sport: {
        icon,
        name: "Football",
      },
    },
    {
      type: "PARTICIPANT",
      id: "/football/all/all/arsenal_tula",
      localizedName: "Arsenal Tula",
      country: null,
      sport: {
        icon,
        name: "Football",
      },
    },
    {
      type: "SPORT",
      id: "/football",
      localizedName: "Football",
      country: null,
      sport: {
        icon,
        name: "Football",
      },
    },
    {
      type: "LEAGUE",
      id: "/football/spain/la_liga",
      localizedName: "La Liga, also with a very long text so then we can see the ellipsis happening in this line, but it needs to be really long text so then it can overflow and all of this",
      country: "Spain",
      sport: {
        icon: "http://cms.casumotest.com/wp-content/uploads/2019/02/football3.svg",
        name: "Football",
      },
    },
  ],
};

export default {
  hasResults,
  noResults: { search: [] },
};
