import http from "Services/http";

export const getCasinoPlayerGames = async () => {
  const apiUrl = "/api/casino-games/games";
  // get playerId and pass it in the header
  const casinoGames = (await http.get(apiUrl)) || {};

  return casinoGames;
};
