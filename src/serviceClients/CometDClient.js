import cometd from "../lib/cometd";
import { makeProtocolAwareUrl } from "../lib/utils";

const URL = makeProtocolAwareUrl("/cometd/");

export const CometDClientFactory = () => {
  cometd.init({ url: URL });

  return cometd;
};

export default CometDClientFactory();
