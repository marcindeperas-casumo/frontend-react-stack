import { types } from "./schema.constants";

export const updateEntity = payload => ({ type: types.UPDATE_ENTITY, payload });

export const mergeEntity = payload => ({ type: types.MERGE_ENTITY, payload });
