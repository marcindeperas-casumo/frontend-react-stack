// @flow
import React from "react";
import { SearchNotFound } from "Components/SearchNotFound";
import { GameSearchSuggestionsList } from "Components/GameSearchSuggestionsList";
import type { Props as SearchNotFoundProps } from "Components/SearchNotFound";
import type { Props as GameSearchSuggestionsListProps } from "Components/GameSearchSuggestionsList/GameSearchSuggestionsList";

export type Props = SearchNotFoundProps & GameSearchSuggestionsListProps;

export const GameSearchNotFound = (props: Props) => {
  const { image, title, content, list, loading } = props;

  return (
    <>
      <div className="t-background-grey-light-2">
        <SearchNotFound
          image={image}
          title={title}
          content={content}
          className="u-game-search-max-width"
        />
      </div>
      <GameSearchSuggestionsList list={list} loading={loading} />
    </>
  );
};
