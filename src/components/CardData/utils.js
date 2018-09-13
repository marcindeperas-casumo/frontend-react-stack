export const topCardLetters = { L: "H", T: "D", R: "A" };

export const rouletteResults = {
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

const getRouletteColor = n => {
  let color;
  Object.entries(rouletteResults).some(([k, v]) => {
    let exists = v.includes(n);
    color = exists ? k : "green-light-1";
    return exists;
  });
  return color;
};

const moneyWheelResults = {
  "01": "yellow",
  "02": "blue-light-1",
  "05": "purple",
  "10": "green-light-1",
  "20": "orange",
  "40": "red",
};

const getMoneyWheelColor = n => {
  let color;
  Object.entries(moneyWheelResults).some(([k, v]) => {
    color = n === k ? v : "grey-dark-2";
    return n === k;
  });
  return color;
};

const topCardResults = {
  L: "red",
  T: "grey-dark-2",
  R: "blue-light-1",
};

const getTopCardColor = n => {
  let color;
  Object.entries(topCardResults).some(([k, v]) => {
    color = n === k ? v : "grey-dark-2";
    return n === k;
  });
  return color;
};

export const getBadgeColor = (type, n) => {
  if (type === "MoneyWheel") return getMoneyWheelColor(n);
  if (type === "Roulette") return getRouletteColor(n);
  if (type === "TopCard") return getTopCardColor(n);
};
