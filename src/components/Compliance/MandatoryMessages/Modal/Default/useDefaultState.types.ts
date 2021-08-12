import { TMandatoryMessage } from "Models/mandatoryMessages";

export type TUseDefaultStateArgs = {
  message?: TMandatoryMessage;
  slug?: string;
};

export type TUseDefaultState = {
  markAsRead: () => Promise<any>;
  isLoading: boolean;
  isDisabled: boolean;
  content: string;
  buttonLabel: string;
};
