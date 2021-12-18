import React, {useState, useEffect, Fragment} from 'react'
import { StyleSheet, Text, View, FlatList, TextInput, Dimensions, TouchableOpacity, Pressable } from 'react-native'
import AnimalsData from '../assets/database/Animals.json'
import { searchActions } from '../store/search-slice';
import { useSelector, useDispatch } from 'react-redux';
import AnimalItem from '../components/AnimalItem';
import ClassModal from '../components/ClassModal';
import PickerBtn from '../components/PickerBtn';
import { MaterialIcons } from '@expo/vector-icons';
import Card from '../components/Card';
import CaracteristicaModal from '../components/CaracteristicaModal';
import Caracteristicas from '../components/Caracteristicas';
import Colors from '../constants/Colors'
import HomeData from '../assets/database/Home.json'

const HomeScreen = ({ navigation }) => {

    const dispatch = useDispatch()

    const search = useSelector(state => state.search.searchText)

    const classSelected = useSelector(state => state.search.classSelected)

    const selectedChars = useSelector(state => state.search.caracteristicas)

    const [characteristicsMessage, setCharacteristicsMessage] = useState('Ninguna característica seleccionada')

    const [filteredAnimal, setFilteredAnimal] = useState([])

    const modalClassVisible = useSelector(state => state.search.modals.class_modal_visible)

    const modalCaracteristicaVisible = useSelector(state => state.search.modals.caracteristica_modal_visible)

    const [classTitle, setClassTitle] = useState('Clase de animal')

    const HOME_DATA_MAP = HomeData.filter(item => item.ID === 1)[0]

    const HOME_DATA_RESOURCES = HomeData.filter(item => item.ID === 2)[0]

    const currentLanguage = useSelector(state => state.language.selectedLenguage)

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

    useEffect(() => {
        renderCards()
        if (currentLanguage === 'ES' && classSelected === 'all' || currentLanguage === 'ES' && classSelected === '') {
            setClassTitle('Clase de animal')
            setCharacteristicsMessage('Ninguna característica seleccionada')
        } else if (currentLanguage === 'EN' && classSelected === 'all' || currentLanguage === 'EN' && classSelected === '') {
            setClassTitle('Animal Kingdom')
            setCharacteristicsMessage('No characteristic selected')
        }
    }, [currentLanguage])

    useEffect(() => {
        // All fields are filled
        if (search !== '' && classSelected !== '' && classSelected !== 'all' & selectedChars.length > 0) { 
            setFilteredAnimal(AnimalsData.filter(item => item.Name.includes(search) && 
                item.Class === classSelected && 
                selectedChars.every(elem => item.Tags.split(", ").includes(elem)))
            )
        
        //All fields are empty
        } else if (search === '' && classSelected === '' && selectedChars.length === 0 || 
                   search === '' && classSelected === 'all' && selectedChars.length === 0) {
                    setFilteredAnimal(AnimalsData)
        
        //Only search is filled
        } else if (search !== '' && classSelected === '' && selectedChars.length === 0 || 
                   search !== '' && classSelected === 'all' && selectedChars.length === 0) {  
                    setFilteredAnimal(AnimalsData.filter(item => item.Name.includes(search)))
        
        //Only class is filled
        } else if (search === '' && classSelected !== '' && classSelected !== 'all' && selectedChars.length === 0) { 
            setFilteredAnimal(AnimalsData.filter(item => item.Class === classSelected))

        //Only tags is filled
        } else if (search === '' && classSelected === '' && selectedChars.length > 0 || 
                   search === '' && classSelected === 'all' && selectedChars.length > 0 ) {
                    setFilteredAnimal(AnimalsData.filter(item => selectedChars.every(elem => item.Tags.split(', ').includes(elem))))

        //Search & Class are filled. Tags is empty
        } else if (search !== '' && classSelected !== '' && classSelected !== 'all' && selectedChars.length === 0) {
            setFilteredAnimal(AnimalsData.filter(item => item.Name.includes(search) && item.Class === classSelected))

        //Class & Tags are filled. Search is empty
        } else if (search === '' && classSelected !== '' && classSelected !== 'all' && selectedChars.length > 0){
            setFilteredAnimal(AnimalsData.filter(item => item.Class === classSelected && selectedChars.every(elem => item.Tags.split(', ').includes(elem))))

        //Search & Tags are filled. Class is empty
        } else if (search !== '' && classSelected === '' && selectedChars.length > 0 ||
                   search !== '' && classSelected === 'all' && selectedChars.length > 0) {
                    setFilteredAnimal(AnimalsData.filter(item => item.Class === classSelected && selectedChars.every(elem => item.Tags.split(', ').includes(elem))))
        }
        renderAnimals()
    }, [search])

    useEffect(() => {
        // All fields are filled
        if (search !== '' && classSelected !== '' && classSelected !== 'all' & selectedChars.length > 0) { 
            setFilteredAnimal(AnimalsData.filter(item => item.Name.includes(search) && 
                item.Class === classSelected && 
                selectedChars.every(elem => item.Tags.split(", ").includes(elem)))
            )
        
        //All fields are empty
        } else if (search === '' && classSelected === '' && selectedChars.length === 0 || 
                   search === '' && classSelected === 'all' && selectedChars.length === 0) {
                    setFilteredAnimal(AnimalsData)
        
        //Only search is filled
        } else if (search !== '' && classSelected === '' && selectedChars.length === 0 || 
                   search !== '' && classSelected === 'all' && selectedChars.length === 0) {  
                    setFilteredAnimal(AnimalsData.filter(item => item.Name.includes(search)))
        
        //Only class is filled
        } else if (search === '' && classSelected !== '' && classSelected !== 'all' && selectedChars.length === 0) { 
            setFilteredAnimal(AnimalsData.filter(item => item.Class === classSelected))

        //Only tags is filled
        } else if (search === '' && classSelected === '' && selectedChars.length > 0 || 
                   search === '' && classSelected === 'all' && selectedChars.length > 0 ) {
                    setFilteredAnimal(AnimalsData.filter(item => selectedChars.every(elem => item.Tags.split(', ').includes(elem))))

        //Search & Class are filled. Tags is empty
        } else if (search !== '' && classSelected !== '' && classSelected !== 'all' && selectedChars.length === 0) {
            setFilteredAnimal(AnimalsData.filter(item => item.Name.includes(search) && item.Class === classSelected))

        //Class & Tags are filled. Search is empty
        } else if (search === '' && classSelected !== '' && classSelected !== 'all' && selectedChars.length > 0){
            setFilteredAnimal(AnimalsData.filter(item => item.Class === classSelected && selectedChars.every(elem => item.Tags.split(', ').includes(elem))))

        //Search & Tags are filled. Class is empty
        } else if (search !== '' && classSelected === '' && selectedChars.length > 0 ||
                   search !== '' && classSelected === 'all' && selectedChars.length > 0) {
                    setFilteredAnimal(AnimalsData.filter(item => item.Class === classSelected && selectedChars.every(elem => item.Tags.split(', ').includes(elem))))
        }
        renderAnimals()
        if(classSelected === 'all' || classSelected === '') {
            if (currentLanguage === 'ES') {
                setClassTitle('Clase de animal')
            } else {
                setClassTitle('Animal kingdom')
            }
        } else {
            const title = classSelected.charAt(0).toUpperCase() + classSelected.slice(1)
            setClassTitle(title)
        }
    }, [classSelected])

    useEffect(() => {
        // All fields are filled
        if (search !== '' && classSelected !== '' && classSelected !== 'all' & selectedChars.length > 0) { 
            setFilteredAnimal(AnimalsData.filter(item => item.Name.includes(search) && 
                item.Class === classSelected && 
                selectedChars.every(elem => item.Tags.split(", ").includes(elem)))
            )
        
        //All fields are empty
        } else if (search === '' && classSelected === '' && selectedChars.length === 0 || 
                   search === '' && classSelected === 'all' && selectedChars.length === 0) {
                    setFilteredAnimal(AnimalsData)
        
        //Only search is filled
        } else if (search !== '' && classSelected === '' && selectedChars.length === 0 || 
                   search !== '' && classSelected === 'all' && selectedChars.length === 0) {  
                    setFilteredAnimal(AnimalsData.filter(item => item.Name.includes(search)))
        
        //Only class is filled
        } else if (search === '' && classSelected !== '' && classSelected !== 'all' && selectedChars.length === 0) { 
            setFilteredAnimal(AnimalsData.filter(item => item.Class === classSelected))

        //Only tags is filled
        } else if (search === '' && classSelected === '' && selectedChars.length > 0 || 
                   search === '' && classSelected === 'all' && selectedChars.length > 0 ) {
                    setFilteredAnimal(AnimalsData.filter(item => selectedChars.every(elem => item.Tags.split(', ').includes(elem))))

        //Search & Class are filled. Tags is empty
        } else if (search !== '' && classSelected !== '' && classSelected !== 'all' && selectedChars.length === 0) {
            setFilteredAnimal(AnimalsData.filter(item => item.Name.includes(search) && item.Class === classSelected))

        //Class & Tags are filled. Search is empty
        } else if (search === '' && classSelected !== '' && classSelected !== 'all' && selectedChars.length > 0){
            setFilteredAnimal(AnimalsData.filter(item => item.Class === classSelected && selectedChars.every(elem => item.Tags.split(', ').includes(elem))))

        //Search & Tags are filled. Class is empty
        } else if (search !== '' && classSelected === '' && selectedChars.length > 0 ||
                   search !== '' && classSelected === 'all' && selectedChars.length > 0) {
                    setFilteredAnimal(AnimalsData.filter(item => item.Class === classSelected && selectedChars.every(elem => item.Tags.split(', ').includes(elem))))
        }
        renderChars()
        renderAnimals()
    }, [selectedChars])

    const renderChars = () => {
        if(selectedChars.length > 0) {
            return(
                <Caracteristicas />
            )
        } else {
            return (
                <Text style={styles.text}>{characteristicsMessage}</Text>
            )
        }
    }

    const renderCards = () => {
        let map_title
        let map_description
        let resources_title
        let resources_description

        if (currentLanguage === 'ES') {
            map_title = HOME_DATA_MAP.Title_ES
            map_description = HOME_DATA_MAP.Description_ES
            resources_title = HOME_DATA_RESOURCES.Title_ES
            resources_description = HOME_DATA_RESOURCES.Description_ES
        } else {
            map_title = HOME_DATA_MAP.Title_EN
            map_description = HOME_DATA_MAP.Description_EN
            resources_title = HOME_DATA_RESOURCES.Title_EN
            resources_description = HOME_DATA_RESOURCES.Description_EN
        }

        return(
            <View>
                <Card>
                    <Pressable style={{width: Dimensions.get('window').width*0.95, position: 'absolute', height: '100%', zIndex: 10}} onPress={() => {
                        navigation.navigate('MapScreenStack')
                    }}></Pressable>
                    <MaterialIcons name="map" size={50} color={Colors.primary} />
                    <Text style={styles.title}>{map_title}</Text>
                    <View style={styles.divider} orientation='horizontal'></View>
                    <Text style={styles.description}>{map_description}</Text>
                </Card>
                <Card>
                    <MaterialIcons name="info" size={50} color={Colors.primary} />
                    <Text style={styles.title}>{resources_title}</Text>
                    <View style={styles.divider} orientation='horizontal'></View>
                    <Text style={styles.description}>{resources_description}</Text>
                </Card>
                
            </View>
        )
    }

    const renderAnimals = () => {

        if(filteredAnimal === [] && search === '' && classSelected === '' && selectedChars.length === 0) {
            return (
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
                                navigation.navigate('AnimalScreenStack')
                            }}
                        />
                    } 
                />
            )
        }
        
        if (filteredAnimal.length > 0) {
            return (
                <FlatList 
                    data={filteredAnimal}
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
                                navigation.navigate('AnimalScreenStack')
                            }}
                        />
                    } 
                />
            )
        }

        if (filteredAnimal.length === 0 && !search && classSelected && selectedChars.length > 0 || 
            filteredAnimal.length === 0 && search && !classSelected && selectedChars.length > 0 || 
            filteredAnimal.length === 0 && search && classSelected && selectedChars.length === 0 || 
            filteredAnimal.length === 0 && search && classSelected && selectedChars.length > 0 ||
            filteredAnimal.length === 0 && !search && !classSelected && selectedChars.length > 0 ||
            filteredAnimal.length === 0 && !search && !classSelected && selectedChars.length === 0) {
            return(
                <Text style={styles.text}>No results</Text>
            )
        }
    }

    return (
        <VirtualizedList>
            <View style={styles.block}>
                {modalClassVisible && <ClassModal />}
                {modalCaracteristicaVisible && <CaracteristicaModal />}
                {renderCards()}
                <Card>
                    <MaterialIcons name="filter-list-alt" size={50} color={Colors.primary} />
                    <Text style={styles.title}>{currentLanguage === 'ES' ? 'Filtrar especies animales' : 'Filter animal species'}</Text>
                    <View style={styles.divider} orientation='horizontal'></View>
                    <TextInput style={styles.textInput} placeholder={currentLanguage === 'ES' ? "Buscar por nombre del animal" : "Search by animal name"} placeholderTextColor="#E6E6E6" onChangeText={text => {
                        text = text.toLowerCase()
                        dispatch(searchActions.updateSearch(text))}
                    } />
                    <PickerBtn title={classTitle} onSelect={() => {
                        dispatch(searchActions.toggleModal(1))
                    }} />
                    <PickerBtn title={currentLanguage === 'ES' ? "Característica(s)" : "Characteristic(s)"} onSelect={() => {
                        dispatch(searchActions.toggleModal(2))
                    }} />
                    {renderChars()}
                    <View style={[styles.divider, {marginTop: 15}]} orientation='horizontal'></View>
                    <PickerBtn title="¿Sabes qué le ha pasado?" onSelect={() => {
                        dispatch(searchActions.toggleModal(1))
                    }} />
                </Card>
                {renderAnimals()}
            </View>
        </VirtualizedList>
    )
}

export default HomeScreen

const widthD = Dimensions.get('screen').width

const heightD = Dimensions.get('screen').height

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#222',
        alignItems: 'center',
        justifyContent: 'flex-start',
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
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 15
    },
    description: {
        fontSize: 14,
        width: '100%',
        fontFamily: 'montserrat',
        color: 'white',
        textAlign: 'justify'
    },
    divider: {
        width: '100%',
        height: 0.5,
        backgroundColor: 'white',
        marginBottom: 15
    },
    paddingText: {
        marginVertical: 5
    },
    menuIcon: {
        color: 'white'
    },
    card1: {
        marginTop: 70
    }
})