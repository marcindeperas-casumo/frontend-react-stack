import { property, rejectIfNotPromise } from "../../../utils";

export default rejectIfNotPromise(handshakePromise =>
  handshakePromise.then(property("topListIds"))
);
