import { range } from "ramda";

const activeIndicator = `<?xml version="1.0" encoding="UTF-8"?> <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none"> <g style="mix-blend-mode:multiply"> <rect x="20" y="19" width="22" height="22" rx="11" fill="currentColor"></rect> </g> </svg>`;

export const userNavigationData = [
  {
    sport: {
      name: "Football",
      id: 1000093190,
      clientPath: "filter/football",
      termKey: "football",
      icon: "https://cms.casumo.com/wp-content/uploads/2019/01/football1.svg",
      activeIndicator,
      canSelectSubgroups: true,
    },
    subNav: [
      {
        competition: {
          name: "Euro 2020 Qualification",
          id: 2000117846,
          clientPath: "filter/football/euro_2020_qualification",
          termKey: "euro_2020_qualification",
          regionCode: "EU",
        },
      },
      {
        competition: {
          name: "Premier League",
          id: 1000094985,
          clientPath: "filter/football/england/premier_league",
          termKey: "premier_league",
          regionCode: "GB-ENG",
        },
      },
      {
        competition: {
          name: "Bundesliga",
          id: 1000094994,
          clientPath: "filter/football/germany/bundesliga",
          termKey: "bundesliga",
          regionCode: "DE",
        },
      },
      {
        competition: {
          name: "Serie A",
          id: 1000095001,
          clientPath: "filter/football/italy/serie_a",
          termKey: "serie_a",
          regionCode: "IT",
        },
      },
      {
        competition: {
          name: "Liga Águila",
          id: 1000449742,
          clientPath: "filter/football/colombia/liga_aguila",
          termKey: "liga_aguila",
          regionCode: "CO",
        },
      },
    ],
  },
  {
    sport: {
      name: "Basketball",
      id: 1000093204,
      clientPath: "filter/basketball",
      termKey: "basketball",
      icon: "https://cms.casumo.com/wp-content/uploads/2019/02/basketball1.svg",
      activeIndicator,
      canSelectSubgroups: false,
    },
    subNav: [
      {
        competition: {
          name: "Liga ACB",
          id: 1000094189,
          clientPath: "filter/basketball/spain/liga_acb",
          termKey: "liga_acb",
          regionCode: "ES",
        },
      },
      {
        competition: {
          name: "NCAAM",
          id: 1000093654,
          clientPath: "filter/basketball/ncaam",
          termKey: "ncaam",
          regionCode: null,
        },
      },
      {
        competition: {
          name: "NBA",
          id: 1000093652,
          clientPath: "filter/basketball/nba",
          termKey: "nba",
          regionCode: null,
        },
      },
      {
        competition: {
          name: "Energa Basket Liga",
          id: 1000443916,
          clientPath: "filter/basketball/poland/energa_basket_liga",
          termKey: "energa_basket_liga",
          regionCode: "PL",
        },
      },
      {
        competition: {
          name: "Euroleague",
          id: 1000093451,
          clientPath: "filter/basketball/euroleague",
          termKey: "euroleague",
          regionCode: "EU",
        },
      },
    ],
  },
  {
    sport: {
      name: "Golf",
      id: 1000093187,
      clientPath: "filter/golf",
      termKey: "golf",
      icon: "https://cms.casumo.com/wp-content/uploads/2019/02/golf.svg",
      activeIndicator,
      canSelectSubgroups: false,
    },
    subNav: [
      {
        competition: {
          name: "PGA Tour",
          id: 1000093683,
          clientPath: "filter/golf/pga_tour",
          termKey: "pga_tour",
          regionCode: null,
        },
      },
      {
        competition: {
          name: "European Tour",
          id: 1000093480,
          clientPath: "filter/golf/european_tour",
          termKey: "european_tour",
          regionCode: "EU",
        },
      },
      {
        competition: {
          name: "Ryder Cup",
          id: 1000093728,
          clientPath: "filter/golf/ryder_cup",
          termKey: "ryder_cup",
          regionCode: null,
        },
      },
      {
        competition: {
          name: "Season Bets",
          id: 2000052390,
          clientPath: "filter/golf/season_bets",
          termKey: "season_bets",
          regionCode: null,
        },
      },
      {
        competition: {
          name: "Solheim Cup",
          id: 1000093774,
          clientPath: "filter/golf/solheim_cup",
          termKey: "solheim_cup",
          regionCode: null,
        },
      },
    ],
  },
  {
    sport: {
      name: "Tennis",
      id: 1000093193,
      clientPath: "filter/tennis",
      termKey: "tennis",
      icon: "https://cms.casumo.com/wp-content/uploads/2019/02/tennis.svg",
      activeIndicator,
      canSelectSubgroups: false,
    },
    subNav: [
      {
        competition: {
          name: "ATP",
          id: 1000093324,
          clientPath: "filter/tennis/atp",
          termKey: "atp",
          regionCode: null,
        },
      },
      {
        competition: {
          name: "WTA",
          id: 1000093904,
          clientPath: "filter/tennis/wta",
          termKey: "wta",
          regionCode: null,
        },
      },
      {
        competition: {
          name: "ITF Women",
          id: 1000462066,
          clientPath: "filter/tennis/itf_women",
          termKey: "itf_women",
          regionCode: null,
        },
      },
      {
        competition: {
          name: "Challenger",
          id: 1000093377,
          clientPath: "filter/tennis/challenger",
          termKey: "challenger",
          regionCode: null,
        },
      },
      {
        competition: {
          name: "WTA Doubles",
          id: 2000070647,
          clientPath: "filter/tennis/wta_doubles",
          termKey: "wta_doubles",
          regionCode: null,
        },
      },
      ...range(0, 8).map(i => ({
        competition: {
          name: `Madeup Comp ${i}`,
          id: 2000070647 + i,
          clientPath: `filter/tennis/comp${i}`,
          termKey: `comp_${i}`,
          regionCode: null,
        },
      })),
    ],
  },
  {
    sport: {
      name: "American Football",
      id: 1000093199,
      clientPath: "filter/american_football",
      termKey: "american_football",
      icon:
        "https://cms.casumo.com/wp-content/uploads/2019/02/american-football.svg",
      activeIndicator,
      canSelectSubgroups: false,
    },
    subNav: [
      {
        competition: {
          name: "NFL",
          id: 1000093656,
          clientPath: "filter/american_football/nfl",
          termKey: "nfl",
          regionCode: null,
        },
      },
      {
        competition: {
          name: "NCAAF",
          id: 1000093655,
          clientPath: "filter/american_football/ncaaf",
          termKey: "ncaaf",
          regionCode: null,
        },
      },
      {
        competition: {
          name: "CFL",
          id: 1000093370,
          clientPath: "filter/american_football/cfl",
          termKey: "cfl",
          regionCode: null,
        },
      },
    ],
  },
  {
    sport: {
      name: "Athletics",
      id: 1000093200,
      clientPath: "filter/athletics",
      termKey: "athletics",
      icon: "https://cms.casumo.com/wp-content/uploads/2019/02/athletics.svg",
      activeIndicator,
      canSelectSubgroups: false,
    },
    subNav: [
      {
        competition: {
          name: "World Championships",
          id: 2000104572,
          clientPath: "filter/athletics/world_championships",
          termKey: "world_championships",
          regionCode: null,
        },
      },
      {
        competition: {
          name: "Specials",
          id: 2000116773,
          clientPath: "filter/athletics/specials",
          termKey: "specials",
          regionCode: null,
        },
      },
    ],
  },
  {
    sport: {
      name: "Australian Rules",
      id: 1000449347,
      clientPath: "filter/australian_rules",
      termKey: "australian_rules",
      icon: "https://cms.casumo.com/wp-content/uploads/2019/02/rugby.svg",
      activeIndicator,
      canSelectSubgroups: false,
    },
    subNav: [
      {
        competition: {
          name: "AFL",
          id: 1000470474,
          clientPath: "filter/australian_rules/afl",
          termKey: "afl",
          regionCode: "AU",
        },
      },
      {
        competition: {
          name: "AFL (W)",
          id: 2000097953,
          clientPath: "filter/australian_rules/afl__w_",
          termKey: "afl__w_",
          regionCode: "AU",
        },
      },
    ],
  },
  {
    sport: {
      name: "Badminton",
      id: 1000093216,
      clientPath: "filter/badminton",
      termKey: "badminton",
      icon: "https://cms.casumo.com/wp-content/uploads/2019/02/misc_badge.svg",
      activeIndicator,
      canSelectSubgroups: false,
    },
    subNav: [
      {
        competition: {
          name: "Orleans Masters",
          id: 2000113024,
          clientPath: "filter/badminton/orleans_masters",
          termKey: "orleans_masters",
          regionCode: null,
        },
      },
    ],
  },
  {
    sport: {
      name: "Bandy",
      id: 1000093192,
      clientPath: "filter/bandy",
      termKey: "bandy",
      icon: "https://cms.casumo.com/wp-content/uploads/2019/02/bandy.svg",
      activeIndicator,
      canSelectSubgroups: false,
    },
    subNav: [
      {
        competition: {
          name: "Elitserien",
          id: 1000094877,
          clientPath: "filter/bandy/sweden/elitserien",
          termKey: "elitserien",
          regionCode: "SE",
        },
      },
      {
        competition: {
          name: "Super League",
          id: 2000062462,
          clientPath: "filter/bandy/russia/super_league",
          termKey: "super_league",
          regionCode: "RU",
        },
      },
    ],
  },
  {
    sport: {
      name: "Baseball",
      id: 1000093211,
      clientPath: "filter/baseball",
      termKey: "baseball",
      icon: "https://cms.casumo.com/wp-content/uploads/2019/02/baseball.svg",
      activeIndicator,
      canSelectSubgroups: false,
    },
    subNav: [
      {
        competition: {
          name: "MLB",
          id: 1000093616,
          clientPath: "filter/baseball/mlb",
          termKey: "mlb",
          regionCode: null,
        },
      },
      {
        competition: {
          name: "MLB Spring Training",
          id: 2000069864,
          clientPath: "filter/baseball/mlb_spring_training",
          termKey: "mlb_spring_training",
          regionCode: null,
        },
      },
    ],
  },
  {
    sport: {
      name: "Boxing",
      id: 1000093201,
      clientPath: "filter/boxing",
      termKey: "boxing",
      icon: "https://cms.casumo.com/wp-content/uploads/2019/02/boxing.svg",
      activeIndicator,
      canSelectSubgroups: false,
    },
    subNav: [
      {
        competition: {
          name: "Upcoming Fights",
          id: 2000050854,
          clientPath: "filter/boxing/upcoming_fights",
          termKey: "upcoming_fights",
          regionCode: null,
        },
      },
      {
        competition: {
          name: "Unconfirmed Fights",
          id: 2000091527,
          clientPath: "filter/boxing/unconfirmed_fights",
          termKey: "unconfirmed_fights",
          regionCode: null,
        },
      },
    ],
  },
  {
    sport: {
      name: "Chess",
      id: 1000190837,
      clientPath: "filter/chess",
      termKey: "chess",
      icon: "https://cms.casumo.com/wp-content/uploads/2019/02/chess.svg",
      activeIndicator,
      canSelectSubgroups: false,
    },
    subNav: [
      {
        competition: {
          name: "International Tournaments",
          id: 2000050395,
          clientPath: "filter/chess/international_tournaments",
          termKey: "international_tournaments",
          regionCode: null,
        },
      },
      {
        competition: {
          name: "World Championship",
          id: 1000190838,
          clientPath: "filter/chess/world_championship",
          termKey: "world_championship",
          regionCode: null,
        },
      },
    ],
  },
  {
    sport: {
      name: "Cricket",
      id: 1000093178,
      clientPath: "filter/cricket",
      termKey: "cricket",
      icon: "https://cms.casumo.com/wp-content/uploads/2019/02/cricket.svg",
      activeIndicator,
      canSelectSubgroups: false,
    },
    subNav: [
      {
        competition: {
          name: "The Ashes",
          id: 1000093838,
          clientPath: "filter/cricket/the_ashes",
          termKey: "the_ashes",
          regionCode: null,
        },
      },
    ],
  },
  {
    sport: {
      name: "Cycling",
      id: 1000093233,
      clientPath: "filter/cycling",
      termKey: "cycling",
      icon: "https://cms.casumo.com/wp-content/uploads/2019/02/cycling.svg",
      activeIndicator,
      canSelectSubgroups: false,
    },
    subNav: [
      {
        competition: {
          name: "Milano - Sanremo",
          id: 1000093633,
          clientPath: "filter/cycling/milano_-_sanremo",
          termKey: "milano_-_sanremo",
          regionCode: null,
        },
      },
      {
        competition: {
          name: "Giro d Italia",
          id: 1000093521,
          clientPath: "filter/cycling/giro_d_italia",
          termKey: "giro_d_italia",
          regionCode: null,
        },
      },
      {
        competition: {
          name: "Paris - Roubaix",
          id: 1000093690,
          clientPath: "filter/cycling/paris_-_roubaix",
          termKey: "paris_-_roubaix",
          regionCode: null,
        },
      },
      {
        competition: {
          name: "Specials",
          id: 1000093792,
          clientPath: "filter/cycling/specials",
          termKey: "specials",
          regionCode: null,
        },
      },
      {
        competition: {
          name: "Tour de France",
          id: 1000093855,
          clientPath: "filter/cycling/tour_de_france",
          termKey: "tour_de_france",
          regionCode: "FR",
        },
      },
    ],
  },
  {
    sport: {
      name: "Darts",
      id: 1000093225,
      clientPath: "filter/darts",
      termKey: "darts",
      icon: "https://cms.casumo.com/wp-content/uploads/2019/02/darts.svg",
      activeIndicator,
      canSelectSubgroups: false,
    },
    subNav: [
      {
        competition: {
          name: "European Open",
          id: 2000077828,
          clientPath: "filter/darts/pdc_european_tour/european_open",
          termKey: "european_open",
          regionCode: "EU",
        },
      },
      {
        competition: {
          name: "PDC World Championship",
          id: 1000093681,
          clientPath: "filter/darts/pdc_world_championship",
          termKey: "pdc_world_championship",
          regionCode: null,
        },
      },
      {
        competition: {
          name: "Unibet Premier League of Darts",
          id: 1000093703,
          clientPath: "filter/darts/unibet_premier_league_of_darts",
          termKey: "unibet_premier_league_of_darts",
          regionCode: null,
        },
      },
    ],
  },
  {
    sport: {
      name: "Esports",
      id: 2000077768,
      clientPath: "filter/esports",
      termKey: "esports",
      icon: "https://cms.casumo.com/wp-content/uploads/2019/02/e-sports.svg",
      activeIndicator,
      canSelectSubgroups: false,
    },
    subNav: [
      {
        competition: {
          name: "BLAST Pro Series",
          id: 2000116619,
          clientPath: "filter/esports/cs_go/blast_pro_series",
          termKey: "blast_pro_series",
          regionCode: null,
        },
      },
      {
        competition: {
          name: "LCS",
          id: 2000118079,
          clientPath: "filter/esports/league_of_legends/lcs",
          termKey: "lcs",
          regionCode: null,
        },
      },
      {
        competition: {
          name: "LCK",
          id: 2000117181,
          clientPath: "filter/esports/league_of_legends/lck",
          termKey: "lck",
          regionCode: null,
        },
      },
      {
        competition: {
          name: "WCS",
          id: 2000116643,
          clientPath: "filter/esports/starcraft_2/wcs",
          termKey: "wcs",
          regionCode: null,
        },
      },
      {
        competition: {
          name: "Dreamhack Masters",
          id: 2000116647,
          clientPath: "filter/esports/cs_go/dreamhack_masters",
          termKey: "dreamhack_masters",
          regionCode: null,
        },
      },
    ],
  },
  {
    sport: {
      name: "Floorball",
      id: 1000093206,
      clientPath: "filter/floorball",
      termKey: "floorball",
      icon: "https://cms.casumo.com/wp-content/uploads/2019/02/floorball.svg",
      activeIndicator,
      canSelectSubgroups: false,
    },
    subNav: [
      {
        competition: {
          name: "Superligan",
          id: 1000094957,
          clientPath: "filter/floorball/sweden/superligan",
          termKey: "superligan",
          regionCode: "SE",
        },
      },
      {
        competition: {
          name: "Allsvenskan Norra",
          id: 2000053988,
          clientPath: "filter/floorball/sweden/allsvenskan_norra",
          termKey: "allsvenskan_norra",
          regionCode: "SE",
        },
      },
      {
        competition: {
          name: "Superliga",
          id: 2000051621,
          clientPath: "filter/floorball/czech_republic/superliga",
          termKey: "superliga",
          regionCode: "CZ",
        },
      },
      {
        competition: {
          name: "Eliteserien",
          id: 1000095790,
          clientPath: "filter/floorball/norway/eliteserien",
          termKey: "eliteserien",
          regionCode: "NO",
        },
      },
      {
        competition: {
          name: "Unihoc Floorball Ligaen",
          id: 2000068642,
          clientPath: "filter/floorball/denmark/unihoc_floorball_ligaen",
          termKey: "unihoc_floorball_ligaen",
          regionCode: "DK",
        },
      },
    ],
  },
  {
    sport: {
      name: "Futsal",
      id: 1000093184,
      clientPath: "filter/futsal",
      termKey: "futsal",
      icon: "https://cms.casumo.com/wp-content/uploads/2019/02/volleyball.svg",
      activeIndicator,
      canSelectSubgroups: false,
    },
    subNav: [
      {
        competition: {
          name: "Primera División",
          id: 1000094053,
          clientPath: "filter/futsal/spain/primera_division",
          termKey: "primera_division",
          regionCode: "ES",
        },
      },
    ],
  },
  {
    sport: {
      name: "Gaelic Sports",
      id: 2000087309,
      clientPath: "filter/gaelic_sports",
      termKey: "gaelic_sports",
      icon: "https://cms.casumo.com/wp-content/uploads/2019/02/gaelic.svg",
      activeIndicator,
      canSelectSubgroups: false,
    },
    subNav: [
      {
        competition: {
          name: "Allianz Football League",
          id: 2000113673,
          clientPath:
            "filter/gaelic_sports/gaelic_football/allianz_football_league",
          termKey: "allianz_football_league",
          regionCode: null,
        },
      },
      {
        competition: {
          name: "National Hurling League",
          id: 2000092927,
          clientPath: "filter/gaelic_sports/hurling/national_hurling_league",
          termKey: "national_hurling_league",
          regionCode: null,
        },
      },
      {
        competition: {
          name: "All-Ireland Senior Championship",
          id: 2000087313,
          clientPath:
            "filter/gaelic_sports/gaelic_football/all-ireland_senior_championship",
          termKey: "all-ireland_senior_championship",
          regionCode: "IE",
        },
      },
      {
        competition: {
          name: "All-Ireland Senior Championship",
          id: 2000087314,
          clientPath:
            "filter/gaelic_sports/hurling/all-ireland_senior_championship",
          termKey: "all-ireland_senior_championship",
          regionCode: "IE",
        },
      },
      {
        competition: {
          name: "Joe McDonagh Cup",
          id: 2000115235,
          clientPath: "filter/gaelic_sports/hurling/joe_mcdonagh_cup",
          termKey: "joe_mcdonagh_cup",
          regionCode: null,
        },
      },
    ],
  },
  {
    sport: {
      name: "Handball",
      id: 1000093205,
      clientPath: "filter/handball",
      termKey: "handball",
      icon: "https://cms.casumo.com/wp-content/uploads/2019/02/handball.svg",
      activeIndicator,
      canSelectSubgroups: false,
    },
    subNav: [
      {
        competition: {
          name: "International Friendly Matches (W)",
          id: 1000316395,
          clientPath: "filter/handball/international_friendly_matches__w_",
          termKey: "international_friendly_matches__w_",
          regionCode: null,
        },
      },
      {
        competition: {
          name: "2. Bundesliga",
          id: 2000055957,
          clientPath: "filter/handball/germany/2__bundesliga",
          termKey: "2__bundesliga",
          regionCode: "DE",
        },
      },
      {
        competition: {
          name: "1. Division Men",
          id: 1000444999,
          clientPath: "filter/handball/denmark/1__division_men",
          termKey: "1__division_men",
          regionCode: "DK",
        },
      },
      {
        competition: {
          name: "Champions League",
          id: 1000093380,
          clientPath: "filter/handball/champions_league",
          termKey: "champions_league",
          regionCode: "EU",
        },
      },
      {
        competition: {
          name: "EHF Cup",
          id: 1000093434,
          clientPath: "filter/handball/ehf_cup",
          termKey: "ehf_cup",
          regionCode: null,
        },
      },
    ],
  },
  {
    sport: {
      name: "Ice Hockey",
      id: 1000093191,
      clientPath: "filter/ice_hockey",
      termKey: "ice_hockey",
      icon: "https://cms.casumo.com/wp-content/uploads/2019/02/ice_hockey.svg",
      activeIndicator,
      canSelectSubgroups: false,
    },
    subNav: [
      {
        competition: {
          name: "SHL",
          id: 1000094968,
          clientPath: "filter/ice_hockey/sweden/shl",
          termKey: "shl",
          regionCode: "SE",
        },
      },
      {
        competition: {
          name: "NHL",
          id: 1000093657,
          clientPath: "filter/ice_hockey/nhl",
          termKey: "nhl",
          regionCode: null,
        },
      },
      {
        competition: {
          name: "AHL",
          id: 2000055188,
          clientPath: "filter/ice_hockey/ahl",
          termKey: "ahl",
          regionCode: null,
        },
      },
      {
        competition: {
          name: "Liiga",
          id: 1000094964,
          clientPath: "filter/ice_hockey/finland/liiga",
          termKey: "liiga",
          regionCode: "FI",
        },
      },
      {
        competition: {
          name: "2. Bundesliga",
          id: 2000055940,
          clientPath: "filter/ice_hockey/germany/2__bundesliga",
          termKey: "2__bundesliga",
          regionCode: "DE",
        },
      },
    ],
  },
  {
    sport: {
      name: "Motorsports",
      id: 2000050136,
      clientPath: "filter/motorsports",
      termKey: "motorsports",
      icon: "https://cms.casumo.com/wp-content/uploads/2019/02/motorsports.svg",
      activeIndicator,
      canSelectSubgroups: false,
    },
    subNav: [
      {
        competition: {
          name: "Nascar",
          id: 2000050160,
          clientPath: "filter/motorsports/nascar",
          termKey: "nascar",
          regionCode: null,
        },
      },
      {
        competition: {
          name: "Formula 1",
          id: 2000050137,
          clientPath: "filter/motorsports/formula_1",
          termKey: "formula_1",
          regionCode: null,
        },
      },
      {
        competition: {
          name: "Motorcycling",
          id: 2000050141,
          clientPath: "filter/motorsports/motorcycling",
          termKey: "motorcycling",
          regionCode: null,
        },
      },
      {
        competition: {
          name: "Speedway",
          id: 2000050229,
          clientPath: "filter/motorsports/speedway",
          termKey: "speedway",
          regionCode: null,
        },
      },
      {
        competition: {
          name: "Supercars",
          id: 2000061308,
          clientPath: "filter/motorsports/supercars",
          termKey: "supercars",
          regionCode: null,
        },
      },
    ],
  },
  {
    sport: {
      name: "Netball",
      id: 2000054941,
      clientPath: "filter/netball",
      termKey: "netball",
      icon: "https://cms.casumo.com/wp-content/uploads/2019/02/netball.svg",
      activeIndicator,
      canSelectSubgroups: false,
    },
    subNav: [
      {
        competition: {
          name: "World Cup",
          id: 2000055726,
          clientPath: "filter/netball/world_cup",
          termKey: "world_cup",
          regionCode: null,
        },
      },
      {
        competition: {
          name: "ANZ Premiership",
          id: 2000104632,
          clientPath: "filter/netball/anz_premiership",
          termKey: "anz_premiership",
          regionCode: null,
        },
      },
      {
        competition: {
          name: "Super Netball",
          id: 2000054942,
          clientPath: "filter/netball/super_netball",
          termKey: "super_netball",
          regionCode: null,
        },
      },
    ],
  },
  {
    sport: {
      name: "Olympic Games",
      id: 1000093179,
      clientPath: "filter/olympic_games",
      termKey: "olympic_games",
      icon:
        "https://cms.casumo.com/wp-content/uploads/2019/02/games-olympics.svg",
      activeIndicator,
      canSelectSubgroups: false,
    },
    subNav: [
      {
        competition: {
          name: "Specials",
          id: 1000385486,
          clientPath: "filter/olympic_games/athletics/specials",
          termKey: "specials",
          regionCode: null,
        },
      },
    ],
  },
  {
    sport: {
      name: "Politics",
      id: 2000061894,
      clientPath: "filter/politics",
      termKey: "politics",
      icon: "https://cms.casumo.com/wp-content/uploads/2019/02/politics.svg",
      activeIndicator,
      canSelectSubgroups: false,
    },
    subNav: [
      {
        competition: {
          name: "Elections",
          id: 2000061977,
          clientPath: "filter/politics/united_kingdom/elections",
          termKey: "elections",
          regionCode: "GB",
        },
      },
      {
        competition: {
          name: "Elections",
          id: 2000061975,
          clientPath: "filter/politics/usa/elections",
          termKey: "elections",
          regionCode: "US",
        },
      },
      {
        competition: {
          name: "In the Spotlight",
          id: 2000061984,
          clientPath: "filter/politics/united_kingdom/in_the_spotlight",
          termKey: "in_the_spotlight",
          regionCode: "GB",
        },
      },
      {
        competition: {
          name: "Laws & Referendums",
          id: 2000084196,
          clientPath: "filter/politics/united_kingdom/laws___referendums",
          termKey: "laws___referendums",
          regionCode: "GB",
        },
      },
      {
        competition: {
          name: "In the Spotlight",
          id: 2000061982,
          clientPath: "filter/politics/usa/in_the_spotlight",
          termKey: "in_the_spotlight",
          regionCode: "US",
        },
      },
    ],
  },
  {
    sport: {
      name: "Rugby League",
      id: 1000154363,
      clientPath: "filter/rugby_league",
      termKey: "rugby_league",
      icon: "https://cms.casumo.com/wp-content/uploads/2019/02/rugby.svg",
      activeIndicator,
      canSelectSubgroups: false,
    },
    subNav: [
      {
        competition: {
          name: "NRL",
          id: 2000050687,
          clientPath: "filter/rugby_league/nrl",
          termKey: "nrl",
          regionCode: null,
        },
      },
      {
        competition: {
          name: "Super League",
          id: 1000154364,
          clientPath: "filter/rugby_league/super_league",
          termKey: "super_league",
          regionCode: null,
        },
      },
      {
        competition: {
          name: "QLD Cup",
          id: 2000060551,
          clientPath: "filter/rugby_league/australia/qld_cup",
          termKey: "qld_cup",
          regionCode: "AU",
        },
      },
      {
        competition: {
          name: "NSW Cup",
          id: 2000060605,
          clientPath: "filter/rugby_league/australia/nsw_cup",
          termKey: "nsw_cup",
          regionCode: "AU",
        },
      },
      {
        competition: {
          name: "Challenge Cup",
          id: 2000053270,
          clientPath: "filter/rugby_league/challenge_cup",
          termKey: "challenge_cup",
          regionCode: null,
        },
      },
    ],
  },
  {
    sport: {
      name: "Rugby Union",
      id: 1000093230,
      clientPath: "filter/rugby_union",
      termKey: "rugby_union",
      icon: "https://cms.casumo.com/wp-content/uploads/2019/02/rugby.svg",
      activeIndicator,
      canSelectSubgroups: false,
    },
    subNav: [
      {
        competition: {
          name: "Super Rugby",
          id: 2000054418,
          clientPath: "filter/rugby_union/super_rugby",
          termKey: "super_rugby",
          regionCode: null,
        },
      },
      {
        competition: {
          name: "Pro 14",
          id: 2000050248,
          clientPath: "filter/rugby_union/pro_14",
          termKey: "pro_14",
          regionCode: null,
        },
      },
      {
        competition: {
          name: "Premiership",
          id: 1000281175,
          clientPath: "filter/rugby_union/england/premiership",
          termKey: "premiership",
          regionCode: "GB-ENG",
        },
      },
      {
        competition: {
          name: "Top 14",
          id: 1000094823,
          clientPath: "filter/rugby_union/france/top_14",
          termKey: "top_14",
          regionCode: "FR",
        },
      },
      {
        competition: {
          name: "Pro D2",
          id: 1000094824,
          clientPath: "filter/rugby_union/france/pro_d2",
          termKey: "pro_d2",
          regionCode: "FR",
        },
      },
    ],
  },
  {
    sport: {
      name: "Snooker",
      id: 1000093176,
      clientPath: "filter/snooker",
      termKey: "snooker",
      icon: "https://cms.casumo.com/wp-content/uploads/2019/02/snooker.svg",
      activeIndicator,
      canSelectSubgroups: false,
    },
    subNav: [
      {
        competition: {
          name: "Tour Championship",
          id: 2000117975,
          clientPath: "filter/snooker/tour_championship",
          termKey: "tour_championship",
          regionCode: null,
        },
      },
      {
        competition: {
          name: "World Championship",
          id: 1000093920,
          clientPath: "filter/snooker/world_championship",
          termKey: "world_championship",
          regionCode: null,
        },
      },
    ],
  },
  {
    sport: {
      name: "Surfing",
      id: 2000061311,
      clientPath: "filter/surfing",
      termKey: "surfing",
      icon: "https://cms.casumo.com/wp-content/uploads/2019/02/surfing.svg",
      activeIndicator,
      canSelectSubgroups: false,
    },
    subNav: [
      {
        competition: {
          name: "WSL Men’s Championship Tour",
          id: 2000083049,
          clientPath: "filter/surfing/wsl_mens_championship_tour",
          termKey: "wsl_mens_championship_tour",
          regionCode: null,
        },
      },
      {
        competition: {
          name: "WSL Women’s Championship Tour",
          id: 2000083048,
          clientPath: "filter/surfing/wsl_womens_championship_tour",
          termKey: "wsl_womens_championship_tour",
          regionCode: null,
        },
      },
    ],
  },
  {
    sport: {
      name: "Trotting",
      id: 1000093195,
      clientPath: "filter/trotting",
      termKey: "trotting",
      icon: "https://cms.casumo.com/wp-content/uploads/2019/02/trotting.svg",
      activeIndicator,
      canSelectSubgroups: false,
    },
    subNav: [
      {
        competition: {
          name: "Boden",
          id: 2000065051,
          clientPath: "filter/trotting/sweden/boden",
          termKey: "boden",
          regionCode: "SE",
        },
      },
      {
        competition: {
          name: "Kouvola",
          id: 2000065098,
          clientPath: "filter/trotting/finland/kouvola",
          termKey: "kouvola",
          regionCode: "FI",
        },
      },
      {
        competition: {
          name: "Specials",
          id: 1000094731,
          clientPath: "filter/trotting/sweden/specials",
          termKey: "specials",
          regionCode: "SE",
        },
      },
      {
        competition: {
          name: "Momarken",
          id: 2000065125,
          clientPath: "filter/trotting/norway/momarken",
          termKey: "momarken",
          regionCode: "NO",
        },
      },
      {
        competition: {
          name: "Prix d´Amerique",
          id: 1000095214,
          clientPath: "filter/trotting/france/prix_damerique",
          termKey: "prix_damerique",
          regionCode: "FR",
        },
      },
    ],
  },
  {
    sport: {
      name: "TV & Novelty",
      id: 2000053071,
      clientPath: "filter/tv___novelty",
      termKey: "tv___novelty",
      icon: "https://cms.casumo.com/wp-content/uploads/2019/02/tv_novelty.svg",
      activeIndicator,
      canSelectSubgroups: false,
    },
    subNav: [
      {
        competition: {
          name: "Let's Dance",
          id: 2000093652,
          clientPath: "filter/tv___novelty/sweden/let_s_dance",
          termKey: "let_s_dance",
          regionCode: "SE",
        },
      },
      {
        competition: {
          name: "TV Shows",
          id: 2000060565,
          clientPath: "filter/tv___novelty/australia/tv_shows",
          termKey: "tv_shows",
          regionCode: "AU",
        },
      },
      {
        competition: {
          name: "Eurovision",
          id: 2000085087,
          clientPath: "filter/tv___novelty/global/eurovision",
          termKey: "eurovision",
          regionCode: "EU",
        },
      },
      {
        competition: {
          name: "Awards & Prizes",
          id: 2000075006,
          clientPath: "filter/tv___novelty/australia/awards___prizes",
          termKey: "awards___prizes",
          regionCode: "AU",
        },
      },
      {
        competition: {
          name: "TV Shows",
          id: 2000053372,
          clientPath: "filter/tv___novelty/finland/tv_shows",
          termKey: "tv_shows",
          regionCode: "FI",
        },
      },
    ],
  },
  {
    sport: {
      name: "UFC/MMA",
      id: 1000093238,
      clientPath: "filter/ufc_mma",
      termKey: "ufc_mma",
      icon: "https://cms.casumo.com/wp-content/uploads/2019/02/mma.svg",
      activeIndicator,
      canSelectSubgroups: false,
    },
    subNav: [
      {
        competition: {
          name: "UFC",
          id: 1000093883,
          clientPath: "filter/ufc_mma/ufc",
          termKey: "ufc",
          regionCode: null,
        },
      },
      {
        competition: {
          name: "KSW",
          id: 2000052254,
          clientPath: "filter/ufc_mma/ksw",
          termKey: "ksw",
          regionCode: null,
        },
      },
      {
        competition: {
          name: "Bellator",
          id: 2000050782,
          clientPath: "filter/ufc_mma/bellator",
          termKey: "bellator",
          regionCode: null,
        },
      },
      {
        competition: {
          name: "Unconfirmed Fights",
          id: 2000091553,
          clientPath: "filter/ufc_mma/unconfirmed_fights",
          termKey: "unconfirmed_fights",
          regionCode: null,
        },
      },
    ],
  },
  {
    sport: {
      name: "Volleyball",
      id: 1000093214,
      clientPath: "filter/volleyball",
      termKey: "volleyball",
      icon: "https://cms.casumo.com/wp-content/uploads/2019/02/volleyball.svg",
      activeIndicator,
      canSelectSubgroups: false,
    },
    subNav: [
      {
        competition: {
          name: "LSK (W)",
          id: 1000421780,
          clientPath: "filter/volleyball/poland/lsk__w_",
          termKey: "lsk__w_",
          regionCode: "PL",
        },
      },
      {
        competition: {
          name: "Ligue A",
          id: 1000094820,
          clientPath: "filter/volleyball/france/ligue_a",
          termKey: "ligue_a",
          regionCode: "FR",
        },
      },
      {
        competition: {
          name: "PlusLiga",
          id: 1000421776,
          clientPath: "filter/volleyball/poland/plusliga",
          termKey: "plusliga",
          regionCode: "PL",
        },
      },
      {
        competition: {
          name: "Superliga",
          id: 2000052648,
          clientPath: "filter/volleyball/brazil/superliga",
          termKey: "superliga",
          regionCode: "BR",
        },
      },
      {
        competition: {
          name: "Championnat National (W)",
          id: 2000076386,
          clientPath: "filter/volleyball/algeria/championnat_national__w_",
          termKey: "championnat_national__w_",
          regionCode: "DZ",
        },
      },
    ],
  },
  {
    sport: {
      name: "Winter Olympic Games",
      id: 1000093180,
      clientPath: "filter/winter_olympic_games",
      termKey: "winter_olympic_games",
      icon:
        "https://cms.casumo.com/wp-content/uploads/2019/02/games-olympics.svg",
      activeIndicator,
      canSelectSubgroups: false,
    },
    subNav: [
      {
        competition: {
          name: "Medal Specials",
          id: 2000056541,
          clientPath: "filter/winter_olympic_games/medal_specials",
          termKey: "medal_specials",
          regionCode: null,
        },
      },
    ],
  },
  {
    sport: {
      name: "Winter Sports",
      id: 1000217859,
      clientPath: "filter/winter_sports",
      termKey: "winter_sports",
      icon:
        "https://cms.casumo.com/wp-content/uploads/2019/02/wintersports.svg",
      activeIndicator,
      canSelectSubgroups: false,
    },
    subNav: [
      {
        competition: {
          name: "Biathlon",
          id: 1000217870,
          clientPath: "filter/winter_sports/biathlon",
          termKey: "biathlon",
          regionCode: null,
        },
      },
      {
        competition: {
          name: "Cross-country",
          id: 1000217866,
          clientPath: "filter/winter_sports/cross-country",
          termKey: "cross-country",
          regionCode: null,
        },
      },
    ],
  },
  {
    sport: {
      name: "WWE/Pro Wrestling",
      id: 2000089034,
      clientPath: "filter/wwe_pro_wrestling",
      termKey: "wwe_pro_wrestling",
      icon: "https://cms.casumo.com/wp-content/uploads/2019/02/misc_badge.svg",
      activeIndicator,
      canSelectSubgroups: false,
    },
    subNav: [
      {
        competition: {
          name: "-WrestleMania",
          id: 2000090870,
          clientPath: "filter/wwe_pro_wrestling/-wrestlemania",
          termKey: "-wrestlemania",
          regionCode: null,
        },
      },
      {
        competition: {
          name: "Props/Futures",
          id: 2000093691,
          clientPath: "filter/wwe_pro_wrestling/props_futures",
          termKey: "props_futures",
          regionCode: null,
        },
      },
      {
        competition: {
          name: "Royal Rumble",
          id: 2000090869,
          clientPath: "filter/wwe_pro_wrestling/royal_rumble",
          termKey: "royal_rumble",
          regionCode: null,
        },
      },
      {
        competition: {
          name: "Specials",
          id: 2000096132,
          clientPath: "filter/wwe_pro_wrestling/specials",
          termKey: "specials",
          regionCode: null,
        },
      },
    ],
  },
];
