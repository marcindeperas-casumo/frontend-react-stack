// @flow
import * as R from "ramda";
import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getGameCategories,
  type GameCategory,
} from "Api/api.casinoPlayerGames";
import {
  slugToCategorySelector,
  updateSlugToCategoryMap,
} from "Models/slotControlSystem";

export function useGameCategories(slug: string) {
  const dispatch = useDispatch();
  const [gameCategories, setGameCategories] = React.useState<
    Array<GameCategory>
  >([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const storedCategories = useSelector(slugToCategorySelector(slug), R.equals);

  React.useEffect(() => {
    if (storedCategories && loading) {
      setGameCategories(storedCategories);
      setLoading(false);
    }
  }, [loading, storedCategories]);

  React.useEffect(() => {
    if (!storedCategories) {
      getGameCategories(slug).then(categories => {
        setGameCategories(categories);
        setLoading(false);
        dispatch(updateSlugToCategoryMap(slug, categories));
      });
    }
  }, [slug, storedCategories]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    loading,
    gameCategories,
  };
}
