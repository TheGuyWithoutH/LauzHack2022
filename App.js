import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { UserContext } from './context';
import { Guest } from './objects/Guest';
import Home from './screens/Home';

import LoginMenu from './screens/LoginMenu';
import SignUp from './screens/SignUp';

export default function App() {

  const [user, setUser] = useState(new Guest())
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <UserContext.Provider value={{user,setUser}}>
        <Stack.Navigator screenOptions={{headerShown : false,}}>
         
          <Stack.Screen name="Home" component={Home} />

          <Stack.Screen options={{ animation:"slide_from_bottom", presentation:"modal",headerShown : true, 
                title: 'Sign Up or Login'}} name="LoginMenu" component={LoginMenu}/>

          <Stack.Screen name="SignUp" component={SignUp} options={{presentation:"modal",headerShown : true,}}/>
       
        </Stack.Navigator>
      </UserContext.Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
