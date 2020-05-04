//@flow
import React from "react";
import { useTranslationsGql } from "Utils/hooks/useTranslationsGql";

export const MessageText = () => {
  const { t, loading } = useTranslationsGql({
    swipeUpText: "root:mobile.game-launch:fields.swipe_up_text",
  });

  return <span>{loading ? "" : t.swipeUpText}</span>;
};
