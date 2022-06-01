import * as storage from "Lib/storage";
import { STORE_PERSISTED_STATE_KEY } from "Src/constants";
import { types } from "./promotions.constants";

export const setPromotionOptIn =
  (slug: string, checked: boolean) =>
  (dispatch: (action: any) => void, getState: () => any) => {
    dispatch({
      type: types.SET_PROMOTION_OPT_IN,
      slug,
      checked,
    });

    persistPromotionsState(getState);
  };

const persistPromotionsState = getState => {
  const persistedState = storage.get(STORE_PERSISTED_STATE_KEY);
  const { promotions } = getState();

  storage.set(STORE_PERSISTED_STATE_KEY, {
    ...persistedState,
    promotions,
  });
};
