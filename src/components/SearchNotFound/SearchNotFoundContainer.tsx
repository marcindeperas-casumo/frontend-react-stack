// @flow
import * as React from "react";
import { useTranslationsGql } from "Utils/hooks/useTranslationsGql";
import { SearchNotFound } from "./SearchNotFound";

export type Props = {
  /** Depending on type of the list loaded we show slightly different content */
  // @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
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
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'image' does not exist on type '{}'.
    !t.image ||
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
    !t.title ||
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'contentLatest' does not exist on type '{... Remove this comment to see the full error message
    !t.contentLatest ||
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'contentPopular' does not exist on type '... Remove this comment to see the full error message
    !t.contentPopular
  ) {
    return null;
  }

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'contentLatest' does not exist on type '{... Remove this comment to see the full error message
  const content = type === "latest" ? t.contentLatest : t.contentPopular;

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'image' does not exist on type '{}'.
  return <SearchNotFound image={t.image} title={t.title} content={content} />;
};
