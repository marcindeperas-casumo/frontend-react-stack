const rouletteNumbers = {
  red: [
    "1",
    "3",
    "5",
    "7",
    "9",
    "12",
    "14",
    "16",
    "18",
    "19",
    "21",
    "23",
    "25",
    "27",
    "30",
    "32",
    "34",
    "36",
  ],
  "grey-dark-2": [
    "2",
    "4",
    "6",
    "8",
    "10",
    "11",
    "13",
    "15",
    "17",
    "20",
    "22",
    "24",
    "26",
    "28",
    "29",
    "31",
    "33",
    "35",
  ],
  "green-light-1": ["0", "00"],
};

export const getRouletteColor = n => {
  let color;
  Object.entries(rouletteNumbers).some(([k, v]) => {
    let exists = v.includes(n);
    color = exists ? k : "green-light-1";
    return exists;
  });
  return color;
};

const moneyWheelNumbers = {
  "01": "yellow",
  "02": "blue-light-1",
  "05": "purple",
  "10": "green-light-1",
  "20": "orange",
  "40": "red",
  X7: "grey-dark-2",
};

export const getDreamCatcherColor = n => {
  let color;
  Object.entries(moneyWheelNumbers).some(([k, v]) => {
    color = n === k ? v : "green-light-1";
    return n === k;
  });
  return color;
};
