import React, { useEffect, useRef, useState } from 'react'
import { ScrollView, StyleSheet, TouchableWithoutFeedback, ImageBackground, Text, View, Dimensions } from 'react-native'
import Colors from '../constants/Colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import AccordionItem from '../components/AccordionItem'
import { useSelector, useDispatch } from 'react-redux'
import { careActions } from '../store/care-slice'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import PrimaryCareInfo from '../assets/database/PrimaryCareInfo.json'
import Animal from '../assets/database/Animals.json'
//<Image source={require('../assets/img/pigeon_screen.jpg')} style={styles.image}/>

const AnimalBasicCareScreen = () => {

    const navigation = useNavigation()
    const animalID = useSelector(state => state.search.animalSelected_id)
    const currentLanguage = useSelector(state => state.language.selectedLanguage)
    
    const [headerImg, setHeaderImg] = useState()
    const [renderML, setRenderML] = useState(false)
    const [animalName, setAnimalName] = useState('')
    const [careDescription, setCareDescription] = useState('')
    const [mLTitle, setMLTitle] = useState('')
    const [mLDescription, setMLDescription] = useState('')
    const [homeTitle, setHomeTitle] = useState('')
    const [pageTitle, setPageTitle] = useState('')
    const [pageBC, setPageBC] = useState('')
    const [primaryCareArray, setPrimaryCareArray] = useState()

    useEffect(() => {
        const filtered = PrimaryCareInfo.filter(function(element){
            if (element.AnimalID == animalID) {
                return element
            }
        })
        setPrimaryCareArray(filtered)
        if (animalID == 5) {
            setRenderML(true)
        } else {
            setRenderML(false)
        }
        
        if (animalID == 1) {
            setHeaderImg(require("../assets/img/pigeon_screen.jpg"))
        } else if (animalID == 2) {
            setHeaderImg(require("../assets/img/2.jpg"))
        } else if (animalID == 3) {
            setHeaderImg(require("../assets/img/3.jpg"))
        } else if (animalID == 4) {
            setHeaderImg(require("../assets/img/4.jpg"))
        } else if (animalID == 5) {
            setHeaderImg(require("../assets/img/turtle_screen.jpg"))
        } else if (animalID == 6) {
            setHeaderImg(require("../assets/img/6.jpg"))
        }
    }, [])

    useEffect(() => {
        const currentAnimal = Animal.filter(function(element){
            if (element.ID == animalID) {
                return element
            }
        })
        
        if (currentLanguage == 'ES') {
            setPageBC("Cuidados básicos")
            setHomeTitle("Inicio")
            setPageTitle("¿Cuáles son los cuidados básicos?")
            setAnimalName(currentAnimal[0]["NameES"])
            setCareDescription("A continuación podrás ver toda la información necesaria para darle el mejor cuidado a la especie seleccionada.")
            setMLTitle('¿No sabes con qué especie de tortuga te encuentras?')
            setMLDescription('Debido a que la información proporcionada en esta página varía en función de la especie de la tortuga, te recomendamos que le saques una foto con la cámara del móvil y la aplicación detectará de qué especie se trata.\n\nTan sólo tienes que hacer click en esta tarjeta y te guiaremos por el proceso.')
        } else {
            setHomeTitle("Home")
            setPageBC("Primary Care")
            setPageTitle("What's the primary care like?")
            setAnimalName(currentAnimal[0]["NameEN"])
            setCareDescription("Now you will have access to all the necessary information to provide the best care for the selected species.")
            setMLTitle('Do you have doubts about the turtle species?')
            setMLDescription('Due to the following information being different depending on the turtle species, we recommend you take a photo and the app will help you identify it.\n\nYou only have to tap on this card and we will guide you through the process.')
        }
    }, [currentLanguage])

    const renderSections = () => {
        return(
            <View style={styles.sectionContainer}>
                <FlatList 
                    data={primaryCareArray}
                    style={{marginTop: 10}} 
                    keyExtractor={item => item.ID} 
                    renderItem={itemData => 
                        <AccordionItem id={itemData.item.ID} type="care" keyExtractor={itemData.item.ID}/>
                    }
                />
            </View>
        )
    }

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

    return (
        <View style={styles.container}>
            <VirtualizedList>
            <ScrollView>
                <ImageBackground source={headerImg} resizeMode="cover" style={styles.headerBlock}>
                    <View style={styles.breadCrumbs}>
                        <TouchableWithoutFeedback>
                            <Text style={styles.text}>{homeTitle}</Text>
                        </TouchableWithoutFeedback>
                        <Text style={styles.text}>&gt;</Text>
                        <Text style={styles.text}>{animalName}</Text>
                        <Text style={styles.text}>&gt;</Text>
                        <Text style={styles.text}>{pageBC}</Text>
                    </View>
                    <View style={{justifyContent: 'center', alignItems: 'center', marginBottom: 10}}>
                        <MaterialCommunityIcons name='paw' size={70} color={Colors.primary} />
                    </View>
                    <Text style={styles.title}>{pageTitle}</Text>
                    <View style={{justifyContent: 'center', alignItems: 'center', marginBottom: 10}}><View style={styles.divider}/></View>
                    <View style={styles.descriptionBlock}>
                        <Text style={[styles.text, {textAlign: 'center'}]}>{careDescription}</Text>
                    </View> 
                </ImageBackground>
                {renderML && <TouchableOpacity activeOpacity={0.9} style={[styles.contentBlock, {marginBottom: 30, justifyContent: 'center', alignItems: 'center'}]} onPress={() => {
                    navigation.push('ClassifierScreen')
                }}>
                    <MaterialCommunityIcons name="image-filter-center-focus-strong-outline" size={50} color={Colors.primary} />
                    <Text style={[styles.title, {marginVertical: 15}]}>{mLTitle}</Text>
                    <Text style={[styles.text, {width: '90%', textAlign: 'left', marginBottom: 15}]}>{mLDescription}</Text>
                    </TouchableOpacity>}
                {renderSections()}
            </ScrollView>
            </VirtualizedList>
        </View>
    )
}

