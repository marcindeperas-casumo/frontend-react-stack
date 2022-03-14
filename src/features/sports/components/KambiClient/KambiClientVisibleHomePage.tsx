const homeHash = "#home";
const DISABLED_MARKETS = [];

export const shouldWeHideClientOnHomePage = (
  currentHash: string = "",
  currentMarket: string = ""
) => {
  return (
    (currentHash === homeHash || currentHash === "") &&
    DISABLED_MARKETS.includes(currentMarket)
  );
};
