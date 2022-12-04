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

import { where, limit } from "firebase/firestore";

const Home = ({ navigation }) => {
  const { user, setUser } = useContext(UserContext);
  const [items2, setItems2] = useState([]);
  const [page, setPage] = useState(0);
  const [searchText, setSearchText] = useState("");
  const isFocused = useIsFocused();
  
  const [isEssentials, setIsEssentials] = useState(false);
  
  const research = (searchTerm, page) => {
    console.log(searchTerm);
    searchTerm = searchTerm.toLowerCase();
    let strlength = searchTerm.length;
    let strFrontCode = searchTerm.slice(0, strlength-1);
    let strEndCode = searchTerm.slice(strlength-1, searchTerm.length);
    // This is an important bit..
    let endCode = strFrontCode + String.fromCharCode(strEndCode.charCodeAt(0) + 1);

    return user.getPublicPosts(where('fieldName', '>=', searchTerm), where('fieldName', '<', endCode), limit(50))
  }

  const computeAvailability = (items) => {
    if (items.length == 0) {
      return "Now";
    }
    let dates = Object.entries(items).filter((item) => Date.parse(item[0]) >= Date.now()).sort((a, b) => a[0].localeCompare(b[0]));
    let date = Date.now();
    while(Date.parse(dates[0]) <= date) {
      if(date = Date.parse(dates[0])) dates = dates.shift();
      date = date + 86400000;
    }
    return new Date(date);
  }

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
  }, [isFocused]);


  return (
    <View style={styles.home}>
      <Header logo={true} />
      <View style={styles.content}>
        <View style={styles.searchDiv}>
          <TextInput style={styles.textSearch} placeholder="Search an object" onChangeText={newText => setSearchText(newText)} defaultValue={searchText}></TextInput>
          <TouchableOpacity style={styles.buttonSearch} onPress={(_) => {research(searchText, 0)}}>
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
                
                <ItemCard itemImage={item.data().information.image[0]} itemName={item.data().information.name} itemAvailability={computeAvailability(item.data().nonAvailability)} itemPrice={item.data().information.price} action={() => {
                    navigation.navigate("Item", {item: {
                      image : item.data().information.image[0].uri,
                      name : item.data().information.name,
                      description : item.data().description,
                      availability : item.data().nonAvailability,
                      price : item.data().information.price,
                      id: item.data().id,
                      owner: item.data().creatorName,
                      ownerId: item.data().creatorUID,
                    }}) 
                }
                }/>
            )}
            showsVerticalScrollIndicator={false}
            onEndReached={() => {
              setItems2([...items2, ...research(searchText, page + 1)]);
              setPage(page + 1);
            }}
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
