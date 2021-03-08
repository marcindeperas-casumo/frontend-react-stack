import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { playerIdSelector } from "Models/handshake";
import { isFetched } from "Models/fetch";
import type {
  LoginTimeLimitsFormData,
  SetLoginTimeLimitProps,
} from "Models/playOkay";
import {
  saveLoginTimeLimitAction,
  getSaveLoginTimeLimitActionName,
  getAllLimits,
  types,
  limitPeriod,
  loginTimeLimitsCmsKeyPrefix as cmsKeyPrefix,
} from "Models/playOkay";
import { useTranslationsGql } from "Utils/hooks";
import { TimeLimitsForm } from "./TimeLimitsForm";
import { transformFormDataToRequestPayloads } from "./TimeLimitsForm.utils";

type Props = {
  onLimitsSaved: () => void;
};

export function TimeLimitsFormContainer({ onLimitsSaved }: Props) {
  const { t } = useTranslationsGql({
    form_cta: `${cmsKeyPrefix}form_cta`,
    form_hrs_per_day: `${cmsKeyPrefix}form_hrs_per_day`,
    form_hrs_per_week: `${cmsKeyPrefix}form_hrs_per_week`,
    form_hrs_per_month: `${cmsKeyPrefix}form_hrs_per_month`,
    form_placeholder_enter_amount: `${cmsKeyPrefix}form_placeholder_enter_amount`,
  });
  const [ctaClicked, setCtaClicked] = React.useState(false);
  const [refetchingAllLimits, isRefetchingAllLimits] = React.useState(false);
  const dispatch = useDispatch();
  const playerId = useSelector(playerIdSelector);
  const allLimitsRefetched = useSelector(
    isFetched(types.PLAYOK_FETCH_ALL_LIMITS_START)
  );
  const dailyLimitSaved = useSelector(
    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
    isFetched(getSaveLoginTimeLimitActionName(limitPeriod.DAILY))
  );
  const weeklyLimitSaved = useSelector(
    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
    isFetched(getSaveLoginTimeLimitActionName(limitPeriod.WEEKLY))
  );
  const monthlyLimitSaved = useSelector(
    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
    isFetched(getSaveLoginTimeLimitActionName(limitPeriod.MONTHLY))
  );
  const newLimitsSaved =
    dailyLimitSaved && weeklyLimitSaved && monthlyLimitSaved;

  const onClickCta = (formData: LoginTimeLimitsFormData) => {
    setCtaClicked(true);
    transformFormDataToRequestPayloads(
      formData,
      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'unknown' is not assignable to pa... Remove this comment to see the full error message
      playerId
    ).map((payload: SetLoginTimeLimitProps) =>
      dispatch(saveLoginTimeLimitAction(payload))
    );
  };

  React.useEffect(() => {
    if (ctaClicked && newLimitsSaved) {
      // @ts-expect-error ts-migrate(2322) FIXME: Type 'unknown' is not assignable to type 'string'.
      dispatch(getAllLimits({ playerId }));
      isRefetchingAllLimits(true);
    }
  }, [newLimitsSaved, ctaClicked, dispatch, playerId]);

  React.useEffect(() => {
    if (refetchingAllLimits && allLimitsRefetched) {
      onLimitsSaved();
    }
  }, [refetchingAllLimits, allLimitsRefetched, onLimitsSaved]);

  return (
    <TimeLimitsForm t={t} isFetching={ctaClicked} onClickCta={onClickCta} />
  );
}
