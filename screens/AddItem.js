import { useContext, useEffect, useState } from "react";
import { Button, FlatList, Image, Keyboard, ScrollView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import { MultipleSelectList } from 'react-native-dropdown-select-list'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';
import { UserContext } from "../context";
import { Post } from "../objects/Post";

//Create AddItem func
export default function AddItem({navigation}){

    
    

    const {user,setUser} = useContext(UserContext)

    //Create state for each input
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState([]);
    const [images, setImages] = useState(null);
    const [availability, setAvailability] = useState("");
    const [price, setPrice] = useState("");

    const toObject = (name,category,image,price) => {
        return {
            name: name,
            category: category,
            image: image,
            price: price,
        }
    }


    const data = [
        {key:'1', value:'Household'},
        {key:'2', value:'Kitchen'},
        {key:'3', value:'Sports'},
        {key:'4', value:'Gaming'},
        {key:'5', value:'Visual audio'},
    ]


    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
        //   allowsEditing: true,
          allowsMultipleSelection: true,
          aspect: [4, 3],
          quality: 1,
        });
    
    
        if (!result.canceled) {
            if(images){
                // console.log(images)
                setImages(existingItems => ([
                    ...existingItems,
                    ...result.assets
                ]))
            }else {
                setImages(result.assets)
            }
          
        }
      };

      const renderItem = () => (
        <TouchableWithoutFeedback onPress={pickImage}>
            <View style={{ height:300, alignItems: 'center', justifyContent: 'center', borderWidth:1,borderRadius:15, marginTop:20,padding:20,borderStyle:"dashed",borderColor:"#FA9484",marginLeft:"auto",marginRight:"auto",width:300}}>
                                    
                <View style={{alignItems:"center"}}>
                    <AntDesign name="plus" size={50} color="#FA9484"/>
                    <Text style={{color:"#FA9484",fontSize:20}} >Add a picture</Text>
                </View>
                                        
                {/* {images && <Image source={{ uri: images }} style={{ width: 200, height: 200 }} />} */}
                </View>
                                
        </TouchableWithoutFeedback> 
      );

    const onSubmit = () => {
        var item = toObject(name,category,images,price)
        var post = new Post(item,availability,description,user.getUID())

        console.log(post.getInformation())
        user.post(post).then(() => {
            navigation.navigate("Home")
        }).catch((error) => {
            console.log(error)
        })

    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAwareScrollView
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}
                keyboardShouldPersistTaps='handled'>
            <View style={styles.container}>
                        {images ? 
                            <View >
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                    {images.map((image, index) => (
                                        <View key={index}>
                                            <Image source={{ uri: image.uri }} style={{ width: 300, height: 300, borderRadius:10,marginTop:20,marginRight:10}} resizeMode="cover"/>
                                        </View>
                                    ))}
                                {renderItem()}
                                </ScrollView>
                                    {/* <FlatList horizontal data={images} renderItem={renderItem} 
                                    pagingEnabled={true}></FlatList> */}
                            </View>
                        : renderItem()}
                        <View style={{marginLeft:"auto",marginRight:"auto"}}>
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>Name</Text>
                                <TextInput placeholder="Name of the article" style={styles.sectionInput} placeholderTextColor="#4BAD80" onChangeText={setName}/>
                            </View>
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>Description</Text>
                                <TextInput placeholder="Describe your article" multiline={true} style={[styles.sectionInput,{height:"auto"}]} placeholderTextColor="#4BAD80" showsVerticalScrollIndicator={false} onChangeText={setDescription}/>
                            </View>
                            <View style={styles.section}> 
                                <Text style={styles.sectionTitle}>Category</Text>
                                <MultipleSelectList 
                                setSelected={(val) => setCategory(val)} 
                                data={data} 
                                save="value"
                                label="Categories"
                                style={{backgroundColor:"lightgreen"}}
                            />
                            </View>
                            <View style={[styles.section,{flexDirection:"row",marginBottom:50}]}>
                                <View style={{flex:1,marginRight:10}}>
                                    <Text style={styles.sectionTitle}>Price</Text>
                                    <TextInput placeholder="CHF"  style={styles.sectionInput} placeholderTextColor="#4BAD80" keyboardType="numeric" onChangeText={setPrice}/>
                                </View>
                                <View style={{backgroundColor:"red",flex:1,alignSelf:"flex-end",padding:10,borderRadius:20}} >
                                    <Text style={{textAlign:"center",color:"white",fontSize:20}} onPress={onSubmit}>Rent</Text>
                                </View>
                                
                            </View>
                        </View>
                
            </View>
            </KeyboardAwareScrollView>
        </TouchableWithoutFeedback>
        
    )
}

//Create styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop:50,
        // alignItems: 'center',
        // justifyContent: 'center',
    },

    section: {
        width: 300,
        marginVertical: 10,
    },

    sectionTitle: {
        //color in green
        color:"green",
        marginBottom: 10,
    },

    sectionInput : {
        padding:15,
        borderRadius:10,
        backgroundColor:"#E3F4EA",
    }
});