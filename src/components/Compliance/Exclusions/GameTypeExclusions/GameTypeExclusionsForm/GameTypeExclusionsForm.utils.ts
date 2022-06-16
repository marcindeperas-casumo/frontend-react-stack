import { TGameType } from "Models/playOkay";
import { TTranslations } from "../GameTypeExclusions.types";

type TProps = {
  type: TGameType;
  t: Pick<TTranslations, "available_game_types">;
};

export function selectTypeTranslations({ type, t }: TProps) {
  return (
    t.available_game_types.find(item => item.type === type) ?? {
      name: "",
      details: "",
    }
  );
}
