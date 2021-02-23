// @flow
import * as React from "react";
import { useTranslationsGql } from "Utils/hooks/useTranslationsGql";
import { SearchNotFound } from "./SearchNotFound";

export type Props = {
  /** Depending on type of the list loaded we show slightly different content */
  type?: ?string,
};

export const SearchNotFoundContainer = ({ type }: Props) => {
  const { t, loading } = useTranslationsGql({
    image: "root:mobile.games-search:fields.no_results_image",
    title: "root:mobile.games-search:fields.no_results_title",
    contentLatest:
      "root:mobile.games-search:fields.no_results_continue_playing",
    contentPopular: "root:mobile.games-search:fields.no_results_popular",
  });

  if (
    loading ||
    !t.image ||
    !t.title ||
    !t.contentLatest ||
    !t.contentPopular
  ) {
    return null;
  }

  const content = type === "latest" ? t.contentLatest : t.contentPopular;

  return <SearchNotFound image={t.image} title={t.title} content={content} />;
};
