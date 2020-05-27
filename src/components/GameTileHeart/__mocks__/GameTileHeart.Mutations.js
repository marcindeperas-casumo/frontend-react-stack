export const useAddGameToMyList = id => () => ({ id, isInMyList: true });
export const useRemoveGameFromMyList = id => () => ({ id, isInMyList: false });
