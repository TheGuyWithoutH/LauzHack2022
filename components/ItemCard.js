import React from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";

const ItemCard = ({
  itemImage,
  itemName,
  itemPrice,
  itemAvailability,
  action,
}) => {

  const dateToString = (date) => {
    if (date == "Disponible") {
      var today = new Date();
    var day = today.getDate()
    var month = today.getMonth() + 1; //Current Month
    var year = today.getFullYear(); //Current Year 
    return year + '-' + month + '-' + day
    }
    if (typeof date === "string") { 
      console.log("date",date)
    var day = date.getDate()
    var month = date.getMonth() + 1; //Current Month
    var year = date.getFullYear(); //Current Year
    return year + '-' + month + '-' + day
    }
    var today = new Date();
    var day = today.getDate()
    var month = today.getMonth() + 1; //Current Month
    var year = today.getFullYear(); //Current Year 
    return year + '-' + month + '-' + day
    // 
    
    
    
  }

  return (
    <TouchableOpacity style={styles.item} onPress={action}>
      <Image style={styles.itemImage} source={itemImage} />
      <View style={styles.itemInfos}>
        <Text style={styles.itemName}>{itemName}</Text>
        <Text style={styles.itemPrice}>
          <Text>CHF </Text>
          <Text style={{ fontSize: 32 }}>{itemPrice}.-</Text>
        </Text>
        <Text style={styles.itemAvailability}>
          Next availability : {itemAvailability === "Now" ? "Now" : dateToString(itemAvailability)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    elevation: 20,
    backgroundColor: "#fff",
    width: "100%",
    height: 119,
    marginVertical: 20,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  itemImage: {
    flex: 4,
    height: "100%",
  },
  itemInfos: {
    flex: 7,
    padding: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    marginEnd: 10,
    paddingVertical: 5,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    width: "100%",
    textAlign: "right",
  },
  itemPrice: {
    fontSize: 13,
    fontWeight: "regular",
    width: "100%",
    textAlign: "right",
  },
  itemAvailability: {
    fontSize: 13,
    fontWeight: "regular",
    width: "100%",
    textAlign: "right",
  },
});

export default ItemCard;
