// @flow
import * as React from "react";
import logger from "Services/logger";

type Status = "LOADING" | "DONE" | "ERROR";
export function useFetch(url: string) {
  const [status, setStatus] = React.useState<Status>("LOADING");
  const [response, setResponse] = React.useState();

  React.useEffect(() => {
    if (!url) {
      return;
    }

    fetch(url)
      .then(raw => raw.json())
      .then(data => {
        setResponse(data);
        setStatus("DONE");
      })
      .catch(err => {
        setStatus("ERROR");
        logger.log(`request error, url: ${url}`, err);
      });
  }, [url]);

  return { status, response };
}
