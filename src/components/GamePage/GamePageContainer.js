// @flow
import React from "react";
import { connect } from "react-redux";
import { isMobile } from "@casumo/fe-toolkit-ismobile";
import { isTestEnv, languageSelector } from "Models/handshake";
import { getField, fetchPageBySlug } from "Models/cms";
import { ENVIRONMENTS, DEVICES } from "Src/constants";
import { GamePage } from "./GamePage";

const CMS_PAGE_SLUG = "mobile.errors";

const GamePageConnected = connect(
  (state, props) => ({
    environment: isTestEnv(state) ? ENVIRONMENTS.TEST : ENVIRONMENTS.PRODUCTION,
    platform: isMobile(window) ? DEVICES.MOBILE : DEVICES.DESKTOP,
    language: languageSelector(state),
    errorMessage: getField({
      slug: "mobile.errors",
      field: "general_error_title",
    })(state),
  }),
  {
    fetchTranslations: () => fetchPageBySlug(CMS_PAGE_SLUG),
  }
)(GamePage);

type Props = {
  slug: string,
  playForFun: boolean,
};

export const GamePageContainer = ({ slug, playForFun }: Props) => (
  <GamePageConnected slug={slug} playForFun={playForFun} />
);
