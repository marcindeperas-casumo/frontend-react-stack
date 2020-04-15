// @flow
import React from "react";
import { useTranslationsGql } from "Utils/hooks/useTranslationGql";
import { ErrorMessage } from "../ErrorMessage";

// TODO: Figure out how it is the best way to show
// a user-feedback in these cases.
export function ErrorBoundaryUserFeedback() {
  const { t, loading } = useTranslationsGql({
    errorText: "root:mobile.errors:fields.general_error_title",
  });

  if (loading) {
    return null;
  }

  return <ErrorMessage errorMessage={t.errorText} />;
}
