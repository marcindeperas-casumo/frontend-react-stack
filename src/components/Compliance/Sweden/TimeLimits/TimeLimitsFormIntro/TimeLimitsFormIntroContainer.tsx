import * as React from "react";
import { loginTimeLimitsCmsSlug } from "Models/playOkay";
import { useTranslations } from "Utils/hooks";
import { TimeLimitsFormIntro } from "./TimeLimitsFormIntro";

type Props = {
  onClickCta: () => void;
};

export function TimeLimitsFormIntroContainer({ onClickCta }: Props) {
  const t = useTranslations<{
    form_intro_header: string;
    form_intro_copy: string;
    form_intro_cta: string;
  }>(loginTimeLimitsCmsSlug);

  return <TimeLimitsFormIntro t={t} onClickCta={onClickCta} />;
}
