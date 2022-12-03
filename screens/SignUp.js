import { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from "react-native";
import { UserContext } from "../context";
import { Ionicons } from '@expo/vector-icons';
import { FirebaseError } from "firebase/app";

export default function SignUp({navigation,route}){
    const {user} = useContext(UserContext)
    const { emailGiven } = route.params;
    // const {emailGiven} = parameters.params

    const [userState, setUserState] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirmation: "",
        sciper: "000000",
        picture: null,
    })

    const [showPassword,setShowPassword] = useState(true)
    const [showPasswordConfirmation,setShowPasswordConfirmation] = useState(true)
    const [isFirstName, setIsFirstName] = useState(true)
    const [isLastName, setIsLastName] = useState(true)
    const [isSamePassword,setIsSamePassword] = useState(true)
    const [isPassword,setIsPassword] = useState(true)

    useEffect(() => {
        console.log(emailGiven)
        setEmail(emailGiven)
    },[])

    const setFirstName = text => {
        setIsFirstName(true)
        setUserState(existingValues => ({
            ...existingValues,
            firstName : text
        }))
    }
    const setLastName = text => {
        setIsLastName(true)
        setUserState(existingValues => ({
            ...existingValues,
            lastName : text
        }))
    }

    const setEmail = text => {
        setUserState(existingValues => ({
            ...existingValues,
            email : text
        }))
    }

    const setPassword = text => {
        setIsPassword(true)
        setUserState(existingValues => ({
            ...existingValues,
            password : text
        }))
    }
    
    const setPasswordConfirmation = text => {
        setUserState(existingValues => ({
            ...existingValues,
            passwordConfirmation : text
        }))
    }

    const submitUser = (e) => {
        e.preventDefault()
        var a = !userState.firstName
        var b = !userState.lastName
        var c = !(userState.password === userState.passwordConfirmation)
        var e = !userState.password

        a ? setIsFirstName(false) : setIsFirstName(true)
        b ? setIsLastName(false) : setIsLastName(true)
        c ? setIsSamePassword(false) : setIsSamePassword(true)
        e ? setIsPassword(false) : setIsPassword(true)

        if(!a && !b && !c && !e) {
            // console.log(userState)
            user.signUp(userState)
                .then(() => {
                    console.log("Account created")
                    navigation.navigate("Home")
                })
                .catch(err => {
                    if (err instanceof FirebaseError) {
                        if (err.code === "auth/email-already-in-use") {
                            console.log("there is already someone with this email adress")
                        }
                        else{
                            console.log("c'est chaud la frr")
                        }
                    } else {
                        console.log(err)
                    }
            })
        }
        
        return false
        
    }

    return (
        <View>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{zIndex:-1}}>
                <View style={{height:"100%",width:"100%",backgroundColor:"beige",padding:10}}>
                    <View style={styles.componentStyle}>
                        {/* <TextInput placeholder="firstName" value={userState.firstName} style={{marginLeft:10,fontSize:17}} onChangeText={text => setFirstName(text)}></TextInput> */}
                        <TextInput 
                            placeholderTextColor={"gray"} 
                            placeholder="Adresse email" 
                            value={userState.email} 
                            style={styles.text} 
                            autoCapitalize="none" 
                            autoCorrect={false} 
                            onChange={val => setEmail(val)}/>
                    </View>
                    <View style={{flexDirection:"row"}}>
                        <View style={[styles.componentStyle,{marginRight:5,flex:1}]}>
                            {/* <TextInput placeholder="firstName" value={userState.firstName} style={{marginLeft:10,fontSize:17}} onChangeText={text => setFirstName(text)}></TextInput> */}
                            <TextInput placeholderTextColor={"gray"} placeholder="First Name" value={userState.firstName} style={styles.text} onChangeText={text => setFirstName(text)} autoCorrect={false}></TextInput>
                            {!isFirstName && <Text style={styles.warningStyles}>Write your first name please</Text>} 
                        </View>
                        <View style={[styles.componentStyle,{marginRight:0,flex:1}]}>
                            {/* <TextInput placeholder="firstName" value={userState.firstName} style={{marginLeft:10,fontSize:17}} onChangeText={text => setFirstName(text)}></TextInput> */}
                            <TextInput placeholderTextColor={"gray"} placeholder="Last Name" value={userState.lastName} style={styles.text} onChangeText={text => setLastName(text)} autoCorrect={false}></TextInput>
                            {!isLastName && <Text style={styles.warningStyles}>Write your last name please</Text>}
                        </View>
                    </View>
                    
                    <View style={styles.componentStyle}>
                        <View style={[{flexDirection:"row",justifyContent:"space-between"}]}>
                            {console.log(userState.password)}
                            <TextInput placeholderTextColor={"gray"} clearTextOnFocus={false} placeholder="Password" value={userState.password} style={{marginLeft:10,fontSize:17}} onChangeText={text => setPassword(text)} secureTextEntry={showPassword} autoCapitalize="none" autoCorrect={false}></TextInput>
                            {showPassword ? 
                            <Ionicons name="ios-eye-off-outline" size={24} color="black" onPress={() => {setShowPassword(false)}}/> : 
                            <Ionicons name="eye-outline" size={24} color="black" onPress={() => setShowPassword(true)}/>}
                        </View>
                        {!isPassword && <Text style={styles.warningStyles}>Please provide password</Text>}
                        {!isSamePassword && <Text style={styles.warningStyles}>Not same password</Text>}
                        
                    </View>
                    
                    <View style={styles.componentStyle}>
                        <View style={[{flexDirection:"row",justifyContent:"space-between"}]}>
                            <TextInput placeholderTextColor={"gray"} placeholder="Password Confirmation" value={userState.passwordConfirmation} style={{marginLeft:10,fontSize:17}} onChangeText={text => setPasswordConfirmation(text)} autoCapitalize="none" autoCorrect={false} secureTextEntry={showPasswordConfirmation}></TextInput>
                            {showPasswordConfirmation ? 
                            <Ionicons name="ios-eye-off-outline" size={24} color="black" onPress={() => setShowPasswordConfirmation(false)}/> :
                            <Ionicons name="eye-outline" size={24} color="black" onPress={() => setShowPasswordConfirmation(true)}/>}
                            
                        </View>
                        {!isSamePassword && <Text style={styles.warningStyles}>Not same password</Text>}
                    </View>
                    

                    <TouchableOpacity style={[styles.componentStyle,{backgroundColor: "#FFCB66",}]} onPress={submitUser}>
                        <Text style={{textAlign:"center",fontSize:17,}} >
                            Create account
                        </Text>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        </View>
    )
}

const styles = StyleSheet.create({
    componentStyle : {
        width:"100%",
        marginTop:30,
        // marginHorizontal:20,
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
    },

    warningStyles : {
        fontSize:10,
        color:"red",
    },
})