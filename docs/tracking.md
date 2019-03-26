# Tracking

Tracking of client side events is currently done with Mixpanel, but we can easily
add different / multiple destinations in the future.

### Where to see the tracked events

Just visit [https://mixpanel.com/report/1874529/insights](https://mixpanel.com/report/1874529/insights).
If you don't have an account yet, ask in #frontend.

### How to use

**Tracking an event**

```javascript
import tracker from "Services/tracker";

tracker.track("Clicked Button", { name: "Launch Game" });
```

**Setting global properties**
These properties are going to be sent with all events.

```javascript
import tracker from "Services/tracker";

tracker.setState({ loginPageFlavour: "A" });
```

### How it works

The tracker service (`Services/tracker`) uses adapters to propagate
the tracked events to multiple destinations.

```
track("Clicked Button", { name: "Launch Game" });

                       +
                       |
                       |
                       v

           +-----------------------+
           |        TRACKER        |
           +-----------------------+
           |                       |
           |                       |
           v                       v

    +--------------+       +--------------+
    |   ADAPTER 1  |       |   ADAPTER 2  |
    |  (MIXPANEL)  |       |              |
    +------+-------+       +--------------+
           |
           |
           v

    +-------------------------------------+
    |  Mixpanel Proxy                     |
    |  (https://mp-proxy-aws.casumo.com)  |
    +------+------------------------------+
           |
           |
           v

    +--------------+
    |   Mixpanel   |
    +--------------+

```
