// The profile screen contains the user's profile information and allows them to edit it.
// It also contains buttons to the user's items, manage his account, report a user, legal mentions, and logout.

import React from "react";
import { Text, View, TouchableOpacity, StyleSheet, Image } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 100,

    },
    
});

export function Profile({ navigation }) {
  return (
    <View style={styles.container}>
        <View style={{flex: 1, alignItems: 'center', flexDirection:'row'}}>
      <Image source={require("../assets/profile.png")} style={styles.profilePicture}/>
        <View style={{flex: 1, alignItems: 'center', flexDirection:'column'}}>
      <Text>John Doe</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text>Logout</Text>
      </TouchableOpacity>
      </View>
        </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Items")}
      >
        <Text>My Objects</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Account")}
      >
        <Text>Manage Account</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Report")}
      >
        <Text>Report User</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Legal")}
      >
        <Text>Legal Mentions</Text>
      </TouchableOpacity>
    </View>
  );
}
