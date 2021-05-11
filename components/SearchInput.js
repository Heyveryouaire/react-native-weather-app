import React, { useState, useRef } from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import LeftArrow from "../assets/svg/leftArrow"
import useWeather from '../hooks/useWeather'

export default function SearchInput({ navigation, setCities }) {

    const [text, setText] = useState('')
    const { getCities } = useWeather()

    // using ref use to clearInterval, then avoid useless request to api while typing
    const ref = useRef()

    const inputChange = async (text) => {
        setText(text)
        if (text) {
            clearInterval(ref.current)
            const interval = setTimeout(async () => {
                const cities = await getCities(text)
                if (cities.length) {
                    setCities(cities)
                }
            }, 500)
            ref.current = interval
        }
    }

    return (
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
                <TextInput
                    style={{ height: 63, flex: 1, fontSize: 18, color: 'white' }}
                    value={text}
                    placeholder="Chercher une ville"
                    onChangeText={(text) => inputChange(text)}
                    autoFocus={true}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
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