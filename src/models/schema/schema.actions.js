import { types } from "./schema.constants";

export const updateEntity = payload => ({ type: types.UPDATE_ENTITY, payload });
