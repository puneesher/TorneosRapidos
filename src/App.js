import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Jugadores from "./Jugadores";
import Torneo from "./Torneo";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Jugadores}
          options={{ title: "Alta de Jugadores" }}
        />
        <Stack.Screen name="Torneo" component={Torneo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
