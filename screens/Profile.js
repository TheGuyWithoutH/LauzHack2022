// The profile screen contains the user's profile information and allows them to edit it.
// It also contains buttons to the user's items, manage his account, report a user, legal mentions, and logout.

import React from "react";
import { Text, View, TouchableOpacity, StyleSheet, Image } from "react-native";

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    marginTop: 0,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    //borderWidth : 5,
    borderColor: "#FF0000",
    

  },
  topContainer: {
    flex: 0,
    paddingTop: 0,
    marginTop: 0,
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    //borderWidth : 1,
    borderColor: "#F000FF",
    height: 100,
    },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    //borderWidth : 1,
  },
  profilePicture: {
    marginLeft: 10,
    width: 100,
    height: 100,
    //borderWidth : 1,

    },
    name: {
        fontSize: 30,
        fontWeight: "bold",
        //borderWidth : 1,
        borderColor: "#F000FF",
        },
        logout: {
            fontSize: 15,
            //borderWidth : 1,
            marginLeft: -50,
            color:"#FA9484",
            borderColor: "#F000FF",
            alignSelf: "left",
            },


    buttonContainer: {
        flex: 0,
        flexDirection: "column",
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        //borderWidth : 1,
        paddingTop: 0,
        borderColor: "#F000FF",
        width: "75%",
        },
        button: {

            alignItems: "center",
            backgroundColor: "#E3F4EA",
            padding: 15,
            margin:15,
            borderRadius: 10,
            width: "100%",
            
            
            },
            buttonText: {
                color: "#4BAD80",
                fontSize: 20,
                fontWeight: "bold", 
                alignSelf: "left", 
                },

});

export function Profile({ navigation }) {
  return (
    <View style={styles.container}>
        <View style={styles.topContainer}>
      <Image source={require("../assets/profile.png")} style={styles.profilePicture}/>
        <View style={{flex: 1, alignItems: 'center', flexDirection:'column'}}>
      <Text style={styles.name}>John Doe</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.logout}>Logout</Text>
      </TouchableOpacity>
      </View>
        </View>

        <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Items")}
      >
        <Text style={styles.buttonText}>My Objects</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Account")}
      >
        <Text style={styles.buttonText}>Manage Account</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Report")}
      >
        <Text style={styles.buttonText}>Report User</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Legal")}
      >
        <Text style={styles.buttonText}>Legal Mentions</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}
