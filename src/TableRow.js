import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TextInput, Modal } from "react-native";

export default function TableRow({ num, players, setPlayers }) {
  const [entryMode, setEntryMode] = useState(false);
  const [team1score, setTeam1Score] = useState("");
  const [team2score, setTeam2Score] = useState("");
  if (players.length < 4)
    return players.map((p, i) => (
      <Text key={"p{num * 10 + i}"} style={styles.default}>
        {p.alias} 100-70
      </Text>
    ));

  function saveScores() {
    setPlayers(
      num,
      players.map((p, i) => {
        console.log(num, p);
        return { ...p, score: i % 2 == 0 ? team1score : team2score };
      })
    );
  }

  function onScore1Change(score) {
    score = parseInt(score, 0);
    setTeam1Score(score);
    if (team2score === "" && score < 100) setTeam2Score(100);
    else if (team2score === 100 && score === 100) setTeam2Score("");
  }

  function onScore2Change(score) {
    score = parseInt(score, 0);
    setTeam2Score(score);
    if (team1score === "" && score < 100) setTeam1Score(100);
    else if (team1score === 100 && score === 100) setTeam1Score("");
  }

  return (
    <View style={styles.playersList}>
      {players.map((p, i) => {
        return (
          <Text key={"p" + (num * 10 + i)} style={ss[i % 4].s}>
            {(i % 4) + 1} {p.alias} {p.score}
          </Text>
        );
      })}
      <Button
        title={"Mesa " + num}
        key={"bt" + num}
        style={ss[4].s}
        onPress={() => {
          setEntryMode(true);
        }}
      />
      <Modal
        animationType="slide"
        transparent
        visible={entryMode}
        presentationStyle="overFullScreen"
        onDismiss={() => setEntryMode(false)}
      >
        <View style={styles.viewWrapper}>
          <View style={styles.modalView}>
            <Text style={styles.label}>
              {players[0].alias} / {players[2].alias}
            </Text>
            <TextInput
              placeholder="Capturar puntaje..."
              value={team1score}
              style={styles.textInput}
              onChangeText={(value) => onScore1Change(value)}
            />
            <Text style={styles.label}>
              {players[1].alias} / {players[3].alias}
            </Text>
            <TextInput
              placeholder="Capturar puntaje..."
              value={team2score}
              style={styles.textInput}
              onChangeText={(value) => onScore2Change(value)}
            />
            <Button
              title="Salvar"
              onPress={() => {
                saveScores();
                setEntryMode(false);
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  playersList: {
    display: "grid",
    gridTemplateColumns: "1fr 100px 1fr",
    gridTemplateRows: "auto",
    gridTemplateAreas: `
      "p1 p1 p1"
      "p2 bt p4"
      "p3 p3 p3"
      "l  l  l "`,
    justifyContent: "center",
    alignContent: "center",
    boxShadow: "0 0 15px 5px"
  },
  default: {
    padding: "20px"
  },
  modalView: {
    padding: "10px",
    borderWidth: 1,
    boxShadow: "2px 2px 2px 0",
    borderRadius: 10,
    borderColor: "rgba(0,0,0,0.6)",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    display: "grid",
    gridGap: "5px"
  },
  viewWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.4)"
  },
  textInput: {
    width: "100%",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderColor: "rgba(0, 0, 0, 0.2)",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderWidth: 1,
    marginBottom: 8
  }
});

const ss = [
  StyleSheet.create({
    s: {
      gridArea: "p1",
      textAlign: "center",
      padding: "8px"
    }
  }),
  StyleSheet.create({
    s: {
      gridArea: "p2",
      textAlign: "right",
      padding: "8px"
    }
  }),
  StyleSheet.create({
    s: {
      gridArea: "p3",
      textAlign: "center",
      padding: "8px"
    }
  }),
  StyleSheet.create({
    s: {
      gridArea: "p4",
      textAlign: "left",
      padding: "8px"
    }
  }),
  StyleSheet.create({
    s: {
      gridArea: "bt",
      textAlign: "center"
    }
  })
];
