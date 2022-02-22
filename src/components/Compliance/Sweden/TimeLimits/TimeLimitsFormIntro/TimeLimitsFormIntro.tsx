import cx from "classnames";
import Text from "@casumo/cmp-text";
import { ButtonPrimary } from "@casumo/cmp-button";
import * as React from "react";
import PlayOkayIcon from "./playokay.svg";
import TimeLimitIcon from "./timeLimit.svg";

type Props = {
  t: {
    form_intro_header: string | undefined;
    form_intro_copy: string | undefined;
    form_intro_cta: string | undefined;
  };
  onClickCta: () => void;
};

export function TimeLimitsFormIntro({ t, onClickCta }: Props) {
  return (
    <div className={cx("flex flex-col gap-md", "p-md tablet:p-lg")}>
      <PlayOkayIcon />
      <Text size="md" className="font-black text-purple-80">
        {t?.form_intro_header}
      </Text>
      <div className="flex flex-row gap-md mb-5xlg">
        <TimeLimitIcon className="flex-shrink-0" />
        <Text>{t?.form_intro_copy}</Text>
      </div>
      <ButtonPrimary onClick={onClickCta} size="md" className="w-full mt-5xlg">
        {t?.form_intro_cta || ""}
      </ButtonPrimary>
    </div>
  );
}
