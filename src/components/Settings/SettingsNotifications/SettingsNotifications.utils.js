// @flow
import { dataIdFromObject } from "Services/apolloCacheUtils";
import logger from "Services/logger";

type GetApolloCacheUpdaterProps = {
  playerId: string,
  getContactSettingsField: Object => Object,
  fragment: string,
};

export const getApolloCacheUpdater = ({
  fragment,
  playerId,
  getContactSettingsField,
}: GetApolloCacheUpdaterProps) => (cache: any, result: Object) => {
  try {
    cache.writeFragment({
      id: dataIdFromObject({ __typename: "Player", id: playerId }),
      fragment,
      data: {
        details: {
          __typename: "PlayerDetails",
          contactSettings: {
            ...getContactSettingsField(result),
            __typename: "PlayerContactSettings",
          },
        },
        __typename: "Player",
      },
    });
  } catch (err) {
    logger.error(
      "Contact Settings/Notifications: Failed while writing fragment",
      err
    );
  }
};

export const onMutationError = (error: any) =>
  logger.error("Contact Settings/Notifications Mutation Error", error);
