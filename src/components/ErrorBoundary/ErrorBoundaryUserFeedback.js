// @flow
import React from "react";
import { useTranslations } from "Utils/hooks";
import { ErrorMessage } from "../ErrorMessage";

// TODO: Figure out how it is the best way to show
// a user-feedback in these cases.
export function ErrorBoundaryUserFeedback() {
  const mobileErrorMessages = useTranslations("mobile.errors");
  const translatedErrorMessage = mobileErrorMessages?.general_error_title;

  return <ErrorMessage errorMessage={translatedErrorMessage} />;
}
