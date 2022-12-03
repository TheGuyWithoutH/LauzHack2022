import { createUserWithEmailAndPassword } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { UserContext } from "../context";
import { auth } from "../firebase";


export default function LoginMenu({navigation}){
    const {user} = useContext(UserContext)
    const [isLoggingIn,setIsLoggingIn] = useState(false)
    const [isWrongPassword,setIsWrongPassword] = useState(false)

    const [userState, setUserState] = useState({
        email: "",
        password: "",
    })


    const loginOrSignUp = (email) => {



        user.userExistsByEmail(email).then(bool => {
            //Si un compte existe déjà, log in
            if(isLoggingIn == true){
                // console.log(email)
                console.log("logging in the user")
                // console.log(user)
                user.login(email,userState.password)
                .then(() => {
                    navigation.pop()
                }).catch(err => {
                    console.log(err.code)
                    if(err.code === "auth/wrong-password"){
                        setIsWrongPassword(true)
                        setPassword("")
                    }
                })
            }
            if(bool){
                setIsLoggingIn(true)
            }
            //Sinon sign up
            else{
                navigation.navigate("SignUp",{emailGiven : email})
                // console.log("not signed up yet")
            }
        })

    }
    

    const setEmail = text => {
        setUserState(existingValues => ({
            ...existingValues,
            email : text
        }))
    }

    const setPassword = text => {
        setUserState(existingValues => ({
            ...existingValues,
            password : text
        }))
    }

    return (
        <View>
            <View>
                <View style={styles.componentStyle}>
                    {/* <TextInput placeholder="firstName" value={userState.firstName} style={{marginLeft:10,fontSize:17}} onChangeText={text => setFirstName(text)}></TextInput> */}
                    <TextInput placeholder="Adresse email" value={userState.email} style={styles.text} onChangeText={text => setEmail(text)} autoCapitalize="none" autoCorrect={false} onChange={() => {setIsLoggingIn(false);setIsWrongPassword(false) }} autoComplete="email" keyboardType="email-address" textContentType="emailAddress"></TextInput>
                </View>
                {isLoggingIn && 
                <View style={styles.componentStyle}>
                    <TextInput placeholder="password" value={userState.password} style={{marginLeft:10,fontSize:17}} onChangeText={text => setPassword(text)} autoCapitalize="none" autoCorrect={false}></TextInput>
                    {isWrongPassword && <Text style={{color:"red", fontSize:10}}>Wrong Password</Text>}
                </View>}
                <TouchableOpacity style={[styles.componentStyle,{backgroundColor: userState.email.length == 0 ? "#c4c4c4" : "#FFCB66",}]}
                onPress={() => loginOrSignUp(userState.email)}>
                    <Text style={{textAlign:"center",fontSize:17,}}>
                        Continue
                    </Text>
                </TouchableOpacity>
                
            </View>
            <View style={{marginTop:50,}}>
                    <Text>
                        Continue with : 
                    </Text>
                <View style={styles.componentStyle}>  
                    <Text style={{textAlign:"center"}}>Google</Text>
                </View>
                <View style={styles.componentStyle}>  
                    <Text style={{textAlign:"center"}}>Apple</Text>
                </View>
                <View style={styles.componentStyle}>  
                    <Text style={{textAlign:"center"}}>Facebook</Text>
                </View>
            
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    componentStyle : {
        marginTop:30,
        marginHorizontal:20,
        padding:10,
        // backgroundColor:"red",
        borderColor:"gray",
        borderWidth:1,
        borderRadius:7,
        height:50,
        justifyContent:"center",
    },

    text : {
        marginLeft:10,
        fontSize:17
    }
})