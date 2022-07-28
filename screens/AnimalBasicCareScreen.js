import React, { useEffect, useRef, useState } from 'react'
import { ScrollView, StyleSheet, TouchableWithoutFeedback, ImageBackground, Text, View, Dimensions } from 'react-native'
import Colors from '../constants/Colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import AccordionItem from '../components/AccordionItem'
import { useSelector, useDispatch } from 'react-redux'
import { careActions } from '../store/care-slice'

//<Image source={require('../assets/img/pigeon_screen.jpg')} style={styles.image}/>

const AnimalBasicCareScreen = () => {

    const dispatch = useDispatch()
    const navigatedToSplay = useSelector(state => state.care.navigatedToSplay)
    const splayPosition = useSelector(state => state.care.splayPosition)

    useEffect(() => {
        console.log(navigatedToSplay)
        renderSections()
    }, [navigatedToSplay])

    const refScrollView = useRef(null);

    const moveTo = (section) => {
        if (section == 0) { // Splay Leg
            refScrollView.current.scrollTo({y: splayPosition+3000});
            dispatch(careActions.toggleSplayNav())
        }
    }

    const renderSections = () => {
        return(
            <View style={styles.contentBlock}>
                <AccordionItem animalID={0} contentID={19} title="Botiquín" />
                <AccordionItem animalID={1} contentID={1} title="Alimentación" />
                <AccordionItem animalID={1} contentID={2} title="Espacio de la paloma en casa" />
                <View onLayout={event => {
                    if (navigatedToSplay) {
                        moveTo(0)
                    }
                }}><AccordionItem animalID={1} contentID={3} title="Posibles complicaciones" open_default={navigatedToSplay ? true : false} /></View>
                <AccordionItem animalID={1} contentID={4} title="Pensando en la liberación" />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <ScrollView ref={refScrollView}>
                <ImageBackground source={require('../assets/img/pigeon_screen.jpg')} resizeMode="cover" style={styles.headerBlock}>
                    <View style={styles.breadCrumbs}>
                        <TouchableWithoutFeedback>
                            <Text style={styles.text}>Inicio</Text>
                        </TouchableWithoutFeedback>
                        <Text style={styles.text}>&gt;</Text>
                        <Text style={styles.text}>Paloma</Text>
                        <Text style={styles.text}>&gt;</Text>
                        <Text style={styles.text}>Cuidados Básicos</Text>
                    </View>
                    <View style={{justifyContent: 'center', alignItems: 'center', marginBottom: 10}}>
                        <MaterialCommunityIcons name='paw' size={70} color={Colors.primary} />
                    </View>
                    <Text style={styles.title}> ¿Cuales son los cuidados básicos?</Text>
                    <View style={{justifyContent: 'center', alignItems: 'center', marginBottom: 10}}><View style={styles.divider}/></View>
                    <View style={styles.descriptionBlock}>
                        <Text style={[styles.text, {textAlign: 'center'}]}>A continuación podrás ver toda la información necesaria para darle el mejor cuidado a una paloma, separada por categorías.</Text>
                    </View> 
                </ImageBackground>
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
        color: Colors.primary,
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
