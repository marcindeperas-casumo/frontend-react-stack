//@flow
import { LOCAL_PAYMENT_TYPES } from "./piq.constants";

const GENERAL_SLUG = "payment-method";
const CREDITCARD_GENERAL_SLUG = `${GENERAL_SLUG}.creditcard`;

export const TYPE_TO_CMS_SLUG = {
  [LOCAL_PAYMENT_TYPES.VISA_CARD]: `${CREDITCARD_GENERAL_SLUG}.visa_card`,
  [LOCAL_PAYMENT_TYPES.MASTER_CARD]: `${CREDITCARD_GENERAL_SLUG}.master_card`,
  [LOCAL_PAYMENT_TYPES.JCB_CARD]: `${CREDITCARD_GENERAL_SLUG}.jcb_card`,
  //other payment method slugs when they'll be needed
};

export const SUPPORTED_QUICKDEPOSIT_TYPES = [
  LOCAL_PAYMENT_TYPES.VISA_CARD,
  LOCAL_PAYMENT_TYPES.MASTER_CARD,
  LOCAL_PAYMENT_TYPES.JCB_CARD,
];

/**
 * order of slugs in array determine the order of merging config objects
 */
export const METHOD_CONFIG_PATH = {
  [LOCAL_PAYMENT_TYPES.VISA_CARD]: [
    GENERAL_SLUG,
    CREDITCARD_GENERAL_SLUG,
    TYPE_TO_CMS_SLUG[LOCAL_PAYMENT_TYPES.VISA_CARD],
  ],
  [LOCAL_PAYMENT_TYPES.MASTER_CARD]: [
    GENERAL_SLUG,
    CREDITCARD_GENERAL_SLUG,
    TYPE_TO_CMS_SLUG[LOCAL_PAYMENT_TYPES.MASTER_CARD],
  ],
  [LOCAL_PAYMENT_TYPES.JCB_CARD]: [
    GENERAL_SLUG,
    CREDITCARD_GENERAL_SLUG,
    TYPE_TO_CMS_SLUG[LOCAL_PAYMENT_TYPES.JCB_CARD],
  ],
};

//action types
export const actionTypes = {
  PREPARE_METHOD_CONFIG: "METHOD_CONFIG/PREPARE_METHOD_CONFIG",
  SET_METHOD_CONFIG: "METHOD_CONFIG/SET_PAYMENT_METHOD_CONFIG",
};