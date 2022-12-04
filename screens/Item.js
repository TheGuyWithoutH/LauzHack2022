//The item componnent is a component that displays the item's image and the description, user lending it, and the price.
//It also contains a button to Rent the item.
// It takes as parameters the item's image, description, user lending it, the id, and the price.
// Contains as well a back button on the top left corner to go back to the previous screen.
//status bar should be hidden
import React, { useState, useContext, useEffect } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { AntDesign } from "@expo/vector-icons";
import { UserContext } from "../context";

import ValidateRent from "../components/ValidateRent";

const styles = StyleSheet.create({
  container: {
    //paddingTop: 50,
    marginTop: 0,
    flex: 1,
    //borderWidth: 1,
    borderColor: "#FF0000",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: 330,
    //borderWidth : 1,
  },
  inner: {
    margin: 10,

    justifyContent: "center",
    flexDirection: "row",
    //borderWidth : 1,
    justifyContent: "space-between",
    width: "100%",
    borderColor: "#F000FF",
  },

  innerA: {
    marginLeft: 0,
    fontSize: 19,
    //borderWidth : 1,
    fontWeight: "normal",
  },
  innerB: {
    bottom: 0,
    marginBottom: 0,
    fontSize: 18,
    //borderWidth : 1,
    fontWeight: "lighter",
  },

  actionContainer: {
    position: "absolute",
    top: "5%",
    width: "85%",
    zIndex: 1,
    //borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  content: {
    //marginLeft: "10%",
    flex: 1,
    width: "80%",
    //borderWidth: 1,
    borderColor: "#FF0000",
    paddingLeft: 0,
    paddingRight: 0,
    padding: 10,
  },
  name: {
    fontSize: 30,
    fontWeight: "bold",
    //borderWidth : 1,
    borderColor: "#F000FF",
    marginBottom: 10,
  },

  button: {
    alignItems: "center",
    backgroundColor: "#FF6E6C",
    padding: 10,
    borderRadius: 10,

    //borderWidth : 1,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    //borderWidth : 1,
  },
  description: {
    marginTop: 10,
    marginLeft: 0,
    width: "100%",

    fontSize: 16,
    //borderWidth : 1,
    borderColor: "#F000FF",
    marginBottom: 20,
  },
  arrowBackContainer: {
    padding: 7,
    borderRadius: 10,
    backgroundColor: "#E3F4EA",

    //borderWidth : 1,
  },

  arrowBack: {
    color: "#4BAD80",

    //borderWidth : 1,
  },
  heartContainer: {
    //borderWidth : 1,
    borderColor: "#FF0000",
    paddingRight: 50,
    zIndex: 1,
  },
  heart: {
    position: "absolute",
    bottom: -3,
  },
  user: {
    fontSize: 15,
    //borderWidth : 1,
    borderColor: "#F000FF",
  },
  price: {
    fontSize: 30,
    fontWeight: "bold",
    //borderWidth : 1,
    borderColor: "#F000FF",
  },
  payment: {
    left: "0%",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    //borderWidth : 1,
    borderColor: "#F000FF",
  },
});

const computeAvailability = (items) => {
  let dates = Object.entries(items).filter((item) => Date.parse(item[0]) >= Date.now()).sort((a, b) => a[0].localeCompare(b[0]));
  let date = Date.now();
  while(Date.parse(dates[0]) <= date) {
    if(date = Date.parse(dates[0])) dates = dates.shift();
    date = date + 86400000;
  }
  return new Date(date);
}

export default function Item({
  navigation,
  route: {
    params: {
      item: { image, name, description, availabitity, id, owner, price, isMine, ownerId },
    },
  },
}) {
  const { user, setUser } = useContext(UserContext);
  const [isFav, setIsFav] = useState(false);
  const [rent, setRent] = useState(false);

  useEffect(
    () => {
      if (user.isLoggedIn()) {
        user.isFavorite(id).then((res) => {
          //console.log("isFavoooos", res);
          setIsFav(res)
        });
        //console.log("isFavoooos", user.isFavorite(id));

        //setIsFav(user.isFavorite(id));
      }
    },
    //setIsFav(user.isFavorite(id))
    []
  );

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <ValidateRent id={id} 
        visibility={rent} 
        setVisibility={setRent} 
        user={user} 
        availability={availabitity} 
        ownerId={ownerId}
        ownerName={owner}
        navigation={navigation} />
      <View style={styles.actionContainer}>
        <TouchableOpacity
          style={styles.arrowBackContainer}
          onPress={() => navigation.goBack()}
        >
          <AntDesign style={styles.arrowBack} name="arrowleft" size={32} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.heartContainer}
          onPress={() => {
            if (!user.isLoggedIn()) {
              //console.log("not logged in");
              navigation.navigate("LoginMenu");
              return;
            }

            if (isFav === true) {
              //console.log("removing from fav");
              user.removeFavorite(id);
              setIsFav(false);

              //console.log(user.getFavorites());
            } else {
              //console.log("adding to fav");
              user.addFavorite(id);
              setIsFav(true);
              //console.log(user.getFavorites());
            }
            
          }}
        >
          <AntDesign
            style={styles.heart}
            name="heart"
            id="HeartInner"
            color={isFav ? "#4BAD80" : "#FFFFFF"}
            size={40}
          />
          <AntDesign
            color="#4BAD80"
            style={styles.heart}
            name="hearto"
            size={40}
          />
        </TouchableOpacity>
      </View>
      <Image source={image} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.inner}>
          <Text style={styles.innerA}>Offered by </Text>
          <Text style={styles.innerB}>{owner}</Text>
        </View>
        <View style={styles.inner}>
          <Text style={styles.innerA}>Available from </Text>
          <Text style={styles.innerB}>{computeAvailability(availabitity || {}).getDate()}</Text>
        </View>
        <Text style={styles.description}>{description}</Text>

        <View style={styles.payment}>
          <Text style={styles.price}>{price}.-/day</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              //console.log("FAV?", isFav);

              isMine ?  console.log("delete") : setRent(true); 


            }}
          >
            <Text style={styles.buttonText}>{!isMine ? "Rent this object" : "Delete" }</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
