import { TMandatoryMessage } from "Models/mandatoryMessages";

export type TUseDefaultStateArgs = {
  message?: TMandatoryMessage;
  slug?: string;
};

export type TUseDefaultState = {
  markAsRead: () => Promise<void>;
  isLoading: boolean;
  isDisabled: boolean;
  content: string;
  buttonLabel: string;
};
