import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import { UserContext } from "./context";
import { Guest } from "./objects/Guest";
import Item from "./screens/Item";
import MyItems from "./screens/MyItems";

import LoginMenu from "./screens/LoginMenu";
import SignUp from "./screens/SignUp";
import AppTabs from "./screens/AppTabs";
import Chat from "./screens/Chat";
import TermsAndConditions from "./screens/TermsAndConditions";

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter: require("./assets/fonts/Inter.ttf"),
  });

  const [user, setUser] = useState(new Guest());
  const Stack = createNativeStackNavigator();

  if (!fontsLoaded) {
    return <View></View>;
  } else {
    return (
      <NavigationContainer>
        <StatusBar style="auto" hidden={Platform.OS === 'ios' ? true : false}/>
        <UserContext.Provider value={{ user, setUser }}>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="App" component={AppTabs} />

            <Stack.Screen
              options={{
                animation: "slide_from_bottom",
                presentation: "modal",
                headerShown: true,
                title: "Sign Up or Login",
              }}
              name="LoginMenu"
              component={LoginMenu}
            />

            <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={{ presentation: "modal", headerShown: true }}
            />
            <Stack.Screen
              name="Item"
              component={Item}
              options={{ presentation: "card", headerShown: false }}
            />
            <Stack.Screen
              name="MyItems"
              component={MyItems}
              options={{ presentation: "card", headerShown: false }}
            />
            <Stack.Screen
              name="Chat"
              component={Chat}
              options={{ presentation: "card", headerShown: false }}
            />
            <Stack.Screen
              name="TermsAndConditions"
              component={TermsAndConditions}
              options={{ presentation: "card", headerShown: false }}
            />
          </Stack.Navigator>
        </UserContext.Provider>
      </NavigationContainer>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
