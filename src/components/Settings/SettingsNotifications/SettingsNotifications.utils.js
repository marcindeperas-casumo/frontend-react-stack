// @flow
import logger from "Services/logger";

export const onMutationError = (error: any) =>
  logger.error("Contact Settings/Notifications Mutation Error", error);
