import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Index from "./src/app/index";
import Home from "./src/app/home";
import Conta from "./src/app/conta";
import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { FIREBASE_AUTH } from "./components/config";

const Stack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();

function InsideLayout(){
    return(
        <InsideStack.Navigator>
            <InsideStack.Screen name='home' component={Home} />
            <InsideStack.Screen name='conta' component={Conta} />
        </InsideStack.Navigator>
    )
}

export default function App(){
    const[user, setUser] = useState<User | null>(null);

    useEffect(() =>{
        onAuthStateChanged(FIREBASE_AUTH, (user) =>{
            console.log('user', user)
            setUser(user);
        });
    }, [])

    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Login'>
                {user ?(
                    <Stack.Screen name="home" component={InsideLayout}  options={{ headerShown: false}}/>
                ):(
                    <Stack.Screen name="index" component={Index}  options={{ headerShown: false}}/>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}