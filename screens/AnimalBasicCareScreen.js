import React, { useEffect, useRef, useState } from 'react'
import { ScrollView, StyleSheet, TouchableWithoutFeedback, ImageBackground, Text, View, Dimensions } from 'react-native'
import Colors from '../constants/Colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import AccordionItem from '../components/AccordionItem'
import { useSelector, useDispatch } from 'react-redux'
import { careActions } from '../store/care-slice'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
//<Image source={require('../assets/img/pigeon_screen.jpg')} style={styles.image}/>

const AnimalBasicCareScreen = () => {

    const navigation = useNavigation()
    const dispatch = useDispatch()
    const navigatedToSplay = useSelector(state => state.care.navigatedToSplay)
    const splayPosition = useSelector(state => state.care.splayPosition)
    const eggsPosition = useSelector(state => state.care.eggsPosition)
    const navigatedToEggs = useSelector(state => state.care.navigatedToEggs)
    const animalID = useSelector(state => state.search.animalSelected_id)
    
    const [headerImg, setHeaderImg] = useState()
    const [spaceTitle, setSpaceTitle] = useState('')
    const [renderML, setRenderML] = useState(false)
    const [animalName, setAnimalName] = useState('')
    const [careDescription, setCareDescription] = useState('')

    useEffect(() => {
        renderSections()
    }, [navigatedToSplay, navigatedToEggs])

    const refScrollView = useRef(null);

    const moveTo = (section) => {
        if (section == 0) { // Splay Leg
            refScrollView.current.scrollTo({y: splayPosition+3000});
            dispatch(careActions.toggleSplayNav())
        }
        else if (section == 1) { // Eggs
            refScrollView.current.scrollTo({y: eggsPosition+3000})
            dispatch(careActions.toggleEggsNav())
        }
    }

    useEffect(() => {
        if(animalID == 1) {
            setSpaceTitle('Espacio de la paloma en casa')
            setHeaderImg(require('../assets/img/pigeon_screen.jpg'))
            setAnimalName('Paloma')
            setCareDescription('una paloma')
        } else if(animalID == 2) {
            setSpaceTitle('Espacio del gato en casa')
            setHeaderImg(require('../assets/img/2.jpg'))
            setCareDescription('un gato')
            setAnimalName('Gato')
        } else if (animalID == 3) {
            setSpaceTitle('Espacio del perro en casa')
            setHeaderImg(require('../assets/img/3.jpg'))
            setCareDescription('un perro')
            setAnimalName('Perro')
        } else if (animalID == 4) {
            setSpaceTitle('Espacio del conejo en casa')
            setHeaderImg(require('../assets/img/4.jpg'))
            setCareDescription('un conejo')
            setAnimalName('Conejo')
        } else if (animalID == 5) {
            setSpaceTitle('Espacio de la tortuga en casa')
            setHeaderImg(require('../assets/img/turtle_screen.jpg'))
            setCareDescription('una tortuga')
            setAnimalName('Tortuga')
            setRenderML(true)
        } else if (animalID == 6) {
            setSpaceTitle('Espacio del aye-aye en casa')
            setHeaderImg(require('../assets/img/5.jpg'))
            setCareDescription('un aye-aye')
            setAnimalName('Aye-aye')
        }
    }, [animalID])

    const renderSections = () => {
        return(
            <View style={styles.contentBlock}>
                <AccordionItem animalID={0} contentID={19} title="Botiquín" />
                <AccordionItem animalID={animalID} contentID={1} title="Alimentación" />
                <AccordionItem animalID={animalID} contentID={2} title={spaceTitle} />
                <View onLayout={event => {
                    if (navigatedToSplay) {
                        moveTo(0)
                    }
                }}>
                    <AccordionItem animalID={animalID} contentID={3} title="Posibles complicaciones" open_default={navigatedToSplay ? true : false} />
                </View>
                <View onLayout={event => {
                    if(navigatedToEggs) {
                        moveTo(1)
                    }
                }}>
                    <AccordionItem animalID={animalID} contentID={28} title="Problemas con la puesta de huevos" open_default={navigatedToEggs ? true : false} />
                </View>
                <AccordionItem animalID={animalID} contentID={4} title="Pensando en la liberación" />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <ScrollView ref={refScrollView}>
                <ImageBackground source={headerImg} resizeMode="cover" style={styles.headerBlock}>
                    <View style={styles.breadCrumbs}>
                        <TouchableWithoutFeedback>
                            <Text style={styles.text}>Inicio</Text>
                        </TouchableWithoutFeedback>
                        <Text style={styles.text}>&gt;</Text>
                        <Text style={styles.text}>{animalName}</Text>
                        <Text style={styles.text}>&gt;</Text>
                        <Text style={styles.text}>Cuidados Básicos</Text>
                    </View>
                    <View style={{justifyContent: 'center', alignItems: 'center', marginBottom: 10}}>
                        <MaterialCommunityIcons name='paw' size={70} color={Colors.primary} />
                    </View>
                    <Text style={styles.title}> ¿Cuales son los cuidados básicos?</Text>
                    <View style={{justifyContent: 'center', alignItems: 'center', marginBottom: 10}}><View style={styles.divider}/></View>
                    <View style={styles.descriptionBlock}>
                        <Text style={[styles.text, {textAlign: 'center'}]}>A continuación podrás ver toda la información necesaria para darle el mejor cuidado a {careDescription}, separada por categorías.</Text>
                    </View> 
                </ImageBackground>
                {renderML && <TouchableOpacity activeOpacity={0.9} style={[styles.contentBlock, {marginBottom: 30, justifyContent: 'center', alignItems: 'center'}]} onPress={() => {
                    navigation.push('ClassifierScreen')
                }}>
                    <MaterialCommunityIcons name="image-filter-center-focus-strong-outline" size={50} color={Colors.primary} />
                    <Text style={[styles.title, {marginVertical: 15}]}>¿No sabes con qué especie de tortuga te encuentras?</Text>
                    <Text style={[styles.text, {width: '90%', textAlign: 'left', marginBottom: 15}]}>Debido a que la información proporcionada en esta página varía en función de la especie de la tortuga, te recomendamos que le saques una foto con la cámara del móvil y la aplicación detectará de qué especie se trata.</Text>
                    <Text style={[styles.text, {width: '90%', textAlign: 'left'}]}>Tan sólo tienes que hacer click en esta tarjeta y te guiaremos por el proceso.</Text>
                </TouchableOpacity>}
                {renderSections()}
            </ScrollView>
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
