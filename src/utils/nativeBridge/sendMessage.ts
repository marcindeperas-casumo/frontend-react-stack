export const sendMessage = function (
  name: string,
  message: object,
  onError: (...args: any[]) => void
) {
  if (!window.native) {
    return;
  }

  // Wait for next frame. It solves issue we had when loader
  // was disappearing only to show frozen view underneath for
  // a second
  setTimeout(function () {
    try {
      if (window["casumoAndroidMessaging"]) {
        // Convert message object to JSON since JS objects cannot
        // be passed on to Android.
        window["casumoAndroidMessaging"][name](JSON.stringify(message || {}));
      } else {
        window["webkit"].messageHandlers[name].postMessage(message || "");
      }
    } catch (error) {
      if (typeof onError === "function") {
        onError(error);
      }
    }
  });
};

export default sendMessage;
