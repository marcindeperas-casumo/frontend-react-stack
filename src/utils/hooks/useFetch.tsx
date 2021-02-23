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

    const controller = new AbortController();
    const { signal } = controller;

    fetch(url, { signal })
      .then(raw => raw.json())
      .then(data => {
        setResponse(data);
        setStatus("DONE");
      })
      .catch(err => {
        if (err.name !== "AbortError") {
          setStatus("ERROR");
          logger.log(`request error, url: ${url}`, err);
        }
      });

    return () => {
      controller.abort();
    };
  }, [url]);

  return { status, response };
}
