import * as React from "react";
import cx from "classnames";
import { ButtonSecondary } from "@casumo/cmp-button";
import { TPlayOkaySuspendAccountTranslations } from "Models/playOkay";

type TProps = {
  t: TPlayOkaySuspendAccountTranslations | null;
  onClick: () => void;
};

export function Card({ t, onClick }: TProps) {
  return (
    <div
      className={cx("flex flex-row justify-end", "p-md bg-white rounded-lg")}
    >
      <ButtonSecondary size="sm" onClick={onClick}>
        {t?.main_title}
      </ButtonSecondary>
    </div>
  );
}
