import React from "react";

import LiveCasinoList from "../../components/LiveCasino/LiveCasinoList";
import LiveCasinoListSkeleton from "../../components/LiveCasino/LiveCasinoListSkeleton";
import lobbyWS from "./ws";

export default class LiveCasinoContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: false,
      data: [],
    };
  }

  processType(data) {
    const i = this.state.data.findIndex(e => e.id === data.tableId);
    const exists = i !== -1;

    const updateState = prop => {
      if (exists) {
        const d = [...this.state.data];
        d[i][prop] = data[prop];
        this.setState({ ...this.state, data: d });
      }
    };

    const types = {
      State: () => {
        const tables = Object.keys(data.tables)
          .map(k => ({
            ...data.tables[k],
            id: k,
          }))
          .filter(table => table.open && table.display === "on_mobile");
        this.setState({ ...this.state, data: tables, loading: false });
      },

      TableAssigned: () => {
        this.setState(prevState => {
          const t = data.table;
          t.id = data.tableId;
          return { data: [...prevState.data, t] };
        });
      },

      TableUnassigned: () =>
        this.setState({ ...this.state, data: this.state.data.splice(i, 1) }),

      TableUpdated: () => {
        const d = [...this.state.data];
        if (exists) {
          d[i] = data.table;
          d[i].id = data.tableId;
          this.setState({ ...this.state, data: d });
        }
      },

      TableOpened: () => updateState("open"),
      TableClosed: () => updateState("open"),
      SeatsUpdated: () => updateState("seatsTaken"),
      RouletteNumbersUpdated: () => updateState("results"),
      BaccaratRoadUpdated: () => updateState("road"),
      MoneyWheelNumbersUpdated: () => updateState("results"),
      PlayersUpdated: () => updateState("players"),
      OperationHoursUpdated: () => updateState("operationHours"),
      default: () => null,
    };
    return (types[data.type] || types["default"])();
  }

  onmessage(data) {
    console.log("onmessage", data);
    this.processType(data);
  }

  componentDidMount() {
    // connect to Websockets and listen for updates
    const ws = lobbyWS.connect();
    ws.onopen = e => console.log("ws onopen");
    ws.onmessage = e => this.onmessage(JSON.parse(e.data));
    // TODO: handle onclose and reconnection
  }

  render() {
    const { data, loading } = this.state;
    const lists = [
      {
        title: "Roulette Games",
        type: "Roulette",
        data: data.filter(table => table.gameType === "Roulette"),
      },
    ];

    return (
      <React.Fragment>
        {loading ? (
          <React.Fragment>
            {lists.map(o => (
              <LiveCasinoListSkeleton
                key={o.type}
                cardWidth={320}
                cardHeight={340}
                colorLow="#eff6f6"
                colorHi="#ffffff"
                preserveAspectRatio="none"
                className="u-padding-top--normal u-padding-top--semi@tablet u-padding-top--semi@desktop u-padding-left--small u-padding-left--xlarge@tablet u-padding-left--xlarge@desktop"
              />
            ))}
          </React.Fragment>
        ) : (
          <React.Fragment>
            {lists.map(o => (
              <LiveCasinoList
                key={o.type}
                title={o.title}
                type={o.type}
                data={o.data}
              />
            ))}
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}
