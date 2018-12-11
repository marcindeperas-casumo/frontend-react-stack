# Error Handling

**NOTE!** We don't have dynamic log-levels in place yet, in development mode we log all
levels to the console, in production we only log errors to Rollbar, and while running
the unit tests we silence all log levels.

### Adapters

Adapters are used to send the log output to different places.<br>
Right now we have the following adapters:

- `Console Adapter` (logs to the console)
- `Rollbar Adapter` (logs to Rollbar - only errors at the moment)
- `Null Adapter` (swallows all log messages - used in unit tests)

### Rollbar

Rollbar is a 3rd party log-collector service that we use in production.<br>
**Logs:** [Check out the error logs for this repo]()<br>
**Credentials:** We all have personal accounts, ask for an invite in #frontend

### How to log an error

#### When the store is available

In most of the cases (logging from a component, action creator or saga) we have
access to the store. In these cases we should always use the `logError()` action creator.<br>
The benefit of this is that **like this the actual state is going to be visible in
Rollbar as well**, which gives us context and makes debugging easier.

```javascript
// Usage in Components
import { logError } from "Models/errors";

const Container = connect(
    () => ({}),
    dispatch => ({
        logError => (...args) => dispatch(logError(...args))
    })
);

// Usage in SAGAs
import { put } from "redux-saga/effects";
import { logError } from "Models/errors";

// ...

yield put(logError("Something really bad happened!", err));
```

#### When the store is NOT available

There can be times when the store is not available you would like to log
a `warning`, `info` or `debug` message. Make sure you always reference the logger
service in these cases, as it will always use the right logger adapter for the environment.

```javascript
// Usage in components
import logger from "Services/logger";

// ...

logger.error("Oups, I did something naughty!");
logger.warn("Heads up, I testing in live!");
logger.info("Bla, bla, bla.");
logger.debug("Even more bla, bla, bla.");
```

### How to add error boundaries

Error boundaries are catching and logging errors coming from child components.
The benefit in this is that the error propagation stops and only the effected
components stop working, the rest of the application remains functioning.

We have error boundaries in the following components:

- `App` - the whole application is wrapped
- `MigrationComponent` - every use of a MigrationComponent will have a boundary
- `ComponentBuilder` - any building block will be wrapped with an Error Boundary

To add a new boundary just use it like this:

```javascript
import ErrorBoundary from "Components/ErrorBoundary";

// ...

return (
  <ErrorBoundary>
    <MyComponent />
  </ErrorBoundary>
);
```
