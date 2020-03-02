// @flow
import * as R from "ramda";
import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getGameCategory, type GameCategory } from "Api/api.casinoPlayerGames";
import {
  slugToCategorySelector,
  updateSlugToCategoryMap,
} from "Models/slotControlSystem";

export function useGameCategory(slug: string) {
  const dispatch = useDispatch();
  const [gameCategory, setGameCategory] = React.useState<?GameCategory>();
  const [loading, setLoading] = React.useState<boolean>(true);
  const storedCategory = useSelector(slugToCategorySelector(slug), R.equals);

  React.useEffect(() => {
    if (storedCategory && loading) {
      setGameCategory(storedCategory);
      setLoading(false);
    }
  }, [loading, storedCategory]);

  React.useEffect(() => {
    if (!storedCategory) {
      getGameCategory(slug).then(category => {
        if (!category) {
          return;
        }

        setGameCategory(category);
        setLoading(false);
        dispatch(updateSlugToCategoryMap(slug, category));
      });
    }
  }, [slug, storedCategory]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    loading,
    gameCategory,
  };
}
