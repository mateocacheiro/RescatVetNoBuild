import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, FlatList, TextInput, Dimensions, ScrollView, Pressable } from 'react-native'
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


const HomeScreen = ({ navigation }) => {

    const dispatch = useDispatch()

    const search = useSelector(state => state.search.searchText)

    const classSelected = useSelector(state => state.search.classSelected)

    const selectedChars = useSelector(state => state.search.caracteristicas)

    const [filteredAnimal, setFilteredAnimal] = useState([])

    const modalClassVisible = useSelector(state => state.search.modals.class_modal_visible)

    const modalCaracteristicaVisible = useSelector(state => state.search.modals.caracteristica_modal_visible)

    const [classTitle, setClassTitle] = useState('Clase de animal')

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
            setClassTitle('Clase de animal')
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
                <Text style={styles.text}>Ninguna característica seleccionada</Text>
            )
        }
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
        <ScrollView contentContainerStyle={{backgroundColor: Colors.lightBG}} nestedScrollEnabled={true}>
            <View style={styles.block}>
                {modalClassVisible && <ClassModal />}
                {modalCaracteristicaVisible && <CaracteristicaModal />}
                <Pressable style={{paddingTop: 0, marginBottom: 5, height: Dimensions.get('window').height*0.4}} onPress={() => {
                    navigation.navigate("MapScreenStack")
                }}>
                    <Card>
                        <MaterialIcons name="map" size={50} color={Colors.primary} />
                        <Text style={styles.title}>¿Te has encontrado un animal herido y/o abandonado?</Text>
                        <View style={styles.divider} orientation='horizontal'></View>
                        <Text style={styles.description}>Esta aplicación te guiará durante los primeros auxilios en caso de emergencia veterinaria. Una vez realizados los primeros auxilios, recomendamos siempre que vayas al veterinario.</Text>
                        <View style={styles.paddingText}></View>
                        <Text style={styles.description}>Podrás encontrar un mapa con las clínicas más cercanas haciendo click aquí, o desde la segunda opción del menú.</Text>
                    </Card>
                </Pressable>
                <Card>
                    <MaterialIcons name="info" size={50} color={Colors.primary} />
                    <Text style={styles.title}>¿Dónde encontrar recursos de ayuda?</Text>
                    <View style={styles.divider} orientation='horizontal'></View>
                    <Text style={styles.description}>En el menú inferior de cada animal, haciendo click en el icono derecho, podrás ver recursos externos relacionados con la misma, incluyendo grupos de Facebook, perfiles de Instagram, páginas web relacionadas, etc.</Text>
                </Card>
                <Card>
                    <MaterialIcons name="filter-list-alt" size={50} color={Colors.primary} />
                    <Text style={styles.title}>Filtrar especies animales</Text>
                    <View style={styles.divider} orientation='horizontal'></View>
                    <TextInput style={styles.textInput} placeholder="Buscar por nombre del animal" placeholderTextColor="#E6E6E6" onChangeText={text => {
                        text = text.toLowerCase()
                        dispatch(searchActions.updateSearch(text))}
                    } />
                    <PickerBtn title={classTitle} onSelect={() => {
                        dispatch(searchActions.toggleModal(1))
                    }} />
                    <PickerBtn title="Característica(s)" onSelect={() => {
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
        </ScrollView>
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
        fontFamily: 'montserrat',
        color: 'white',
        textAlign: 'center'
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