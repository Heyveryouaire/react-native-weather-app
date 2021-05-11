import React from "react"
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native"
import useCities from "../state/cities"
import LeftArrow from "../assets/svg/leftArrow"


export default function FavorisList ({ navigation, setCity }) {

    const cities = useCities(state => state.cities)

    // const cities = [ 
    //     { name: "Tokyo"},
    //     { name: "Londres"}
    // ] 

    const press = (city) => {
        console.log('city :', city)
        const [c] = city.split(',')
        setCity(c)
        navigation.goBack()
    }

    return (
        <>
         <View style={styles.top}>
            <View style={styles.searchInput}>
                <TouchableOpacity
                    style={{ padding: 10 }}
                    onPress={() => {
                        navigation.goBack()
                    }}
                >
                    <LeftArrow fill={'white'}/>
                </TouchableOpacity>
               <Text style={styles.text}>
                   Favoris
               </Text>
            </View>
        </View>
              <View style={styles.main}>
            <FlatList
                contentContainerStyle={styles.listContainer}
                data={cities.map(c => {
                    return { key: c }
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
        </>
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
    },
    top: {
        height: 63,
        backgroundColor: '#333333'
    },
    searchInput: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    }
})