// @flow
import React from "react";
import { connect } from "react-redux";
import MustDropJackpotsWidget from "Components/MustDropJackpotsWidget/MustDropJackpotsWidget";
import { fetchPageBySlug } from "Models/cms";
import {
  fetchJackpotsMustDrop,
  mergeJackpotsMustDropSelectorFactory,
  isFetchedJackpotsMustDrop,
} from "Models/jackpotsMustDrop";
import {
  subscribeMustDropJackpotUpdates,
  unsubscribeMustDropJackpotUpdates,
} from "Models/cometd";

type Props = {};

const SLUG = "must-drop-jackpots";
const MustDropJackpotsWidgetConnected = connect(
  state => ({
    jackpots: mergeJackpotsMustDropSelectorFactory(SLUG)(state),
    isFetched: isFetchedJackpotsMustDrop(state),
  }),
  dispatch => ({
    fetchJackpots: () => dispatch(fetchJackpotsMustDrop()),
    fetchCmsContent: () => dispatch(fetchPageBySlug(SLUG)),
    subscribeToUpdates: () => dispatch(subscribeMustDropJackpotUpdates()),
    unsubscribeFromUpdates: () => dispatch(unsubscribeMustDropJackpotUpdates()),
  })
)(MustDropJackpotsWidget);

const MustDropJackpotsWidgetContainer = (props: Props) => (
  <MustDropJackpotsWidgetConnected {...props} />
);

export default MustDropJackpotsWidgetContainer;
