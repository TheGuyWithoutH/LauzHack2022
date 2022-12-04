import React, { useState } from "react";
import { useContext, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Animated,
} from "react-native";
import { UserContext } from "../context";
import { auth } from "../firebase";
import { Guest } from "../objects/Guest";
import { User } from "../objects/User";
import { Fontisto } from "@expo/vector-icons";
import Header from "../components/Header";
import ItemCard from "../components/ItemCard";
import Item from "../screens/Item";
import { AntDesign } from "@expo/vector-icons";

const MyItems = ({ navigation,route }) => {
  const [items, setItems] = useState([])

  const { user, setUser } = useContext(UserContext);

  const {myName} = route.params;

  



  useEffect(() => {
    if (!user.isLoggedIn()) {
      navigation.navigate("LoginMenu");

    } else{
       //get the users items
       
        user.getMyItems().then((itemss) => {
            if (itemss) {
                console.log("I'm here")
                console.log(itemss)
                var temp = itemss.map((item) => {
                    console.log("i: ",item)
                    return {
                       image:  (item.information.image) ? item.information.image[0] : null,
                       name: item.information.name,
                       description: item.description,
                       nextAvailabitity: item.nextAvailabitity==null ? "Disponible" : item.nextAvailabitity,
                       id: item.id,
                       owner: myName ? myName : "Me",
                       price:  item.information.price,
                   }
               })
               console.log("Temp:",temp)
                setItems(temp)
                
            }
            console.log("Items: ",items)
        
            
        });
    }
}, []);
    

  return (
    <View style={styles.home}>
      <Header header="My Objects" />
      <TouchableOpacity
        style={styles.arrowBackContainer}
        onPress={() => navigation.goBack()}
      >
        <AntDesign style={styles.arrowBack} name="arrowleft" size={32} />
      </TouchableOpacity>
      <View style={styles.content}>
        <FlatList
          data={items}
          renderItem={({ item }) => (
            console.log("------------------"),
            console.log("item: ",item),
            <ItemCard
              itemImage={item.image.uri}
              itemName={item.name}
              itemAvailability={item.nextAvailabitity}
              itemPrice={item.price}
              isMine={true}
              action={() => {
                navigation.navigate("Item", { item: {item: {
                      image : item.image,
                      name : item.name,
                      description : item.description,
                      nextAvailability : item.availability,
                      price : item.price,
                      id: item.id,
                      owner: item.creatorName,
                    }}, isMine: true });
              }}
            />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  home: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    backgroundColor: "#F6FFFB",
  },
  content: {
    flex: 1,
    marginTop: 150,
    width: "80%",
  },
  arrowBackContainer: {
    position: "absolute",
    top: "5%",
    left: 20,
  },
  arrowBack: {
    color: "#4BAD80",
  },
  buttonSearch: {
    elevation: 10,
    flex: 1,
    backgroundColor: "#FF6E6C",
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#FF6E6C",
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  searchFilters: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    height: 30,
    marginTop: 20,
  },
  filter: {
    marginEnd: 10,
    backgroundColor: "#EEEBEB",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    fontSize: 12,
    borderRadius: 5,
  },
  trashContainer: {
    backgroundColor: "#FF6E6C",
    width: 50,
    height: "70%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    },

});

export default MyItems;
