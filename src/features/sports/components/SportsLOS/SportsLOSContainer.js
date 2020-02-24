// @flow
import React from "react";
import gql from "graphql-tag";
// import { useMutation } from "@apollo/react-hooks";
// import * as A from "Types/apollo";
import KambiClient from "Features/sports/components/KambiClient/KambiClient";
import SportsHashWatcher from "Components/HashWatcher";
import { SportsNav } from "Features/sports/components/SportsNav";
import SportsShellSkeleton from "Features/sports/components/SportsShell/SportsShellSkeleton";
import { useLanguage } from "Utils/hooks";

export const LAUNCH_KAMBI_LOS_MUTATION = gql`
  mutation LaunchKambiLoS {
    launchKambi {
      clientBootstrapUrl
    }
  }
`;

export const SportsLOSContainer = () => {
  // const [launchKambi] = useMutation<A.LaunchKambiLoS, {}>(
  //   LAUNCH_KAMBI_LOS_MUTATION
  // );
  const language = useLanguage();
  // const currency = useCurrency();
  // const country = useCountry();
  // const market = useMarket();

  // React.useEffect(() => {
  // const bol = launchKambi({});
  // console.log(bol);
  // }, [launchKambi]);

  if (!language) {
    return <SportsShellSkeleton />;
  }

  // const { clientBootstrapUrl } = launchKambi;

  return (
    <>
      <SportsHashWatcher>
        {({ currentHash }) => (
          <div className="t-background-chrome-light-2">
            <SportsNav currentHash={currentHash} />
          </div>
        )}
      </SportsHashWatcher>
      <KambiClient
        currency={"GBP"}
        market={"GB"}
        locale={`${language}_GB`}
        bootstrapUrl={
          "https://cts-static.kambi.com/client/cauk/kambi-bootstrap.js"
        }
        ticket={""}
        // $FlowFixMe
        sessionKeepAlive={() => {}}
      />
    </>
  );
};
