import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Home from '../screens/Home'
import FavorisList from '../screens/FavorisList'
import Mentions from '../screens/Mentions'
import Search from '../screens/Search'
import DrawerNavigator from './drawerNavigator'
// import SearchInput from '../components/SearchInput'

export default function Navigator() {
    const Stack = createStackNavigator()
    const [city, setCity] = useState('Pau')

    return (
        <NavigationContainer>
            {/* <Stack.Navigator screenOptions={{headerShown: false}}> */}
            <Stack.Navigator>
                {/* <Stack.Screen name="home name" component={Home} options={{headerShown:false}}/> */}
                {/* <Stack.Screen name="Home" options={{header: Menu}} > */}
                <Stack.Screen name="Home" options={{ headerShown: false }}>
                    {props => <Home {...props} city={city}></Home>}
                    {/* { props => <DrawerNavigator {...props} />} */}
                </Stack.Screen>
                <Stack.Screen name="Search" options={{headerShown: false}}>
                    {props => <Search {...props} setCity={setCity}></Search>}
                </Stack.Screen>
                <Stack.Screen name="Favoris" options={{headerShown: false}}>
                    {/* </Stack.Screen> component={FavorisList} /> */}
                    { props => <FavorisList {...props} setCity={setCity}/>}
                </Stack.Screen>
                <Stack.Screen name="Mentions" component={Mentions} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}