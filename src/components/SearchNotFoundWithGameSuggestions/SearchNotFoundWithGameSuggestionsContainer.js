// @flow
import React from "react";
import { useGameSearchSuggestions } from "Components/GameSearchSuggestionsList/useGameSearchSuggestions";
import { useTranslationsGql } from "Utils/hooks/useTranslationsGql";
import { SearchNotFoundWithGameSuggestions } from "./SearchNotFoundWithGameSuggestions";

export const SearchNotFoundWithGameSuggestionsContainer = () => {
  const { list, loading: listLoading } = useGameSearchSuggestions({
    searchResults: [],
  });

  const { t, loading: cmsLoading } = useTranslationsGql({
    image: "root:mobile.games-search:fields.no_results_image",
    title: "root:mobile.games-search:fields.no_results_title",
    contentLatest:
      "root:mobile.games-search:fields.no_results_continue_playing",
    contentPopular: "root:mobile.games-search:fields.no_results_popular",
  });

  if (cmsLoading) {
    return null;
  }

  // fetching latest played games takes its sweet time. We wanna show the not found image and text immediately.
  const getContent = () => {
    if (listLoading) {
      return "";
    }

    return list.type === "latest" ? t?.contentLatest : t?.contentPopular;
  };

  return (
    <SearchNotFoundWithGameSuggestions
      image={t?.image || ""}
      title={t?.title || ""}
      content={getContent() || ""}
      list={list}
      loading={cmsLoading}
    />
  );
};
