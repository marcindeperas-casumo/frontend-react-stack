import * as R from "ramda";
import { useDispatch, useSelector } from "react-redux";
import { useGetMandatoryMessagesQuery } from "Models/mandatoryMessages";
import { KO_APP_EVENT_MODAL_HIDDEN } from "Src/constants";
import bridge from "Src/DurandalReactBridge";
export * from "./modal.selectors";
export const type = {
  hide: "MODAL/HIDE",
  show: "MODAL/SHOW",
} as const;
export type ModalId =
  | "GAME_ROUND_DETAILS"
  | "JACKPOT_TERMS_AND_CONDITIONS"
  | "TERMS_AND_CONDITIONS_SPAIN"
  | "SLOT_CONTROL_SYSTEM_CONFIGURATION"
  | "SLOT_CONTROL_SYSTEM_BEFORE_LOGGING_OUT"
  | "SLOT_CONTROL_SYSTEM_AFTER_LIMITS_REACHED"
  | "SLOT_CONTROL_SYSTEM_TIME_REMAINING_NOTIFICATION"
  | "SLOT_CONTROL_SYSTEM_PERIODIC_REMINDER_NOTIFICATION"
  | "SLOT_CONTROL_SYSTEM_LIMIT_ALMOST_CONSUMED_NOTIFICATION"
  | "DANISH_ENTRY_OVERLAY"
  | "PIQ_REDIRECTION_IFRAME_MODAL"
  | "TIME_LIMITS_FORM"
  | "REALITY_CHECK"
  | "QUIT_GAME_NOTIFICATION"
  | "WAGERING_NOTIFICATION"
  | "GAME_PAGE_RR_LEADERBOARD"
  | "GGL_PRE_PANIC_BUTTON"
  | "GGL_POST_PANIC_BUTTON"
  | "GGL_FIVE_MINUTE_BREAK_FINISHED"
  | "GGL_FIVE_MINUTE_BREAK_ONGOING"
  | "GGL_FIVE_MINUTE_BREAK_REEL_RACE"
  | "PAYMENT_RESULT"
  | "CONTENT_HTML"
  | "REEL_RACES_TAC"
  | "ACCOUNT_WARM_UP"
  | "ARTICLE_MODAL";
type ModalReturnCode =
  | "CLOSED" // click on "x"
  | "ACCEPTED" // click on accept button
  | "DISMISSED"; // click outside of the modal

export type ModalConfig = {
  mustAccept?: boolean;
  input?: any;
  content?: any;
  gameRoundId?: any;
  isWide?: boolean;
  slug?: string;
};
type ModalState = {
  modalId: ModalId | null;
  config: ModalConfig;
};

export function showModal(modalId: ModalId, config?: ModalConfig) {
  return {
    type: type.show,
    modalId,
    config,
  };
}

export const isMandatoryMessageModalId: (
  modalId: ModalId | null
) => boolean = R.both(R.is(String), R.startsWith("mandatory-messages."));

function useSelectMandatoryMessageModal(): ModalState {
  const { data, isLoading } = useGetMandatoryMessagesQuery();

  if (isLoading) {
    return {
      modalId: null,
      config: null,
    };
  }

  if (R.isNil(data) || R.isEmpty(data)) {
    return null;
  }

  const [firstMandatoryMessage] = data;
  const messageModalId = `mandatory-messages.${firstMandatoryMessage.reason.toLowerCase()}` as ModalId;

  return {
    modalId: messageModalId,
    config: {
      mustAccept: true,
      input: {
        slug: messageModalId,
        message: firstMandatoryMessage,
      },
    },
  };
}

export function useSelectModal(): ModalState {
  const mandatoryMessageModalState = useSelectMandatoryMessageModal();
  const modalState = useSelector<any, ModalState>(
    R.prop("modal"),
    R.eqProps("modalId")
  );

  if (mandatoryMessageModalState) {
    return mandatoryMessageModalState;
  }

  return modalState;
}

export function hideModal() {
  return {
    type: type.hide,
  };
}

export function useHideModal(modalId: ModalId | null) {
  const dispatch = useDispatch();
  const fn = (returnCode: ModalReturnCode) => (result?: any) => {
    bridge.emit(KO_APP_EVENT_MODAL_HIDDEN, { modalId, returnCode, result });
    dispatch(hideModal());
  };
  return {
    closeModal: fn("CLOSED"),
    dismissModal: fn("DISMISSED"),
    acceptModal: fn("ACCEPTED"),
  };
}
type Actions = ReturnType<typeof showModal> | ReturnType<typeof hideModal>;

const DEFAULT_STATE = {
  modalId: null,
  config: {},
};
export function modalReducer(
  state: ModalState = DEFAULT_STATE,
  action: Actions
): ModalState {
  // eslint-disable-next-line no-switch-statements/no-switch
  switch (action.type) {
    case "MODAL/SHOW":
      return {
        modalId: action.modalId,
        config: action.config,
      };
    case "MODAL/HIDE":
      return {
        modalId: null,
        config: {},
      };
    default:
      return state;
  }
}
