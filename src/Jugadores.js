import React, { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";

function App({ navigation }) {
  const [player, setPlayer] = useState("");
  const [players, setPlayers] = useState([
    "Alpha",
    "Bravo",
    "Charlie",
    "Delta",
    "Echo"
  ]);
  function addPlayer() {
    navigation.navigate("Torneo", players);
    if (player === "") return;
    const newPlayer = player.toUpperCase();
    if (players.some((p) => p.toUpperCase() === newPlayer)) {
      Alert.alert("El jugador ya fue agregado");
      return;
    }
    setPlayers([newPlayer, ...players]);
    setPlayer("");
  }
  function removePlayer(btn) {
    const playerToRemove = btn.target.innerText.toUpperCase();
    console.log(playerToRemove);
    players.filter((p) => {
      console.log(p.toUpperCase(), playerToRemove);
      return true;
    });
    setPlayers(players.filter((p) => p.toUpperCase() !== playerToRemove));
  }
  function startTournament() {
    navigation.navigate('Torneo', players)
  }

  return (
    <View style={styles.app}>
      <TextInput
        style={styles.text}
        onChangeText={setPlayer}
        placeholder="Jugador"
        value={player}
        onKeyPress={(e) => {
          if (e.key === "Enter") addPlayer();
        }}
      />
      <Button
        stype={styles.button}
        onPress={addPlayer}
        title="Agregar Jugador"
      />
      <View style={styles.hairline} />
      {players.map((p) => (
        <Button
          key={p}
          style={styles.listButton}
          onPress={removePlayer}
          title={p}
        />
      ))}
      <View style={styles.hairline} />
      <Text style={styles.code}>
        Número de jugadores: {players.length}
        {players.length < 4 ? "!" : ""}
      </Text>
      <View style={styles.hairline} />
      <Button
        stype={styles.button}
        onPress={startTournament}
        title="INICIAR TORNEO"
        disabled={players.length < 4}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    marginHorizontal: "auto",
    maxWidth: 500
  },
  hairline: {
    marginVertical: 10,
    backgroundColor: "#A2A2A2",
    height: 2,
    width: "100%"
  },
  input: {
    height: 80
  },
  header: {
    padding: 20
  },
  title: {
    fontWeight: "bold",
    fontSize: "1.5rem",
    marginVertical: "1em",
    textAlign: "center"
  },
  text: {
    lineHeight: "1.5em",
    fontSize: "1.125rem",
    marginVertical: "0.2em",
    textAlign: "center"
  },
  button: {
    color: "#1B05E0"
  },
  listButton: {
    backgroundColor: "rgba(52, 52, 52, 0.8)"
  },
  code: {
    fontFamily: "monospace, monospace"
  }
});

export default App;
