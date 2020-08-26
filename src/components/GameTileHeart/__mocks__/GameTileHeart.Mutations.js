export const useAddGameToMyList = id => () => ({ id, isInMyList: true });
export const useRemoveGameFromMyList = id => () => ({ id, isInMyList: false });
export const numberOfGames = 1e5;
