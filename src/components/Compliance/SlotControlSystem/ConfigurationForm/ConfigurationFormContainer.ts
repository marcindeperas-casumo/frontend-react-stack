// @flow
import { connect } from "react-redux";
import { fetchPageBySlug } from "Models/cms";
import { localeSelector, currencySelector } from "Models/handshake";
import { playerBalanceAmountSelector } from "Models/player";
import {
  configurationFormContentSelector,
  activeSessionSelector,
  isCreatingSessionSelector,
  CMS_SLUGS,
  initCreateSessionAction,
} from "Models/slotControlSystem";
import {
  ConfigurationForm,
  // @ts-expect-error ts-migrate(2305) FIXME: Module '"./ConfigurationForm"' has no exported mem... Remove this comment to see the full error message
  type ConfigurationFormData,
} from "./ConfigurationForm";
import { transformFormDataToRequestPayload } from "./Utils";

export const ConfigurationFormContainer = connect(
  state => ({
    t: configurationFormContentSelector(state),
    locale: localeSelector(state),
    currency: currencySelector(state),
    balance: playerBalanceAmountSelector(state),
    isCreatingSession: isCreatingSessionSelector(state),
    activeSession: activeSessionSelector(state),
  }),
  dispatch => ({
    fetchContentIfNecessary: () => {
      dispatch(fetchPageBySlug(CMS_SLUGS.BEFORE_PLAYING));
      dispatch(fetchPageBySlug(CMS_SLUGS.UNITS));
    },
    createSession: (formData: ConfigurationFormData) =>
      dispatch(
        initCreateSessionAction(transformFormDataToRequestPayload(formData))
      ),
  })
)(ConfigurationForm);
