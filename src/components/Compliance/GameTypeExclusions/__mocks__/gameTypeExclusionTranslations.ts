import { TTranslations } from "../GameTypeExclusions.types";

export const gameTypeExclusionTranslations: TTranslations = {
  card_header: "Game Type Exclusion",
  card_header_mobile_edit: "Selected game types",
  modal_header_mobile_edit: "Change your game type exclusion",
  card_reduced_header_some_selected: "Categories selected",
  card_reduced_header_none_selected: "No categories selected",
  card_reduced_subheader: "Set game type exclusion",
  pending_revocation_note: "Will be revoked on {{date}}.",
  cancel_pending_revocation: "Cancel",
  available_game_types: [
    {
      type: "SLOTS",
      name: "Slots",
      details: "Any slot game"
    },
    {
      type: "CASINO",
      name: "Casino",
      details: "Roulette, Blackjack, live games"
    },
    {
      type: "SPORTS",
      name: "Sports",
      details: "Any bet amount in any sport"
    },
    {
      type: "BINGO",
      name: "Bingo",
      details: "Any Bingo game"
    }
  ]
};
