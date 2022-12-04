// The profile screen contains the user's profile information and allows them to edit it.
// It also contains buttons to the user's items, manage his account, report a user, legal mentions, and logout.

import React, { useContext, useEffect, useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Image } from "react-native";
import Header from "../components/Header";
import { UserContext } from "../context";



const Profile = ({ navigation }) => {
    const { user, setUser } = useContext(UserContext);
    const [ name, setName ] = useState("");

    useEffect(
        () => {
          if (user.isLoggedIn()) {
            user.getName().then((name) => {
                setName(name);
            });
            
            


            } else {
                navigation.navigate("LoginMenu");
            //console.log("isFavoooos", user.isFavorite(id));
    
            //setIsFav(user.isFavorite(id));
          }
        },
        //setIsFav(user.isFavorite(id))
        []
      );

  return (
    <View style={styles.account}>
      <Header header={"My account"} />
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Image source={require("../assets/profile.png")} style={styles.profilePicture}/>
          <View style={{flex: 1, alignItems: 'center', flexDirection:'column'}}>
            <Text style={styles.name}>{name}</Text>
            <TouchableOpacity onPress={() => {user.logout();navigation.navigate("Home")}}>
              <Text style={styles.logout}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("MyItems", {myName: name})}
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
    </View>
  );
}

const styles = StyleSheet.create({
  account: {
    flex: 1,
    backgroundColor: '#F6FFFB',
  },
  container: {
    paddingTop: 50,
    marginTop: 170,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#FF0000",
  },
  topContainer: {
    paddingTop: 0,
    marginTop: 0,
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#F000FF",
    height: 100,
    width: "90%",
    },
  button: {
    alignItems: "center",
    padding: 10,
  },
  profilePicture: {
    marginLeft: 10,
    width: 100,
    height: 100,
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    borderColor: "#F000FF",
  },
  logout: {
    fontSize: 15,
    marginLeft: -50,
    color:"#FA9484",
    borderColor: "#F000FF",
  },


  buttonContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 0,
    marginTop: 40,
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
  },

});

export default Profile;