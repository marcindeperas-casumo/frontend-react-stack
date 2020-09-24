import logger from "Services/logger";

export const removeScriptTags = content =>
  content.replace(/<\/?script.*?>/gi, "");

export const tryParseJson = maybeJsonContent => {
  try {
    return JSON.parse(maybeJsonContent);
  } catch (e) {
    logger.error("Unreadable payment method JSON config");
    return {};
  }
};

export const parseCmsPaymentConfig = (content = "") =>
  tryParseJson(removeScriptTags(content));
