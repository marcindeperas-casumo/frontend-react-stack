export const removeScriptTags = content =>
  content.replace(/<\/?script.*?>/gi, "");
