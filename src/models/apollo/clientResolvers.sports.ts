/* @flow */
import { uniq, T, F } from "ramda";
import type { InMemoryCache } from "@apollo/client/cache";
import * as A from "Types/apollo";
import { getKambiWidgetAPI } from "Features/sports/kambi";
import { ACTIVE_MODALS_QUERY } from "./queries";
type Context = {
    cache: InMemoryCache;
};
export const updateBetslipState = async (_: null, { isVisible }: {
    isVisible: boolean;
}, { cache }: Context) => {
    await cache.modify({
        fields: {
            isBetslipVisible: () => isVisible,
        },
    });
    return null;
};
export const openModal = async (_: null, { modal }: {
    modal: A.Modal;
}, context: Context) => {
    const currentModals = await (context.cache.readQuery({
        query: ACTIVE_MODALS_QUERY,
    }) as any).activeModals;
    await updateBetslipState(_, { isVisible: false }, context);
    await context.cache.writeQuery({
        query: ACTIVE_MODALS_QUERY,
        data: {
            activeModals: uniq([...currentModals, modal]),
        },
    });
    return null;
};
export const closeModal = async (_: null, { modal }: {
    modal: A.Modal;
}, context: Context) => {
    const currentModals = await (context.cache.readQuery({
        query: ACTIVE_MODALS_QUERY,
    }) as any).activeModals;
    const newActiveModals = currentModals.filter(m => m !== modal);
    // if all modals are closed, then allow betslip to be visible
    if (newActiveModals.length === 0) {
        await updateBetslipState(_, { isVisible: true }, context);
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
    await updateBetslipState(_, { isVisible: true }, context);
    await context.cache.writeQuery({
        query: ACTIVE_MODALS_QUERY,
        data: {
            activeModals: [],
        },
    });
    return null;
};
export const navigateClient = async (_: null, { path, trackingLocation }: {
    path: string;
    trackingLocation: string;
}, context: Context) => {
    // TODO:(adampilks) - best place to do this?
    // close all modals on navigation
    context.cache.writeQuery({
        query: ACTIVE_MODALS_QUERY,
        data: {
            activeModals: [],
        },
    });
    const wapi = await getKambiWidgetAPI();
    updateBetslipState(_, { isVisible: true }, context);
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'navigateClient' does not exist on type '... Remove this comment to see the full error message
    wapi.navigateClient(path, trackingLocation);
    return null;
};
export const updateKambiClientState = async (_: null, { isVisible }: {
    isVisible: boolean;
}, { cache }: Context) => {
    await cache.modify({
        fields: {
            kambiClientVisible: () => isVisible,
        },
    });
    return null;
};
export const showSearch = async (_: null, __: null, { cache }: Context) => {
    await cache.modify({
        fields: {
            kambiClientVisible: F,
            isSearchVisible: T,
        },
    });
    return null;
};
export const hideSearch = async (_: null, __: null, { cache }: Context) => {
    await cache.modify({
        fields: {
            kambiClientVisible: T,
            isSearchVisible: F,
        },
    });
    return null;
};
