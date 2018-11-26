export default [
  {
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
  },
  {
    label: "Pays before €1000",
    image: "https://cms.casumo.com/wp-content/uploads/2018/11/Must-Drop.svg",
    id: "31002",
    name: "Must Drop Jackpot",
    type: "ceiling",
    amount: {
      value: "91.39",
      currency: "GBP",
      formattedAmount: "£91",
    },
    target: {
      value: "900.00",
      currency: "GBP",
      formattedAmount: "£900.00",
    },
  },
  {
    label: "Progressive Jackpot",
    image:
      "https://cms.casumo.com/wp-content/uploads/2018/11/Full-round-black-container.svg",
    id: "31003",
    name: "Mega Drop Jackpot",
    type: "progressive",
    amount: {
      value: "17780.98",
      currency: "GBP",
      formattedAmount: "£17,780",
    },
    target: null,
  },
];
