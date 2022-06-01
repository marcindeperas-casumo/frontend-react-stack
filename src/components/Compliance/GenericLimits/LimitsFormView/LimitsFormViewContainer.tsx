import * as React from "react";
import { TLimitGroup } from "Models/playOkay/config/config.types";
import {
  selectLimitsInGroup,
  TGetPlayerStateByIdResponse,
  TPeriod,
  useGetPlayerConfigQuery,
  useRevokeLimitMutation,
  useUpdateLimitMutation,
} from "Models/playOkay";
import { LimitsFormOutroContainer } from "../LimitsFormOutro";
import { LimitsFormContainer } from "../LimitsForm";

type Props = {
  limitGroup: TLimitGroup;
  initial?: boolean;
  onClickOutroCta: () => void;
};

const SCREENS = {
  INTRO: "INTRO",
  FORM: "FORM",
  OUTRO: "OUTRO",
};

export function LimitsFormViewContainer({
  limitGroup,
  initial = false,
  onClickOutroCta,
}: Props) {
  const { data: playOkayConfig } = useGetPlayerConfigQuery();
  const [updateLimit] = useUpdateLimitMutation();
  const [revokeLimit] = useRevokeLimitMutation();
  const limitGroupConfig = playOkayConfig.limits.find(
    config => config.group === limitGroup
  );
  const [changedPeriods, setChangedPeriods] = React.useState<Array<TPeriod>>(
    []
  );
  const [screen, setScreen] = React.useState(SCREENS.FORM);
  const onLimitsSaved = (affectedPeriods: Array<TPeriod>) => {
    setChangedPeriods(affectedPeriods);
    setScreen(SCREENS.OUTRO);
  };

  if (screen === SCREENS.OUTRO) {
    return (
      <LimitsFormOutroContainer
        limitGroupConfig={limitGroupConfig}
        changedPeriods={changedPeriods}
        initial={initial}
        onClickCta={onClickOutroCta}
      />
    );
  }

  if (!limitGroupConfig) {
    return null;
  }

  return (
    <LimitsFormContainer
      onLimitsSaved={onLimitsSaved}
      limitGroupConfig={limitGroupConfig}
      updateLimit={updateLimit}
      revokeLimit={revokeLimit}
      selectFromResult={(data: TGetPlayerStateByIdResponse) =>
        selectLimitsInGroup({
          data,
          group: limitGroup,
        })
      }
    />
  );
}
