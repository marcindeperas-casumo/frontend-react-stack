// @flow
import * as React from "react";
import * as R from "ramda";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { fetchPageBySlug, getPage } from "Models/cms";

type __useTranslations1 = <T>(string) => ?T;
type __useTranslations2 = (string, true) => ?string;
type __useTranslations = __useTranslations1 & __useTranslations2;
export const useTranslations: __useTranslations = (
  slug,
  passContent = false
) => {
  const dispatch = useDispatch();
  React.useEffect(
    () => {
      dispatch(fetchPageBySlug(slug));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [slug]
  );

  return useSelector(
    R.pipe(
      getPage(slug),
      R.ifElse(
        R.always(R.equals(passContent, true)),
        R.prop("content"),
        R.pipe(
          R.propOr({}, "fields"),
          R.omit(["critical_for_compliance", ""]),
          R.when(R.isEmpty, R.always(null))
        )
      )
    ),
    shallowEqual
  );
};
