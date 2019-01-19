import http from "Services/http";

export const getCasinoGames = async () => {
  const apiUrl = "/api/casino-games/games";
  // const url = `${apiUrl}?currency=${currency}`;
  const casinoGames = (await http.get(apiUrl)) || {};

  return casinoGames;
};
