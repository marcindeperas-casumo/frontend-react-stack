# Error Handling

**NOTE!** We don't have dynamic log-levels in place yet, in development mode we log all
levels to the console, in production we only log errors to Rollbar.

### Rollbar

Rollbar is a 3rd party log-collector service that we use in production.
**Logs:** [Check out the error logs for this repo](https://rollbar.com/casumo/react-stack/items)
**Credentials:** We all have personal accounts, ask for an invite in #frontend

### Logging an error

```javascript
import logger from "Services/logger";

logger.log / debug / info / warning / error / critical();
```

### Adding Error Boundaries

Error boundaries are catching and logging errors coming from child components.
The benefit in this is that the error propagation stops and only the effected
components stop working, the rest of the application remains functioning.

We have error boundaries in the following components:

- `App` - the whole application is wrapped
- `Route` - every use of a Route will have a boundary
- `ComponentBuilder` - any building block will be wrapped with an Error Boundary

To add a new boundary just use it like this:

```javascript
import { ErrorBoundary } from "Components/ErrorBoundary";

// ...

return (
  <ErrorBoundary>
    <MyComponent />
  </ErrorBoundary>
);
```

### Store snapshot in errors

Currently unavaiable, will be added back once we know what we need there.
