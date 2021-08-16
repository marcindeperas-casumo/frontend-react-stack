import { TMandatoryMessage } from "Models/mandatoryMessages";

export type TUseDefaultModalStateArgs = {
  message?: TMandatoryMessage;
  slug?: string;
};

export type TUseDefaultModalState = {
  markAsRead: () => Promise<any>;
  isLoading: boolean;
  isDisabled: boolean;
  content: string;
  buttonLabel: string;
};
