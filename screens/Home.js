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
} from "react-native";
import { UserContext } from "../context";
import { auth } from "../firebase";
import { Guest } from "../objects/Guest";
import { User } from "../objects/User";
import { Fontisto } from "@expo/vector-icons";
import Header from "../components/Header";
import ItemCard from "../components/ItemCard";
import Item from "../screens/Item";
import { useIsFocused } from "@react-navigation/native";

const Home = ({ navigation }) => {
  const { user, setUser } = useContext(UserContext);
  const [items2, setItems2] = useState([]);
  const isFocused = useIsFocused();

  const [isEssentials, setIsEssentials] = useState(false);

  useEffect(() => {
    user.getPublicPosts().then((posts) => {
      setItems2(posts);
    })


  }, [isFocused]);

  

  useEffect(() => {
    console.log("Home");
    const unsuscribe = auth.onAuthStateChanged((u) => {
      if (u) {
        console.log("User is already logged in");
        setUser(new User(u.uid, u));
      } else {
        console.log("User is not logged in");
        setUser(new Guest());
        navigation.navigate("LoginMenu");
        // navigation.navigate("LoginMenu")
      }
      unsuscribe();
    });
  }, []);

  return (
    <View style={styles.home}>
      <Header logo={true} />
      <View style={styles.content}>
        <View style={styles.searchDiv}>
          <TextInput style={styles.textSearch} placeholder="Search an object"></TextInput>
          <TouchableOpacity style={styles.buttonSearch}>
            <Fontisto name="search" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.searchFilters}>
          <TouchableOpacity style={styles.filter}>
            <Text>Essentials</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filter}>
            <Text>Available now</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filter}>
            <Text>Filters</Text>
          </TouchableOpacity>
        </View>
        
        <FlatList
            data={items2}
            renderItem={({ item }) => (
                
                <ItemCard itemImage={item.data().information.image[0].uri} itemName={item.data().information.name} itemAvailability={item.data().availability} itemPrice={item.data().information.price} action={() => {
                    navigation.navigate("Item", {item: {
                      image : item.data().information.image[0].uri,
                      name : item.data().information.name,
                      description : item.data().description,
                      nextAvailability : item.data().availability,
                      price : item.data().information.price,
                      id: item.data().id,
                      owner: item.data().creatorName,
                    }}) 
                }
                }/>
            )}
            showsVerticalScrollIndicator={false}
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
    marginTop: 150,
    width: "80%",
    flex:1
  },
  searchDiv: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    height: 45,
  },
  textSearch: {
    flex: 5,
    backgroundColor: "#E3F4EA",
    color: "#4BAD80",
    marginEnd: 10,
    borderRadius: 10,
    paddingHorizontal: 20,
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
    marginBottom: 10,
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
});

export default Home;
