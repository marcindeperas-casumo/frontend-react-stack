// @flow
import * as React from "react";
import logger from "Services/logger";
import http from "Lib/http";
import { injectScript } from "Utils";
let firebaseApp; // eslint-disable-line fp/no-let
let firebaseMessaging; // eslint-disable-line fp/no-let
const sdkUrl = "https://www.gstatic.com/firebasejs/8.0.0/firebase-app.js";
const fcmUrl = "https://www.gstatic.com/firebasejs/8.0.0/firebase-messaging.js";
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
function useFirebaseSDK() {
    const [sdk, setSdk] = React.useState();
    React.useEffect(function fetchFirebaseSDK() {
        if ((window as any).firebase) {
            // SDK already loaded
            setSdk(firebaseApp);
            return;
        }
        injectScript(sdkUrl, "firebase-app-sdk")
            .then(() => {
            firebaseApp = (window as any).firebase.initializeApp(firebaseConfig); // eslint-disable-line fp/no-mutation
            setSdk(firebaseApp);
        })
            .catch(err => {
            logger.error("Firebase sdk could not be loaded", err);
        });
    }, []);
    return sdk;
}
function useFirebaseMessagingSDK() {
    const firebase = useFirebaseSDK();
    const [sdk, setSdk] = React.useState();
    React.useEffect(function fetchFirebaseMessagingSDK() {
        if (!firebase) {
            return;
        }
        if (firebaseMessaging) {
            setSdk(firebaseMessaging);
            return;
        }
        injectScript(fcmUrl, "firebase-messaging-sdk")
            .then(() => {
            // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
            firebaseMessaging = firebase.messaging(); // eslint-disable-line fp/no-mutation
            setSdk(firebaseMessaging);
        })
            .catch(err => {
            logger.error("[FCM] - Firebase messaging sdk could not be loaded", err);
        });
    }, [firebase, sdk]);
    return sdk;
}
export function useMessaging() {
    const messaging = useFirebaseMessagingSDK();
    const vapidKey = "BB27nFDHx_OixJGmu6Vpi4IC3QDqRR0bmJ27fgYv2Un-pTKsVveoyZHu_ZCP7eDapZsSl7einxThPugehOPthPI";
    const registerDeviceTokenUrl = "/casino-player/fasttrack-device-token-integration/api/v1/device-token";
    React.useEffect(function registerFCMToken() {
        if (messaging && !window.sessionStorage.getItem("fcmtoken")) {
            // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
            messaging.getToken({ vapidKey }).then(token => {
                if (token) {
                    logger.info("[FCM] - registering Token", token);
                    http.post(registerDeviceTokenUrl, {
                        token,
                        channel: "web",
                    });
                    window.sessionStorage.setItem("fcmtoken", token);
                }
            });
        }
    }, [messaging]);
    return messaging;
}
