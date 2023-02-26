import React, { useState } from "react";
import { View } from "react-native";
import TableRow from "./TableRow";

export default function Torneo({ navigation, route }) {
  const rp = route.params
    .map((v) => ({ alias: v, p: Math.random() }))
    .sort((a, b) => a.p - b.p);
  const [players, setPlayers] = useState(rp);
  const setTablePlayers = (num, tplayers) => {
    let newplayers = players.map((p, i) => {
      let n = (num - 1) * 4;
      if (i < n || i >= n + tplayers.length) return p;
      return tplayers[i - n];
    });
    console.log(newplayers);
    setPlayers(newplayers);
  };
  let tables = [];
  for (let t = 0; t < players.length / 4; t++)
    tables.push(
      <TableRow
        key={"table" + t}
        num={t + 1}
        players={players.slice(t * 4, t * 4 + 4)}
        setPlayers={setTablePlayers}
      />
    );
  return <View>{tables}</View>;
}
