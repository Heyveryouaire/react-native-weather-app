import React, { useState } from "react"
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import SearchInput from "../components/SearchInput"
import useCities from '../state/cities'


export default function Search({ navigation, setCity }) {
    // default should be set with geolocalisation, or favorites

    // just testing ...
    const lol = useCities(state => state.cities)
    console.log('thank to zustand !', lol)

    
    const [cities, setCities] = useState([
        { name: "Pau" }, 
        { name: "Tokyo" }, 
        { name: "New York"},
        { name: "Moscou"},
        { name: "Singapour"},
        { name: "Anchorage"},
        { name: "Lima"},
        { name: "Damas"}
    
    ])
    console.log('cities : ', cities)

    const press = (city) => {
        console.log('city :', city)
        const [c] = city.split(',')
        setCity(c)
        navigation.goBack()
    }

    return (
        <View style={styles.main}>
            <SearchInput setCities={setCities} navigation={navigation} />
            <FlatList
                contentContainerStyle={styles.listContainer}
                data={cities.map(c => {
                    return { key: c.name }
                })}
                renderItem={({ item }) =>
                    <View >
                        <TouchableOpacity
                            onPress={() => press(item.key)}>
                            <Text
                                style={styles.text}
                            >{item.key}</Text>
                        </TouchableOpacity>
                    </View>
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        flex:1
    },
    text: {
        color: 'white',
        fontSize: 18,
        padding: 10
    },
    listContainer: {
        flex: 1,
        // justifyContent: 'space-around',
        backgroundColor: '#333333'
    }
})