// @flow

export function useGameCategories()  {
  return {
    loading: false,
    gameCategories: ["SLOT_MACHINE"],
  }
}

/*::
const tmp = require("../useGameCategories").useGameCategories;
(useGameCategories: typeof tmp);
*/
