import React from "react"
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native"
import SearchSVG from "../assets/svg/search"
import UncheckStar from '../assets/svg/uncheckStar'
import CheckStar from '../assets/svg/checkStar'
import ListFavoris from '../assets/svg/listFavoris'
import useCities from '../state/cities'

export default function Menu({ navigation, city }) {

    const cities = useCities(state => state.cities)
    const addCity = useCities(state => state.addCity)
    const removeCity = useCities(state => state.removeCity)

    return (
        <View style={styles.top}>
            <View style={styles.searchInput}>
                <View style={styles.viewItem}>
                    <TouchableOpacity
                        style={{ padding: 10 }}
                        onPress={() => {
                            navigation.push('Search')
                        }}
                    >
                        <SearchSVG height={26} fill={'white'} />
                    </TouchableOpacity>
                </View>
                <View style={[styles.viewItem, { flex: 4 }]}>
                    <Text style={{ fontSize: 20, color: 'white', alignItems: 'center', alignContent: 'center', justifyContent: 'center', textAlign: 'center' }} ellipsizeMode={'tail'} numberOfLines={2}>
                        {city}
                    </Text>
                </View>
                <View style={styles.viewItem}>
                    <TouchableOpacity
                        onPress={() => {
                            if(!cities.includes(city)){
                                addCity(city)
                            }else{
                                removeCity(city)
                            }
                        }}
                    >
                        {cities.includes(city) ? <CheckStar fill={'white'} /> : <UncheckStar fill={'white'} height={46} />}
                    </TouchableOpacity>
                </View>
                <View style={styles.viewItem}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.push('Favoris')
                        }}
                    >
                        <ListFavoris height={46} fill={'white'} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    top: {
        height: 63,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center'
    },
    searchInput: {
        flex: 1,
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        alignSelf: 'stretch',
    },
    viewItem: {
        flex: 1,
        alignItems: 'center'
    }
})
