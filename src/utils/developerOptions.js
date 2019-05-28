/**
 * This file is here to support developer options for the app which can be
 * configured from the "/iddqd" page.
 */
import { get as getFromStorage } from "Lib/storage";

export const getDeveloperOptions = () => {
  const showDisabledGames = getFromStorage("showDisabledGames");

  return {
    showDisabledGames,
  };
};
