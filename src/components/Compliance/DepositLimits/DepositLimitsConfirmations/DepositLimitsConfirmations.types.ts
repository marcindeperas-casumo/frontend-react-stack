export type ConfirmationPage =
  | "RG_SUCCESS"
  | "RG_FAIL"
  | "RG_REQUIRED"
  | "SAVED_RIGHT_AWAY";

export type TDepositLimitsConfirmationsTranslations = {
  saved_right_away_title: string;
  rg_success_title: string;
  rg_success_content: string;
  rg_fail_title: string;
  rg_fail_content: string;
  rg_required_title: string;
  rg_required_content: string;
  button_back_to_limits: string;
  button_answer_questions: string;
};
