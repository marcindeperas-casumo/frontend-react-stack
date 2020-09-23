export const removeScriptTag = content =>
  content.replace(/<\/?script.*?>/gi, "");