export default AnimalBasicCareScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#333',
        height: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    sectionContainer: {
        marginBottom: 5,
        marginTop: 5,
        paddingVertical: 20,
        paddingHorizontal: 20,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: '#111',
        width: d_width*0.974,
        borderRadius: 5,
        elevation: 10,
        zIndex: 0
    },
    headerBlock: {
        width: Dimensions.get('window').width*0.97,
        zIndex: 1,
        marginTop: Dimensions.get('window').height * 0.01,
        justifyContent: 'space-between',
        paddingBottom: 40,
        paddingTop: 20,
        borderTopLeftRadius: 7.5,
        borderTopRightRadius: 7.5,
        overflow: 'hidden'
    },
    breadCrumbs: {
        flexDirection: 'row',
        marginLeft: 20,
        marginBottom: 30
    },
    text: {
        fontFamily: 'montserrat',
        fontSize: 14,
        marginRight: 5,
        color: 'white'
    },
    image: {
        width: Dimensions.get('window').width,
        top: 0
    },
    title: {
        fontFamily: 'montserrat-bold',
        width: '90%',
        color: Colors.primary,
        alignSelf: 'center',
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 10
    },
    divider: {
        height: 3,
        width: Dimensions.get('window').width*0.9,
        backgroundColor: Colors.primary,
    },
    descriptionBlock: {
        width: Dimensions.get('window').width*0.97,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 5
    },
    contentBlock: {
        width: Dimensions.get('window').width * 0.97,
        backgroundColor: Colors.darkBG,
        borderRadius: 7.5,
        zIndex: 3,
        marginTop: -20,
        paddingVertical: 30,
        marginBottom: 10
    }
})
