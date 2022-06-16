import * as React from "react";
import Text from "@casumo/cmp-text";
import { ChipChoice } from "@casumo/cmp-chip";
import { Duration, durationObjectFromNbOfDays } from "Components/Duration";
import { TContentProps } from "./Modal.types";

export function ModalStep2({
  t,
  validPeriods,
  selectedPeriod,
  selectPeriod,
}: TContentProps) {
  return (
    <>
      <Text>{t?.choose_period_button}</Text>
      <div className="grid grid-cols-2 gap-md">
        {validPeriods?.map(nbOfDays => {
          return (
            <ChipChoice
              key={nbOfDays}
              isActive={selectedPeriod === nbOfDays}
              onClick={() =>
                selectPeriod(selectedPeriod === nbOfDays ? null : nbOfDays)
              }
            >
              <Duration duration={durationObjectFromNbOfDays(nbOfDays)} />
            </ChipChoice>
          );
        })}
      </div>
    </>
  );
}
