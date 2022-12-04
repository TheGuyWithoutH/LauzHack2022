import React from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";

const ItemCard = ({
  itemImage,
  itemName,
  itemPrice,
  itemAvailability,
  action,
}) => {
  return (
    <TouchableOpacity style={styles.item} onPress={action}>
      <Image style={styles.itemImage} source={{uri : itemImage}} />
      <View style={styles.itemInfos}>
        <Text style={styles.itemName}>{itemName}</Text>
        <Text style={styles.itemPrice}>
          <Text>CHF </Text>
          <Text style={{ fontSize: 32 }}>{itemPrice}.-</Text>
        </Text>
        <Text style={styles.itemAvailability}>
          Next availability : {itemAvailability}
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
