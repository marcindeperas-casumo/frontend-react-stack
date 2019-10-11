// @flow
import { connect } from "react-redux";
import { isPageFetchedSelector, fetchPageBySlug } from "Models/cms";
import {
  localeSelector,
  currencySelector,
  walletAmountSelector,
} from "Models/handshake";
import {
  configurationFormContentSelector,
  CMS_SLUGS,
} from "Models/slotControlSystem";
import { ConfigurationForm } from "./ConfigurationForm";

export const ConfigurationFormContainer = connect(
  state => ({
    isContentFetched: isPageFetchedSelector(CMS_SLUGS.CONFIGURATION_SCREEN)(
      state
    ),
    isUnitsContentFetched: isPageFetchedSelector(CMS_SLUGS.UNITS)(state),
    t: configurationFormContentSelector(state),
    locale: localeSelector(state),
    currency: currencySelector(state),
    balance: walletAmountSelector(state),
  }),
  dispatch => ({
    fetchContent: () =>
      dispatch(fetchPageBySlug(CMS_SLUGS.CONFIGURATION_SCREEN)),
    fetchUnitsContent: () => dispatch(fetchPageBySlug(CMS_SLUGS.UNITS)),
  }),
  (props, dispatchProps) => ({
    ...props,
    fetchContentIfNecessary: () => {
      if (!props.isContentFetched) {
        dispatchProps.fetchContent();
      }
      if (!props.isUnitsContentFetched) {
        dispatchProps.fetchUnitsContent();
      }
    },
  })
)(ConfigurationForm);
