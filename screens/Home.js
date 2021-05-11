import React, { useEffect, useState, useRef } from "react"
import { StyleSheet, Text, View, Button, ImageBackground, Image, FlatList, Dimensions, TouchableOpacity } from "react-native"
import sunshine from "../assets/sunshine.jpg"
import cloudy from "../assets/cloudy.jpg"
import rain from "../assets/rain.jpg"
import thunder from "../assets/thunder.jpg"
import clear from '../assets/clear.jpg'

import Menu from "../components/Menu"
import useWeather from '../hooks/useWeather'

const formatDate = (d) => {
    // date object seem not to work on mobile ? 
    const [date, hours] = d.split(' ')
    const [ year, month, day] = date.split('-')
    const [h] = hours.split(':')

    // const date = new Date(d)
    // console.log('date ? ', date.getHours())
    const months =
        ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']

    // let day = date.getDate()
    // day = day < 10 ? `0${day}` : day
    // let dDay = Number(day) < 10 ? `0${day}` : day
    let dDay = Number(day) < 10 ? `0${Number(day)}` : Number(day)
    return `${dDay} ${months[Number(month)]} ${year} - ${h}:00`
    // return `${day} ${months[date.getMonth()]} ${date.getFullYear()} - ${date.getHours()}:00`
}

export default function Home({ navigation, city }) {
    const { getForecast } = useWeather()
    const [backgroundImage, setBackgroundImage] = useState(sunshine)

    const [list, setList] = useState()

    const onViewRef = useRef((viewableItems) => {
        if(viewableItems.changed.length){
            setBackgroundImage(viewableItems.changed[0].item.weather)
        }
        
    })

    const viewConfigRef = useRef({
        itemVisiblePercentThreshold: 50,
        waitForInteraction: true,
        minimumViewTime: 5, 
    })

    useEffect(() => {
        async function loadData() {
            const [c] = city.split(',')

            try {
                const meteo = await getForecast(c)

                const list = meteo.list.map(m => {
                    console.log('date : ', m.dt_txt)
                    const temp = {
                        date: m.dt_txt,
                        max: m.main.temp_max,
                        min: m.main.temp_min,
                        // weather: m[0].weather[0].main,
                        icon: m.weather[0].icon
                    }

                    switch (m.weather[0].main) {
                        case "Clouds":
                           
                            // setBackgroundImage(cloudy)
                            temp.weather = cloudy
                            break
                        case "Sun":
                           
                            // setBackgroundImage(sunshine)
                            temp.weather = sunshine
                            break
                        case "Clear":
                          
                            // setBackgroundImage(clear)
                            temp.weather = clear
                            break
                        case "Rain":
                         
                            temp.weather = rain
                            // setBackgroundImage(rain)
                            break
                    }


                    const [date, hours] = m.dt_txt.split(' ')
                    const [ year, month, day] = hours.split('-')
                    const [h] = hours.split(':').map(e => Number(e))
                


                    // let hours = temp.date.getHours()

                    // console.log("temp is ", temp)
                    // return temp
                    if (h === 9 || h === 12 || h === 15 || h === 18) {
                        return temp
                    }
                })

                console.log('list', list.filter(l => l!==undefined))

                // console.log('list : ', list.filter(l => l !== undefined))
                setList(list.filter(l => l !== undefined))



                if (meteo.cod !== 200 && meteo.cod !== '200') {
                    console.log("dont work")
                    throw new Error("fuck")
                }
            } catch (err) {
                console.log('err', err)
            }
        }
        console.log('load city ! ')
        loadData()
    }, [city])

    return (
        <View style={styles.main}>

            <ImageBackground
                style={styles.images}
                source={backgroundImage}
            >

                <Menu
                    navigation={navigation}
                    city={city}
                />
                <FlatList
                    viewabilityConfig={viewConfigRef.current}
                    onViewableItemsChanged={onViewRef.current}
                    contentContainerStyle={styles.listContainer}
                    horizontal={true}
                    data={list}
                    style={{ flex: 1 }}
                    // removeClippedSubviews={true}
                    // onScrollEndDrag={() => console.log('end scroll')}
                    // snapToAlignment={'center'}
                    pagingEnabled
                    keyExtractor={(item, index) => index.toString()}
                    // initialNumToRender={1}
                    renderItem={({ item }) =>
                        <View key={item.key} style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }}>


                            <View style={styles.meteo}>
                                <View>
                                    {/* { item && console.log('item.date is ',item.dat)} */}
                                    <Text style={styles.text}>
                                        {formatDate(item.date)}
                                    </Text>
                                </View>
                                <View style={styles.row}>
                                    <View>
                                        <Image
                                            source={{ uri: `http://openweathermap.org/img/wn/${item.icon}@4x.png` }}
                                            style={styles.meteoIcon}
                                        />
                                    </View>
                                    <View style={styles.col}>
                                        <View>
                                            <Text style={styles.text}>
                                                {item.min} °C
                                    </Text>
                                        </View>
                                        <View>
                                            <Text style={styles.text}>
                                                {item.max} °C
                                    </Text>
                                        </View>
                                    </View>
                                </View>
                                <View>
                                    <Text style={styles.text}>
                                        {item && item.min || "Chargement en cours.."}
                                    </Text>
                                </View>
                            </View>
                            {/* <Button
                                title={"Mentions Légales"}
                                onPress={() => navigation.push('Mentions')}
                            >
                                Mentions Légales
                            </Button> */}
                        </View>
                    }
                >
                </FlatList>
            </ImageBackground>
        </View>
      
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#CCC',
    },
    meteo: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    col: {
        flexDirection: 'column',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    images: {
        flex: 1,
        resizeMode: 'cover'
    },
    text: {
        fontSize: 24,
        // color: 'grey'
        color: 'white'
    },
    meteoIcon: {
        width: 100,
        height: 100
    }
})