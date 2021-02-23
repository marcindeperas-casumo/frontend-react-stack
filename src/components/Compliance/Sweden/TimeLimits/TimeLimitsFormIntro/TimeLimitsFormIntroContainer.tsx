// @flow
import * as React from "react";
import { loginTimeLimitsCmsKeyPrefix as cmsKeyPrefix } from "Models/playOkay";
import { useTranslationsGql } from "Utils/hooks";
import { TimeLimitsFormIntro } from "./TimeLimitsFormIntro";

type Props = {
  onClickCta: () => void,
};

export function TimeLimitsFormIntroContainer({ onClickCta }: Props) {
  const { t } = useTranslationsGql({
    form_intro_header: `${cmsKeyPrefix}form_intro_header`,
    form_intro_copy: `${cmsKeyPrefix}form_intro_copy`,
    form_intro_cta: `${cmsKeyPrefix}form_intro_cta`,
  });

  // @ts-expect-error ts-migrate(2739) FIXME: Type '{}' is missing the following properties from... Remove this comment to see the full error message
  return <TimeLimitsFormIntro t={t} onClickCta={onClickCta} />;
}
