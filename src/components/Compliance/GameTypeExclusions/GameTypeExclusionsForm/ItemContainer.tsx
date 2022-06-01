import * as React from "react";
import logger from "Services/logger";
import {
  TGameType,
  TGameTypeExclusion,
  useAddExclusionsMutation,
  useCancelExclusionRevocationsMutation,
  useRevokeExclusionsMutation,
} from "Models/playOkay";
import { TTranslations } from "../GameTypeExclusions.types";
import { Item } from "./Item";

type TProps = {
  type: TGameType;
  Icon: React.FC;
  t: TTranslations;
  details: string;
  selectedCategory: TGameTypeExclusion;
};

export function ItemContainer({
  type,
  Icon,
  t,
  details,
  selectedCategory,
}: TProps) {
  const [addExclusions, addProps] = useAddExclusionsMutation();
  const [revokeExclusions, revokeProps] = useRevokeExclusionsMutation();
  const [cancelRevocations, cancelProps] =
    useCancelExclusionRevocationsMutation();

  React.useEffect(() => {
    if (addProps.isError || revokeProps.isError || cancelProps.isError) {
      logger.error(addProps.error ?? revokeProps.error ?? cancelProps.error);
    }
  }, [addProps, revokeProps, cancelProps]);

  return (
    <Item
      type={type}
      select={() => addExclusions([type])}
      isSelecting={addProps.isLoading}
      unselect={() => revokeExclusions([type])}
      isUnselecting={revokeProps.isLoading}
      cancelUnselecting={() => cancelRevocations([type])}
      isCancelling={cancelProps.isLoading}
      Icon={Icon}
      t={t}
      details={details}
      selectedCategory={selectedCategory}
    />
  );
}

export function ItemContainerMock({
  type,
  Icon,
  t,
  details,
  selectedCategory,
}: TProps) {
  return (
    <Item
      type={type}
      select={() => null}
      isSelecting={false}
      unselect={() => null}
      isUnselecting={false}
      cancelUnselecting={() => null}
      isCancelling={false}
      Icon={Icon}
      t={t}
      details={details}
      selectedCategory={selectedCategory}
    />
  );
}
