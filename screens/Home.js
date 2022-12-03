import { useContext, useEffect } from "react";
import { Text, View } from "react-native";
import { UserContext } from "../context";
import { auth } from '../firebase';
import { Guest } from "../objects/Guest";
import { User } from "../objects/User";

export default function Home({navigation}) {

    const {user,setUser} = useContext(UserContext)

    useEffect(() => {
        console.log("Home")
        const unsuscribe = auth.onAuthStateChanged(u => {
            if (u) { 
                console.log("User is already logged in")
                setUser(new User(u.uid, u)); 
            } 
            else {
                console.log("User is not logged in")
                setUser(new Guest())
                navigation.navigate('LoginMenu');
                // navigation.navigate("LoginMenu")
            }
            unsuscribe()
        })
    }, [])

    return (
        <View>
            <Text onPress={() => user.logout()}>Menu</Text>
        </View>
    )
}