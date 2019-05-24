// @flow
import * as R from "ramda";
import type { ModalKind } from "Models/modal";

type Mapping = {
  [ModalKind]: {
    // cms slug
    slug: string,
    // gets object returned from fetching cms page, Defaults to: R.prop('title')
    titleGetter?: Object => string,
    // gets object returned from fetching cms page, Defaults to: R.prop('content')
    contentGetter?: Object => string,
  },
};

/**
 * TODO: We have title/content getters for compatibility reason. Hopefully YOU,
 * from the future can unify shape of those modals. Make sure they are not used
 * in old stack!
 */
export const mappings: Mapping = {
  REEL_RACES_CAVEATS: {
    slug: "shared.tournament-terms",
    titleGetter: R.path(["fields", "title"]),
  },
  TERMS_AND_CONDITIONS: {
    slug: "toc",
  },
  PRIVACY_NOTICE: {
    slug: "toc.privacy-cookie-policy",
    contentGetter: R.path(["fields", "content"]),
  },
};