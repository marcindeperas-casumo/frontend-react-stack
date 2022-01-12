import { TGameType, TGameTypeExclusion } from "Models/playOkay";

export type TToggleCategory = () => Promise<any>;

export type TTranslations = {
  card_header: string;
  card_header_mobile_edit: string;
  modal_header_mobile_edit: string;
  card_reduced_header_some_selected: string;
  card_reduced_header_none_selected: string;
  card_reduced_subheader: string;
  pending_revocation_note: string;
  cancel_pending_revocation: string;
  available_game_types: Array<{
    type: TGameType;
    name: string;
    details: string;
  }>;
};

type TFormItemPropsTranslations = Pick<
  TTranslations,
  "cancel_pending_revocation" | "pending_revocation_note"
>;

type TFormItemProps = {
  t: TFormItemPropsTranslations;
  type: TGameType;
  details: string;
  Icon: React.FC;
  selectedCategory?: TGameTypeExclusion;
};

export type TFormItem = React.FC<TFormItemProps>;
