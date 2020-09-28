//@flow
import logger from "Services/logger";

export const removeScriptTags = (content: string) =>
  content.replace(/<\/?script.*?>/gi, "");

export const tryParseJson = (maybeJsonContent: string) => {
  try {
    return JSON.parse(maybeJsonContent);
  } catch (e) {
    logger.error("Unreadable payment method JSON config");
    return {};
  }
};

export const parseCmsPaymentConfig = (content: string = "") =>
  tryParseJson(removeScriptTags(content));
