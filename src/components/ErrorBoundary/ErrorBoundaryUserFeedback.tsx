import React from "react";
import { useTranslationsGql } from "Utils/hooks/useTranslationsGql";
import { ErrorMessage } from "../ErrorMessage";

// TODO: Figure out how it is the best way to show
// a user-feedback in these cases.
export function ErrorBoundaryUserFeedback() {
  const { t, loading } = useTranslationsGql({
    errorText: "root:mobile.errors:fields.general_error_title",
  });

  if (loading) {
    return <div>Something went wrong, we are working on it.</div>;
  }

  // @ts-expect-error ts-migrate(2741) FIXME: Property 'retry' is missing in type '{ errorMessag... Remove this comment to see the full error message
  return <ErrorMessage errorMessage={t.errorText} />;
}
