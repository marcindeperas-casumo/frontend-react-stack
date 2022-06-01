import * as React from "react";
import { useSelector } from "react-redux";
import { playerIdSelector } from "Models/handshake";
import type { TLoginTimeLimitsFormData } from "Models/playOkay";
import {
  useUpdateLoginTimeLimitMutation,
  useGetPlayerStateByIdQuery,
  useRevokeLoginTimeLimitMutation,
  loginTimeLimitsCmsSlug,
} from "Models/playOkay";
import { useTranslations } from "Utils/hooks";
import { TimeLimitsForm } from "./TimeLimitsForm";
import { transformFormDataToRequestPayloads } from "./TimeLimitsForm.utils";

type Props = {
  onLimitsSaved: () => void;
};

export function TimeLimitsFormContainer({ onLimitsSaved }: Props) {
  const playerId = useSelector(playerIdSelector) as string;
  const t = useTranslations<{
    form_cta: string;
    form_hrs_per_day: string;
    form_hrs_per_week: string;
    form_hrs_per_month: string;
    form_placeholder_enter_amount: string;
  }>(loginTimeLimitsCmsSlug);
  // @ts-ignore
  const { loginTimeLimits } = useGetPlayerStateByIdQuery(playerId, {
    selectFromResult: ({ data, ...rest }) => ({
      isLoading: rest.isLoading,
      loginTimeLimits: data?.loginTimeLimits,
    }),
  });
  const [updateLoginTimeLimit] = useUpdateLoginTimeLimitMutation();
  const [revokeLoginTimeLimit] = useRevokeLoginTimeLimitMutation();
  const [ctaClicked, setCtaClicked] = React.useState(false);

  const onClickCta = async (formData: TLoginTimeLimitsFormData) => {
    setCtaClicked(true);

    try {
      await Promise.all(
        transformFormDataToRequestPayloads(formData, playerId).map(payload =>
          "limitInMinutes" in payload
            ? updateLoginTimeLimit(payload).unwrap()
            : revokeLoginTimeLimit(payload).unwrap()
        )
      );

      onLimitsSaved();
    } catch (e) {
      setCtaClicked(false);
    }
  };

  return (
    <TimeLimitsForm
      t={t}
      isFetching={ctaClicked}
      onClickCta={onClickCta}
      currentLoginTimeLimits={loginTimeLimits}
    />
  );
}
