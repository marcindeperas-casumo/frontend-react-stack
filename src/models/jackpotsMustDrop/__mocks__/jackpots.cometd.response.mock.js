export default {
  "31001": {
    name: "Daily Drop Jackpot",
    type: "time",
    amount: { value: "1000.50", currency: "GBP", formattedAmount: "£1000" },
    target: "2018-11-22 22:00:00",
  },
  "31002": {
    name: "Must Drop Jackpot",
    type: "ceiling",
    amount: { value: "100.39", currency: "GBP", formattedAmount: "£100" },
    target: { value: "1100.00", currency: "GBP", formattedAmount: "£100.00" },
  },
  "31003": {
    name: "Mega Drop Jackpot",
    type: "progressive",
    amount: { value: "19000.98", currency: "GBP", formattedAmount: "£19,000" },
    target: null,
  },
};
