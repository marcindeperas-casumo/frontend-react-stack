import * as R from "ramda";
import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getGameCategory } from "Api/api.casinoPlayerGames";
import {
  slugToCategorySelector,
  updateSlugToCategoryMap,
} from "Models/slotControlSystem";

export function useGameCategory(slug: string) {
  const dispatch = useDispatch();
  const [gameCategory, setGameCategory] = React.useState<string | undefined>();
  const [loading, setLoading] = React.useState<boolean>(true);
  const storedCategory = useSelector(slugToCategorySelector(slug), R.equals);

  React.useEffect(() => {
    if (storedCategory && loading) {
      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'unknown' is not assignable to pa... Remove this comment to see the full error message
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
