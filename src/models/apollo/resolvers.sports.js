/* @flow */

import { uniq } from "ramda";
import type { InMemoryCache } from "apollo-cache-inmemory";
import { getKambiWidgetAPI } from "Features/sports/kambi";
import { ACTIVE_MODALS_QUERY } from "./queries";

type Context = {
  cache: InMemoryCache,
};

export const updateBetslipState = (
  _: null,
  { isVisible }: { isVisible: boolean },
  { cache }: Context
) => {
  cache.writeData({ data: { isBetslipVisible: isVisible } });
  return null;
};

export const openModal = async (
  _: null,
  { modal }: { modal: Modal },
  context: Context
) => {
  const currentModals = await context.cache.readQuery({
    query: ACTIVE_MODALS_QUERY,
  }).activeModals;

  updateBetslipState(_, { isVisible: false }, context);

  await context.cache.writeQuery({
    query: ACTIVE_MODALS_QUERY,
    data: {
      activeModals: uniq([...currentModals, modal]),
    },
  });

  return null;
};

export const closeModal = async (
  _: null,
  { modal }: { modal: Modal },
  context: Context
) => {
  const currentModals = await context.cache.readQuery({
    query: ACTIVE_MODALS_QUERY,
  }).activeModals;

  const newActiveModals = currentModals.filter(m => m !== modal);

  // if all modals are closed, then allow betslip to be visible
  if (newActiveModals.length === 0) {
    updateBetslipState(_, { isVisible: true }, context);
  }

  await context.cache.writeQuery({
    query: ACTIVE_MODALS_QUERY,
    data: {
      activeModals: newActiveModals,
    },
  });

  return null;
};

export const closeAllModals = async (_: null, __: null, context: Context) => {
  // all modals will be closed, so allow betslip to be visible
  updateBetslipState(_, { isVisible: true }, context);

  await context.cache.writeQuery({
    query: ACTIVE_MODALS_QUERY,
    data: {
      activeModals: [],
    },
  });

  return null;
};

export const navigateClient = (
  _: null,
  { path, trackingLocation }: { path: string, trackingLocation: string },
  context: Context
) => {
  // TODO:(adampilks) - best place to do this?
  // close all modals on navigation
  context.cache.writeQuery({
    query: ACTIVE_MODALS_QUERY,
    data: {
      activeModals: [],
    },
  });

  updateBetslipState(_, { isVisible: true }, context);

  getKambiWidgetAPI().then(wapi => wapi.navigateClient(path, trackingLocation));

  return null;
};

export const updateKambiClientState = (
  _: null,
  { isVisible }: { isVisible: boolean },
  { cache }: Context
) => {
  cache.writeData({ data: { kambiClientVisible: isVisible } });
  return null;
};

export const showSearch = (_: null, __: null, { cache }: Context) => {
  cache.writeData({
    data: {
      kambiClientVisible: false,
      isSearchVisible: true,
    },
  });

  return null;
};

export const hideSearch = (_: null, __: null, { cache }: Context) => {
  cache.writeData({
    data: {
      kambiClientVisible: true,
      isSearchVisible: false,
    },
  });

  return null;
};
