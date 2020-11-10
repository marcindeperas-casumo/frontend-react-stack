// @flow
import * as React from "react";
import logger from "Services/logger";
import http from "Lib/http";
import { injectScript } from "Utils";

let firebaseApp; // eslint-disable-line fp/no-let
let firebaseMessaging; // eslint-disable-line fp/no-let

export function useFirebaseSDK() {
  const [sdk, setSdk] = React.useState();

  const sdkUrl = "https://www.gstatic.com/firebasejs/8.0.0/firebase-app.js";
  const firebaseConfig = {
    apiKey: "AIzaSyCnn9jDO8Ou-dv4Q8mDFHihPrQWeiqGwL8",
    authDomain: "casumo-47bbd.firebaseapp.com",
    databaseURL: "https://casumo-47bbd.firebaseio.com",
    projectId: "casumo-47bbd",
    storageBucket: "casumo-47bbd.appspot.com",
    messagingSenderId: "996099742388",
    appId: "1:996099742388:web:b36c0fef82e2e0c59ed5e1",
    measurementId: "G-87PNR121QS",
  };

  React.useEffect(function fetchFirebaseSDK() {
    if (window.firebase) {
      // SDK already loaded
      setSdk(firebaseApp);
      return;
    }

    injectScript(sdkUrl, "firebase-app-sdk")
      .then(() => {
        firebaseApp = window.firebase.initializeApp(firebaseConfig); // eslint-disable-line fp/no-mutation
        setSdk(firebaseApp);
      })
      .catch(err => {
        logger.error("Firebase sdk could not be loaded", err);
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return sdk;
}

export function useFirebaseMessagingSDK() {
  const firebase = useFirebaseSDK();
  const [sdk, setSdk] = React.useState();

  React.useEffect(
    function fetchFirebaseMessagingSDK() {
      if (!firebase) {
        return;
      }

      if (firebaseMessaging) {
        setSdk(firebaseMessaging);
        return;
      }

      injectScript(
        "https://www.gstatic.com/firebasejs/8.0.0/firebase-messaging.js",
        "firebase-messaging-sdk"
      )
        .then(() => {
          firebaseMessaging = firebase.messaging(); // eslint-disable-line fp/no-mutation
          setSdk(firebaseMessaging);
        })
        .catch(err => {
          logger.error("Firebase messaging sdk could not be loaded", err);
        });
    },
    [firebase, sdk]
  );

  return sdk;
}

export function useMessaging() {
  const messaging = useFirebaseMessagingSDK();

  const vapidKey =
    "BB27nFDHx_OixJGmu6Vpi4IC3QDqRR0bmJ27fgYv2Un-pTKsVveoyZHu_ZCP7eDapZsSl7einxThPugehOPthPI";

  const registerDeviceTokenUrl =
    "/casino-player/fasttrack-device-token-integration/api/v1/device-token";

  React.useEffect(() => {
    if (!window.sessionStorage.getItem("fcmtoken")) {
      messaging.getToken({ vapidKey }).then(currentToken => {
        if (currentToken) {
          console.warn("registering Token", currentToken);
          http.post(registerDeviceTokenUrl, {
            token: currentToken,
            channel: "web",
          });
          window.sessionStorage.setItem("fcmtoken", currentToken);
        }
      });
    }
  }, [messaging]);

  return messaging;
}
