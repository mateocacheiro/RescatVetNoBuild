import React, {useState, useEffect, useRef} from 'react'
import { StyleSheet, View, FlatList, Animated, Dimensions, Text } from 'react-native'
import AnimalsData from '../assets/database/Animals.json'
import { searchActions } from '../store/search-slice';
import { useSelector, useDispatch } from 'react-redux';
import AnimalItem from '../components/AnimalItem';
import CarrouselHome from '../components/CarrouselHome';
import Colors from '../constants/Colors'
import HomeData from '../assets/database/Home.json'
import InterfaceModal from '../components/InterfaceModal';
import { screenActions } from '../store/screen-slice';
import {useRoute} from '@react-navigation/native'
import PickerBtn from '../components/PickerBtn'
import SituationModal from '../components/SituationModal';

const HomeScreen_v2 = ({ navigation }) => {

    const dispatch = useDispatch()
    const route = useRoute()

    useEffect(() => {
        navigation.addListener('focus', () => {
            dispatch(screenActions.changeCurrentScreen('HomeScreen'))
            dispatch(screenActions.getInterfaceHelp(0))
        })
    }, [navigation])

    const currentLanguage = useSelector(state => state.language.selectedLenguage)
    const interface_id = useSelector(state => state.screen.interfaceHelp)
    const interface_help_shown = useSelector(state => state.screen.interfaceHelpShown)

    const situationModalVisible = useSelector(state => state.search.modals.situation_modal_visible)
    const situationSelected = useSelector(state => state.search.situation_selected)
    
    const [homeHelpShown, setHomeHelpShown] = useState(false)

    useEffect(() => {
        if (interface_id === 0 && interface_help_shown === true) {
            //console.log("Showing help for interface with id 0")
            setHomeHelpShown(true)
        } else if (interface_id === 0 && interface_help_shown === false) {
            //console.log("Hiding help for interface with id 0")
            setHomeHelpShown(false)
        }
    }, [interface_id, interface_help_shown])

    const VirtualizedList = ({children}) => {
        return (
            <FlatList
                data={[]}
                keyExtractor={() => "key"}
                renderItem={null}
                ListHeaderComponent={
                    <>{children}</>
                }
                style={{backgroundColor: Colors.lightBG}}
            />
        )
    }

    const renderCards = () => {
        const scrollX = useRef(new Animated.Value(0)).current
        return(
            <View style={{height: Dimensions.get('window').height * 0.38}}>
                <Animated.FlatList 
                    data={HomeData}
                    horizontal
                    keyExtractor={(item) => item.ID}
                    pagingEnabled
                    snapToAlignment="center"
                    scrollEventThrottle={16}
                    scrollToOverflowEnabled={false}
                    decelerationRate="fast"
                    bounces={false}
                    showsHorizontalScrollIndicator={false}
                    onScroll={Animated.event(
                        [{nativeEvent: {contentOffset: {x: scrollX}}}],
                        { useNativeDriver: true }
                    )}
                    renderItem={itemData => <CarrouselHome 
                                                id={itemData.item.ID} 
                                                title={currentLanguage === 'ES' ? itemData.item.Title_ES : itemData.item.Title_EN} 
                                                description={currentLanguage === 'ES' ? itemData.item.Description_ES : itemData.item.Description_EN}
                                                icon={itemData.item.Icon}
                                                onNavigateToMap={() => {
                                                    navigation.navigate('Map')
                                                }}/>
                                }
                />
                <View style={styles.pagination}>
                    {HomeData.map((_, index) => {
                        return(
                            <View key={index} style={styles.dot_unselected} />
                        )
                    })}
                   <Animated.View style={[styles.dot_selected, {
                        transform: [{
                            translateX: Animated.divide(scrollX, Dimensions.get('window').width*0.96).interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, 34.5]
                            })
                        }]
                    }]}/>
                </View>
            </View>
        )
    }

    const renderSituation = () => {
        return(
            <View style={[styles.animalsContainer, {marginTop: 10, paddingVertical: 10}]}>
                <Text style={styles.title}>¿Sabes lo que le ha pasado?</Text>
                <View style={styles.divider} />
                <Text style={[styles.text, {fontSize: 13, textAlign: 'center', marginBottom: 15}]}>Si sabes lo que le ha pasado al animal, podrás ahorrar tiempo al no tener que rellenar el formulario</Text>
                <PickerBtn style={styles.picker} title={!situationSelected ? 'Selecciona uno' : situationSelected} onSelect={() => {
                    dispatch(searchActions.toggleModal(4))
                }} />
            </View>
        )
    }

    const renderAnimals = () => {
        return (
            <View style={styles.animalsContainer}>
                <Text style={styles.title}>Información de emergencia y cuidados básicos</Text>
                <View style={styles.divider} />
                <FlatList 
                    data={AnimalsData}
                    style={{marginTop: 10}}
                    numColumns={2}
                    scrollEnabled={false} 
                    keyExtractor={animal => animal.ID} 
                    renderItem={itemData =>
                        <AnimalItem 
                            id={itemData.item.ID} 
                            name={itemData.item.Name}
                            onNavigate={() => {
                                dispatch(searchActions.animalSelected(itemData.item.ID))
                                dispatch(screenActions.changeCurrentScreen('Emergency'))
                                dispatch(screenActions.getInterfaceHelp(1))
                                navigation.navigate('AnimalScreenStack')
                            }}
                        />
                    } 
                />
            </View>
        )
    }

    const renderHelp = () => {
        return(
            <InterfaceModal />
        )
    }

    return (
        <View style={{flex: 1, alignItems: 'center', backgroundColor: Colors.lightBG}}>
            <View 
                style={{
                    width: 50, 
                    height: 50,
                    zIndex: 200,
                    marginTop: Dimensions.get('window').height - 135,
                    position: 'absolute',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
            </View>
        {homeHelpShown && renderHelp()}
        <VirtualizedList>
            <View style={styles.block}>
                {situationModalVisible && <SituationModal />}
                {renderCards()}
                {renderAnimals()}
            </View>
        </VirtualizedList>
        </View>
    )
}

export default HomeScreen_v2

const widthD = Dimensions.get('screen').width

const heightD = Dimensions.get('screen').height

const styles = StyleSheet.create({
    container: {
        width: widthD,
        flex: 1,
        backgroundColor: '#222',
        alignItems: 'center',
        justifyContent: 'center',
        width: widthD,
        paddingTop: 5
    },
    block: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
    },
    textInput: {
        width: '100%',
        height: 50,
        borderColor: Colors.primary,
        borderWidth: 1,
        padding: 10,
        marginBottom: 5,
        marginTop: 15,
        borderRadius: 5,
        color: 'white',
        fontFamily: 'montserrat',
    },
    text: {
        fontSize: 15,
        fontFamily: 'montserrat',
        color: 'white'
    },
    title: {
        fontFamily: 'montserrat-bold',
        color: Colors.primary,
        fontSize: 15,
        textAlign: 'center',
        marginVertical: 15,
        width: '80%'
    },
    description: {
        fontSize: 14,
        width: '100%',
        fontFamily: 'montserrat',
        color: 'white',
        textAlign: 'justify'
    },
    divider: {
        width: '90%',
        height: 0.5,
        backgroundColor: '#aaa',
        marginBottom: 15,
    },
    paddingText: {
        marginVertical: 5
    },
    menuIcon: {
        color: 'white'
    },
    card1: {
        marginTop: 70
    },
    dot_unselected: {
        width: 12,
        height: 12,
        backgroundColor: Colors.darkBG,
        borderRadius: 6,
        marginHorizontal: 12
    },
    dot_selected: {
        width: 18,
        height: 18,
        borderRadius: 18,
        borderColor: Colors.primary,
        borderWidth: 2,
        position: 'absolute',
        left: -12/2 + 15.2
    },
    pagination: {
        flexDirection: 'row',
        marginVertical: 5,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: Dimensions.get('window').height*0.35,
        left: Dimensions.get('window').width/2 - 36
    },
    animalsContainer: {
        backgroundColor: Colors.darkBG,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7.5,
        marginBottom: 15,
        width: '95.5%',
        paddingVertical: 10
    },
    picker: {
        width: '92%',
        alignSelf: 'center'
    }
})