// @flow
import { connect } from "react-redux";
import { fetchPageBySlug } from "Models/cms";
import {
  localeSelector,
  currencySelector,
  walletAmountSelector,
} from "Models/handshake";
import {
  configurationFormContentSelector,
  activeSessionSelector,
  isCreatingSessionSelector,
  CMS_SLUGS,
  initCreateSessionAction,
} from "Models/slotControlSystem";
import { ConfigurationForm } from "./ConfigurationForm";

export const ConfigurationFormContainer = connect(
  state => ({
    t: configurationFormContentSelector(state),
    locale: localeSelector(state),
    currency: currencySelector(state),
    balance: walletAmountSelector(state),
    isCreatingSession: isCreatingSessionSelector(state),
    activeSession: activeSessionSelector(state),
  }),
  dispatch => ({
    fetchContentIfNecessary: () => {
      dispatch(fetchPageBySlug(CMS_SLUGS.CONFIGURATION_SCREEN));
      dispatch(fetchPageBySlug(CMS_SLUGS.UNITS));
    },
    createSession: () => dispatch(initCreateSessionAction()),
  })
)(ConfigurationForm);
